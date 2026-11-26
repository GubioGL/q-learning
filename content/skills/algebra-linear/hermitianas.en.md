Measuring something in the quantum world (energy, spin, position) corresponds to a matrix with a special property: it is **Hermitian**. Here we will see what that means, why measurement results are real numbers, and how every 2x2 Hermitian matrix can be written with the Pauli gates.

## The adjoint and the Hermitian condition

You have already seen the conjugate transpose: the **adjoint** $A^\dagger$ of a matrix $A$ swaps rows and columns and conjugates every entry. Example:

$$
A = \begin{pmatrix}1 & 2i\\ 3 & 4\end{pmatrix}
\quad\Rightarrow\quad
A^\dagger = \begin{pmatrix}1 & 3\\ -2i & 4\end{pmatrix}.
$$

A matrix is **Hermitian** when it equals its own adjoint:

$$
A^\dagger = A.
$$

What does this require of the entries? On the diagonal, $a_{jj} = a_{jj}^*$, so they are **real**. Off the diagonal, $a_{jk} = a_{kj}^*$: the mirror entry is the conjugate. A Hermitian example:

$$
\begin{pmatrix} 2 & 1-i\\ 1+i & 3\end{pmatrix}.
$$

Is the matrix $\begin{pmatrix}1 & i\\ i & 1\end{pmatrix}$ Hermitian? (Answer yes or no.)

```exercise:text
id: hermitianas-checar
answer: no | n
```

## Real eigenvalues

Recall: if $A\ket{v} = \lambda\ket{v}$ with $\ket{v}\neq 0$, then $\ket{v}$ is an **eigenvector** of $A$ and $\lambda$ its **eigenvalue**. What is new is what the condition $A^\dagger = A$ guarantees:

- **the eigenvalues of a Hermitian matrix are always real**;
- eigenvectors of **different** eigenvalues are orthogonal;
- by the **spectral theorem**, the eigenvectors can always be chosen to form an orthonormal basis (if an eigenvalue repeats, we choose carefully inside it).

Why is the eigenvalue real? In one sentence: $\bra{v}A\ket{v} = \lambda\braket{v|v}$; since $A^\dagger = A$, this number equals its own conjugate, hence it is real, and $\braket{v|v}>0$ is real, so $\lambda$ is real.

Example for $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ (not a Pauli gate): $A\begin{pmatrix}1\\1\end{pmatrix} = \begin{pmatrix}3\\3\end{pmatrix}$, eigenvalue $3$; $A\begin{pmatrix}1\\-1\end{pmatrix} = \begin{pmatrix}1\\-1\end{pmatrix}$, eigenvalue $1$. The two eigenvectors are orthogonal.

For $A = \begin{pmatrix}1&2\\2&1\end{pmatrix}$, what is the eigenvalue associated with the eigenvector $\begin{pmatrix}1\\-1\end{pmatrix}$?

```exercise:number
id: hermitianas-autovalor-2x2
answer: -1
```

The **trace** of a matrix is the **sum of its diagonal**: $\mathrm{tr}\begin{pmatrix}a&b\\c&d\end{pmatrix} = a+d$. For a Hermitian matrix, the trace is also the sum of the eigenvalues. What is the trace of $A = \begin{pmatrix}5&1\\1&-2\end{pmatrix}$?

```exercise:number
id: hermitianas-traco
answer: 3
```

## Observables

In quantum mechanics, a quantity that can be measured is an **observable**, represented by a Hermitian matrix $A$. The rules:

- the possible measurement results are the **eigenvalues** of $A$ (real, as they should be for a measuring device);
- after measuring the result $\lambda$, the state is left in the corresponding eigenvector (if $\lambda$ does not repeat);
- the average value, after many measurements on a state $\ket{\psi}$, is $\bra{\psi}A\ket{\psi}$.

Example: the observable $Z$ on a state $\alpha\ket{0}+\beta\ket{1}$ gives $+1$ with probability $|\alpha|^2$ and $-1$ with $|\beta|^2$; the average value is $|\alpha|^2 - |\beta|^2$. It is the measurement in the standard basis, just labelling the results with $\pm1$.

What is the average value of $Z$ in the state $\tfrac{\sqrt3}{2}\ket{0} + \tfrac12\ket{1}$?

