If states are vectors, gates are **matrices**. And the matrices that work as quantum gates have a special property: they are unitary.

## A gate is a matrix

The columns of the matrix say where the basis states go: the first column is $U\ket{0}$ and the second is $U\ket{1}$.

$$
X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \quad
Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \quad
Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}, \quad
H = \frac{1}{\sqrt 2}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}.
$$

To apply the gate, we multiply the matrix by the vector:

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} \alpha \\ \beta \end{pmatrix} = \begin{pmatrix} a\alpha + b\beta \\ c\alpha + d\beta \end{pmatrix}.
$$

A gate takes $\ket{0}$ to $\ket{1}$ and $\ket{1}$ to $-\ket{0}$. What is the element in the **first row, second column** of the matrix?

```exercise:number
id: unitarias-coluna
answer: -1
```

## Gates in sequence

Applying $A$ and then $B$ means multiplying by $BA$. The order matters: in general $AB \neq BA$. For example,

$$
XZ = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}, \qquad ZX = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}.
$$

Since $XZ = -ZX$, we say that X and Z **anticommute**.

## The unitarity condition

The conjugate transpose $U^\dagger$ is obtained by swapping rows and columns and conjugating. A matrix is **unitary** when

$$
U^\dagger U = I.
$$

In other words, the inverse of $U$ is $U^\dagger$. This is exactly what makes the gate preserve the norm:

$$
\bra{\psi}U^\dagger U\ket{\psi} = \braket{\psi|\psi} = 1.
$$

Another way to see it: the **columns** of $U$ form an orthonormal set.

Which positive value of $k$ makes $k\begin{pmatrix} 1 & 1 \\ 1 & -1\end{pmatrix}$ unitary? (Three decimal places.)

```exercise:number
id: unitarias-k
answer: 0.7071
tolerance: 0.001
```

Is the matrix $\begin{pmatrix} 1 & 1 \\ 0 & 1\end{pmatrix}$ unitary? Answer `yes` or `no`.

```exercise:text
id: unitarias-cisalhamento
answer: no
```

## In Python

Write a function that tests whether a $2\times 2$ matrix (a list of rows) is unitary, with a tolerance of $10^{-9}$.

```exercise:python
id: unitarias-codigo
---
def is_unitary(U):
    # check that the matrix U†U is the identity
    return True
---
r = 2**-0.5
assert is_unitary([[r, r], [r, -r]])
assert is_unitary([[0, -1j], [1j, 0]])
assert is_unitary([[1, 0], [0, 1j]])
assert not is_unitary([[1, 1], [0, 1]])
assert not is_unitary([[1, 1], [1, -1]])
assert not is_unitary([[0.6, 0.8], [0.6, 0.8]])
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 3.
