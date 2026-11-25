Todo computador, do celular ao supercomputador, guarda informação usando **bits**. Antes de falar de qubits, vale entender bem o que um bit é e como, juntando vários deles, representamos números.

## O bit

Um bit é a menor unidade de informação: ele tem apenas dois valores possíveis, que escrevemos como $0$ e $1$. Fisicamente, pode ser uma tensão baixa ou alta num fio, um capacitor descarregado ou carregado, um furo ou não num cartão.

Com $n$ bits conseguimos formar $2^n$ sequências diferentes, porque cada bit novo dobra as possibilidades.

Quantas sequências diferentes existem com **4 bits**?

```exercise:number
id: bits-combinacoes
answer: 16
```

## Números em binário

No sistema decimal, cada posição vale uma potência de 10. No binário, cada posição vale uma **potência de 2**:

![Os bits 1 0 1 com pesos 4, 2 e 1](/content/basico/binario-101.svg)

Assim, a sequência $b_{n-1}\dots b_1 b_0$ representa o número

$$
N = \sum_{k=0}^{n-1} b_k \, 2^k .
$$

Por exemplo, $101_2 = 1\cdot 4 + 0\cdot 2 + 1\cdot 1 = 5$.

Qual é o valor decimal de $1101_2$?

```exercise:number
id: bits-1101
answer: 13
```

Para fazer o caminho inverso, dividimos o número por 2 repetidamente e lemos os restos de baixo para cima. Por exemplo, $6 = 4 + 2$, então $6 = 110_2$.

Escreva o número $9$ em binário.

```exercise:text
id: bits-nove
answer: 1001 | 0b1001
```

## Agora em Python

Em Python, `int("101", 2)` converte binário para decimal. Mas vamos escrever a conversão nós mesmos, usando a soma acima. Complete a função para que ela devolva o valor decimal de uma string de bits.

```exercise:python
id: bits-para-decimal
---
def binario_para_decimal(bits):
    total = 0
    # percorra os bits e some b_k * 2**k
    return total
---
assert binario_para_decimal("0") == 0
assert binario_para_decimal("101") == 5
assert binario_para_decimal("1101") == 13
assert binario_para_decimal("11111111") == 255
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 1.
