A bit is $0$ **or** $1$. A qubit also has these two states, but it can be in a **combination** of them. This is the first truly new idea of quantum computing.

## The states $\ket{0}$ and $\ket{1}$

We write the states of a qubit with the symbol $\ket{\cdot}$, called a **ket**. The two basic states are $\ket{0}$ and $\ket{1}$, which play the role of the bits $0$ and $1$. Physically they can be two energy levels of an atom, two polarizations of a photon or two currents in a superconducting circuit.

## Superposition

The general state of a qubit is

$$
\ket{\psi} = \alpha \ket{0} + \beta \ket{1},
$$

where $\alpha$ and $\beta$ are complex numbers called **amplitudes**. When both are nonzero, we say the qubit is in **superposition**.

The amplitudes are not free: the state must be **normalized**,

$$
|\alpha|^2 + |\beta|^2 = 1.
$$

![Amplitudes 0.6 and 0.8 and their squares 0.36 and 0.64](/content/basico/amplitudes.en.svg)

The reason appears in the next skill: $|\alpha|^2$ and $|\beta|^2$ are probabilities.

If $\alpha = 0.6$ and $\beta$ is real and positive, what is $\beta$?

```exercise:number
id: qubit-beta
answer: 0.8
tolerance: 0.001
```

## Two famous states

The most used superpositions have their own names:

$$
\ket{+} = \frac{1}{\sqrt 2}\big(\ket{0} + \ket{1}\big), \qquad \ket{-} = \frac{1}{\sqrt 2}\big(\ket{0} - \ket{1}\big).
$$

The minus sign looks like a detail, but it is not: $\ket{+}$ and $\ket{-}$ are different states, and quantum gates can tell them apart. This difference between the amplitudes is called **relative phase**.

On the other hand, multiplying the **whole** state by a number of modulus 1 (a **global phase**) changes nothing we can observe: $-\ket{0}$ and $\ket{0}$ are physically the same state.

What is the squared modulus of the complex amplitude $\dfrac{1 + i}{2}$? (Remember: $|a + bi|^2 = a^2 + b^2$.)

```exercise:number
id: qubit-modulo
answer: 0.5
```

## What superposition is not

A qubit in superposition is **not** a classical bit whose value we do not know. A hidden coin is already heads or tails. The amplitudes of a qubit can be negative and **cancel out**, which probabilities never do.

## In Python

Complex numbers already exist in Python: `1j` is $i$, and `abs(z)` is the modulus. Write a function that takes any amplitudes (not both zero) and returns the normalized pair.

```exercise:python
id: qubit-normalizar
---
def normalize(alpha, beta):
    # divide both amplitudes by the norm of the state
    return (alpha, beta)
---
assert abs(normalize(3, 4)[0] - 0.6) < 1e-9
assert abs(normalize(3, 4)[1] - 0.8) < 1e-9
assert abs(sum(abs(x)**2 for x in normalize(1 + 1j, 2)) - 1) < 1e-9
assert abs(normalize(1, 1j)[1] - 1j / 2**0.5) < 1e-9
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 2.
