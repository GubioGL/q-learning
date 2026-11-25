Bits representam números. E letras? Basta combinar uma tabela: cada caractere ganha um número, e o número vira binário. A tabela mais famosa é a **ASCII**.

## A tabela ASCII

O ASCII usa **7 bits** por caractere, então tem $2^7 = 128$ códigos. Alguns deles:

$$
\begin{array}{c|c|c}
\text{caractere} & \text{decimal} & \text{binário} \\ \hline
\text{0} & 48 & 0110000 \\
\text{A} & 65 & 1000001 \\
\text{B} & 66 & 1000010 \\
\text{a} & 97 & 1100001
\end{array}
$$

Na prática, guardamos cada caractere num byte (8 bits), com um zero à esquerda.

![A letra A vira 65, que vira 01000001](/content/basico/ascii-a.svg)

As letras estão em ordem: se A é 65, então B é 66, C é 67, e assim por diante.

Qual é o código decimal da letra **E**?

```exercise:number
id: ascii-e
answer: 69
```

## O truque do sexto bit

Compare A ($1000001$) com a ($1100001$): só um bit muda, o que vale $2^5 = 32$. Isso vale para todas as letras, então trocar maiúscula por minúscula é inverter um único bit.

Se M tem código 77, qual é o código de **m**?

```exercise:number
id: ascii-m
answer: 109
```

Que palavra de duas letras está em `01001111 01001001`?

```exercise:text
id: ascii-palavra
answer: OI
```

## Além do ASCII

Com 128 códigos não cabem "ç", "ã" nem emojis. O padrão atual, o **Unicode**, dá um número a mais de cem mil caracteres. A codificação UTF-8 mantém o ASCII intacto e usa de 2 a 4 bytes para o resto.

## Em Python

`ord("A")` devolve $65$, e `format(65, "08b")` devolve `"01000001"`. Escreva uma função que transforma um texto ASCII em bits, 8 por caractere, sem espaços.

```exercise:python
id: ascii-texto-para-bits
input: texto | str | texto ASCII de qualquer tamanho, até vazio | "A"
output: texto_para_bits | str | 8 caracteres "0" ou "1" por letra, sem espaços | "01000001"
---
def texto_para_bits(texto):
    # junte os 8 bits de cada caractere
    return ""
---
>>> texto_para_bits("A")
"01000001"
---
>>> texto_para_bits("OI")
"0100111101001001"
---
>>> texto_para_bits("")
""
>>> len(texto_para_bits("qubit"))
40
>>> texto_para_bits(" a")
"0010000001100001"
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 1.
