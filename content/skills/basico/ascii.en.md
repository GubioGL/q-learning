Bits represent numbers. What about letters? We just agree on a table: each character gets a number, and the number becomes binary. The most famous table is **ASCII**.

## The ASCII table

ASCII uses **7 bits** per character, so it has $2^7 = 128$ codes. Some of them:

$$
\begin{array}{c|c|c}
\text{character} & \text{decimal} & \text{binary} \\ \hline
\text{0} & 48 & 0110000 \\
\text{A} & 65 & 1000001 \\
\text{B} & 66 & 1000010 \\
\text{a} & 97 & 1100001
\end{array}
$$

In practice, we store each character in one byte (8 bits), with a leading zero.

![The letter A becomes 65, which becomes 01000001](/content/basico/ascii-a.en.svg)

The letters are in order: if A is 65, then B is 66, C is 67, and so on.

What is the decimal code of the letter **E**?

```exercise:number
id: ascii-e
answer: 69
```

## The sixth-bit trick

Compare A ($1000001$) with a ($1100001$): only one bit changes, the one worth $2^5 = 32$. This holds for every letter, so switching between upper and lower case means flipping a single bit.

If M has code 77, what is the code of **m**?

```exercise:number
id: ascii-m
answer: 109
```

Which two-letter word (a greeting in Portuguese) is in `01001111 01001001`?

```exercise:text
id: ascii-palavra
answer: OI
```

## Beyond ASCII

128 codes have no room for "ç", "ã" or emojis. The current standard, **Unicode**, gives a number to more than a hundred thousand characters. The UTF-8 encoding keeps ASCII intact and uses 2 to 4 bytes for the rest.

## In Python

`ord("A")` returns $65$, and `format(65, "08b")` returns `"01000001"`. Write a function that turns an ASCII text into bits, 8 per character, with no spaces.

```exercise:python
id: ascii-texto-para-bits
input: text | str | ASCII text of any length, even empty | "A"
output: text_to_bits | str | 8 characters "0" or "1" per letter, no spaces | "01000001"
---
def text_to_bits(text):
    # join the 8 bits of each character
    return ""
---
>>> text_to_bits("A")
"01000001"
---
>>> text_to_bits("OI")
"0100111101001001"
---
>>> text_to_bits("")
""
>>> len(text_to_bits("qubit"))
40
>>> text_to_bits(" a")
"0010000001100001"
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 1.
