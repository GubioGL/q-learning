Um programa quântico costuma ser desenhado como um **circuito**: linhas que representam qubits e caixas que representam portas.

## Lendo um circuito

- Cada **linha** é um qubit; o tempo corre da **esquerda para a direita**.
- Cada **caixa** é uma porta.
- O símbolo de **medidor** no fim indica uma medida.

![Circuito com H, Z, H e uma medida](/content/basico/circuito-hzh.svg)

O circuito acima começa em $\ket{0}$ e aplica H, Z e H. Cuidado com a notação algébrica: a porta aplicada **primeiro** fica mais perto do ket, então a ordem se inverte em relação ao desenho. Se o desenho mostra A e depois B, escrevemos

$$
B\,A\,\ket{0}.
$$

Um circuito aplica X e depois H. Como se escreve o operador total? (Escreva as duas letras na ordem algébrica, sem espaço.)

```exercise:text
id: circuitos-ordem
answer: HX
```

Qual é a probabilidade de medir $1$ no circuito H, Z, H com entrada $\ket{0}$?

```exercise:number
id: circuitos-hzh
answer: 1
```

## Interferência num circuito

Compare dois circuitos com entrada $\ket{0}$:

- H, **medida**, H, medida: a primeira medida sorteia $0$ ou $1$, e a segunda também.
- H, H, medida: sempre $0$.

A única diferença é a medida no meio. Ela destrói a superposição e, com isso, a interferência.

No primeiro circuito, qual é a probabilidade de a medida **final** dar $0$?

```exercise:number
id: circuitos-medida-meio
answer: 0.5
```

## Profundidade

A **profundidade** de um circuito é o número de camadas de portas, quando portas em qubits diferentes podem rodar ao mesmo tempo. Ela importa porque qubits reais perdem a coerência com o tempo: circuitos rasos sofrem menos ruído.

Um circuito tem 3 qubits e aplica uma porta H em cada um, sem mais nada. Qual é a profundidade?

```exercise:number
id: circuitos-profundidade
answer: 1
```

## Em Python: seu primeiro simulador

Escreva uma função que roda um circuito de 1 qubit. Ela recebe uma string de portas na ordem do desenho, começa em $\ket{0}$ e devolve $P(1)$.

```exercise:python
id: circuitos-simulador
input: circuito | str | letras X, Z e H na ordem do desenho; pode ser vazio | "HZH"
output: prob_1 | float | probabilidade de medir 1, entre 0 e 1 | 1.0
---
r = 2**-0.5
PORTAS = {
    "X": [[0, 1], [1, 0]],
    "Z": [[1, 0], [0, -1]],
    "H": [[r, r], [r, -r]],
}

def prob_1(circuito):
    estado = [1, 0]
    # aplique cada porta: novo[i] = soma_j U[i][j] * estado[j]
    return abs(estado[1]) ** 2
---
>>> prob_1("X")
1
---
>>> prob_1("H")
0.5
>>> prob_1("")
0
---
>>> prob_1("HZH")
1
>>> prob_1("XHXH")
1
>>> prob_1("HXH")
0
```

Para montar circuitos sem programar, experimente o simulador gratuito [Quirk](https://algassert.com/quirk), que roda no navegador.

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 2.
