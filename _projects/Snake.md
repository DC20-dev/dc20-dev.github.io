---
layout: projects

title: Snake - MOS 6502
description: Assembly Fun! 
link: https://github.com/daxpress/6502_snake

image: /assets/images/Snake/Snake2.gif
preview: /assets/images/Snake/Snake1.gif
preview-icons: <iconify-icon icon="file-icons:assembly-generic"></iconify-icon>

# https://material-foundation.github.io/material-theme-builder/ for the palette, just pass the relevant img!
primary: "#adc6ff"
secondary: "#583e5b"
tertiary: "#debcdf"
---

{% include colorizer.html primary=page.primary secondary=page.secondary tertiary=page.tertiary %}

{% if page.link != null %}
{% include github-section.html url=page.link title=page.title preview=page.preview %}
{% endif %}

# About

This project is a minimalist implementation of the classic **Snake** game for the **MOS 6502** microprocessor.
Built entirely in **assembly** language, it demonstrates the fundamentals of game programming on **limited hardware**.
The **MOS 6502**’s constrained environment provides a fascinating **challenge**,
requiring creative approaches to **memory and CPU cycle management**.

# The Challenge of Limited Hardware

The **MOS 6502** is a relatively simple yet iconic **8-bit CPU** with a **16-bit address bus** capable of addressing up to **64KB of memory**.
It operates in a **little-endian** format, where multi-byte addresses are stored with the least significant byte first.  
Despite its simplicity, this processor **powered** many classic systems, including the **Commodore 64** and the **NES**.

## Key architectural features

* **Registers and Memory Addressing**: The processor has only a **few internal registers**,
making efficient use of memory and the stack **critical**.

* **Zero Page Optimization**: The first **256 bytes** of memory ($0000-$00FF), known as the **Zero Page**,
enjoy special addressing modes that yield shorter, **faster instructions**.
This feature is essential for performance-critical routines.

* **System Stack**: The **second page** of memory ($0100-$01FF) is reserved for the **stack**,
which is fixed in location and used for subroutine calls and interrupts.
These constraints shape every aspect of programming for the **MOS 6502**,
**demanding creativity** to balance functionality, performance and memory safety.

# How It Works

The **Snake** game operates through a series of interconnected subroutines written in **assembly** language for the **MOS 6502**.
Here, I'll highlight and explain **key sections** of the code that illustrate the mechanics of the game,
starting with its initialization and core loop.

## Setting Up the Game State

```text
.org $8000
LDX #$FF
TXS
start:
    JSR init
    JSR loop
init:
    LDA PLAYER_COLOR
    STA CENTER_ADDRESS
    LDA CENTER_VALUE
    STA PLAYER_HEAD
    LDA START_LENGTH
    STA PLAYER_LENGTH
```

### Basic Setup

The initialization begins with `.org $8000`, a directive that tells the assembler to treat the start of the code as address
$8000 in the memory map. This means the **first instruction** in the ROM, which is at **address 0** in the physical file,
will correspond to **$8000** when **loaded**into the system. This mapping is critical for ensuring that the
program is placed in the **correct** region of memory for execution.

After setting up the **ROM mapping**, the `LDX #$FF` and `TXS` instructions initialize the **stack pointer** to **$01FF**,
the top of the 6502's fixed stack space. This ensures all stack operations
(e.g., subroutine calls, temporary storage) function **correctly** as pushing to the stack will decrease the stack pointer.

### Initialization

The `start` label marks the program's **entry point**, leading into the `init` subroutine:  
`CENTER_ADDRESS` - defining the grid's **central position** on screen - is initialized to `PLAYER_COLOR`, the starting point for the **Snake's head**.  
`PLAYER_HEAD` **stores** the current position of the Snake’s head, and `PLAYER_LENGTH` **initializes** the Snake’s size to `START_LENGTH`.  

By the time the program exits the `init` subroutine, all **essential** variables are prepared,
and the game **transitions** to the **main loop**, ready for player interaction.

## Preparing for Gameplay

After setting up initial game variables, the `init` subroutine enters a **preparatory phase** called `init_loop`,
which ensures everything is **ready before gameplay begins**.

```text
init_loop:
    JSR count_seed
    JSR get_direction
    JSR draw_snake
    LDA DIRECTION
    CMP #$00
    BEQ init_loop
    JSR set_new_apple
    RTS
```

The `init_loop` performs several key tasks repeatedly until the player provides input to start the game:

### Seed Counting

The subroutine `count_seed` is called to increment the `RANDOM_SEED` variable.
This variable is later used for generating **random apple positions**.
Incrementing it continuously during initialization ensures the seed is **dynamic**,
influenced by how long the player waits before starting.

