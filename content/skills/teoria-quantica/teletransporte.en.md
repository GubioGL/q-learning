Alice has a qubit in a state that she herself does not know, and she wants Bob to have it. She cannot copy it or measure it without spoiling it. **Quantum teleportation** solves the problem with an entangled pair and two classical bits.

## The ingredients

- Alice's qubit in $\ket{\psi} = \alpha\ket{0} + \beta\ket{1}$;
- a pair $\ket{\Phi^+}$ shared between Alice and Bob;
- a classical channel, such as a phone or the internet.

![Quantum teleportation circuit](/content/teoria-quantica/teletransporte.en.svg)

## The protocol

1. Alice makes a **Bell measurement** on her two qubits: CNOT (control on $\ket{\psi}$), then H, then measures both.
2. Alice sends the two bits, $m_1$ (from the qubit $\psi$) and $m_2$ (from her half of the pair), to Bob.
3. Bob applies X if $m_2 = 1$ and then Z if $m_1 = 1$.

Before the measurement, the state of the three qubits can be rewritten as

$$
\begin{aligned}
\tfrac12\Big[\ &\ket{00}\big(\alpha\ket{0} + \beta\ket{1}\big) + \ket{01}\big(\alpha\ket{1} + \beta\ket{0}\big) \\
+\ &\ket{10}\big(\alpha\ket{0} - \beta\ket{1}\big) + \ket{11}\big(\alpha\ket{1} - \beta\ket{0}\big)\Big].
\end{aligned}
$$

The first two digits are $m_1m_2$, and the parenthesis is what Bob is left with. Each result calls for a known correction.

What is the probability that Alice gets $m_1m_2 = 11$?

```exercise:number
id: teletransporte-prob
answer: 0.25
tolerance: 0.001
```

Alice got $m_1 m_2 = 01$. Which gate does Bob apply? (One letter.)

```exercise:text
id: teletransporte-x
answer: X
```

And if she got $10$?

```exercise:text
id: teletransporte-z
answer: Z
```

## What does not happen

- **There is no copy.** The measurement destroys the state on Alice's side, as no-cloning requires.
- **It is not faster than light.** Without the two bits, Bob's qubit is completely random.
- **Nothing material travels.** What is transferred is the state.

How many classical bits must be sent to teleport **5 qubits**?

```exercise:number
id: teletransporte-bits
answer: 10
```

Compare with superdense coding: there, 1 qubit plus an entangled pair are worth 2 bits; here, 2 bits plus a pair are worth 1 qubit. The protocols mirror each other.

## In Python

Write Bob's correction. `state` is the vector with the 2 amplitudes he is left with.

```exercise:python
id: teletransporte-codigo
input: state | np.ndarray | vector with Bob's 2 amplitudes, shape (2,) | np.array([0.8, 0.6])
input: m1, m2 | int | bits sent by Alice, 0 or 1 | 0, 1
output: correct | np.ndarray | corrected vector, shape (2,) | np.array([0.6, 0.8])
---
import numpy as np

X = np.array([[0, 1], [1, 0]])
Z = np.array([[1, 0], [0, -1]])

def correct(state, m1, m2):
    # X if m2 = 1, then Z if m1 = 1
    return state
---
>>> correct(np.array([0.8, 0.6]), 0, 1)
np.array([0.6, 0.8])
---
>>> correct(np.array([0.6, 0.8]), 0, 0)
np.array([0.6, 0.8])
>>> correct(np.array([0.6, -0.8j]), 1, 0)
np.array([0.6, 0.8j])
---
>>> correct(np.array([-0.8j, 0.6]), 1, 1)
np.array([0.6, 0.8j])
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 6.