```exercise:number
id: hermitianas-media
answer: 0.5
tolerance: 0.001
```

## Pauli: Hermitian and unitary

The Pauli matrices and the identity are

$$
I = \begin{pmatrix}1&0\\0&1\end{pmatrix},\quad
X = \begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
Y = \begin{pmatrix}0&-i\\ i&0\end{pmatrix},\quad
Z = \begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

As you saw in unitarity, each one is Hermitian and unitary, so $\sigma^2 = I$ and the eigenvalues can only be $\pm1$. Eigenvectors: $X\ket{\pm}=\pm\ket{\pm}$; $Z\ket{0}=\ket{0}$, $Z\ket{1}=-\ket{1}$; $Y\ket{+i}=+\ket{+i}$ and $Y\ket{-i}=-\ket{-i}$. Measuring in the Bloch sphere bases is measuring the observables $X$, $Y$ and $Z$.

A gate is the exponential of an observable: the rotations $R_\sigma(\theta)=e^{-i\theta\sigma/2}$ (rotations skill, in the Quantum Computing course) make this bridge between observables and circuits.

## Every 2x2 Hermitian matrix is a combination of Pauli matrices

A 2x2 Hermitian matrix has 4 free real numbers: two on the diagonal and the real and imaginary parts of one off-diagonal entry. There are exactly four "reference" matrices, $\sigma_0=I$, $\sigma_1=X$, $\sigma_2=Y$, $\sigma_3=Z$, so

$$
A = a_0 I + a_1 X + a_2 Y + a_3 Z, \qquad a_k \in \mathbb{R}.
$$

To find the $a_k$ (with $\mathrm{tr}$ = sum of the diagonal), note that $I$ has trace 2 and $X$, $Y$, $Z$ have trace 0, and that $\mathrm{tr}(\sigma_j\sigma_k) = 2$ if $j=k$ and $0$ otherwise. Hence

$$
a_k = \tfrac12\,\mathrm{tr}(\sigma_k A).
$$

Example: $A = \begin{pmatrix}3 & 1-i\\ 1+i & 1\end{pmatrix}$. On the diagonal, $a_0 + a_3 = 3$ and $a_0 - a_3 = 1$, so $a_0 = 2$, $a_3 = 1$. The upper right entry is $a_1 - i a_2 = 1 - i$, so $a_1 = 1$ and $a_2 = 1$. Thus $A = 2I + X + Y + Z$.

![A = [[3, 1−i],[1+i, 1]] written as 2I + X + Y + Z, showing where each coefficient comes from](/content/algebra-linear/hermitiana-pauli.svg)

In the decomposition of $A = \begin{pmatrix}1 & 2\\ 2 & -3\end{pmatrix}$ as $a_0 I + a_1 X + a_2 Y + a_3 Z$, what is $a_3$?

```exercise:number
id: hermitianas-pauli-a3
answer: 2
```

## In Python

Define `X`, `Y`, `Z` as 2x2 arrays inside the function. It receives a 2x2 Hermitian matrix and returns `np.array([a0, a1, a2, a3])` (real floats) using $a_k = \tfrac12\mathrm{tr}(\sigma_k A)$. Hint: `np.trace(M @ A)`; use `.real` at the end.

```exercise:python
id: hermitianas-decompor
input: A | np.ndarray | Hermitian matrix of shape (2, 2), entries may be complex | np.array([[3, 1 - 1j], [1 + 1j, 1]])
output: coef | np.ndarray | [a0, a1, a2, a3] real, shape (4,) | np.array([2, 1, 1, 1])
---
import numpy as np

def decompor_pauli(A):
    return np.array([0.0, 0.0, 0.0, 0.0])
---
>>> decompor_pauli(np.array([[3, 1 - 1j], [1 + 1j, 1]]))
np.array([2, 1, 1, 1])
---
>>> decompor_pauli(np.array([[1, 0], [0, -1]]))
np.array([0, 0, 0, 1])
>>> decompor_pauli(np.array([[0, -2j], [2j, 0]]))
np.array([0, 0, 2, 0])
---
>>> decompor_pauli(np.array([[1, 2], [2, -3]]))
np.array([-1, 2, 0, 2])
```

> To go further: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (2025), sections 2.3 and 2.9; T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), sections 3.3.3 and 3.3.4.
