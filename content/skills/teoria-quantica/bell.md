Os quatro **estados de Bell** são os estados mais importantes de dois qubits. Eles são maximamente emaranhados e formam uma base.

## Os quatro estados

$$
\ket{\Phi^\pm} = \frac{1}{\sqrt2}\big(\ket{00} \pm \ket{11}\big), \qquad
\ket{\Psi^\pm} = \frac{1}{\sqrt2}\big(\ket{01} \pm \ket{10}\big).
$$

Nos $\Phi$, os dois qubits dão resultados **iguais** na base Z; nos $\Psi$, resultados **diferentes**.

No estado $\ket{\Psi^-}$, o primeiro qubit deu $0$. Qual será o resultado do segundo, também na base Z?

```exercise:number
id: bell-psi
answer: 1
```

## Preparando e medindo

O circuito H + CNOT leva a base padrão à base de Bell:

$$
\ket{00}\to\ket{\Phi^+}, \quad \ket{10}\to\ket{\Phi^-}, \quad \ket{01}\to\ket{\Psi^+}, \quad \ket{11}\to\ket{\Psi^-}.
$$

![Circuito que prepara estados de Bell e o inverso que os mede](/content/teoria-quantica/bell-medida.svg)

Como o circuito é unitário, rodá-lo **ao contrário** (CNOT e depois H) identifica qual estado de Bell temos. Isso é uma **medida de Bell**: dois bits que apontam um dos quatro estados.

A medida de Bell de um par deu os bits $10$ (primeiro o qubit que passou por H). Qual era o estado? Responda `phi+`, `phi-`, `psi+` ou `psi-`.

```exercise:text
id: bell-medida
answer: phi- | phi -
```

## De um para outro com uma porta local

Aplicando portas só no **primeiro** qubit, passamos de um estado de Bell a outro:

$$
(Z\otimes I)\ket{\Phi^+} = \ket{\Phi^-}, \qquad (X\otimes I)\ket{\Phi^+} = \ket{\Psi^+}.
$$

Qual porta (uma letra), aplicada no primeiro qubit, leva $\ket{\Psi^+}$ em $\ket{\Psi^-}$ a menos de fase global? Considere apenas X e Z.

```exercise:text
id: bell-porta
answer: Z
```

## Correlação em todas as bases

Em $\ket{\Phi^+}$, os resultados também são iguais na base X, porque

$$
\ket{\Phi^+} = \frac{1}{\sqrt2}\big(\ket{++} + \ket{--}\big).
$$

Um par clássico de moedas combinadas não consegue imitar isso em todas as bases ao mesmo tempo. A próxima skill mede essa diferença.

Qual é a probabilidade de os dois resultados serem **iguais** ao medir $\ket{\Phi^+}$ com os dois lados na base X?

```exercise:number
id: bell-base-x
answer: 1
```

## Em Python

Escreva uma função que recebe os bits `a` e `b` e devolve o vetor com as 4 amplitudes do estado de Bell preparado a partir de $\ket{ab}$.

```exercise:python
id: bell-codigo
input: a, b | int | 0 ou 1 | 1, 0
output: estado_de_bell | np.ndarray | vetor com as 4 amplitudes, na ordem 00, 01, 10, 11, formato (4,) | np.array([2**-0.5, 0, 0, -2**-0.5])
---
import numpy as np

H = np.array([[1, 1], [1, -1]]) / np.sqrt(2)
CNOT = np.array([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]])

def estado_de_bell(a, b):
    estado = np.zeros(4)
    estado[2 * a + b] = 1  # |ab>
    # aplique H no primeiro qubit e depois a CNOT
    return estado
---
>>> estado_de_bell(0, 0)
np.array([2**-0.5, 0, 0, 2**-0.5])
---
>>> estado_de_bell(1, 0)
np.array([2**-0.5, 0, 0, -2**-0.5])
---
>>> estado_de_bell(0, 1)
np.array([0, 2**-0.5, 2**-0.5, 0])
>>> estado_de_bell(1, 1)
np.array([0, 2**-0.5, -2**-0.5, 0])
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 6.
