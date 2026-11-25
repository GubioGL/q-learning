Las puertas clásicas transforman bits; las puertas cuánticas transforman **estados**. Con un solo bit, las puertas reversibles son "no hacer nada" y NOT. Con un qubit, hay infinitas.

## Linealidad

Una puerta cuántica es **lineal**: basta con saber qué hace con $\ket{0}$ y $\ket{1}$, y el resto se deduce.

$$
U\big(\alpha\ket{0} + \beta\ket{1}\big) = \alpha\, U\ket{0} + \beta\, U\ket{1}.
$$

Además, conserva la suma de las probabilidades y siempre es reversible.

## X, Z e Y

La puerta **X** es el NOT cuántico: $X\ket{0} = \ket{1}$ y $X\ket{1} = \ket{0}$. En general, intercambia las amplitudes.

La puerta **Z** cambia el signo de $\ket{1}$: $Z\ket{0} = \ket{0}$ y $Z\ket{1} = -\ket{1}$. No altera $P(0)$ ni $P(1)$, pero intercambia $\ket{+}$ y $\ket{-}$.

La puerta **Y** combina las dos: $Y\ket{0} = i\ket{1}$ y $Y\ket{1} = -i\ket{0}$.

En la esfera de Bloch, X, Y y Z son giros de $180^\circ$ alrededor de los ejes $x$, $y$ y $z$.

Después de aplicar X a $0{,}6\ket{0} + 0{,}8\ket{1}$, ¿cuál es la probabilidad de medir $0$?

```exercise:number
id: porta1q-x
answer: 0.64
tolerance: 0.001
```

## Hadamard

La puerta **H** crea superposición a partir de estados básicos:

$$
H\ket{0} = \ket{+}, \qquad H\ket{1} = \ket{-}.
$$

![La puerta H lleva 0 a + y 1 a -, y viceversa](/content/basico/hadamard.svg)

Aplicar H dos veces lo deshace todo. Mira qué pasa con las amplitudes:

$$
H\ket{+} = \frac{1}{\sqrt 2}\big(\ket{+} + \ket{-}\big) = \ket{0}.
$$

Las dos contribuciones a $\ket{1}$ tienen signos opuestos y se cancelan. Esto es **interferencia**, y es lo que hace funcionar los algoritmos cuánticos.

¿Cuál es la probabilidad de medir $0$ después de aplicar H dos veces a $\ket{0}$?

```exercise:number
id: porta1q-hh
answer: 1
```

## Una identidad útil

Aplicar H, luego Z y luego H tiene el mismo efecto que una puerta X:

$$
HZH = X.
$$

¿Qué puerta (una letra) equivale a aplicar H, luego X y luego H?

```exercise:text
id: porta1q-hxh
answer: Z
```

También existen las puertas de fase: **S** multiplica la amplitud de $\ket{1}$ por $i$, y **T** la multiplica por $e^{i\pi/4}$. Dos T forman una S, y dos S forman una Z.

¿Cuántas puertas **T** seguidas equivalen a una puerta Z?

```exercise:number
id: porta1q-t
answer: 4
```

## En Python

Representa un estado como un vector `np.array([alfa, beta])` y escribe las puertas `X`, `Z` y `H`. Cada una recibe un vector y devuelve **otro** vector, sin cambiar el original.

```exercise:python
id: porta1q-codigo
input: estado | np.ndarray | vector con las 2 amplitudes [alfa, beta], forma (2,) | np.array([0.6, 0.8])
output: X, Z, H | np.ndarray | vector después de la puerta, forma (2,) | np.array([0.8, 0.6])
---
import numpy as np

def X(estado):
    alfa, beta = estado
    return np.array([alfa, beta])

def Z(estado):
    alfa, beta = estado
    return np.array([alfa, beta])

def H(estado):
    alfa, beta = estado
    return np.array([alfa, beta])
---
>>> X(np.array([0.6, 0.8]))
np.array([0.8, 0.6])
---
>>> Z(np.array([0.6, 0.8]))
np.array([0.6, -0.8])
>>> X(np.array([1, 0j]))
np.array([0, 1])
---
>>> H(np.array([1, 0]))
np.array([2**-0.5, 2**-0.5])
>>> H(np.array([0, 1]))
np.array([2**-0.5, -2**-0.5])
>>> H(Z(H(np.array([0.6, 0.8]))))
np.array([0.8, 0.6])
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 2.
