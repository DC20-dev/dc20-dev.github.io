---
layout: projects

title: Brainf**k Interpreter
description: When hell is not enough
link: https://github.com/daxpress/brainfuck_in_python

image: "/assets/images/Brainfuck/snippet.png"
preview: "/assets/images/Brainfuck/snippet.png"
preview-icons: <iconify-icon icon="devicon-plain:python"></iconify-icon> <iconify-icon icon="file-icons:brainfuck"></iconify-icon> 

# https://material-foundation.github.io/material-theme-builder/ for the palette, just pass the relevant img!
primary: "#ffb4a6"
secondary: "#fae0a6"
tertiary: "#e7bdb5"

youtubeId: hdHjjBS4cs8
---

{% include colorizer.html primary=page.primary secondary=page.secondary tertiary=page.tertiary %}

{% if page.link != null %}
{% include github-section.html url=page.link title=page.title preview=page.preview %}
{% endif %}

# Know Brainfuck

If you don't know what **Brainfuck** is, whatch this quick video from
<a href="https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA" target="_blank">*Fireship*</a> to have an idea first 😉

{% include youtubePlayer.html id=page.youtubeId %}

# About The Project

At its heart is the `BrainfuckMachine` class, a simple yet powerful virtual machine
capable of executing Brainfuck's eight (minus one) commands.
This project provided a great opportunity to combine **clean** code design,
**careful** control flow management, and **robust** error handling into one cohesive package.

# BrainfuckMachine

The `BrainfuckMachine` class is designed to simulate the **tape-based** execution model of the Brainfuck language.
It is initialized with a tape of a specified length (acting as the program's **memory**)
and features an **internal pointer** (head) that can move left and right **across the tape**.

Here’s a look at its **initialization**:

```py
class BrainfuckMachine:
    def __init__(self, len):
        self.tape = [0] * len  # Memory tape initialized to zeros
        self.head = 0  # Pointer to the current cell on the tape
        self._current_instruction_pos = 0  # Tracks position in the code
        self.code = ""  # Stores the Brainfuck program to execute
        self._instructions = {
            "+": self._add,
            "-": self._subtract,
            "<": self._reduce_head_index,
            ">": self._increment_head_index,
            "[": self._open_bracket,
            "]": self._close_bracket,
            ".": self._print_current,
        }
        self._loop_starts = []  # Stack to track loop start positions
```

The class includes a **dictionary**, `_instructions`, that **maps each Brainfuck command
to its corresponding method**.
This approach keeps the main loop clean and separates concerns effectively.

# Handling Brainfuck Commands

Each Brainfuck **command** corresponds to a specific **operation** on the tape
or the control flow of the program. For example, the `+` command **increments**
the value at the **current tape cell**, and `-` **decrements** it.

These operations are implemented as methods:

```py
def _add(self):
    self.tape[self.head] = (self.tape[self.head] + 1) % 256
    # Simulates 8-bit overflow

def _subtract(self):
    self.tape[self.head] = (self.tape[self.head] - 1) % 256
```

Pointer movement commands (`<` and `>`) **adjust the head** variable,
ensuring that it stays **within the bounds** of the tape.
If the pointer goes **out of range**, custom exceptions like
`HeadOverflow` are raised to alert the user.

{% include important.html %}
> The `,` command isn’t implemented yet, as I chose to **focus** on the **similarities**
> between Brainfuck and **Punched Tape codes**.
> This allowed me to prioritize the interpreter’s **core mechanics**.

# Managing Loops

One of the most **challenging** aspects of implementing a Brainfuck interpreter is handling **loops**,
which are denoted by `[` and `]`. In Brainfuck, a loop **begins** at `[` and **ends** at `]`,
repeating **until** the value at the current tape cell **becomes zero**.
This behavior is managed using a **stack**, `_loop_starts`.

When the interpreter encounters an opening bracket (`[`),
it **pushes** the current instruction's **position** onto the stack:

```py
def _open_bracket(self):
    self._loop_starts.append(self._current_instruction_pos)
    if self.tape[self.head] == 0:
        self._skip_loop()
```

If the current cell's value is **zero**, the `_skip_loop` method **skips all instructions**
until the **matching** closing bracket (`]`) is found.
This ensures the loop is **skipped efficiently** without unnecessary execution.

Closing brackets (`]`) work in tandem with the stack.
If the value at the current tape cell is **nonzero**,
the interpreter **jumps back** to the instruction **at the top** of the stack (the corresponding opening bracket).
If the value is **zero**, the interpreter **pops the stack** and continues:

```py
def _close_bracket(self):
    if self.tape[self.head] == 0:
        self._loop_starts.pop()
    else:
        self._current_instruction_pos = self._loop_starts[-1]
```

Using a stack **ensures that nested loops are handled correctly**,
as each loop operates independently of others.

# Running the Program

The main execution loop, implemented in the `run()` method,
iterates over the code string, executing instructions **one at a time**.
Invalid commands raise a `CommandNotFound` exception:

```py
def run(self):
    while self._current_instruction_pos < len(self.code):
        self._current_instruction = self.code[self._current_instruction_pos]
        if self._current_instruction in self._instructions:
            self._instructions[self._current_instruction]()
            self._current_instruction_pos += 1
        else:
            raise self.CommandNotFound(
                f"{self._current_instruction} is not valid.")
```

# Testing

To ensure the interpreter functions **as expected**,
I created a suite of **tests** using **Python**'s `unittest` module.
These tests cover basic **operations**, **pointer movements**, and **nested loops**.

Here's an example of a test case:

```py
import unittest

class LessonTest(unittest.TestCase):
    def setUp(self):
        self.vm = BrainfuckMachine(64)

    def test_plus(self):
        self.vm.code = '++'
        self.vm.run()
        self.assertEqual(self.vm.tape[0], 2)
    ...
```

The use of `unittest` made it **easy** to **identify and resolve** edge cases,
like unmatched brackets or pointer overflows, during development.

# Future Development

The `BrainfuckMachine` class could be **enhanced** in several ways:

### Input Support

**Adding** the `,` command to accept **user input** would
make the interpreter **fully Brainfuck-compliant**.
This could be implemented with Python’s `input()` function for simplicity.

### Runnable Script

**Transforming** the interpreter into a **standalone script** with a **CLI**
using `argparse` would make it more **accessible**, allowing users to pass code or file inputs easily.

### Optimizations

**Substituting** the tape with a **bytearray** for efficiency or adding **dynamic tape resizing**
could **improve** performance and flexibility, even within Python's constraints.

These **improvements** could **elevate** the interpreter from a simple learning project
to a **fully-featured tool** for Brainfuck enthusiasts.

# Challenges and Takeaways

Creating this Brainfuck interpreter was both **challenging and rewarding**.
It pushed me to **think critically** about control flow and stack management,
especially when handling nested loops.  

**Choosing** to implement separate methods for each command,
even those with similar functionality, was a **deliberate decision**
to prioritize **clarity and modularity**, making the code easier to understand and extend.

By leveraging Python's features, I developed a reliable interpreter that adheres
to Brainfuck's quirks while providing **meaningful error messages** for debugging.
This project is a **valuable** addition to my portfolio,
**showcasing my ability to handle complex challenges with simple yet effective solutions**.
