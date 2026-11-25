Bra times ket gives a number. What about ket times bra? It gives a **matrix**, and with it we can write any gate.

## Ket times bra

The **outer product** multiplies a column by a row:

$$
\ket{\psi}\bra{\phi} = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}\begin{pmatrix} c^* & d^* \end{pmatrix} = \begin{pmatrix} \alpha c^* & \alpha d^* \\ \beta c^* & \beta d^* \end{pmatrix}.
$$

In the standard basis, $\ket{i}\bra{j}$ has a single $1$, in row $i$ and column $j$. For example,

$$
\ket{0}\bra{1} = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}.
$$

What is the sum of **all** the elements of the matrix $\ket{+}\bra{+}$?

```exercise:number
id: externo-soma
answer: 2
tolerance: 0.001
```

## Gates as outer products

The operator $\ket{b}\bra{a}$ takes $\ket{a}$ to $\ket{b}$ and kills everything orthogonal to $\ket{a}$. So we can read a gate straight from the formula:

$$
X = \ket{1}\bra{0} + \ket{0}\bra{1}, \qquad Z = \ket{0}\bra{0} - \ket{1}\bra{1}.
$$

Which gate (one letter) is $\ket{+}\bra{0} + \ket{-}\bra{1}$?

```exercise:text
id: externo-hadamard
answer: H
```

## Projectors

The operator $\Pi_a = \ket{a}\bra{a}$ is a **projector**: applying it twice is the same as applying it once, $\Pi_a^2 = \Pi_a$. It connects measurement to algebra:

$$
P(a) = \bra{\psi}\Pi_a\ket{\psi},
$$

and the state after the measurement is $\Pi_a\ket{\psi}$, renormalized. Note that projectors are **not** unitary: measuring is not reversible.

## Completeness relation

For any orthonormal basis, adding the projectors gives the identity:

$$
\sum_i \ket{e_i}\bra{e_i} = I.
$$

This relation is a calculation tool: we can insert $I$ anywhere. To change basis, for example,

$$
\ket{\psi} = I\ket{\psi} = \sum_i \ket{e_i}\braket{e_i|\psi},
$$

which is exactly the projection formula from the previous skill.

What is the trace (sum of the diagonal) of $\ket{+}\bra{+} + \ket{-}\bra{-}$?

```exercise:number
id: externo-traco
answer: 2
tolerance: 0.001
```

## In Python

Write the outer product $\ket{\psi}\bra{\phi}$, returning a list of rows.

```exercise:python
id: externo-codigo
---
def outer_product(psi, phi):
    # element (i, j) = psi[i] * conjugate of phi[j]
    return []
---
assert outer_product([1, 0], [0, 1]) == [[0, 1], [0, 0]]
assert outer_product([1, 2], [3, 4]) == [[3, 4], [6, 8]]
assert outer_product([1, 0], [1j, 0]) == [[-1j, 0], [0, 0]]
assert outer_product([1, 1j], [1, 1j]) == [[1, -1j], [1j, 1]]
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 3.
