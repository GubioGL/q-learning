Um mesmo vetor pode ser descrito por eixos diferentes. Em computação quântica, escolher os eixos é escolher **qual medida fazer**.

## A amplitude é uma projeção

Numa base ortonormal $\{\ket{a}, \ket{b}\}$, todo estado se escreve

$$
\ket{\psi} = \alpha\ket{a} + \beta\ket{b}, \qquad \alpha = \braket{a|\psi}, \quad \beta = \braket{b|\psi}.
$$

Para ver por quê, multiplique por $\bra{a}$ pela esquerda: $\braket{a|\psi} = \alpha\braket{a|a} + \beta\braket{a|b} = \alpha$. O produto interno **projeta** o estado na direção escolhida.

![Projeção de um estado na direção de +](/content/algebra-linear/projecao.svg)

Assim, a regra de Born ganha uma forma que vale em qualquer base:

$$
P(a) = |\braket{a|\psi}|^2.
$$

Para $\ket{\psi} = 0{,}6\ket{0} + 0{,}8\ket{1}$, qual é a probabilidade de obter $\ket{+}$ numa medida na base $\{\ket{+}, \ket{-}\}$?

```exercise:number
id: projecoes-mais
answer: 0.98
tolerance: 0.001
```

E a de obter $\ket{-}$?

```exercise:number
id: projecoes-menos
answer: 0.02
tolerance: 0.001
```

## Três bases importantes

$$
\begin{array}{c|c}
\text{base } Z & \ket{0},\ \ket{1} \\ \hline
\text{base } X & \ket{+},\ \ket{-} \\ \hline
\text{base } Y & \ket{i} = \tfrac{1}{\sqrt2}(\ket{0} + i\ket{1}),\ \ket{-i} = \tfrac{1}{\sqrt2}(\ket{0} - i\ket{1})
\end{array}
$$

Cada uma corresponde a um eixo da esfera de Bloch. Um estado que é certo numa delas é 50/50 nas outras duas.

Um qubit está em $\ket{i}$. Qual é a probabilidade de obter $\ket{+}$ numa medida na base X?

```exercise:number
id: projecoes-i
answer: 0.5
tolerance: 0.001
```

## Medindo em outra base na prática

O hardware costuma medir só na base Z. Para medir na base X, aplicamos H **antes** da medida: como $H\ket{+} = \ket{0}$ e $H\ket{-} = \ket{1}$, o resultado $0$ significa $\ket{+}$ e o $1$ significa $\ket{-}$.

## Em Python

Escreva uma função que recebe um estado e uma base (matriz em que cada **linha** é um vetor da base) e devolve o vetor de probabilidades.

```exercise:python
id: projecoes-codigo
input: estado | np.ndarray | vetor normalizado com as 2 amplitudes [alfa, beta], formato (2,) | np.array([0.6, 0.8])
input: base | np.ndarray | matriz (2, 2); cada linha é um vetor da base | BASE_X
output: probabilidades | np.ndarray | uma probabilidade por vetor da base, formato (2,) | np.array([0.98, 0.02])
---
import numpy as np

r = 1 / np.sqrt(2)
BASE_Z = np.array([[1, 0], [0, 1]])
BASE_X = np.array([[r, r], [r, -r]])
BASE_Y = np.array([[r, r * 1j], [r, -r * 1j]])

def probabilidades(estado, base):
    # uma probabilidade para cada linha da base
    return np.zeros(2)
---
>>> probabilidades(np.array([0.6, 0.8]), BASE_X)
np.array([0.98, 0.02])
---
>>> probabilidades(np.array([0.6, 0.8]), BASE_Z)
np.array([0.36, 0.64])
>>> probabilidades(np.array([2**-0.5, 1j * 2**-0.5]), BASE_X)
np.array([0.5, 0.5])
---
>>> probabilidades(np.array([2**-0.5, 1j * 2**-0.5]), BASE_Y)
np.array([1, 0])
>>> probabilidades(np.array([1, 0]), BASE_Y)
np.array([0.5, 0.5])
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
