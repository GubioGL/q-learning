Copiar un bit es trivial. Copiar un qubit desconocido es **imposible**, y la demostración cabe en pocas líneas.

## Qué sería una copiadora

Una copiadora cuántica sería una unitaria $U$ que, para **todo** estado $\ket{\psi}$, hace

$$
U\big(\ket{\psi}\ket{0}\big) = \ket{\psi}\ket{\psi}.
$$

## ¿La CNOT no copia?

Copia la base: $\ket{0}\ket{0} \to \ket{0}\ket{0}$ y $\ket{1}\ket{0} \to \ket{1}\ket{1}$. Pero, con una superposición,

$$
\text{CNOT}\,\big(\alpha\ket{0} + \beta\ket{1}\big)\ket{0} = \alpha\ket{00} + \beta\ket{11},
$$

mientras que una copia de verdad sería

$$
\big(\alpha\ket{0} + \beta\ket{1}\big)\big(\alpha\ket{0} + \beta\ket{1}\big) = \alpha^2\ket{00} + \alpha\beta\ket{01} + \alpha\beta\ket{10} + \beta^2\ket{11}.
$$

![La CNOT aplicada a una superposición entrelaza en vez de copiar](/content/computacao-quantica/nao-clonagem.es.svg)

Las dos solo coinciden cuando $\alpha\beta = 0$, es decir, cuando el estado es $\ket{0}$ o $\ket{1}$.

Intentamos copiar $\ket{+}$ con una CNOT. En el estado obtenido, ¿cuál es la amplitud de $\ket{01}$?

```exercise:number
id: clonagem-cnot
answer: 0
```

¿Y cuál sería esa amplitud en una copia perfecta $\ket{+}\ket{+}$?

```exercise:number
id: clonagem-ideal
answer: 0.5
tolerance: 0.001
```

## La demostración general

Supón que $U$ copia dos estados, $\ket{\psi}$ y $\ket{\phi}$. Las unitarias conservan los productos internos, así que

$$
\braket{\phi|\psi}\braket{0|0} = \braket{\phi|\psi}\braket{\phi|\psi} \quad\Longrightarrow\quad x = x^2, \quad x = \braket{\phi|\psi}.
$$

Las únicas soluciones son $x = 0$ (estados ortogonales) y $x = 1$ (estados iguales). Una copiadora de estados cualesquiera no existe.

¿Puede una misma máquina copiar a la perfección $\ket{0}$ y $\ket{+}$? Responde `sí` o `no`.

```exercise:text
id: clonagem-zero-mais
answer: no
```

## Consecuencias

- No se puede descubrir un estado desconocido copiándolo y midiendo las copias.
- La corrección de errores cuántica tiene que **repartir** la información en estados entrelazados, en vez de hacer copias de seguridad.
- Un espía no puede copiar qubits sin que se note, y esa es la base de la criptografía cuántica (BB84).

## En Python

La **fidelidad** entre lo que produce la CNOT y la copia ideal es $F = |\braket{\text{ideal}|\text{obtenido}}|^2$. Escríbela para un estado real `np.array([alfa, beta])`.

```exercise:python
id: clonagem-codigo
input: estado | np.ndarray | vector real normalizado [alfa, beta], forma (2,) | np.array([1, 0])
output: fidelidad | float | la fidelidad, entre 0 y 1 | 1.0
---
import numpy as np

def fidelidad(estado):
    alfa, beta = estado
    obtenido = np.array([alfa, 0, 0, beta])
    ideal = np.zeros(4)  # corrige: el vector de la copia perfecta
    return np.sum(ideal * obtenido) ** 2
---
>>> fidelidad(np.array([1, 0]))
1
---
>>> fidelidad(np.array([2**-0.5, 2**-0.5]))
0.5
>>> fidelidad(np.array([0, 1]))
1
---
>>> fidelidad(np.array([0.6, 0.8]))
0.529984
>>> fidelidad(np.array([0.8, -0.6]))
0.087616
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
