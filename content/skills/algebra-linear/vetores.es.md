Hasta aquí hemos usado los kets como símbolos. Ahora les damos una forma concreta: **vectores**. Con eso, toda la computación cuántica se convierte en cálculos con listas de números complejos.

## Los kets son vectores columna

Elegimos

$$
\ket{0} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \qquad \ket{1} = \begin{pmatrix} 0 \\ 1 \end{pmatrix},
$$

y entonces el estado general es

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1} = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}.
$$

![Los vectores 0, 1 y + en el plano](/content/algebra-linear/vetores.svg)

Sumar vectores y multiplicar por un número se hace componente a componente.

¿Cuál es la primera componente de $2\ket{0} + 3\left(\ket{0} - \ket{1}\right)$?

```exercise:number
id: vetores-soma
answer: 5
```

## Complejo conjugado

El conjugado de $z = a + bi$ es $z^* = a - bi$. Dos propiedades que usaremos siempre:

$$
z^* z = a^2 + b^2 = |z|^2, \qquad (e^{i\theta})^* = e^{-i\theta}.
$$

¿Cuánto vale $(3 + 4i)^*(3 + 4i)$?

```exercise:number
id: vetores-conjugado
answer: 25
```

## Los bras son vectores fila

Para cada ket existe un **bra**: transponemos la columna en fila y conjugamos cada componente.

$$
\ket{\psi} = \begin{pmatrix} \alpha \\ \beta \end{pmatrix} \quad\Longrightarrow\quad \bra{\psi} = \begin{pmatrix} \alpha^* & \beta^* \end{pmatrix}.
$$

Esta operación (transponer y conjugar) es el **conjugado transpuesto**, escrito con una daga: $\bra{\psi} = \ket{\psi}^\dagger$.

Si $\ket{\psi} = \begin{pmatrix} 0{,}6 \\ 0{,}8i \end{pmatrix}$, ¿cuál es la segunda componente de $\bra{\psi}$? Escríbela con el formato `0.8i` o `-0.8i`.

```exercise:text
id: vetores-bra
answer: -0.8i | -0,8i | -0.8 i | -0,8 i
```

## En Python

Escribe `bra`, que recibe un ket (lista de números complejos) y devuelve la lista conjugada. Todo número en Python tiene el método `.conjugate()`.

```exercise:python
id: vetores-bra-codigo
---
def bra(ket):
    return ket
---
assert bra([1, 0]) == [1, 0]
assert bra([0.6, 0.8j]) == [0.6, -0.8j]
assert bra([1 + 2j, 3 - 1j]) == [1 - 2j, 3 + 1j]
assert bra(bra([1j, 2])) == [1j, 2]
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
