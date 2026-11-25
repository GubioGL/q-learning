How many classical bits fit in a qubit? Alone, **one**. With entanglement shared beforehand, one qubit sent can carry **two**: this is superdense coding.

## The protocol

Alice and Bob share a pair $\ket{\Phi^+}$, one qubit each. Alice wants to send two bits.

1. Alice applies a gate to **her** qubit, according to the bits:

$$
\begin{array}{c|c|c}
\text{bits} & \text{gate} & \text{state of the pair} \\ \hline
00 & I & \ket{\Phi^+} \\
01 & X & \ket{\Psi^+} \\
10 & Z & \ket{\Phi^-} \\
11 & ZX & \ket{\Psi^-}
\end{array}
$$

2. Alice sends her qubit to Bob.
3. Bob, with both qubits, makes a **Bell measurement** (CNOT, then H) and reads the two bits.

![Superdense coding circuit](/content/teoria-quantica/superdensa.en.svg)

It works because the four Bell states are orthogonal, and therefore can be told apart with certainty.

Alice wants to send `10`. Which gate does she apply? (One letter.)

```exercise:text
id: superdensa-porta
answer: Z
```

Bob got the state $\ket{\Psi^+}$. Which bits did Alice send?

```exercise:text
id: superdensa-bits
answer: 01
```

## It is not magic

The resource was **paid for beforehand**: someone distributed the entangled pair. In total, two qubits reach Bob, one before and one after the choice of message. What is surprising is that the first one arrived **before** Alice decided what to say.

How many qubits does Alice send, after choosing the message, to transmit **100 bits** with this protocol?

```exercise:number
id: superdensa-cem
answer: 50
```

If a spy captures only Alice's qubit in transit, they learn nothing: alone, it is 50/50 in any basis, whatever the message.

## In Python

Write Alice's side: given the bits, apply X and/or Z to the **first** qubit of the pair. The $4\times 4$ matrices are ready, built with `np.kron`.

```exercise:python
id: superdensa-codigo
input: b1, b2 | int | 0 or 1 | 1, 0
output: encode | np.ndarray | vector with the 4 amplitudes, in the order 00, 01, 10, 11, shape (4,) | np.array([2**-0.5, 0, 0, -2**-0.5])
---
import numpy as np

I = np.eye(2)
H = np.array([[1, 1], [1, -1]]) / np.sqrt(2)
X_ON_FIRST = np.kron(np.array([[0, 1], [1, 0]]), I)
Z_ON_FIRST = np.kron(np.array([[1, 0], [0, -1]]), I)
CNOT = np.array([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]])
PAIR = np.array([1, 0, 0, 1]) / np.sqrt(2)  # order 00, 01, 10, 11

def encode(b1, b2):
    state = PAIR.copy()
    # b2 = 1 asks for X; b1 = 1 asks for Z (X first)
    return state

def decode(state):
    # Bob: CNOT, then H on the first; returns the most likely result
    i = int(np.argmax(np.abs(np.kron(H, I) @ CNOT @ state)))
    return (i // 2, i % 2)
---
>>> decode(encode(1, 0))
(1, 0)
---
>>> decode(encode(0, 0))
(0, 0)
>>> decode(encode(0, 1))
(0, 1)
---
>>> decode(encode(1, 1))
(1, 1)
>>> encode(0, 1)
np.array([0, 2**-0.5, 2**-0.5, 0])
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 6.
