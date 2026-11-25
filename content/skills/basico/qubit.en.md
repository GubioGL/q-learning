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

A state is a **vector**, so we use NumPy's `array`: `np.array([3, 4j])`, where `4j` is $4i$. Operations apply to every component at once: `state / 2`, `np.abs(state)`, `np.sum(state)`. Write a function that takes a nonzero vector and returns the normalized state.

```exercise:python
id: qubit-normalizar
input: state | np.ndarray | nonzero vector with 2 real or complex amplitudes, shape (2,) | np.array([3, 4])
output: normalize | np.ndarray | normalized vector with the 2 amplitudes [alpha, beta], shape (2,) | np.array([0.6, 0.8])
---
import numpy as np

def normalize(state):
    # divide the vector by its norm
    return state
---
>>> normalize(np.array([3, 4]))
np.array([0.6, 0.8])
---
>>> normalize(np.array([0, 5]))
np.array([0, 1])
>>> normalize(np.array([1, 1]))
np.array([2**-0.5, 2**-0.5])
---
>>> normalize(np.array([1, 1j]))
np.array([2**-0.5, 1j * 2**-0.5])
>>> normalize(np.array([3j, -4]))
np.array([0.6j, -0.8])
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 2.
