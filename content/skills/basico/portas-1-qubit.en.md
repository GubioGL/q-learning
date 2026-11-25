Classical gates transform bits; quantum gates transform **states**. With a single bit, the reversible gates are "do nothing" and NOT. With a qubit, there are infinitely many.

## Linearity

A quantum gate is **linear**: it is enough to know what it does to $\ket{0}$ and $\ket{1}$, and the rest follows.

$$
U\big(\alpha\ket{0} + \beta\ket{1}\big) = \alpha\, U\ket{0} + \beta\, U\ket{1}.
$$

It also preserves the sum of the probabilities and is always reversible.

## X, Z and Y

The **X** gate is the quantum NOT: $X\ket{0} = \ket{1}$ and $X\ket{1} = \ket{0}$. In general, it swaps the amplitudes.

The **Z** gate changes the sign of $\ket{1}$: $Z\ket{0} = \ket{0}$ and $Z\ket{1} = -\ket{1}$. It does not change $P(0)$ or $P(1)$, but it swaps $\ket{+}$ and $\ket{-}$.

The **Y** gate combines the two: $Y\ket{0} = i\ket{1}$ and $Y\ket{1} = -i\ket{0}$.

On the Bloch sphere, X, Y and Z are $180^\circ$ rotations around the $x$, $y$ and $z$ axes.

After applying X to $0.6\ket{0} + 0.8\ket{1}$, what is the probability of measuring $0$?

```exercise:number
id: porta1q-x
answer: 0.64
tolerance: 0.001
```

## Hadamard

The **H** gate creates superposition from basic states:

$$
H\ket{0} = \ket{+}, \qquad H\ket{1} = \ket{-}.
$$

![The H gate takes 0 to + and 1 to -, and vice versa](/content/basico/hadamard.svg)

Applying H twice undoes everything. See what happens to the amplitudes:

$$
H\ket{+} = \frac{1}{\sqrt 2}\big(\ket{+} + \ket{-}\big) = \ket{0}.
$$

The two contributions to $\ket{1}$ have opposite signs and cancel out. This is **interference**, and it is what makes quantum algorithms work.

What is the probability of measuring $0$ after applying H twice to $\ket{0}$?

```exercise:number
id: porta1q-hh
answer: 1
```

## A useful identity

Applying H, then Z, then H has the same effect as an X gate:

$$
HZH = X.
$$

Which gate (one letter) is equivalent to applying H, then X, then H?

```exercise:text
id: porta1q-hxh
answer: Z
```

There are also the phase gates: **S** multiplies the amplitude of $\ket{1}$ by $i$, and **T** multiplies it by $e^{i\pi/4}$. Two T gates make an S, and two S gates make a Z.

How many **T** gates in a row are equivalent to a Z gate?

```exercise:number
id: porta1q-t
answer: 4
```

## In Python

Represent a state as a pair `(alpha, beta)` and write the gates `X`, `Z` and `H`.

```exercise:python
id: porta1q-codigo
input: alpha, beta | float / complex | amplitude, a real or complex number | 0.6, 0.8
output: X, Z, H | tuple | pair (alpha, beta) after the gate | (0.8, 0.6)
---
def X(alpha, beta):
    return (alpha, beta)

def Z(alpha, beta):
    return (alpha, beta)

def H(alpha, beta):
    return (alpha, beta)
---
>>> X(0.6, 0.8)
(0.8, 0.6)
---
>>> Z(0.6, 0.8)
(0.6, -0.8)
>>> X(1, 0)
(0, 1)
---
>>> H(1, 0)
(2**-0.5, 2**-0.5)
>>> H(0, 1)
(2**-0.5, -2**-0.5)
>>> H(*Z(*H(0.6, 0.8)))
(0.8, 0.6)
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 2.
