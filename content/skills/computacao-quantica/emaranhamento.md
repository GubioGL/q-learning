Alguns estados de dois qubits são só "um qubit aqui, outro ali". Outros não podem ser separados de jeito nenhum: são **emaranhados**.

## Estados produto

Um **estado produto** pode ser escrito como $\ket{a}\otimes\ket{b}$. Por exemplo,

$$
\frac12\big(\ket{00} + \ket{01} + \ket{10} + \ket{11}\big) = \ket{+}\otimes\ket{+}.
$$

Num estado produto, medir um qubit não muda nada na previsão para o outro.

## Estados emaranhados

Um estado **emaranhado** é aquele que não é produto. O exemplo clássico é

$$
\ket{\Phi^+} = \frac{1}{\sqrt2}\big(\ket{00} + \ket{11}\big).
$$

Vamos provar. Se fosse produto, teríamos $c_{00} = a_0b_0$, $c_{01} = a_0b_1$, $c_{10} = a_1b_0$ e $c_{11} = a_1b_1$. Como $c_{01} = 0$, ou $a_0 = 0$ (e então $c_{00} = 0$), ou $b_1 = 0$ (e então $c_{11} = 0$). Nos dois casos há contradição.

![Estado produto e estado emaranhado: grade de amplitudes](/content/computacao-quantica/emaranhamento.svg)

## Um teste rápido

Para dois qubits em estado puro, há um critério simples:

$$
\text{produto} \iff c_{00}\,c_{11} = c_{01}\,c_{10}.
$$

Na grade de amplitudes, isso é dizer que o determinante é zero. A quantidade

$$
C = 2\,|c_{00}c_{11} - c_{01}c_{10}|
$$

é a **concorrência**: vale $0$ para estados produto e $1$ para os maximamente emaranhados.

Qual é a concorrência de $\ket{\Phi^+}$?

```exercise:number
id: emaranhamento-bell
answer: 1
tolerance: 0.001
```

E a de $0{,}6\ket{00} + 0{,}8\ket{11}$?

```exercise:number
id: emaranhamento-parcial
answer: 0.96
tolerance: 0.001
```

O estado $\tfrac12\left(\ket{00} - \ket{01} + \ket{10} - \ket{11}\right)$ é `produto` ou `emaranhado`?

```exercise:text
id: emaranhamento-teste
answer: produto
```

## O que o emaranhamento não faz

No estado $\ket{\Phi^+}$, medir um qubit determina o resultado do outro, por mais longe que esteja. Mas isso **não transmite mensagem**: cada lado, sozinho, vê apenas bits aleatórios 50/50. A correlação só aparece quando os dois comparam os resultados, e para isso precisam de um canal comum.

## Em Python

```exercise:python
id: emaranhamento-codigo
input: c00, c01, c10, c11 | float / complex | as 4 amplitudes do estado, normalizadas | 0.6, 0, 0, 0.8
output: concorrencia | float | a concorrência, entre 0 e 1 | 0.96
---
def concorrencia(c00, c01, c10, c11):
    return 0
---
>>> concorrencia(0.6, 0, 0, 0.8)
0.96
---
>>> concorrencia(2**-0.5, 0, 0, 2**-0.5)
1
>>> concorrencia(0.5, 0.5, 0.5, 0.5)
0
---
>>> concorrencia(0.6, 0, 0, 0.8j)
0.96
>>> concorrencia(0.5, 0.5, 0.5, -0.5)
1
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
