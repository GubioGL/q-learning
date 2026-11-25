NAND is enough for any classical computation. Is there a small set of gates that is enough for any **quantum** computation?

## Universal, but approximate

There are infinitely many unitaries, so a finite set of gates cannot generate all of them exactly. We ask for something more modest: a set is **universal** if it can **approximate** any unitary with whatever precision we want.

## What a universal set needs

- to create **superposition** (X, Z and CNOT alone cannot);
- to create **entanglement** (1-qubit gates alone cannot);
- to use **complex** amplitudes (H and CNOT only produce real numbers);
- to go beyond the **Clifford group**.

Which of these abilities is missing from the set of all **1-qubit** gates? Answer `superposition` or `entanglement`.

```exercise:text
id: universal-falta
answer: entanglement
```

## The Clifford group

H, S and CNOT generate the **Clifford group**. They create superposition, entanglement and complex numbers, and even so they are **not** universal. The **Gottesman–Knill theorem** says that circuits with only these gates, inputs in the standard basis and measurements in the Z basis can be simulated efficiently on a classical computer.

Adding the T gate changes everything: $\{H, T, \text{CNOT}\}$ is universal.

![The Clifford plus T set is universal](/content/computacao-quantica/universalidade.en.svg)

There is no need to list S, since it can be obtained from T gates. How many?

```exercise:number
id: universal-s
answer: 2
```

## The cost of approximating

The **Solovay–Kitaev theorem** guarantees that approximating a 1-qubit gate with error $\varepsilon$ requires a number of gates that grows only as a power of $\log(1/\varepsilon)$. Improving the precision a lot costs little.

In error-corrected computers, Clifford gates are usually cheap and T is expensive. That is why we count the number of T gates, the **T-count**, of an algorithm.

What is the T-count of the circuit T, H, T, S, CNOT, T? (Count only the T gates that appear.)

```exercise:number
id: universal-tcount
answer: 3
```

## In Python

The S gate is a multiple of T. Each diagonal gate `[1, e^{i k π/4}]` can be described by the integer $k$ alone: Z is $k = 4$, S is $k = 2$ and T is $k = 1$. Write a function that takes a circuit of diagonal gates and returns the **smallest** number of T gates needed to rewrite it, knowing that S and Z are free.

```exercise:python
id: universal-codigo
input: circuit | str | letters Z, S and T; may be empty | "TSTZT"
output: min_t_count | int | smallest number of T gates | 1
---
K = {"Z": 4, "S": 2, "T": 1}

def min_t_count(circuit):
    # add the k values; parity tells whether one T is left
    return circuit.count("T")
---
>>> min_t_count("TT")
0
---
>>> min_t_count("T")
1
>>> min_t_count("")
0
---
>>> min_t_count("TSTZT")
1
>>> min_t_count("SZS")
0
>>> min_t_count("TTTT")
0
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 4.
