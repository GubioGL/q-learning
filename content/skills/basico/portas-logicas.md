Guardar bits não basta: um computador precisa **transformar** bits. Quem faz isso são as portas lógicas, pequenas funções que recebem bits e devolvem bits.

## As três portas principais

- **NOT** inverte um bit: $0$ vira $1$ e $1$ vira $0$. Escrevemos $\overline{A}$.
- **AND** dá $1$ só quando as duas entradas são $1$. Escrevemos $AB$.
- **OR** dá $1$ quando pelo menos uma entrada é $1$. Escrevemos $A+B$ (aqui o "+" não é a soma comum).

![Portas NOT, AND e OR com entradas e saída](/content/basico/portas-logicas.svg)

Uma **tabela-verdade** lista a saída para todas as entradas possíveis:

$$
\begin{array}{cc|c|c|c}
A & B & A \text{ AND } B & A \text{ OR } B & A \text{ XOR } B \\ \hline
0 & 0 & 0 & 0 & 0 \\
0 & 1 & 0 & 1 & 1 \\
1 & 0 & 0 & 1 & 1 \\
1 & 1 & 1 & 1 & 0
\end{array}
$$

A última coluna é a porta **XOR** ("ou exclusivo", $A \oplus B$): ela dá $1$ quando as entradas são **diferentes**. É a soma de dois bits sem o "vai um", e vai reaparecer o tempo todo na computação quântica.

Quantas linhas tem a tabela-verdade de uma porta com **3 entradas**?

```exercise:number
id: portas-linhas
answer: 8
```

## Combinando portas

A saída de uma porta pode ser a entrada de outra. Por exemplo, $\overline{AB}$ é um AND seguido de um NOT: a porta **NAND**.

Quanto vale $\overline{A B} \oplus B$ quando $A = 1$ e $B = 1$?

```exercise:number
id: portas-nand-xor
answer: 1
```

Um resultado útil são as **leis de De Morgan**, que trocam AND por OR quando o NOT atravessa a expressão:

$$
\overline{AB} = \overline{A} + \overline{B}, \qquad \overline{A + B} = \overline{A}\,\overline{B}.
$$

## Universalidade

Um conjunto de portas é **universal** quando, combinando só elas, dá para construir qualquer função de bits. A NAND sozinha já é universal! Ligando as duas entradas dela no mesmo bit, obtemos um NOT:

$$
\text{NAND}(A, A) = \overline{A A} = \overline{A}.
$$

Escreva as funções `NOT`, `AND` e `OR` usando **apenas** `nand`.

```exercise:python
id: portas-nand-universal
---
def nand(a, b):
    return 1 - a * b

def NOT(a):
    return 0  # use nand

def AND(a, b):
    return 0  # use nand

def OR(a, b):
    return 0  # dica: De Morgan
---
assert [NOT(a) for a in (0, 1)] == [1, 0]
assert [AND(a, b) for a in (0, 1) for b in (0, 1)] == [0, 0, 0, 1]
assert [OR(a, b) for a in (0, 1) for b in (0, 1)] == [0, 1, 1, 1]
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 1.
