The same vector can be described with different axes. In quantum computing, choosing the axes means choosing **which measurement to make**.

## The amplitude is a projection

In an orthonormal basis $\{\ket{a}, \ket{b}\}$, every state can be written as

$$
\ket{\psi} = \alpha\ket{a} + \beta\ket{b}, \qquad \alpha = \braket{a|\psi}, \quad \beta = \braket{b|\psi}.
$$

To see why, multiply by $\bra{a}$ from the left: $\braket{a|\psi} = \alpha\braket{a|a} + \beta\braket{a|b} = \alpha$. The inner product **projects** the state onto the chosen direction.

![Projection of a state onto the direction of +](/content/algebra-linear/projecao.svg)

So the Born rule gets a form that holds in any basis:

$$
P(a) = |\braket{a|\psi}|^2.
$$

For $\ket{\psi} = 0.6\ket{0} + 0.8\ket{1}$, what is the probability of getting $\ket{+}$ in a measurement in the basis $\{\ket{+}, \ket{-}\}$?

```exercise:number
id: projecoes-mais
answer: 0.98
tolerance: 0.001
```

And of getting $\ket{-}$?

```exercise:number
id: projecoes-menos
answer: 0.02
tolerance: 0.001
```

## Three important bases

$$
\begin{array}{c|c}
\text{basis } Z & \ket{0},\ \ket{1} \\ \hline
\text{basis } X & \ket{+},\ \ket{-} \\ \hline
\text{basis } Y & \ket{i} = \tfrac{1}{\sqrt2}(\ket{0} + i\ket{1}),\ \ket{-i} = \tfrac{1}{\sqrt2}(\ket{0} - i\ket{1})
\end{array}
$$

Each one corresponds to an axis of the Bloch sphere. A state that is certain in one of them is 50/50 in the other two.

A qubit is in $\ket{i}$. What is the probability of getting $\ket{+}$ in a measurement in the X basis?

```exercise:number
id: projecoes-i
answer: 0.5
tolerance: 0.001
```

## Measuring in another basis in practice

Hardware usually measures only in the Z basis. To measure in the X basis, we apply H **before** the measurement: since $H\ket{+} = \ket{0}$ and $H\ket{-} = \ket{1}$, the result $0$ means $\ket{+}$ and the result $1$ means $\ket{-}$.

## In Python

Write a function that takes a state and a basis (a list of orthonormal vectors) and returns the list of probabilities.

```exercise:python
id: projecoes-codigo
---
r = 2**-0.5
BASIS_Z = [[1, 0], [0, 1]]
BASIS_X = [[r, r], [r, -r]]
BASIS_Y = [[r, r * 1j], [r, -r * 1j]]

def probabilities(state, basis):
    return [0 for vector in basis]
---
close = lambda u, v: len(u) == len(v) and all(abs(a - b) < 1e-9 for a, b in zip(u, v))
assert close(probabilities([0.6, 0.8], BASIS_Z), [0.36, 0.64])
assert close(probabilities([0.6, 0.8], BASIS_X), [0.98, 0.02])
assert close(probabilities([r, r * 1j], BASIS_Y), [1, 0])
assert close(probabilities([r, r * 1j], BASIS_X), [0.5, 0.5])
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 3.
