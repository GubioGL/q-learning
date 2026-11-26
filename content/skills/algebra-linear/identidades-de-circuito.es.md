Un circuito cuántico casi nunca es una sola puerta: son puertas una tras otra. ¿Podemos cambiar un tramo largo por uno corto que haga exactamente lo mismo? En muchos casos sí, y el álgebra de matrices dice cómo.

## Puertas en secuencia: el producto va al revés

Leemos un circuito de izquierda a derecha, en el tiempo. Si el estado pasa primero por $A$ y luego por $B$, el resultado es $B(A\ket{\psi})$, así que la matriz del circuito entero es

$$
U = BA.
$$

La primera puerta queda **a la derecha** en el producto. Esto ocurre porque la matriz actúa sobre el ket que está a su derecha. Con tres puertas $A$, $B$, $C$ en ese orden temporal: $U = CBA$.

Ejemplo: primero $X$, luego $Z$, da $U = ZX$. Calculando,

$$
ZX = \begin{pmatrix}1&0\\0&-1\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix} = \begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

Si el circuito aplica primero $X$ y luego $Z$, ¿cuál es la entrada de la fila 2, columna 1 de la matriz del circuito (la de abajo a la izquierda)?

```exercise:number
id: identidades-ordem
answer: -1
```

## Identidades simples

Algunas puertas son **su propia inversa**: aplicarlas dos veces no hace nada.

$$
XX = I, \qquad YY = I, \qquad ZZ = I, \qquad HH = I.
$$

Como $I$ es la matriz que no cambia nada, dos puertas iguales seguidas se pueden borrar del circuito. Comprobando $HH$: $H = \tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ y

$$
HH = \tfrac12\begin{pmatrix}1+1 & 1-1\\ 1-1 & 1+1\end{pmatrix} = I.
$$

Puedes comprobarlo multiplicando las matrices. (Cumplen $U^\dagger = U$ y $U^\dagger U = I$, de ahí $UU=I$.)

Considera el circuito, en orden temporal, $X, H, H, X, Z, Z, H$. Cancelando pares iguales adyacentes (y repitiendo, pues aparecen pares nuevos), ¿cuántas puertas quedan?

```exercise:number
id: identidades-cancelar
answer: 1
```

## Identidades con $H$: cambiar $X$ por $Z$

La puerta $H$ funciona como un "traductor" entre $X$ y $Z$. Calculemos $HXH$ (circuito: $H$, luego $X$, luego $H$):

$$
HXH = \tfrac12\begin{pmatrix}1&1\\1&-1\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}1&1\\1&-1\end{pmatrix}
= \tfrac12\begin{pmatrix}1&1\\-1&1\end{pmatrix}\begin{pmatrix}1&1\\1&-1\end{pmatrix}
= \tfrac12\begin{pmatrix}2&0\\0&-2\end{pmatrix} = Z.
$$

Entonces $HXH = Z$. Multiplicando ambos lados por $H$ por los lados correctos (y usando $HH=I$), sale también $HZH = X$. Resumen:

$$
HXH = Z, \qquad HZH = X, \qquad HYH = -Y.
$$

$HYH = -Y$ es igual a $Y$ salvo una fase global: como puerta aislada, $-Y$ e $Y$ tienen el mismo efecto, pues ninguna medida ve el $-1$. Pero son matrices distintas, y el signo importa en puertas controladas o cuando $Y$ es un observable. En la esfera de Bloch, $H$ intercambia los ejes $x$ y $z$ e invierte el $y$, y eso es lo que dicen las tres igualdades.

También valen $XZX = -Z$ y $ZXZ = -X$, consecuencias de $XZ = -ZX$ (las puertas anticonmutan).

![Dos circuitos: H, X, H equivale a Z; H, Z, H equivale a X](/content/algebra-linear/circuito-hxh-hzh.svg)

El estado $\ket{0}$ pasa por un circuito con $H$, luego $Z$, luego $H$. ¿Cuál es la probabilidad de medir 1 al final? (Pista: usa $HZH = X$.)

```exercise:number
id: identidades-hzh
answer: 1
tolerance: 0.001
```

## Simplificando circuitos

Bastan dos ideas: (1) cancelar pares iguales; (2) cambiar un tramo por otro equivalente. Ejemplo: el circuito $H, X, H$ es igual a una única puerta $Z$, y tres puertas pasan a ser una. Esto importa porque cada puerta en un computador real tiene probabilidad de error: circuito más corto, menos error.

¿Por qué se permite simplificar? La matriz del circuito es la misma, así que el efecto sobre cualquier estado es el mismo. Al simplificar, cuidado con el orden: el tramo cancelado debe ser **adyacente** en el circuito. En $X, Z, X$ las dos puertas $X$ no son adyacentes y no se cancelan (el resultado es $XZX = -Z$, y no $Z$).

¿Qué puerta única equivale al circuito $H, Z, H$? Responde con la letra.

```exercise:text
id: identidades-simplificar
answer: X
```

![Circuito X, H, H, X, Z, Z, H simplificado en tres filas: se cancelan HH y ZZ, luego XX, quedando solo H](/content/algebra-linear/circuito-simplificar.svg)

## En Python

Escribe una función que reciba la lista de puertas **en orden temporal** (cada puerta un `np.array` 2x2) y devuelva la matriz del circuito. Recuerda: la primera puerta queda a la derecha del producto.

```exercise:python
id: identidades-produto
input: portas | list | lista de matrices np.array de forma (2, 2), en el orden en que se aplican | [np.array([[0, 1], [1, 0]]), np.array([[1, 0], [0, -1]])]
output: matriz_circuito | np.ndarray | matriz del circuito, forma (2, 2) | np.array([[0, 1], [-1, 0]])
---
import numpy as np

def matriz_circuito(portas):
    return np.eye(2)
---
>>> matriz_circuito([np.array([[0, 1], [1, 0]]), np.array([[1, 0], [0, -1]])])
np.array([[0, 1], [-1, 0]])
---
>>> matriz_circuito([np.array([[0, 1], [1, 0]]), np.array([[0, 1], [1, 0]])])
np.array([[1, 0], [0, 1]])
---
>>> matriz_circuito([np.array([[1, 1], [1, -1]]) / np.sqrt(2), np.array([[0, 1], [1, 0]]), np.array([[1, 1], [1, -1]]) / np.sqrt(2)])
np.array([[1, 0], [0, -1]])
```

> Para profundizar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (2025), sección 2.3; T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), sección 3.3.3.
