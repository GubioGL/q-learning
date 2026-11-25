One-qubit gates never create entanglement. For that, the qubits need to interact, and the most used interaction gate is the **CNOT**.

## The CNOT

The CNOT flips the **target** when the **control** is $1$. Here the control is the qubit on the left:

$$
\text{CNOT}\ket{a}\ket{b} = \ket{a}\ket{a \oplus b}.
$$

In the basis $\ket{00}, \ket{01}, \ket{10}, \ket{11}$, it is a matrix that swaps the last two amplitudes:

$$
\text{CNOT} = \begin{pmatrix} 1&0&0&0 \\ 0&1&0&0 \\ 0&0&0&1 \\ 0&0&1&0 \end{pmatrix}.
$$

To which state does the CNOT take $\ket{11}$? (Only the digits.)

```exercise:text
id: cnot-onze
answer: 10
```

## Creating entanglement

By linearity, the CNOT also acts on superpositions. Starting in $\ket{00}$, we apply H to the first qubit and then the CNOT:

$$
\ket{00} \xrightarrow{H} \frac{1}{\sqrt2}\big(\ket{00} + \ket{10}\big) \xrightarrow{\text{CNOT}} \frac{1}{\sqrt2}\big(\ket{00} + \ket{11}\big).
$$

![Circuit that prepares an entangled pair: H and CNOT](/content/computacao-quantica/bell.svg)

What is the probability of getting $01$ when measuring the final state?

```exercise:number
id: cnot-bell
answer: 0
```

## Other controlled gates

Any gate $U$ has a controlled version: it applies $U$ to the target only if the control is $1$. The **CZ** changes the sign of $\ket{11}$ only, and so it is symmetric: it does not matter which qubit is the control. Placing H on the target before and after turns one into the other, because $HZH = X$.

The **SWAP** gate exchanges the states of two qubits and can be made with alternating CNOTs: one, then another with control and target swapped, then the first one again.

How many CNOTs does this construction of SWAP use?

```exercise:number
id: cnot-swap
answer: 3
```

## Toffoli

The **Toffoli** (CCNOT) flips the target only if **both** controls are $1$:

$$
\text{Toffoli}\ket{a}\ket{b}\ket{c} = \ket{a}\ket{b}\ket{ab \oplus c}.
$$

It performs any reversible classical computation, so a quantum computer can do everything a classical one does.

How many of the 8 basis states does the Toffoli **change**?

```exercise:number
id: cnot-toffoli
answer: 2
```

## In Python

Write the CNOT (control on the left) acting on a list of 4 amplitudes and use it to build the entangled pair from $\ket{00}$.

```exercise:python
id: cnot-codigo
---
r = 2**-0.5

def h_on_first(e):
    return [r * (e[0] + e[2]), r * (e[1] + e[3]), r * (e[0] - e[2]), r * (e[1] - e[3])]

def cnot(e):
    return list(e)

def entangled_pair():
    return [1, 0, 0, 0]
---
close = lambda u, v: all(abs(a - b) < 1e-9 for a, b in zip(u, v))
assert cnot([1, 2, 3, 4]) == [1, 2, 4, 3]
assert cnot(cnot([1, 2, 3, 4])) == [1, 2, 3, 4]
assert close(entangled_pair(), [r, 0, 0, r])
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 4.
