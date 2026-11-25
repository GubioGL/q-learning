Las puertas de un qubit nunca crean entrelazamiento. Para ello, los qubits tienen que interactuar, y la puerta de interacción más usada es la **CNOT**.

## La CNOT

La CNOT invierte el **objetivo** cuando el **control** es $1$. Aquí el control es el qubit de la izquierda:

$$
\text{CNOT}\ket{a}\ket{b} = \ket{a}\ket{a \oplus b}.
$$

En la base $\ket{00}, \ket{01}, \ket{10}, \ket{11}$, es una matriz que intercambia las dos últimas amplitudes:

$$
\text{CNOT} = \begin{pmatrix} 1&0&0&0 \\ 0&1&0&0 \\ 0&0&0&1 \\ 0&0&1&0 \end{pmatrix}.
$$

¿A qué estado lleva la CNOT a $\ket{11}$? (Solo los dígitos.)

```exercise:text
id: cnot-onze
answer: 10
```

## Crear entrelazamiento

Por linealidad, la CNOT también actúa sobre superposiciones. Empezando en $\ket{00}$, aplicamos H al primer qubit y luego la CNOT:

$$
\ket{00} \xrightarrow{H} \frac{1}{\sqrt2}\big(\ket{00} + \ket{10}\big) \xrightarrow{\text{CNOT}} \frac{1}{\sqrt2}\big(\ket{00} + \ket{11}\big).
$$

![Circuito que prepara un par entrelazado: H y CNOT](/content/computacao-quantica/bell.svg)

¿Cuál es la probabilidad de obtener $01$ al medir el estado final?

```exercise:number
id: cnot-bell
answer: 0
```

## Otras puertas controladas

Cualquier puerta $U$ tiene una versión controlada: aplica $U$ al objetivo solo si el control es $1$. La **CZ** cambia el signo solo de $\ket{11}$, y por eso es simétrica: da igual qué qubit sea el control. Poniendo H en el objetivo antes y después, transformamos una en la otra, porque $HZH = X$.

La puerta **SWAP** intercambia los estados de dos qubits y se puede hacer con CNOT alternadas: una, luego otra con el control y el objetivo cambiados, y luego la primera otra vez.

¿Cuántas CNOT usa esta construcción de la SWAP?

```exercise:number
id: cnot-swap
answer: 3
```

## Toffoli

La **Toffoli** (CCNOT) invierte el objetivo solo si los **dos** controles son $1$:

$$
\text{Toffoli}\ket{a}\ket{b}\ket{c} = \ket{a}\ket{b}\ket{ab \oplus c}.
$$

Hace cualquier cálculo clásico reversible, así que un ordenador cuántico puede hacer todo lo que hace uno clásico.

¿Cuántos de los 8 estados de la base **cambia** la Toffoli?

```exercise:number
id: cnot-toffoli
answer: 2
```

## En Python

Escribe la CNOT (control a la izquierda) actuando sobre un vector de 4 amplitudes y úsala para construir el par entrelazado a partir de $\ket{00}$.

```exercise:python
id: cnot-codigo
input: estado | np.ndarray | vector con las 4 amplitudes, en el orden 00, 01, 10, 11, forma (4,) | np.array([1, 2, 3, 4])
output: cnot | np.ndarray | las 4 amplitudes después de la CNOT, forma (4,) | np.array([1, 2, 4, 3])
output: par_entrelazado | np.ndarray | vector con las 4 amplitudes, en el orden 00, 01, 10, 11, forma (4,) | np.array([2**-0.5, 0, 0, 2**-0.5])
---
import numpy as np

H = np.array([[1, 1], [1, -1]]) / np.sqrt(2)
H_EN_EL_PRIMERO = np.kron(H, np.eye(2))  # matriz 4x4

def cnot(estado):
    return estado.copy()

def par_entrelazado():
    estado = np.array([1, 0, 0, 0])
    return estado
---
>>> cnot(np.array([1, 2, 3, 4]))
np.array([1, 2, 4, 3])
---
>>> cnot(cnot(np.array([1, 2, 3, 4])))
np.array([1, 2, 3, 4])
>>> cnot(np.array([0, 0, 1, 0]))
np.array([0, 0, 0, 1])
---
>>> par_entrelazado()
np.array([2**-0.5, 0, 0, 2**-0.5])
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
