---
layout: projects

title: Chip8 Emulator
description: now that's a calculator!
link: https://github.com/daxpress/Chip8Emulator

image: "/assets/images/Chip8/Chip8.gif"
preview: "/assets/images/Chip8/Chip8.gif"
preview-icons: <iconify-icon icon="devicon-plain:cplusplus"></iconify-icon> <iconify-icon icon="devicon-plain:sdl"></iconify-icon> <iconify-icon icon="devicon-plain:cmake"></iconify-icon> <iconify-icon icon="file-icons:conan"></iconify-icon> <iconify-icon icon="devicon-plain:githubactions"></iconify-icon>

# https://material-foundation.github.io/material-theme-builder/ for the palette, just pass the relevant img!
primary: "#ffb0cc"
secondary: "#6f334c"
tertiary: "#e6d6d9"
---

{% include colorizer.html primary=page.primary secondary=page.secondary tertiary=page.tertiary %}

{% if page.link != null %}
{% include github-section.html url=page.link title=page.title preview=page.preview %}
{% endif %}

# A Modular Approach to Chip8 Emulation

Creating the **Chip8 Emulator** was an engaging challenge that
tested my ability to balance functionality, modularity, and simplicity.
Through this project, I explored **alternative implementation** strategies
and focused on creating a **modular design** to enhance both flexibility and testability.

## Key Features

The Chip8 Emulator brings together several thoughtfully designed features
that make it both enjoyable and educational to use:

#### Cross-platform Compatibility

By leveraging **modern C++** standards alongside tools like `CMake` and `Conan`,
the project is easily **portable** to various platforms.
This ensures that developers can build and run the emulator
on **their preferred systems** without additional hassle.

#### Flexible and Scalable Rendering

The graphical output is managed using the `SDL2` library,
a widely respected toolkit for cross-platform development.
`SDL2` provides the emulator with **efficient rendering** capabilities,
ensuring a smooth and accurate visual representation of Chip8 programs.

#### Intuitive Key Bindings

The keyboard is mapped to emulate the **original** Chip8 keypad,
creating a natural and **user-friendly experience**.
Players can easily adapt to the layout, making the emulator approachable
for both newcomers and experienced users.

#### Testing for Stability

**Unit tests**, implemented using the
<a href="https://github.com/fdefelici/clove-unit" target="_blank">**CLove-Unit**</a> library,
verify the functionality of key components.
Although the test suite does not yet cover all cases, the existing tests
**provide confidence** in the emulator’s stability.
**Continuous integration** workflows ensure that every change to the codebase
is validated through **automated builds and tests**.

## Modularity Through Abstraction

One of the core design principles I adhered to was **modularity**.
By splitting the emulator’s implementation into well-defined **interfaces** and **abstract classes**,
I achieved a clean separation of concerns.
This approach allowed me to isolate components like memory management,
display rendering, and input handling, making the codebase **easier to understand and extend**.

A prime example is the `EmuRenderer` class, which abstracts the **rendering** logic.
By providing a common API for rendering operations, such as clearing the screen or drawing sprites,
this interface enables the emulator to **work with any rendering backend**.

Here’s the core implementation:

```cpp
#pragma once

#include <cstdint>

namespace chipotto
{
    class CHIP8_API EmuRenderer
    {
    public:
        EmuRenderer(const int in_width, const int in_height) 
            : width(in_width), height(in_height)
        {};

        virtual void ClearScreen() = 0;

        virtual int Draw(uint8_t const x_coord, const uint8_t y_coord,
            const uint8_t* raw_sprite_mono, const uint8_t sprite_height,
            bool do_wrap, bool& out_collision) = 0;

        virtual bool IsValid() = 0;

        virtual ~EmuRenderer() {};

    protected:
        int width;
        int height;
    };
}
```

This interface allows the rendering logic to be implemented with any graphics API.
For instance, I developed a version of this emulator as
<a href="https://github.com/daxpress/Chip8-Plugin" target="_blank">**a plugin for Unreal Engine 5**</a>,
leveraging Unreal’s textures and materials to render the display on a 3D plane.
This demonstrates the power and **flexibility** of designing with interfaces,
enabling **seamless adaptation to different environments**.

# Avoiding a State Machine

A **distinctive** choice in my implementation was to **forego** the use
of a traditional **state machine** for handling Chip8 operations.
State machines are often used in emulators to manage execution states and implement opcode behaviour,
but I opted for a more direct approach: **opcode translation**.

