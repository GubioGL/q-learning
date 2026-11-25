Un circuito entero, por grande que sea, es una única matriz unitaria. Esta skill junta las piezas del curso y saca consecuencias.

## El producto de unitarias es unitario

Si $U$ y $V$ son unitarias, $VU$ también lo es, porque el conjugado transpuesto invierte el orden:

$$
(VU)^\dagger (VU) = U^\dagger V^\dagger V U = U^\dagger U = I.
$$

Por tanto, cualquier secuencia de puertas es una puerta, y cualquier circuito sin mediciones se puede **deshacer**: basta con aplicar las puertas inversas en el orden contrario.

Un circuito aplica H, luego S y luego X. ¿Qué puerta debe aplicarse **primero** para deshacerlo? (Una letra.)

```exercise:text
id: unitariedade-desfazer
answer: X
```

## Lo que conservan las unitarias

Las unitarias conservan **todos** los productos internos:

$$
\braket{U\phi|U\psi} = \bra{\phi}U^\dagger U\ket{\psi} = \braket{\phi|\psi}.
$$

De ahí sale una lección: ninguna puerta consigue que dos estados sean más distinguibles de lo que ya eran. Los estados ortogonales siguen siendo ortogonales, y los parecidos siguen pareciéndose.

Si $\braket{\phi|\psi} = 0{,}3$, ¿cuánto vale el producto interno después de aplicar H a los dos estados?

```exercise:number
id: unitariedade-preserva
answer: 0.3
```

## Autovalores

Si $U\ket{v} = \lambda\ket{v}$, decimos que $\ket{v}$ es un **autovector** y $\lambda$ un **autovalor**. Como la norma se conserva, todo autovalor de una unitaria tiene módulo 1:

$$
\lambda = e^{i\theta}.
$$

Por ejemplo, $X\ket{+} = \ket{+}$ y $X\ket{-} = -\ket{-}$.

¿Cuál es el autovalor de X asociado a $\ket{-}$?

```exercise:number
id: unitariedade-autovalor
answer: -1
```

## Hermíticas y unitarias

Una matriz es **hermítica** cuando $A^\dagger = A$. Las puertas X, Y, Z y H son hermíticas **y** unitarias, y por eso son sus propias inversas: $X^2 = I$. La S no es hermítica, porque $S^\dagger \neq S$.

¿Cuál es la menor cantidad de puertas S (contando solo S) que hay que aplicar **después** de una S para volver a la identidad?

```exercise:number
id: unitariedade-s
answer: 3
```

## En Python

Escribe una función que reciba una lista de matrices $2\times 2$ en el orden del dibujo y devuelva la matriz del circuito entero.

```exercise:python
id: unitariedade-circuito
input: puertas | list | lista de matrices 2x2 en el orden del dibujo; puede estar vacía | [H, Z, H]
output: matriz_del_circuito | list | lista de 2 filas, cada fila con 2 números | [[0, 1], [1, 0]]
---
r = 2**-0.5
I = [[1, 0], [0, 1]]
X = [[0, 1], [1, 0]]
Z = [[1, 0], [0, -1]]
S = [[1, 0], [0, 1j]]
H = [[r, r], [r, -r]]

def por(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]

def matriz_del_circuito(puertas):
    total = I
    # la puerta aplicada después multiplica por la izquierda
    return total
---
>>> matriz_del_circuito([H, Z, H])
[[0, 1], [1, 0]]
---
>>> matriz_del_circuito([])
[[1, 0], [0, 1]]
>>> matriz_del_circuito([S, S])
[[1, 0], [0, -1]]
---
>>> matriz_del_circuito([X, S])
[[0, 1], [1j, 0]]
>>> matriz_del_circuito([S, X])
[[0, 1j], [1, 0]]
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
