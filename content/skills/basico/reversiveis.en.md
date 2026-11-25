If the output of an AND is $0$, what were the inputs? There is no way to know: it could be $00$, $01$ or $10$. This loss of information matters, because **every quantum gate is reversible**.

## What reversible means

A gate is **reversible** when the output determines the input: different inputs always lead to different outputs. So it must have the same number of bits in the input and in the output.

- NOT is reversible: just apply NOT again.
- AND, OR and XOR are not: 2 bits go in and only 1 comes out.

How many different inputs of an OR produce the output $1$?

```exercise:number
id: reversiveis-or
answer: 3
```

## CNOT: the reversible XOR

To make XOR reversible, we keep one of the inputs. The **CNOT** (controlled NOT) has a control bit $A$ and a target $B$:

$$
(A, B) \longrightarrow (A,\; A \oplus B).
$$

The target is flipped only if the control is $1$. Applying it twice brings us back to the start, because $A \oplus A \oplus B = B$.

What is the output of the CNOT for the input $A = 1$, $B = 1$? Write both bits together, control first.

```exercise:text
id: reversiveis-cnot
answer: 10
```

## Toffoli: the reversible AND

The **Toffoli gate** has two controls and one target:

$$
(A, B, C) \longrightarrow (A,\; B,\; AB \oplus C).
$$

![Toffoli gate: two controls and one target](/content/basico/toffoli.svg)

With the target at $C = 0$, the third output is exactly $AB$, that is, the AND. With $C = 1$, it is $\overline{AB}$, the NAND. Since NAND is universal, **Toffoli is universal for classical computing**. So everything a classical computer does can be done reversibly, using some extra bits.

There are $n!$ ways to shuffle $n$ items, and a reversible gate is just a shuffle of the inputs. How many different reversible gates on **2 bits** are there? (There are $2^2 = 4$ inputs to shuffle.)

```exercise:number
id: reversiveis-contagem
answer: 24
```

## In Python

Write the Toffoli and use it to build the AND.

```exercise:python
id: reversiveis-toffoli
---
def toffoli(a, b, c):
    return (a, b, c)  # fix the third output

def AND(a, b):
    return 0  # use toffoli
---
assert toffoli(1, 1, 0) == (1, 1, 1)
assert toffoli(1, 1, 1) == (1, 1, 0)
assert toffoli(1, 0, 1) == (1, 0, 1)
assert [AND(a, b) for a in (0, 1) for b in (0, 1)] == [0, 0, 0, 1]
assert all(toffoli(*toffoli(a, b, c)) == (a, b, c) for a in (0, 1) for b in (0, 1) for c in (0, 1))
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 1.
