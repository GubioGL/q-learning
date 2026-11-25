The four **Bell states** are the most important two-qubit states. They are maximally entangled and form a basis.

## The four states

$$
\ket{\Phi^\pm} = \frac{1}{\sqrt2}\big(\ket{00} \pm \ket{11}\big), \qquad
\ket{\Psi^\pm} = \frac{1}{\sqrt2}\big(\ket{01} \pm \ket{10}\big).
$$

In the $\Phi$ states, the two qubits give **equal** results in the Z basis; in the $\Psi$ states, **different** results.

In the state $\ket{\Psi^-}$, the first qubit gave $0$. What will the second one give, also in the Z basis?

```exercise:number
id: bell-psi
answer: 1
```

## Preparing and measuring

The H + CNOT circuit takes the standard basis to the Bell basis:

$$
\ket{00}\to\ket{\Phi^+}, \quad \ket{10}\to\ket{\Phi^-}, \quad \ket{01}\to\ket{\Psi^+}, \quad \ket{11}\to\ket{\Psi^-}.
$$

![Circuit that prepares Bell states and the inverse that measures them](/content/teoria-quantica/bell-medida.en.svg)

Since the circuit is unitary, running it **backwards** (CNOT and then H) identifies which Bell state we have. This is a **Bell measurement**: two bits that point to one of the four states.

The Bell measurement of a pair gave the bits $10$ (first the qubit that went through H). Which state was it? Answer `phi+`, `phi-`, `psi+` or `psi-`.

```exercise:text
id: bell-medida
answer: phi- | phi -
```

## From one to another with a local gate

By applying gates only to the **first** qubit, we go from one Bell state to another:

$$
(Z\otimes I)\ket{\Phi^+} = \ket{\Phi^-}, \qquad (X\otimes I)\ket{\Phi^+} = \ket{\Psi^+}.
$$

Which gate (one letter), applied to the first qubit, takes $\ket{\Psi^+}$ to $\ket{\Psi^-}$ up to a global phase? Consider only X and Z.

```exercise:text
id: bell-porta
answer: Z
```

## Correlation in every basis

In $\ket{\Phi^+}$, the results are also equal in the X basis, because

$$
\ket{\Phi^+} = \frac{1}{\sqrt2}\big(\ket{++} + \ket{--}\big).
$$

A classical pair of matched coins cannot imitate this in all bases at once. The next skill measures that difference.

What is the probability that the two results are **equal** when measuring $\ket{\Phi^+}$ with both sides in the X basis?

```exercise:number
id: bell-base-x
answer: 1
```

## In Python

Write a function that takes the bits `(a, b)` and returns the 4 amplitudes of the Bell state prepared from $\ket{ab}$.

```exercise:python
id: bell-codigo
input: a, b | int | 0 or 1 | 1, 0
output: bell_state | list | list with the 4 amplitudes, in the order 00, 01, 10, 11 | [2**-0.5, 0, 0, -2**-0.5]
---
r = 2**-0.5

def bell_state(a, b):
    state = [0, 0, 0, 0]
    # H on the first: (|0> + (-1)^a |1>) / sqrt(2); then CNOT
    return state
---
>>> bell_state(0, 0)
[2**-0.5, 0, 0, 2**-0.5]
---
>>> bell_state(1, 0)
[2**-0.5, 0, 0, -2**-0.5]
---
>>> bell_state(0, 1)
[0, 2**-0.5, 2**-0.5, 0]
>>> bell_state(1, 1)
[0, 2**-0.5, -2**-0.5, 0]
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 6.
