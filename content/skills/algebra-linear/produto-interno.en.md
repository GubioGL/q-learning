How similar are two states? The answer is a single number: the **inner product**.

## Bra times ket

Multiplying the row $\bra{\phi}$ by the column $\ket{\psi}$, we get a complex number, the **braket**:

$$
\braket{\phi|\psi} = \begin{pmatrix} c^* & d^* \end{pmatrix}\begin{pmatrix} \alpha \\ \beta \end{pmatrix} = c^*\alpha + d^*\beta,
$$

where $\ket{\phi} = c\ket{0} + d\ket{1}$. Swapping the order conjugates the result: $\braket{\psi|\phi} = \braket{\phi|\psi}^*$.

What is $\braket{+|0}$? (Use three decimal places.)

```exercise:number
id: interno-mais-zero
answer: 0.7071
tolerance: 0.001
```

## Norm and normalization

The inner product of a state with itself is the sum of the squared moduli:

$$
\braket{\psi|\psi} = |\alpha|^2 + |\beta|^2.
$$

Being normalized is therefore the same as $\braket{\psi|\psi} = 1$.

If $\ket{\psi} = A\left(\ket{0} + 2\ket{1}\right)$ and we want $\braket{\psi|\psi} = 1$, what is $A^2$ (with $A$ real)?

```exercise:number
id: interno-normalizacao
answer: 0.2
tolerance: 0.001
```

## Orthogonal states

When $\braket{\phi|\psi} = 0$, the states are **orthogonal**: there is a measurement that tells them apart with certainty. This is the case of $\ket{0}$ and $\ket{1}$, and also of $\ket{+}$ and $\ket{-}$:

$$
\braket{+|-} = \frac12\big(1\cdot 1 + 1\cdot(-1)\big) = 0.
$$

On the Bloch sphere, orthogonal states are at **opposite** points, $180^\circ$ apart.

A set of states that are normalized and orthogonal to each other is **orthonormal**. In symbols, $\braket{e_i|e_j} = \delta_{ij}$, which is $1$ if $i = j$ and $0$ otherwise.

Are the states $\tfrac{1}{\sqrt2}(\ket{0} + i\ket{1})$ and $\tfrac{1}{\sqrt2}(\ket{0} - i\ket{1})$ orthogonal? Answer `yes` or `no`.

```exercise:text
id: interno-ortogonais
answer: yes
```

Watch out for the conjugate: $\begin{pmatrix}1 & -i\end{pmatrix}\begin{pmatrix}1 \\ -i\end{pmatrix} = 1 + i^2 = 0$.

## In Python

```exercise:python
id: interno-codigo
---
def inner_product(phi, psi):
    # <phi|psi>: conjugate the components of phi
    return 0
---
assert inner_product([1, 0], [0, 1]) == 0
assert inner_product([1j, 0], [1, 0]) == -1j
assert inner_product([1, 1j], [1, -1j]) == 0
assert abs(inner_product([0.6, 0.8j], [0.6, 0.8j]) - 1) < 1e-9
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 3.
