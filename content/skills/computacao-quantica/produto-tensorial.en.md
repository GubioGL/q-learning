A single qubit does little. The power appears when we put several together, and the operation that joins quantum systems is the **tensor product**.

## Joining two qubits

If one qubit is in $\ket{a}$ and another in $\ket{b}$, the pair is in $\ket{a}\otimes\ket{b}$, which we shorten to $\ket{a}\ket{b}$ or $\ket{ab}$. In components:

$$
\begin{pmatrix} a_0 \\ a_1 \end{pmatrix} \otimes \begin{pmatrix} b_0 \\ b_1 \end{pmatrix} = \begin{pmatrix} a_0 b_0 \\ a_0 b_1 \\ a_1 b_0 \\ a_1 b_1 \end{pmatrix}.
$$

In this course, the qubit on the **left** is the first one, and the order of the basis is $\ket{00}, \ket{01}, \ket{10}, \ket{11}$.

![The four amplitudes of the tensor product](/content/computacao-quantica/tensorial.en.svg)

The general state of two qubits is

$$
\ket{\psi} = c_{00}\ket{00} + c_{01}\ket{01} + c_{10}\ket{10} + c_{11}\ket{11},
$$

with the sum of the $|c_{ij}|^2$ equal to 1.

What is the amplitude of $\ket{10}$ in $\ket{+}\otimes\ket{+}$?

```exercise:number
id: tensorial-mais-mais
answer: 0.5
tolerance: 0.001
```

## Exponential growth

With $n$ qubits, there are $2^n$ amplitudes. This is why simulating many qubits on an ordinary computer becomes infeasible.

How many amplitudes does the state of **10 qubits** have?

```exercise:number
id: tensorial-dez
answer: 1024
```

Careful: having $2^n$ amplitudes does not mean being able to **read** $2^n$ numbers. When we measure, we get only $n$ bits.

## Gates in parallel

Applying $A$ to the first qubit and $B$ to the second means applying the matrix $A \otimes B$, of size $4\times 4$:

$$
A \otimes B = \begin{pmatrix} a_{00}B & a_{01}B \\ a_{10}B & a_{11}B \end{pmatrix}, \qquad (A\otimes B)(\ket{a}\otimes\ket{b}) = A\ket{a} \otimes B\ket{b}.
$$

If only one qubit gets a gate, the other gets the identity: $X \otimes I$ acts only on the first.

To which state does the gate $X \otimes I$ take $\ket{01}$? (Write only the two digits.)

```exercise:text
id: tensorial-x-i
answer: 11
```

## In Python

Write the tensor product of two vectors of any size.

```exercise:python
id: tensorial-codigo
---
def tensor(u, v):
    return []
---
assert tensor([1, 0], [0, 1]) == [0, 1, 0, 0]
assert tensor([1, 2], [3, 4]) == [3, 4, 6, 8]
assert tensor([0, 1], tensor([1, 0], [0, 1])) == [0, 0, 0, 0, 0, 1, 0, 0]
assert len(tensor([1] * 4, [1] * 8)) == 32
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 4.
