Storing bits is not enough: a computer needs to **transform** bits. That is the job of logic gates, small functions that take bits and return bits.

## The three main gates

- **NOT** flips a bit: $0$ becomes $1$ and $1$ becomes $0$. We write $\overline{A}$.
- **AND** gives $1$ only when both inputs are $1$. We write $AB$.
- **OR** gives $1$ when at least one input is $1$. We write $A+B$ (here "+" is not ordinary addition).

![NOT, AND and OR gates with their inputs and output](/content/basico/portas-logicas.svg)

A **truth table** lists the output for every possible input:

$$
\begin{array}{cc|c|c|c}
A & B & A \text{ AND } B & A \text{ OR } B & A \text{ XOR } B \\ \hline
0 & 0 & 0 & 0 & 0 \\
0 & 1 & 0 & 1 & 1 \\
1 & 0 & 0 & 1 & 1 \\
1 & 1 & 1 & 1 & 0
\end{array}
$$

The last column is the **XOR** gate ("exclusive or", $A \oplus B$): it gives $1$ when the inputs are **different**. It is the sum of two bits without the carry, and it will show up all the time in quantum computing.

How many rows does the truth table of a gate with **3 inputs** have?

```exercise:number
id: portas-linhas
answer: 8
```

## Combining gates

The output of one gate can be the input of another. For example, $\overline{AB}$ is an AND followed by a NOT: the **NAND** gate.

What is $\overline{A B} \oplus B$ when $A = 1$ and $B = 1$?

```exercise:number
id: portas-nand-xor
answer: 1
```

Useful results are **De Morgan's laws**, which swap AND for OR when the NOT goes through the expression:

$$
\overline{AB} = \overline{A} + \overline{B}, \qquad \overline{A + B} = \overline{A}\,\overline{B}.
$$

## Universality

A set of gates is **universal** when, by combining only them, we can build any function of bits. NAND alone is already universal! Connecting both of its inputs to the same bit, we get a NOT:

$$
\text{NAND}(A, A) = \overline{A A} = \overline{A}.
$$

Write the functions `NOT`, `AND` and `OR` using **only** `nand`.

```exercise:python
id: portas-nand-universal
input: a, b | int | each one is 0 or 1 (NOT takes only a) | 1
output: NOT, AND, OR | int | 0 or 1 | 1
---
def nand(a, b):
    return 1 - a * b

def NOT(a):
    return 0  # use nand

def AND(a, b):
    return 0  # use nand

def OR(a, b):
    return 0  # hint: De Morgan
---
>>> AND(1, 1)
1
---
>>> [NOT(0), NOT(1)]
[1, 0]
>>> [AND(0, 0), AND(0, 1), AND(1, 0)]
[0, 0, 0]
---
>>> [OR(0, 0), OR(0, 1), OR(1, 0), OR(1, 1)]
[0, 1, 1, 1]
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 1.
