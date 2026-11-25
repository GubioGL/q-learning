Copying a bit is trivial. Copying an unknown qubit is **impossible**, and the proof fits in a few lines.

## What a copier would be

A quantum copier would be a unitary $U$ that, for **every** state $\ket{\psi}$, does

$$
U\big(\ket{\psi}\ket{0}\big) = \ket{\psi}\ket{\psi}.
$$

## Does the CNOT not copy?

It copies the basis: $\ket{0}\ket{0} \to \ket{0}\ket{0}$ and $\ket{1}\ket{0} \to \ket{1}\ket{1}$. But, with a superposition,

$$
\text{CNOT}\,\big(\alpha\ket{0} + \beta\ket{1}\big)\ket{0} = \alpha\ket{00} + \beta\ket{11},
$$

while a real copy would be

$$
\big(\alpha\ket{0} + \beta\ket{1}\big)\big(\alpha\ket{0} + \beta\ket{1}\big) = \alpha^2\ket{00} + \alpha\beta\ket{01} + \alpha\beta\ket{10} + \beta^2\ket{11}.
$$

![CNOT applied to a superposition entangles instead of copying](/content/computacao-quantica/nao-clonagem.en.svg)

The two only match when $\alpha\beta = 0$, that is, when the state is $\ket{0}$ or $\ket{1}$.

We try to copy $\ket{+}$ with a CNOT. In the resulting state, what is the amplitude of $\ket{01}$?

```exercise:number
id: clonagem-cnot
answer: 0
```

And what would that amplitude be in a perfect copy $\ket{+}\ket{+}$?

```exercise:number
id: clonagem-ideal
answer: 0.5
tolerance: 0.001
```

## The general proof

Suppose $U$ copies two states, $\ket{\psi}$ and $\ket{\phi}$. Unitaries preserve inner products, so

$$
\braket{\phi|\psi}\braket{0|0} = \braket{\phi|\psi}\braket{\phi|\psi} \quad\Longrightarrow\quad x = x^2, \quad x = \braket{\phi|\psi}.
$$

The only solutions are $x = 0$ (orthogonal states) and $x = 1$ (equal states). A copier of arbitrary states does not exist.

Can the same machine copy both $\ket{0}$ and $\ket{+}$ perfectly? Answer `yes` or `no`.

```exercise:text
id: clonagem-zero-mais
answer: no
```

## Consequences

- We cannot discover an unknown state by copying it and measuring the copies.
- Quantum error correction needs to **spread** the information over entangled states, instead of making backup copies.
- A spy cannot copy qubits without being noticed, which is the basis of quantum cryptography (BB84).

## In Python

The **fidelity** between what the CNOT produces and the ideal copy is $F = |\braket{\text{ideal}|\text{obtained}}|^2$. Write it for a real state `np.array([alpha, beta])`.

```exercise:python
id: clonagem-codigo
input: state | np.ndarray | real normalized vector [alpha, beta], shape (2,) | np.array([1, 0])
output: fidelity | float | the fidelity, between 0 and 1 | 1.0
---
import numpy as np

def fidelity(state):
    alpha, beta = state
    obtained = np.array([alpha, 0, 0, beta])
    ideal = np.zeros(4)  # fix this: the vector of the perfect copy
    return np.sum(ideal * obtained) ** 2
---
>>> fidelity(np.array([1, 0]))
1
---
>>> fidelity(np.array([2**-0.5, 2**-0.5]))
0.5
>>> fidelity(np.array([0, 1]))
1
---
>>> fidelity(np.array([0.6, 0.8]))
0.529984
>>> fidelity(np.array([0.8, -0.6]))
0.087616
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 4.
