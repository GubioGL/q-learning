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

Write a function that takes a list of $2\times 2$ matrices in drawing order and returns the matrix of the whole circuit.

```exercise:python
id: unitariedade-circuito
---
r = 2**-0.5
I = [[1, 0], [0, 1]]
X = [[0, 1], [1, 0]]
Z = [[1, 0], [0, -1]]
S = [[1, 0], [0, 1j]]
H = [[r, r], [r, -r]]

def times(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]

def circuit_matrix(gates):
    total = I
    # the gate applied later multiplies from the left
    return total
---
close = lambda A, B: all(abs(A[i][j] - B[i][j]) < 1e-9 for i in range(2) for j in range(2))
assert close(circuit_matrix([]), I)
assert close(circuit_matrix([H, Z, H]), X)
assert close(circuit_matrix([S, S]), Z)
assert close(circuit_matrix([X, S]), [[0, 1], [1j, 0]])
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 3.
