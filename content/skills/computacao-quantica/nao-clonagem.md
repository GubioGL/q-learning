Copiar um bit é trivial. Copiar um qubit desconhecido é **impossível**, e a prova cabe em poucas linhas.

## O que seria uma copiadora

Uma copiadora quântica seria uma unitária $U$ que, para **todo** estado $\ket{\psi}$, faz

$$
U\big(\ket{\psi}\ket{0}\big) = \ket{\psi}\ket{\psi}.
$$

## A CNOT não copia?

Ela copia a base: $\ket{0}\ket{0} \to \ket{0}\ket{0}$ e $\ket{1}\ket{0} \to \ket{1}\ket{1}$. Mas, com uma superposição,

$$
\text{CNOT}\,\big(\alpha\ket{0} + \beta\ket{1}\big)\ket{0} = \alpha\ket{00} + \beta\ket{11},
$$

enquanto a cópia de verdade seria

$$
\big(\alpha\ket{0} + \beta\ket{1}\big)\big(\alpha\ket{0} + \beta\ket{1}\big) = \alpha^2\ket{00} + \alpha\beta\ket{01} + \alpha\beta\ket{10} + \beta^2\ket{11}.
$$

![CNOT aplicada a uma superposição emaranha em vez de copiar](/content/computacao-quantica/nao-clonagem.svg)

As duas só coincidem quando $\alpha\beta = 0$, isto é, quando o estado é $\ket{0}$ ou $\ket{1}$.

Tentamos copiar $\ket{+}$ com uma CNOT. No estado obtido, qual é a amplitude de $\ket{01}$?

```exercise:number
id: clonagem-cnot
answer: 0
```

E qual seria essa amplitude numa cópia perfeita $\ket{+}\ket{+}$?

```exercise:number
id: clonagem-ideal
answer: 0.5
tolerance: 0.001
```

## A prova geral

Suponha que $U$ copie dois estados, $\ket{\psi}$ e $\ket{\phi}$. Unitárias preservam produtos internos, então

$$
\braket{\phi|\psi}\braket{0|0} = \braket{\phi|\psi}\braket{\phi|\psi} \quad\Longrightarrow\quad x = x^2, \quad x = \braket{\phi|\psi}.
$$

As únicas soluções são $x = 0$ (estados ortogonais) e $x = 1$ (estados iguais). Uma copiadora de estados quaisquer não existe.

Uma mesma máquina pode copiar com perfeição $\ket{0}$ e $\ket{+}$? Responda `sim` ou `não`.

```exercise:text
id: clonagem-zero-mais
answer: não | nao
```

## Consequências

- Não dá para descobrir um estado desconhecido copiando-o e medindo as cópias.
- A correção de erros quântica precisa **espalhar** a informação em estados emaranhados, em vez de fazer cópias de segurança.
- Um espião não consegue copiar qubits sem ser notado, o que é a base da criptografia quântica (BB84).

## Em Python

A **fidelidade** entre o que a CNOT produz e a cópia ideal é $F = |\braket{\text{ideal}|\text{obtido}}|^2$. Escreva-a para amplitudes reais $\alpha$ e $\beta$.

```exercise:python
id: clonagem-codigo
---
def fidelidade(alfa, beta):
    obtido = [alfa, 0, 0, beta]
    ideal = [0, 0, 0, 0]  # corrija: as 4 amplitudes da cópia perfeita
    return sum(a * b for a, b in zip(ideal, obtido)) ** 2
---
assert abs(fidelidade(1, 0) - 1) < 1e-9
assert abs(fidelidade(0, 1) - 1) < 1e-9
assert abs(fidelidade(2**-0.5, 2**-0.5) - 0.5) < 1e-9
assert abs(fidelidade(0.6, 0.8) - 0.529984) < 1e-9
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
