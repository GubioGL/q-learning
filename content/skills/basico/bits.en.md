Every computer, from a phone to a supercomputer, stores information using **bits**. Before talking about qubits, it helps to understand well what a bit is and how, by putting several together, we represent numbers.

## The bit

A bit is the smallest unit of information: it has only two possible values, which we write as $0$ and $1$. Physically it can be a low or high voltage on a wire, a discharged or charged capacitor, a hole or no hole in a card.

With $n$ bits we can form $2^n$ different sequences, because each new bit doubles the possibilities.

How many different sequences are there with **4 bits**?

```exercise:number
id: bits-combinacoes
answer: 16
```

## Numbers in binary

In the decimal system, each position is worth a power of 10. In binary, each position is worth a **power of 2**:

![The bits 1 0 1 with weights 4, 2 and 1](/content/basico/binario-101.svg)

So the sequence $b_{n-1}\dots b_1 b_0$ represents the number

$$
N = \sum_{k=0}^{n-1} b_k \, 2^k .
$$

For example, $101_2 = 1\cdot 4 + 0\cdot 2 + 1\cdot 1 = 5$.

What is the decimal value of $1101_2$?

```exercise:number
id: bits-1101
answer: 13
```

To go the other way, we divide the number by 2 repeatedly and read the remainders from bottom to top. For example, $6 = 4 + 2$, so $6 = 110_2$.

Write the number $9$ in binary.

```exercise:text
id: bits-nove
answer: 1001 | 0b1001
```

## Now in Python

In Python, `int("101", 2)` converts binary to decimal. But let us write the conversion ourselves, using the sum above. Complete the function so that it returns the decimal value of a string of bits.

```exercise:python
id: bits-para-decimal
---
def binary_to_decimal(bits):
    total = 0
    # loop over the bits and add b_k * 2**k
    return total
---
assert binary_to_decimal("0") == 0
assert binary_to_decimal("101") == 5
assert binary_to_decimal("1101") == 13
assert binary_to_decimal("11111111") == 255
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 1.
