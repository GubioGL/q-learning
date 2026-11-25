A quantum program is usually drawn as a **circuit**: lines that represent qubits and boxes that represent gates.

## Reading a circuit

- Each **line** is a qubit; time runs from **left to right**.
- Each **box** is a gate.
- The **meter** symbol at the end indicates a measurement.

![Circuit with H, Z, H and a measurement](/content/basico/circuito-hzh.svg)

The circuit above starts in $\ket{0}$ and applies H, Z and H. Be careful with the algebraic notation: the gate applied **first** sits closest to the ket, so the order is reversed compared with the drawing. If the drawing shows A and then B, we write

$$
B\,A\,\ket{0}.
$$

A circuit applies X and then H. How do we write the total operator? (Write the two letters in algebraic order, with no space.)

```exercise:text
id: circuitos-ordem
answer: HX
```

What is the probability of measuring $1$ in the circuit H, Z, H with input $\ket{0}$?

```exercise:number
id: circuitos-hzh
answer: 1
```

## Interference in a circuit

Compare two circuits with input $\ket{0}$:

- H, **measurement**, H, measurement: the first measurement picks $0$ or $1$ at random, and so does the second.
- H, H, measurement: always $0$.

The only difference is the measurement in the middle. It destroys the superposition and, with it, the interference.

In the first circuit, what is the probability that the **final** measurement gives $0$?

```exercise:number
id: circuitos-medida-meio
answer: 0.5
```

## Depth

The **depth** of a circuit is the number of layers of gates, when gates on different qubits can run at the same time. It matters because real qubits lose coherence over time: shallow circuits suffer less noise.

A circuit has 3 qubits and applies one H gate to each, and nothing else. What is its depth?

```exercise:number
id: circuitos-profundidade
answer: 1
```

## In Python: your first simulator

Write a function that runs a 1-qubit circuit. It takes a string of gates in drawing order, starts in $\ket{0}$ and returns $P(1)$.

```exercise:python
id: circuitos-simulador
---
r = 2**-0.5
GATES = {
    "X": [[0, 1], [1, 0]],
    "Z": [[1, 0], [0, -1]],
    "H": [[r, r], [r, -r]],
}

def prob_1(circuit):
    state = [1, 0]
    # apply each gate: new[i] = sum_j U[i][j] * state[j]
    return abs(state[1]) ** 2
---
assert abs(prob_1("") - 0) < 1e-9
assert abs(prob_1("X") - 1) < 1e-9
assert abs(prob_1("H") - 0.5) < 1e-9
assert abs(prob_1("HZH") - 1) < 1e-9
assert abs(prob_1("XHXH") - 1) < 1e-9
```

To build circuits without programming, try the free simulator [Quirk](https://algassert.com/quirk), which runs in the browser.

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 2.