In this method, each opcode is **directly mapped** to a corresponding handler **function**.
When the emulator fetches an instruction, it decodes the opcode and invokes the appropriate handler.
This approach **eliminates the overhead** of maintaining multiple execution states
and **simplifies** the flow of instruction processing.

While this design introduces its own **challenges**, such as ensuring comprehensive opcode coverage,
it leads to a **cleaner and more direct** execution model.  
By focusing on opcode translation, I streamlined the implementation and reduced
the cognitive load when debugging or extending the emulator.

# A Detailed Analysis of Opcode Management

The execution of Chip8 opcodes involves **decoding** instructions from memory,
**invoking** their respective implementations, and **handling** their effects on the emulator's internal state.
This section focuses on the **opcode selection** and **execution flow**, highlighting how instructions
are decoded, mapped, and executed using a **function lookup table**.

## Opcode Selection and Execution Logic

The opcode execution begins by reading **two bytes** from memory at the **current program counter** (`PC`).
These bytes represent the opcode, which is a **16-bit** instruction in the Chip8 architecture.

Here's how the opcode is selected and processed:

```cpp
uint16_t opcode = MemoryMapping[PC + 1] +
    (static_cast<uint16_t>(MemoryMapping[PC]) << 8);

#ifdef DEBUG_BUILD
std::cout << std::hex << "0x" << PC << ": 0x" << opcode << "  -->  ";
#endif

OpcodeStatus status = Opcodes[opcode >> 12](opcode);
#ifdef DEBUG_BUILD
std::cout << std::endl;
#endif
if (status == OpcodeStatus::IncrementPC)
{
    PC += 2;
}
return status != OpcodeStatus::NotImplemented &&
    status != OpcodeStatus::StackOverflow &&
    status != OpcodeStatus::Error;
```

## Explanation of the Logic

#### Fetching the Opcode

The Chip8 opcode is formed by **combining** two bytes from memory.
`MemoryMapping[PC]` provides the **first** byte, while `MemoryMapping[PC + 1]` provides the **second** byte.
The opcode is constructed using **bitwise shifting**:

```cpp
uint16_t opcode = MemoryMapping[PC + 1] +
    (static_cast<uint16_t>(MemoryMapping[PC]) << 8);
```

This combines the **two bytes** into a **single 16-bit** instruction.

#### Debugging Output

If `DEBUG_BUILD` is defined, the program prints the current program counter and the decoded opcode for **debugging** purposes:

```cpp
std::cout << std::hex << "0x" << PC << ": 0x" << opcode << "  -->  ";
```

This allows developers to **trace** execution step-by-step and **monitor** which opcode is being executed.

{% include tip.html %}
> `DEBUG_BUILD` is a **custom macro** defined by the `CMake` file whenever it detects a `Debug` configuration,
> allowing to easily debug and **automatically** remove all debug prints when using a `Release` configuration.
> ```cmake
> target_compile_definitions(Chip8Emulator PRIVATE
>   $<$<CONFIG:Debug>:DEBUG_BUILD>)
> ```

#### Opcode Dispatch Mechanism

The opcode is **dispatched** using a lookup table (`Opcodes`) indexed by the **upper 4 bits** of the opcode:

```cpp
OpcodeStatus status = Opcodes[opcode >> 12](opcode);
```

`opcode >> 12` extracts the first 4 bits of the opcode, effectively mapping
the opcode to its **corresponding handler function** in the `Opcodes` table.
This table-based dispatch mechanism ensures efficient and clean execution of various opcodes.

The **result** of invoking an opcode's handler is **stored** in an enum called `OpcodeStatus`.  
This enum indicates whether the instruction:

* **Increments** the program counter.
* Results in a **stack overflow** or **error**.
* Is **successfully** executed.

If the handler returns `OpcodeStatus::IncrementPC`, the program counter is **incremented by 2**,
as each Chip8 instruction is **2 bytes long**:

```cpp
if (status == OpcodeStatus::IncrementPC)
{
    PC += 2;
}
```

# OpCode Analysis and Samples

The provided opcode functions **showcase *some*** of the operations that Chip8 opcodes can perform.
These functions represent the implementation for various instructions, including
screen clearing and subroutine calls.

## How Opcodes are Dispatched

The opcode dispatcher categorizes instructions into **groups**.
Group `0x0` is a prime example of this system.
Instructions like `CLS` (clear the screen) and `RET` (return from a subroutine) belong to this group.

The macro dispatcher for Group 0 looks like this:

