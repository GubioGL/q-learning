Portas de um qubit nunca criam emaranhamento. Para isso, os qubits precisam interagir, e a porta de interação mais usada é a **CNOT**.

## A CNOT

A CNOT inverte o **alvo** quando o **controle** é $1$. Aqui o controle é o qubit da esquerda:

$$
\text{CNOT}\ket{a}\ket{b} = \ket{a}\ket{a \oplus b}.
$$

Na base $\ket{00}, \ket{01}, \ket{10}, \ket{11}$, ela é uma matriz que troca as duas últimas amplitudes:

$$
\text{CNOT} = \begin{pmatrix} 1&0&0&0 \\ 0&1&0&0 \\ 0&0&0&1 \\ 0&0&1&0 \end{pmatrix}.
$$

Para qual estado a CNOT leva $\ket{11}$? (Só os dígitos.)

```exercise:text
id: cnot-onze
answer: 10
```

## Criando emaranhamento

Por linearidade, a CNOT também age em superposições. Começando em $\ket{00}$, aplicamos H no primeiro qubit e depois a CNOT:

$$
\ket{00} \xrightarrow{H} \frac{1}{\sqrt2}\big(\ket{00} + \ket{10}\big) \xrightarrow{\text{CNOT}} \frac{1}{\sqrt2}\big(\ket{00} + \ket{11}\big).
$$

![Circuito que prepara um par emaranhado: H e CNOT](/content/computacao-quantica/bell.svg)

Qual é a probabilidade de obter $01$ ao medir o estado final?

```exercise:number
id: cnot-bell
answer: 0
```

## Outras portas controladas

Qualquer porta $U$ tem uma versão controlada: aplica $U$ no alvo só se o controle for $1$. A **CZ** muda o sinal apenas de $\ket{11}$, e por isso é simétrica: tanto faz qual qubit é o controle. Colocando H no alvo antes e depois, transformamos uma na outra, porque $HZH = X$.

A porta **SWAP** troca os estados de dois qubits e pode ser feita com CNOTs alternadas: uma, depois outra com controle e alvo trocados, depois a primeira de novo.

Quantas CNOTs essa construção da SWAP usa?

```exercise:number
id: cnot-swap
answer: 3
```

## Toffoli

A **Toffoli** (CCNOT) inverte o alvo só se os **dois** controles forem $1$:

$$
\text{Toffoli}\ket{a}\ket{b}\ket{c} = \ket{a}\ket{b}\ket{ab \oplus c}.
$$

Ela faz qualquer cálculo clássico reversível, então um computador quântico consegue fazer tudo que um clássico faz.

Quantos dos 8 estados da base a Toffoli **altera**?

```exercise:number
id: cnot-toffoli
answer: 2
```

## Em Python

Escreva a CNOT (controle à esquerda) agindo num vetor de 4 amplitudes e use-a para montar o par emaranhado a partir de $\ket{00}$.

```exercise:python
id: cnot-codigo
input: estado | np.ndarray | vetor com as 4 amplitudes, na ordem 00, 01, 10, 11, formato (4,) | np.array([1, 2, 3, 4])
output: cnot | np.ndarray | as 4 amplitudes depois da CNOT, formato (4,) | np.array([1, 2, 4, 3])
output: par_emaranhado | np.ndarray | vetor com as 4 amplitudes, na ordem 00, 01, 10, 11, formato (4,) | np.array([2**-0.5, 0, 0, 2**-0.5])
---
import numpy as np

H = np.array([[1, 1], [1, -1]]) / np.sqrt(2)
H_NO_PRIMEIRO = np.kron(H, np.eye(2))  # matriz 4x4

def cnot(estado):
    return estado.copy()

def par_emaranhado():
    estado = np.array([1, 0, 0, 0])
    return estado
---
>>> cnot(np.array([1, 2, 3, 4]))
np.array([1, 2, 4, 3])
---
>>> cnot(cnot(np.array([1, 2, 3, 4])))
np.array([1, 2, 3, 4])
>>> cnot(np.array([0, 0, 1, 0]))
np.array([0, 0, 0, 1])
---
>>> par_emaranhado()
np.array([2**-0.5, 0, 0, 2**-0.5])
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
