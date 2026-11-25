Some two-qubit states are just "one qubit here, another there". Others cannot be separated in any way: they are **entangled**.

## Product states

A **product state** can be written as $\ket{a}\otimes\ket{b}$. For example,

$$
\frac12\big(\ket{00} + \ket{01} + \ket{10} + \ket{11}\big) = \ket{+}\otimes\ket{+}.
$$

In a product state, measuring one qubit changes nothing in the prediction for the other.

## Entangled states

An **entangled** state is one that is not a product. The classic example is

$$
\ket{\Phi^+} = \frac{1}{\sqrt2}\big(\ket{00} + \ket{11}\big).
$$

Let us prove it. If it were a product, we would have $c_{00} = a_0b_0$, $c_{01} = a_0b_1$, $c_{10} = a_1b_0$ and $c_{11} = a_1b_1$. Since $c_{01} = 0$, either $a_0 = 0$ (and then $c_{00} = 0$), or $b_1 = 0$ (and then $c_{11} = 0$). Both cases are a contradiction.

![Product state and entangled state: grid of amplitudes](/content/computacao-quantica/emaranhamento.en.svg)

## A quick test

For two qubits in a pure state, there is a simple criterion:

$$
\text{product} \iff c_{00}\,c_{11} = c_{01}\,c_{10}.
$$

In the grid of amplitudes, this says that the determinant is zero. The quantity

$$
C = 2\,|c_{00}c_{11} - c_{01}c_{10}|
$$

is the **concurrence**: it is $0$ for product states and $1$ for maximally entangled ones.

What is the concurrence of $\ket{\Phi^+}$?

```exercise:number
id: emaranhamento-bell
answer: 1
tolerance: 0.001
```

And that of $0.6\ket{00} + 0.8\ket{11}$?

```exercise:number
id: emaranhamento-parcial
answer: 0.96
tolerance: 0.001
```

Is the state $\tfrac12\left(\ket{00} - \ket{01} + \ket{10} - \ket{11}\right)$ a `product` or `entangled`?

```exercise:text
id: emaranhamento-teste
answer: product
```

## What entanglement does not do

In the state $\ket{\Phi^+}$, measuring one qubit determines the result of the other, however far away it is. But this **does not transmit a message**: each side, alone, sees only 50/50 random bits. The correlation only appears when both compare their results, and for that they need an ordinary channel.

## In Python

```exercise:python
id: emaranhamento-codigo
input: c00, c01, c10, c11 | float / complex | the 4 amplitudes of the state, normalized | 0.6, 0, 0, 0.8
output: concurrence | float | the concurrence, between 0 and 1 | 0.96
---
def concurrence(c00, c01, c10, c11):
    return 0
---
>>> concurrence(0.6, 0, 0, 0.8)
0.96
---
>>> concurrence(2**-0.5, 0, 0, 2**-0.5)
1
>>> concurrence(0.5, 0.5, 0.5, 0.5)
0
---
>>> concurrence(0.6, 0, 0, 0.8j)
0.96
>>> concurrence(0.5, 0.5, 0.5, -0.5)
1
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 4.