### Waiting for Player Input

The `get_direction` subroutine checks for input. If no input is detected, the game remains in the loop.
This guarantees the **player controls when the game starts** and avoids the Snake moving unintentionally before the player is ready.

### Drawing the Initial Snake

The `draw_snake` subroutine is called to render the Snake’s starting position on the screen.
This ensures the player can see the Snake in its **initial state**.

### Input Validation

The `LDA DIRECTION` and `CMP #$00` instructions check if a **direction key** has been **pressed**.
If **no valid input** is detected (`BEQ init_loop`), the loop **continues**.
When input is **detected**, the game **exits** the loop.

### Placing the First Apple

Once the player provides input, `set_new_apple` is called to **randomly place the first apple** on the grid using the dynamic `RANDOM_SEED`.
This ensures that the game is **immediately ready** for its core mechanics: moving the Snake and collecting apples.

### Transition to Gameplay

After initializing the apple and ensuring the Snake is drawn, the subroutine ends with `RTS`,
transitioning control back to `start` which then calls the `loop` subroutine.

### Why This Matters

The `init_loop` serves as a critical **bridge** between static **initialization** and dynamic **gameplay**:

* It waits for the player's input, making the game feel **responsive**.

* It ensures the game starts in a **visually coherent state** with both the Snake and the first apple properly placed.

* It **randomizes** elements such as the apple position in a way that feels **natural**, even on limited hardware.

This approach balances preparation and player control while **optimizing** the program’s logic for the constraints of the **MOS 6502**.

## Game Loop: Real-Time Updates

```text
loop:
    JSR count_seed
    JSR check_collisions
    JSR get_direction
    JSR check_do_update
    JSR do_body
    JSR do_movement
    JSR draw
    JMP loop
```

The **core** game loop calls a series of subroutines in sequence:

* **Seed Counting**: `count_seed` updates a pseudo-random number generator.

* **Collision Handling**: `check_collisions` checks if the Snake **eats** an apple or itself.

* **Direction Handling**: `get_direction` processes **input**.

* **Movement Updates**: `do_body` adjusts the Snake's body segments to **follow the head**,
and `do_movement` updates the head position based on input.

* **Rendering**: `draw` updates the **video output** to reflect the current state.

This structure ensures a predictable and modular execution flow.

## Collision Detection: Apple and Self-Collisions

```text
check_collisions:
    check_apple_collision:
        LDA APPLE_POSITION
        CMP PLAYER_HEAD
        BNE check_snake_collision
        INC PLAYER_LENGTH
        JSR set_new_apple
    check_snake_collision:
        LDA PLAYER_LENGTH
        CMP #$05
        BMI exit_subroutine
        LDX #$03
        snake_loop:
            LDA PLAYER_HEAD, X
            CMP PLAYER_HEAD
            BEQ collision_self
            INX
            CPX PLAYER_LENGTH
            BNE snake_loop
    RTS
```

The `check_collisions` routine determines whether the Snake **collides with an apple or itself**:

### Apple Collision

Compares `PLAYER_HEAD` with `APPLE_POSITION`. If they match, the Snake grows by increasing `PLAYER_LENGTH`, and a new apple is **placed**.

### Self-Collision

If the Snake’s length is **5 or more**, the subroutine proceeds to **check each body segment** for a collision with the Snake's **head**,
iterating through the Snake’s body to **detect overlap** with its head and triggers the `game_over` routine if a **collision is detected**.  
The collision check **starts** with the **4th element** of the Snake because, at the time of the check, the body hasn’t yet been updated to follow the head's new position.  
This means the Snake’s head is actually **one step ahead of the body** in the current frame, so when comparing the head to the 4th element,
it’s effectively checking for a collision with **what will be the 5th body segment** once the Snake moves.
This ensures **accurate detection** despite the sequential update process.

## Efficient Rendering: Drawing the Snake

```text
draw:
    LDA BACKGROUND_COLOR
    STA VIDEO_OUT, Y
    JSR draw_apple
    JSR draw_snake
    RTS
draw_apple:
    LDA DIRECTION
    CMP #0
    BEQ draw_snake
    LDA APPLE_COLOR
    LDY APPLE_POSITION
    STA VIDEO_OUT, Y
    RTS
draw_snake:
    LDA PLAYER_COLOR
    LDY PLAYER_HEAD
    STA VIDEO_OUT, Y
    RTS
```