```cpp
OpcodeStatus EmulatorImpl::Opcode0(const uint16_t opcode)
{
    switch (opcode & 0xFF) // Mask the last 8 bits
    {
    case 0xE0:
        return CLS();
    case 0xEE:
        return RET();
    default:
        return OpcodeStatus::NotImplemented; // Handle unsupported opcodes
    }
}
```

Here:

* `opcode & 0xFF` **isolates** the last **8 bits** of the opcode.  
* `0xE0` maps to `CLS` (clear the screen).  
* `0xEE` maps to `RET` (return from subroutine).  
* Any **unsupported** instructions return `OpcodeStatus::NotImplemented`.

This dispatcher feeds into the main lookup system for execution,
based on the **top 4 bits** of the opcode.
It allows opcode handlers to **modularly define** the behavior of their corresponding instructions.

## Instruction Samples

#### CLS - Clear the Screen

The `CLS` function **clears** the emulator's
**display**. <iconify-icon icon="icon-park-solid:clear-format" style="font-size: x-large"></iconify-icon>

```cpp
OpcodeStatus EmulatorImpl::CLS()
{
#ifdef DEBUG_BUILD
    std::cout << "CLS";
#endif
    renderer->ClearScreen();
    return OpcodeStatus::IncrementPC;
}
```

* **Clears** the visual display buffer using the renderer.
* **Moves** the program counter to the next instruction by returning `OpcodeStatus::IncrementPC`.

#### RET - Return from Subroutine

The `RET` function **pops** the address off the stack
and sets the program counter to it. <iconify-icon icon="streamline:return-2-solid" style="font-size: x-large"></iconify-icon>

```cpp
OpcodeStatus EmulatorImpl::RET()
{
    if (SP > 0xF && SP < 0xFF)
        return OpcodeStatus::StackOverflow;
#ifdef DEBUG_BUILD
    std::cout << "RET";
#endif
    PC = Stack[SP & 0xF];
    SP -= 1;
    return OpcodeStatus::IncrementPC;
}
```

* Checks if the stack pointer (`SP`) is in an **invalid range**, signaling a potential **stack overflow**.
* **Retrieves** the return address from the stack (`Stack[SP & 0xF]`) and sets it to `PC`.
* **Moves** the program counter to the **address popped** off the stack.
* **Decrements** the stack pointer by **1** after returning from the subroutine.

#### JP - Jump to Address

The `JP` function allows the program counter to **jump**
to a specified memory address. <iconify-icon icon="qlementine-icons:jump-over-16" style="font-size: x-large"></iconify-icon>

```cpp
OpcodeStatus EmulatorImpl::JP(uint16_t address)
{
#ifdef DEBUG_BUILD
    std::cout << "JP 0x" << address;
#endif
    PC = address;
    return OpcodeStatus::NotIncrementPC;
}
```

* **Sets** the program counter to the provided address (`address`) directly.
* **Prevents** automatic increment of PC by returning `OpcodeStatus::NotIncrementPC`.

#### CALL - Call Subroutine

The `CALL` instruction **pushes** the current program counter onto the stack
and **jumps** to the specified address. <iconify-icon icon="fluent:call-12-filled" style="font-size: x-large"></iconify-icon>

```cpp
OpcodeStatus EmulatorImpl::CALL(uint16_t address)
{
#ifdef DEBUG_BUILD
    std::cout << "CALL 0x" << (int)address;
#endif
    if (SP > 0xF)
    {
        SP = 0;
    }
    else
    {
        if (SP < 0xF)
        {
            SP += 1;
        }
        else
        {
            return OpcodeStatus::StackOverflow;
        }
    }
    Stack[SP] = PC;
    PC = address;
    return OpcodeStatus::NotIncrementPC;
}
```

* **Increments** the stack pointer (`SP`) to make room for a **new return address**.
* **Handles stack overflow** by checking if `SP` is beyond its valid range.
* **Saves** the current program counter onto the stack **at index** `SP`.
* Sets `PC` to the **target subroutine address**.

# Ensuring Reliability and Flexibility

**Testing** is a **critical** aspect of developing reliable and maintainable systems.
For this project, we have utilized
<a href="https://github.com/fdefelici/clove-unit" target="_blank">**CLove-Unit**</a>,
a lightweight **unit testing framework** in **C/C++**.
The combination of `CLove-Unit` with **interface-based** design patterns has allowed for **efficient testing**
by introducing **mock** implementations, thereby **isolating** dependencies
and ensuring the system's components **can be verified independently**.

## Mocks

#### Mocking Keyboard Input

The `MockKeyboardStateInputCommand` class **simulates** keyboard input **without** requiring actual `SDL` key events:

