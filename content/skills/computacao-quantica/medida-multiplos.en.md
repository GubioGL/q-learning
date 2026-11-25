With several qubits, we can measure all of them or only some. The Born rule stays the same, but partial measurement brings something new: what happens to the qubits that were **not** measured?

## Measuring all

If $\ket{\psi} = \sum c_{ij}\ket{ij}$, the probability of getting the result $ij$ is $|c_{ij}|^2$, and the state collapses to $\ket{ij}$.

For $\ket{\psi} = \tfrac12\ket{00} + \tfrac12\ket{01} + \tfrac{1}{\sqrt2}\ket{11}$, what is the probability of getting $11$?

```exercise:number
id: multiplos-todos
answer: 0.5
tolerance: 0.001
```

## Measuring only one

To measure only the first qubit, we add the probabilities of all compatible terms:

$$
P(\text{first} = 0) = |c_{00}|^2 + |c_{01}|^2.
$$

After the measurement, only the compatible terms remain, **renormalized**.

![Measuring the first qubit: add, filter and renormalize](/content/computacao-quantica/medida-parcial.en.svg)

In the state above, what is the probability that the **first** qubit gives $0$?

```exercise:number
id: multiplos-parcial
answer: 0.5
tolerance: 0.001
```

If it gave $0$, what remains is $\tfrac12\ket{00} + \tfrac12\ket{01}$. Dividing by the square root of the probability, $\sqrt{1/2}$, the state becomes

$$
\frac{1}{\sqrt2}\big(\ket{00} + \ket{01}\big) = \ket{0}\otimes\ket{+}.
$$

And if the first gave $1$? What is the probability that the **second** gives $1$ next?

```exercise:number
id: multiplos-condicional
answer: 1
```

Notice: before the measurement, the second qubit had probability $\tfrac14 + \tfrac12 = \tfrac34$ of giving $1$. The result of the first changed our prediction for the second. The two were **correlated**.

## In Python

Write a function that takes the 4 amplitudes, in the order $00, 01, 10, 11$, and the result of measuring the first qubit. It returns the pair `(probability, state_after)`. The tests only use results with probability greater than zero.

```exercise:python
id: multiplos-codigo
---
def measure_first(state, result):
    probability = 0
    after = list(state)
    return probability, after
---
close = lambda u, v: all(abs(a - b) < 1e-9 for a, b in zip(u, v))
r = 2**-0.5
p, e = measure_first([0.5, 0.5, 0, r], 0)
assert abs(p - 0.5) < 1e-9
assert close(e, [r, r, 0, 0])
p, e = measure_first([0.5, 0.5, 0, r], 1)
assert abs(p - 0.5) < 1e-9
assert close(e, [0, 0, 0, 1])
p, e = measure_first([0.6, 0, 0, 0.8j], 1)
assert abs(p - 0.64) < 1e-9
assert close(e, [0, 0, 0, 1j])
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 4.