**Rendering** on **limited hardware** involves directly writing to **memory-mapped video output**.  
The `draw` subroutine in this Snake implementation is optimized by **updating only** the Snake’s **head** and the **last body segment**,
rather than refreshing the entire screen. The position of the last body segment is **stored** in the `Y` register as a side effect of the movement update,
allowing it to be **quickly** set to the background color and **erased from the screen**. This **eliminates** the need to **redraw** the entire Snake body.

Once the old segment is cleared, the **head is updated** using the position stored in `PLAYER_HEAD`.
By only modifying the head and the last segment, this approach **minimizes CPU usage**, making the game more efficient and responsive on the limited 6502 hardware.
This method ensures **smooth performance** without unnecessary screen updates.

## Optimizing Movement with Bitwise Operations

The `do_movement` subroutine determines the Snake’s movement direction based on the `DIRECTION` variable, calling the corresponding movement subroutine:

```text
.define K_UP #$01
.define K_DOWN #$02
.define K_LEFT #$04
.define K_RIGHT #$08
...
do_movement:
    LDA DIRECTION
    AND K_UP
    BNE move_up
    LDA DIRECTION
    AND K_DOWN
    BNE move_down
    LDA DIRECTION
    AND K_LEFT
    BNE move_left
    LDA DIRECTION
    AND K_RIGHT
    BNE move_right
    RTS
```

This subroutine efficiently checks the current direction using **bitwise `AND`** operations against predefined constants (`K_DOWN`, `K_RIGHT`, etc.).
When a **match is found**, it **branches** to the corresponding movement subroutine.

Movement subroutines (e.g., `move_up`, `move_down`) adjust the Snake's position **efficiently**.

### move_down Subroutine

```text
move_down:
    CLC
    LDA PLAYER_HEAD
    CMP #$F0          
    BPL collision_wall
    CLC                 
    LDA PLAYER_HEAD
    ADC MOVE_VERTICAL  
    STA PLAYER_HEAD    
    RTS
```

The `move_down` subroutine updates the position of the Snake’s head by adding a vertical step (`MOVE_VERTICAL`).
First, it checks **if the head is near the bottom** of the screen using `CMP #$F0`. If the head is **near** the boundary,
it prevents the movement and **triggers the collision** handling by **jumping** to the `collision_wall` label. Otherwise,
it **clears** the carry flag with `CLC`, **adds** the vertical step to `PLAYER_HEAD` using `ADC`, and **stores** the new position back in `PLAYER_HEAD`.  
This results in the head moving down one row on the screen.

### move_right Subroutine

```text
move_right:
    LDA PLAYER_HEAD
    LDX #0
    right_loop:
        CPX #4
        BEQ collision_wall
        CLC
        ROR A
        INX
        BCS right_loop
    ; increase by 0x0001
    LDA PLAYER_HEAD
    ADC MOVE_HORIZONTAL
    STA PLAYER_HEAD
    RTS
```

In the `move_right` subroutine, the collision detection checks if the Snake’s head has **reached the right edge** by examining the **first four bits** of the head's position.  
The loop **shifts** the accumulator’s bits to the right using `ROR`, and each time a bit is shifted, it **checks the carry flag**.  
If the carry is **not set** with one of the `ROR` operations it means that the head is **not at the edge**,
and the subroutine **safely moves** the Snake right by adding **0x01** to its position.  
On the other hand, if the carry **is set**, it means the **shifted bit** was **1**, indicating the head **_might_ be near** the right border.
If the loop shifts **all four bits**, the `X` register reaches **4**, confirming that the Snake i**s at the boundary**.

# Lessons Learned

Developing this naive implementation of Snake for the **MOS 6502** underscored the **ingenuity** needed to write **efficient assembly code** on hardware with **limited resources**.
The **8-bit** architecture, **minimal** registers, and **small** addressable memory space required every instruction to be **carefully** planned for speed and efficiency.

**Memory optimization** was key, from using **zero-page** addressing for **faster** operations to ensuring **stack stability**.  
Tasks like collision detection and rendering the Snake relied on **clever approaches** — such as updating only the head and erasing the tail — to **minimize computation**.
Even seemingly simple logic, like checking if four bits are all set, demanded **deliberate and efficient implementation**.

This project showcased how working within tight hardware constraints pushes you to **deeply understand** the system and craft elegant, resourceful solutions.

# Why I Loved Building This

This project is a **tribute** to the creativity and problem-solving of early programmers who achieved so much with so little.
Writing Snake for the **MOS 6502** has been an **inspiring journey** into the **foundations** of game programming,
and I’m proud to showcase it as a testament to the **ingenuity** that defined an era — and continues to **inspire** today.
