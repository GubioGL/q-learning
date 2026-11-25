Si los estados son vectores, las puertas son **matrices**. Y las matrices que sirven como puerta cuántica tienen una propiedad especial: son unitarias.

## Una puerta es una matriz

Las columnas de la matriz dicen adónde van los estados de la base: la primera columna es $U\ket{0}$ y la segunda es $U\ket{1}$.

$$
X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \quad
Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \quad
Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}, \quad
H = \frac{1}{\sqrt 2}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}.
$$

Para aplicar la puerta, multiplicamos la matriz por el vector:

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} \alpha \\ \beta \end{pmatrix} = \begin{pmatrix} a\alpha + b\beta \\ c\alpha + d\beta \end{pmatrix}.
$$

Una puerta lleva $\ket{0}$ a $\ket{1}$ y $\ket{1}$ a $-\ket{0}$. ¿Cuál es el elemento de la **primera fila, segunda columna** de la matriz?

```exercise:number
id: unitarias-coluna
answer: -1
```

## Puertas en secuencia

Aplicar $A$ y luego $B$ es multiplicar por $BA$. El orden importa: en general $AB \neq BA$. Por ejemplo,

$$
XZ = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}, \qquad ZX = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}.
$$

Como $XZ = -ZX$, decimos que X y Z **anticonmutan**.

## La condición de unitariedad

El conjugado transpuesto $U^\dagger$ se obtiene cambiando filas por columnas y conjugando. Una matriz es **unitaria** cuando

$$
U^\dagger U = I.
$$

Es decir, la inversa de $U$ es $U^\dagger$. Esto es exactamente lo que hace que la puerta conserve la norma:

$$
\bra{\psi}U^\dagger U\ket{\psi} = \braket{\psi|\psi} = 1.
$$

Otra forma de verlo: las **columnas** de $U$ forman un conjunto ortonormal.

¿Qué valor positivo de $k$ hace unitaria a $k\begin{pmatrix} 1 & 1 \\ 1 & -1\end{pmatrix}$? (Tres decimales.)

```exercise:number
id: unitarias-k
answer: 0.7071
tolerance: 0.001
```

¿Es unitaria la matriz $\begin{pmatrix} 1 & 1 \\ 0 & 1\end{pmatrix}$? Responde `sí` o `no`.

```exercise:text
id: unitarias-cisalhamento
answer: no
```

## En Python

Escribe una función que compruebe si una matriz $2\times 2$ de NumPy es unitaria, con tolerancia de $10^{-9}$. Útiles: `U.conj().T` (conjugado transpuesto), `@` (producto de matrices) y `np.allclose`.

```exercise:python
id: unitarias-codigo
input: U | np.ndarray | matriz 2x2, forma (2, 2) | np.array([[0, 1], [1, 0]])
output: es_unitaria | bool | True si U es unitaria, si no False | True
---
import numpy as np

def es_unitaria(U):
    # comprueba si la matriz U†U es la identidad
    return True
---
>>> es_unitaria(np.array([[1, 1], [0, 1]]))
False
---
>>> es_unitaria(np.array([[0, -1j], [1j, 0]]))
True
>>> es_unitaria(np.array([[1, 1], [1, -1]]))
False
---
>>> es_unitaria(np.array([[1, 1], [1, -1]]) / np.sqrt(2))
True
>>> es_unitaria(np.array([[1, 0], [0, 1j]]))
True
>>> es_unitaria(np.array([[0.6, 0.8], [0.6, 0.8]]))
False
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
