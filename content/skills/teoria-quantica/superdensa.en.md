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

Write Alice's side: given the bits, apply X and/or Z to the **first** qubit of the pair.

```exercise:python
id: superdensa-codigo
---
r = 2**-0.5
PAIR = [r, 0, 0, r]  # order 00, 01, 10, 11

def x_on_first(e):
    return [e[2], e[3], e[0], e[1]]

def z_on_first(e):
    return [e[0], e[1], -e[2], -e[3]]

def encode(b1, b2):
    state = PAIR
    # b2 = 1 asks for X; b1 = 1 asks for Z (X first)
    return state

def decode(e):
    # Bob: CNOT, then H on the first; returns the most likely result
    e = [e[0], e[1], e[3], e[2]]
    e = [r * (e[0] + e[2]), r * (e[1] + e[3]), r * (e[0] - e[2]), r * (e[1] - e[3])]
    i = max(range(4), key=lambda k: abs(e[k]))
    return (i // 2, i % 2)
---
assert decode(encode(0, 0)) == (0, 0)
assert decode(encode(0, 1)) == (0, 1)
assert decode(encode(1, 0)) == (1, 0)
assert decode(encode(1, 1)) == (1, 1)
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 6.