```cpp
class MockKeyboardStateInputCommand : public chipotto::IInputCommand
{
public:
    virtual const uint8_t* GetKeyboardState() override { return nullptr; };

    virtual bool IsInputPending() override { return false; };

    virtual chipotto::EmuKey GetKey() override 
        { return chipotto::EmuKey::K_NONE; };

    virtual bool IsKeyPressed(const chipotto::EmuKey key) override
        { return FakeIsKeyPressed; };

    virtual chipotto::InputType GetInputEventType() override 
        { return chipotto::InputType::NONE; };
    
    bool FakeIsKeyPressed = false; // Allows controlled testing of key states.
};
```

This **mock** allows tests to simulate scenarios with or without key inputs **by setting** `FakeIsKeyPressed`.

#### Mocking Random Generator

The `MockRandomGenerator` simulates random number generation without depending on real randomness:

```cpp
class MockRandomGenerator : public chipotto::IRandomGenerator
{
public:
    virtual uint8_t GetRandomByte() override { return 0xFF; } 
    // Always return 0xFF for predictable testing.
};
```

By **controlling** the random byte value to always return a **constant**,
the emulator’s behavior can be **precisely validated** without relying on true randomness.

## Writing Tests

The provided tests **demonstrate** the **flexibility** and **power** of `CLove-Unit` combined with mock classes.
This ensures that state transitions, opcode effects,
and memory manipulations can be **rigorously validated** under **controlled** and **repeatable** conditions.

### Testing the CLS Opcode

The `CLS` opcode is tested by **inspecting changes in pixel memory**:

```cpp
CLOVE_TEST(CLS)
{
    SDL_Texture* texture = renderer->GetTexture();
    int height = emulator->GetHeight();
    int pitch;
    uint8_t* pixels = nullptr;

    // Lock the SDL texture and verify it's writable
    if(SDL_LockTexture(
        texture, nullptr, reinterpret_cast<void**>(&pixels), &pitch) != 0)
    {
        CLOVE_FAIL();
    }

    memset(pixels, 0xFF, pitch * height); // Simulate a non-clean screen.
    SDL_UnlockTexture(texture);

    auto* pixels_zeros = new uint8_t[pitch * height];
    memset(pixels_zeros, 0, pitch * height);

    // Execute CLS
    emulator->Opcode0(0x00E0);

    if(SDL_LockTexture(
        texture, nullptr, reinterpret_cast<void**>(&pixels), &pitch) != 0)
    {
        CLOVE_FAIL();
    }

    if(memcmp(pixels, pixels_zeros, pitch * height) == 0)
    {
        CLOVE_PASS();
    }
    else {
        CLOVE_FAIL();
    }
    SDL_UnlockTexture(texture);
    delete[] pixels_zeros;
}
```

Here:

* The render texture is **acquired**, along with other paramters needed for rendering.
* The texture is set using `memset` to `0xFF` across all pixels to simulate **non empty memory**.
* A **zeroed out** comparison buffer is prepared to easily check for correctness.
* The `CLS` OpCode is **executed**.
* The **texture** memory region is efficiently **compared** to the expected comparison **buffer content**.

# Reflection and Future Plans

This project provided a valuable opportunity to deepen my understanding of **C++ development workflows**,
especially with tools like `CMake` and `Conan`.
The decision to focus on **modularity** and **avoid** a state machine highlighted
the **importance** of exploring **alternative approaches** to common problems.

Looking ahead, I aim to further **improve** the emulator by:

* Improving code **readability** and **performance**.
* Adding support for **loading** custom ROMs, **broadening** the scope of playable programs.
* **Expanding** the test suite to **cover more edge cases** and improve overall reliability.
* Refining the **user interface** and controls to enhance usability.

{% include note.html %}
> The Emulator interface **does *not*** require any `STL` features: this is to allow **maximum compatibility**.
> Specifically I had `Unreal Engine` in mind, as it is ***not* allowed** to use `STL` features there
> and I wanted to write a **plugin** **importing** and **adapting** this emulator
> (<a href="https://github.com/daxpress/Chip8-Plugin" target="_blank">**You can find it here**</a>).

# Thoughts on the Process

The journey of building a **Chip8 Emulator** has been as much about **problem-solving** as it has been about **learning and growth**.
Diving into the intricacies of historical computing while leveraging modern programming tools
challenged me to **think creatively** and **adapt my approach**.  
This project taught me the importance of **modular design** and **thoughtful abstraction**, shaping how I approach development.
Reflecting on the process, I find a deeper appreciation for the balance between
**preserving legacy systems** and **innovating** with **contemporary techniques**.
