A whole circuit, no matter how large, is a single unitary matrix. This skill puts the pieces of the course together and draws some consequences.

## A product of unitaries is unitary

If $U$ and $V$ are unitary, so is $VU$, because the conjugate transpose reverses the order:

$$
(VU)^\dagger (VU) = U^\dagger V^\dagger V U = U^\dagger U = I.
$$

So any sequence of gates is a gate, and any circuit without measurements can be **undone**: just apply the inverse gates in the opposite order.

A circuit applies H, then S, then X. Which gate must be applied **first** to undo it? (One letter.)

```exercise:text
id: unitariedade-desfazer
answer: X
```

## What unitaries preserve

Unitaries preserve **all** inner products:

$$
\braket{U\phi|U\psi} = \bra{\phi}U^\dagger U\ket{\psi} = \braket{\phi|\psi}.
$$

A lesson follows: no gate can make two states easier to tell apart than they already were. Orthogonal states stay orthogonal, and similar states stay similar.

If $\braket{\phi|\psi} = 0.3$, what is the inner product after applying H to both states?

```exercise:number
id: unitariedade-preserva
answer: 0.3
```

## Eigenvalues

If $U\ket{v} = \lambda\ket{v}$, we say that $\ket{v}$ is an **eigenvector** and $\lambda$ an **eigenvalue**. Since the norm is preserved, every eigenvalue of a unitary has modulus 1:

$$
\lambda = e^{i\theta}.
$$

For example, $X\ket{+} = \ket{+}$ and $X\ket{-} = -\ket{-}$.

What is the eigenvalue of X associated with $\ket{-}$?

```exercise:number
id: unitariedade-autovalor
answer: -1
```

## Hermitian and unitary

A matrix is **Hermitian** when $A^\dagger = A$. The gates X, Y, Z and H are Hermitian **and** unitary, and so they are their own inverses: $X^2 = I$. The S gate is not Hermitian, because $S^\dagger \neq S$.

What is the smallest number of S gates (using only S) that must be applied **after** one S to get back to the identity?

```exercise:number
id: unitariedade-s
answer: 3
```

## In Python

Write a function that takes a list of $2\times 2$ matrices in drawing order and returns the matrix of the whole circuit. NumPy's matrix product is `@`.

```exercise:python
id: unitariedade-circuito
input: gates | list[np.ndarray] | list of (2, 2) matrices in drawing order; may be empty | [H, Z, H]
output: circuit_matrix | np.ndarray | 2x2 matrix, shape (2, 2) | np.array([[0, 1], [1, 0]])
---
import numpy as np

X = np.array([[0, 1], [1, 0]])
Z = np.array([[1, 0], [0, -1]])
S = np.array([[1, 0], [0, 1j]])
H = np.array([[1, 1], [1, -1]]) / np.sqrt(2)

def circuit_matrix(gates):
    total = np.eye(2)
    # the gate applied later multiplies from the left
    return total
---
>>> circuit_matrix([H, Z, H])
np.array([[0, 1], [1, 0]])
---
>>> circuit_matrix([])
np.array([[1, 0], [0, 1]])
>>> circuit_matrix([S, S])
np.array([[1, 0], [0, -1]])
---
>>> circuit_matrix([X, S])
np.array([[0, 1], [1j, 0]])
>>> circuit_matrix([S, X])
np.array([[0, 1j], [1, 0]])
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 3.
