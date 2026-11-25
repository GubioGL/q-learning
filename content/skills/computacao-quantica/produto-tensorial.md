Um qubit sozinho faz pouca coisa. O poder aparece quando juntamos vários, e a operação que junta sistemas quânticos é o **produto tensorial**.

## Juntando dois qubits

Se um qubit está em $\ket{a}$ e outro em $\ket{b}$, o par está em $\ket{a}\otimes\ket{b}$, que abreviamos como $\ket{a}\ket{b}$ ou $\ket{ab}$. Em componentes:

$$
\begin{pmatrix} a_0 \\ a_1 \end{pmatrix} \otimes \begin{pmatrix} b_0 \\ b_1 \end{pmatrix} = \begin{pmatrix} a_0 b_0 \\ a_0 b_1 \\ a_1 b_0 \\ a_1 b_1 \end{pmatrix}.
$$

Neste curso, o qubit da **esquerda** é o primeiro, e a ordem da base é $\ket{00}, \ket{01}, \ket{10}, \ket{11}$.

![As quatro amplitudes do produto tensorial](/content/computacao-quantica/tensorial.svg)

O estado geral de dois qubits é

$$
\ket{\psi} = c_{00}\ket{00} + c_{01}\ket{01} + c_{10}\ket{10} + c_{11}\ket{11},
$$

com a soma dos $|c_{ij}|^2$ igual a 1.

Qual é a amplitude de $\ket{10}$ em $\ket{+}\otimes\ket{+}$?

```exercise:number
id: tensorial-mais-mais
answer: 0.5
tolerance: 0.001
```

## Crescimento exponencial

Com $n$ qubits, há $2^n$ amplitudes. É por isso que simular muitos qubits num computador comum fica inviável.

Quantas amplitudes tem o estado de **10 qubits**?

```exercise:number
id: tensorial-dez
answer: 1024
```

Atenção: ter $2^n$ amplitudes não significa poder **ler** $2^n$ números. Ao medir, obtemos só $n$ bits.

## Portas em paralelo

Aplicar $A$ no primeiro qubit e $B$ no segundo é aplicar a matriz $A \otimes B$, de tamanho $4\times 4$:

$$
A \otimes B = \begin{pmatrix} a_{00}B & a_{01}B \\ a_{10}B & a_{11}B \end{pmatrix}, \qquad (A\otimes B)(\ket{a}\otimes\ket{b}) = A\ket{a} \otimes B\ket{b}.
$$

Se só um qubit recebe uma porta, o outro recebe a identidade: $X \otimes I$ age apenas no primeiro.

Para qual estado a porta $X \otimes I$ leva $\ket{01}$? (Escreva só os dois dígitos.)

```exercise:text
id: tensorial-x-i
answer: 11
```

## Em Python

Escreva o produto tensorial de dois vetores de qualquer tamanho. Tente primeiro com laços; depois compare com `np.kron`, que faz isso no NumPy.

```exercise:python
id: tensorial-codigo
input: u, v | np.ndarray | dois vetores, formatos (n,) e (m,) | np.array([1, 2]), np.array([3, 4])
output: tensor | np.ndarray | vetor de formato (n·m,) | np.array([3, 4, 6, 8])
---
import numpy as np

def tensor(u, v):
    return np.zeros(len(u) * len(v))
---
>>> tensor(np.array([1, 2]), np.array([3, 4]))
np.array([3, 4, 6, 8])
---
>>> tensor(np.array([1, 0]), np.array([0, 1]))
np.array([0, 1, 0, 0])
>>> tensor(np.array([1, 2, 3]), np.array([1, 1j]))
np.array([1, 1j, 2, 2j, 3, 3j])
---
>>> tensor(np.array([0, 1]), tensor(np.array([1, 0]), np.array([0, 1])))
np.array([0, 0, 0, 0, 0, 1, 0, 0])
>>> len(tensor(np.ones(4), np.ones(8)))
32
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
