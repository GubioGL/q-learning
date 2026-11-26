A quantum circuit is almost never a single gate: it is gates one after another. Can we replace a long stretch with a short one that does exactly the same thing? In many cases, yes, and matrix algebra tells us how.

## Gates in sequence: the product goes backwards

We read a circuit from left to right, in time. If the state goes first through $A$ and then through $B$, the result is $B(A\ket{\psi})$, so the matrix of the whole circuit is

$$
U = BA.
$$

The first gate sits **on the right** in the product. This happens because the matrix acts on the ket to its right. With three gates $A$, $B$, $C$ in that time order: $U = CBA$.

Example: first $X$, then $Z$, gives $U = ZX$. Computing,

$$
ZX = \begin{pmatrix}1&0\\0&-1\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix} = \begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

If the circuit applies $X$ first and then $Z$, what is the entry in row 2, column 1 of the circuit's matrix (bottom left)?

```exercise:number
id: identidades-ordem
answer: -1
```

## Simple identities

Some gates are **their own inverse**: applying them twice does nothing.

$$
XX = I, \qquad YY = I, \qquad ZZ = I, \qquad HH = I.
$$

Since $I$ is the matrix that changes nothing, two equal gates in a row can be erased from the circuit. Checking $HH$: $H = \tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ and

$$
HH = \tfrac12\begin{pmatrix}1+1 & 1-1\\ 1-1 & 1+1\end{pmatrix} = I.
$$

You can check this by multiplying the matrices. (They satisfy $U^\dagger = U$ and $U^\dagger U = I$, hence $UU=I$.)

Consider the circuit, in time order, $X, H, H, X, Z, Z, H$. Cancelling adjacent equal pairs (and repeating, since new pairs appear), how many gates are left?

```exercise:number
id: identidades-cancelar
answer: 1
```

## Identities with $H$: swapping $X$ and $Z$

The gate $H$ works as a "translator" between $X$ and $Z$. Let us compute $HXH$ (circuit: $H$, then $X$, then $H$):

$$
HXH = \tfrac12\begin{pmatrix}1&1\\1&-1\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}1&1\\1&-1\end{pmatrix}
= \tfrac12\begin{pmatrix}1&1\\-1&1\end{pmatrix}\begin{pmatrix}1&1\\1&-1\end{pmatrix}
= \tfrac12\begin{pmatrix}2&0\\0&-2\end{pmatrix} = Z.
$$

So $HXH = Z$. Multiplying both sides by $H$ on the right sides (and using $HH=I$), we also get $HZH = X$. Summary:

$$
HXH = Z, \qquad HZH = X, \qquad HYH = -Y.
$$

$HYH = -Y$ equals $Y$ up to a global phase: as a lone gate, $-Y$ and $Y$ have the same effect, since no measurement sees the $-1$. But they are different matrices, and the sign matters in controlled gates or when $Y$ is an observable. On the Bloch sphere, $H$ swaps the $x$ and $z$ axes and flips $y$, which is what the three equalities say.

Also $XZX = -Z$ and $ZXZ = -X$ hold, consequences of $XZ = -ZX$ (the gates anticommute).

![Two circuits: H, X, H equals Z; H, Z, H equals X](/content/algebra-linear/circuito-hxh-hzh.svg)

The state $\ket{0}$ goes through a circuit with $H$, then $Z$, then $H$. What is the probability of measuring 1 at the end? (Hint: use $HZH = X$.)

```exercise:number
id: identidades-hzh
answer: 1
tolerance: 0.001
```

## Simplifying circuits

Two ideas are enough: (1) cancel equal pairs; (2) replace a stretch with an equivalent one. Example: the circuit $H, X, H$ equals a single gate $Z$, so three gates become one. This matters because every gate on a real computer has a chance of error: shorter circuit, fewer errors.

Why is simplifying allowed? The circuit's matrix is the same, so the effect on any state is the same. When simplifying, mind the order: the cancelled stretch must be **adjacent** in the circuit. In $X, Z, X$ the two $X$ gates are not adjacent and do not cancel (the result is $XZX = -Z$, not $Z$).

Which single gate is equivalent to the circuit $H, Z, H$? Answer with the letter.

```exercise:text
id: identidades-simplificar
answer: X
```

![Circuit X, H, H, X, Z, Z, H simplified in three rows: HH and ZZ cancel, then XX, leaving only H](/content/algebra-linear/circuito-simplificar.svg)

## In Python

Write a function that receives the list of gates **in time order** (each gate a 2x2 `np.array`) and returns the circuit's matrix. Remember: the first gate sits on the right of the product.

```exercise:python
id: identidades-produto
input: portas | list | list of np.array matrices of shape (2, 2), in the order they are applied | [np.array([[0, 1], [1, 0]]), np.array([[1, 0], [0, -1]])]
output: matriz_circuito | np.ndarray | the circuit's matrix, shape (2, 2) | np.array([[0, 1], [-1, 0]])
---
import numpy as np

def matriz_circuito(portas):
    return np.eye(2)
---
>>> matriz_circuito([np.array([[0, 1], [1, 0]]), np.array([[1, 0], [0, -1]])])
np.array([[0, 1], [-1, 0]])
---
>>> matriz_circuito([np.array([[0, 1], [1, 0]]), np.array([[0, 1], [1, 0]])])
np.array([[1, 0], [0, 1]])
---
>>> matriz_circuito([np.array([[1, 1], [1, -1]]) / np.sqrt(2), np.array([[0, 1], [1, 0]]), np.array([[1, 1], [1, -1]]) / np.sqrt(2)])
np.array([[1, 0], [0, -1]])
```

> To go further: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (2025), section 2.3; T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), section 3.3.3.
