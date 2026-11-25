Bra por ket da un número. ¿Y ket por bra? Da una **matriz**, y con ella podemos escribir cualquier puerta.

## Ket por bra

El **producto externo** multiplica una columna por una fila:

$$
\ket{\psi}\bra{\phi} = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}\begin{pmatrix} c^* & d^* \end{pmatrix} = \begin{pmatrix} \alpha c^* & \alpha d^* \\ \beta c^* & \beta d^* \end{pmatrix}.
$$

En la base estándar, $\ket{i}\bra{j}$ tiene un único $1$, en la fila $i$ y la columna $j$. Por ejemplo,

$$
\ket{0}\bra{1} = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}.
$$

¿Cuánto vale la suma de **todos** los elementos de la matriz $\ket{+}\bra{+}$?

```exercise:number
id: externo-soma
answer: 2
tolerance: 0.001
```

## Puertas como productos externos

El operador $\ket{b}\bra{a}$ lleva $\ket{a}$ a $\ket{b}$ y anula todo lo que es ortogonal a $\ket{a}$. Así, se puede leer una puerta directamente de la fórmula:

$$
X = \ket{1}\bra{0} + \ket{0}\bra{1}, \qquad Z = \ket{0}\bra{0} - \ket{1}\bra{1}.
$$

¿Qué puerta (una letra) es $\ket{+}\bra{0} + \ket{-}\bra{1}$?

```exercise:text
id: externo-hadamard
answer: H
```

## Proyectores

El operador $\Pi_a = \ket{a}\bra{a}$ es un **proyector**: aplicarlo dos veces es lo mismo que una sola, $\Pi_a^2 = \Pi_a$. Conecta la medición con el álgebra:

$$
P(a) = \bra{\psi}\Pi_a\ket{\psi},
$$

y el estado después de la medición es $\Pi_a\ket{\psi}$, renormalizado. Observa que los proyectores **no** son unitarios: medir no es reversible.

## Relación de completitud

Para cualquier base ortonormal, sumar los proyectores da la identidad:

$$
\sum_i \ket{e_i}\bra{e_i} = I.
$$

Esta relación es una herramienta de cálculo: podemos insertar $I$ en cualquier lugar. Para cambiar de base, por ejemplo,

$$
\ket{\psi} = I\ket{\psi} = \sum_i \ket{e_i}\braket{e_i|\psi},
$$

que es justamente la fórmula de las proyecciones de la skill anterior.

¿Cuánto vale la traza (suma de la diagonal) de $\ket{+}\bra{+} + \ket{-}\bra{-}$?

```exercise:number
id: externo-traco
answer: 2
tolerance: 0.001
```

## En Python

Escribe el producto externo $\ket{\psi}\bra{\phi}$, devolviendo una lista de filas.

```exercise:python
id: externo-codigo
---
def producto_externo(psi, phi):
    # elemento (i, j) = psi[i] * conjugado de phi[j]
    return []
---
assert producto_externo([1, 0], [0, 1]) == [[0, 1], [0, 0]]
assert producto_externo([1, 2], [3, 4]) == [[3, 4], [6, 8]]
assert producto_externo([1, 0], [1j, 0]) == [[-1j, 0], [0, 0]]
assert producto_externo([1, 1j], [1, 1j]) == [[1, -1j], [1j, 1]]
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
