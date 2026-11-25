So far we have used kets as symbols. Now we give them a concrete form: **vectors**. With that, all of quantum computing becomes calculations with lists of complex numbers.

## Kets are column vectors

We choose

$$
\ket{0} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \qquad \ket{1} = \begin{pmatrix} 0 \\ 1 \end{pmatrix},
$$

and then the general state is

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1} = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}.
$$

![The vectors 0, 1 and + in the plane](/content/algebra-linear/vetores.svg)

Adding vectors and multiplying by a number is done component by component.

What is the first component of $2\ket{0} + 3\left(\ket{0} - \ket{1}\right)$?

```exercise:number
id: vetores-soma
answer: 5
```

## Complex conjugate

The conjugate of $z = a + bi$ is $z^* = a - bi$. Two properties we will always use:

$$
z^* z = a^2 + b^2 = |z|^2, \qquad (e^{i\theta})^* = e^{-i\theta}.
$$

What is $(3 + 4i)^*(3 + 4i)$?

```exercise:number
id: vetores-conjugado
answer: 25
```

## Bras are row vectors

For each ket there is a **bra**: we transpose the column into a row and conjugate each component.

$$
\ket{\psi} = \begin{pmatrix} \alpha \\ \beta \end{pmatrix} \quad\Longrightarrow\quad \bra{\psi} = \begin{pmatrix} \alpha^* & \beta^* \end{pmatrix}.
$$

This operation (transpose and conjugate) is the **conjugate transpose**, written with a dagger: $\bra{\psi} = \ket{\psi}^\dagger$.

If $\ket{\psi} = \begin{pmatrix} 0.6 \\ 0.8i \end{pmatrix}$, what is the second component of $\bra{\psi}$? Write it as `0.8i` or `-0.8i`.

```exercise:text
id: vetores-bra
answer: -0.8i | -0,8i | -0.8 i | -0,8 i
```

## In Python

Write `bra`, which takes a ket (a NumPy vector) and returns the vector with the conjugated components. Arrays have the method `.conj()`, which ordinary Python lists do not have.

```exercise:python
id: vetores-bra-codigo
input: ket | np.ndarray | vector of real or complex numbers, shape (n,) | np.array([0.6, 0.8j])
output: bra | np.ndarray | vector of the same shape, with the conjugates | np.array([0.6, -0.8j])
---
import numpy as np

def bra(ket):
    return ket
---
>>> bra(np.array([0.6, 0.8j]))
np.array([0.6, -0.8j])
---
>>> bra(np.array([1 + 2j, 3 - 1j]))
np.array([1 - 2j, 3 + 1j])
>>> bra(np.array([1, 0]))
np.array([1, 0])
---
>>> bra(bra(np.array([1j, 2])))
np.array([1j, 2])
>>> bra(np.array([1j, -1j, 0, 5]))
np.array([-1j, 1j, 0, 5])
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 3.
