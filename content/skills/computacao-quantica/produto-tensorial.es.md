Un qubit solo hace poca cosa. El poder aparece cuando juntamos varios, y la operación que une sistemas cuánticos es el **producto tensorial**.

## Juntar dos qubits

Si un qubit está en $\ket{a}$ y otro en $\ket{b}$, el par está en $\ket{a}\otimes\ket{b}$, que abreviamos como $\ket{a}\ket{b}$ o $\ket{ab}$. En componentes:

$$
\begin{pmatrix} a_0 \\ a_1 \end{pmatrix} \otimes \begin{pmatrix} b_0 \\ b_1 \end{pmatrix} = \begin{pmatrix} a_0 b_0 \\ a_0 b_1 \\ a_1 b_0 \\ a_1 b_1 \end{pmatrix}.
$$

En este curso, el qubit de la **izquierda** es el primero, y el orden de la base es $\ket{00}, \ket{01}, \ket{10}, \ket{11}$.

![Las cuatro amplitudes del producto tensorial](/content/computacao-quantica/tensorial.es.svg)

El estado general de dos qubits es

$$
\ket{\psi} = c_{00}\ket{00} + c_{01}\ket{01} + c_{10}\ket{10} + c_{11}\ket{11},
$$

con la suma de los $|c_{ij}|^2$ igual a 1.

¿Cuál es la amplitud de $\ket{10}$ en $\ket{+}\otimes\ket{+}$?

```exercise:number
id: tensorial-mais-mais
answer: 0.5
tolerance: 0.001
```

## Crecimiento exponencial

Con $n$ qubits, hay $2^n$ amplitudes. Por eso simular muchos qubits en un ordenador común resulta inviable.

¿Cuántas amplitudes tiene el estado de **10 qubits**?

```exercise:number
id: tensorial-dez
answer: 1024
```

Atención: tener $2^n$ amplitudes no significa poder **leer** $2^n$ números. Al medir, obtenemos solo $n$ bits.

## Puertas en paralelo

Aplicar $A$ al primer qubit y $B$ al segundo es aplicar la matriz $A \otimes B$, de tamaño $4\times 4$:

$$
A \otimes B = \begin{pmatrix} a_{00}B & a_{01}B \\ a_{10}B & a_{11}B \end{pmatrix}, \qquad (A\otimes B)(\ket{a}\otimes\ket{b}) = A\ket{a} \otimes B\ket{b}.
$$

Si solo un qubit recibe una puerta, el otro recibe la identidad: $X \otimes I$ actúa solo sobre el primero.

¿A qué estado lleva la puerta $X \otimes I$ a $\ket{01}$? (Escribe solo los dos dígitos.)

```exercise:text
id: tensorial-x-i
answer: 11
```

## En Python

Escribe el producto tensorial de dos vectores de cualquier tamaño. Inténtalo primero con bucles; luego compáralo con `np.kron`, que lo hace en NumPy.

```exercise:python
id: tensorial-codigo
input: u, v | np.ndarray | dos vectores, formas (n,) y (m,) | np.array([1, 2]), np.array([3, 4])
output: tensor | np.ndarray | vector de forma (n·m,) | np.array([3, 4, 6, 8])
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

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
