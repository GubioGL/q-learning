Un qubit puede tener infinitas combinaciones de amplitudes, pero cuando lo **medimos** solo vemos $0$ o $1$. La regla que conecta las amplitudes con el resultado es el corazón de esta skill.

## La regla de Born

Si el estado es $\ket{\psi} = \alpha\ket{0} + \beta\ket{1}$, entonces

$$
P(0) = |\alpha|^2, \qquad P(1) = |\beta|^2.
$$

Por eso el estado debe estar normalizado: las probabilidades tienen que sumar 1.

![Barras con las probabilidades 0,25 y 0,75](/content/basico/born.es.svg)

Para $\ket{\psi} = \tfrac{1}{2}\ket{0} + \tfrac{\sqrt 3}{2}\ket{1}$, ¿cuál es la probabilidad de medir $1$?

```exercise:number
id: medida-born
answer: 0.75
tolerance: 0.001
```

## El colapso

La medición **cambia** el estado. Si el resultado fue $0$, el qubit pasa a estar en $\ket{0}$; si fue $1$, en $\ket{1}$. Medir otra vez, justo después, da el mismo resultado con certeza.

Un qubit en $\ket{+}$ se midió y dio $1$. ¿Cuál es la probabilidad de que una segunda medición inmediata dé $1$?

```exercise:number
id: medida-repetida
answer: 1
```

Debido al colapso, una sola medición no revela $\alpha$ y $\beta$. Para estimar $|\alpha|^2$, preparamos el mismo estado muchas veces y contamos los resultados. Cada repetición se llama **shot**.

Un estado se preparó y se midió 1000 veces, con 360 resultados $0$. ¿Cuál es la estimación de $|\alpha|$?

```exercise:number
id: medida-shots
answer: 0.6
tolerance: 0.001
```

## Medir en otra base

Preguntar "¿es $\ket{0}$ o $\ket{1}$?" es solo una de las preguntas posibles. Podemos preguntar "¿es $\ket{+}$ o $\ket{-}$?". Para ello, reescribimos el estado en esa base. Por ejemplo,

$$
\ket{0} = \frac{1}{\sqrt 2}\big(\ket{+} + \ket{-}\big),
$$

así que un qubit en $\ket{0}$, medido en la base $\{\ket{+}, \ket{-}\}$, da cada resultado con probabilidad $\tfrac12$. Un estado puede ser seguro en una base y totalmente aleatorio en otra.

## La esfera de Bloch

Salvo una fase global, todo estado de un qubit se puede escribir como

$$
\ket{\psi} = \cos\frac{\theta}{2}\,\ket{0} + e^{i\phi}\sin\frac{\theta}{2}\,\ket{1},
$$

es decir, un punto en una esfera con ángulos $\theta$ y $\phi$. El polo norte es $\ket{0}$, el polo sur es $\ket{1}$, y $\ket{+}$ y $\ket{-}$ están en el ecuador.

![Esfera de Bloch con los estados 0, 1, + y -](/content/basico/bloch.svg)

Solo el ángulo $\theta$ decide las probabilidades de $0$ y $1$. La fase $\phi$ no aparece en esta medición, pero sí en otras bases.

¿Cuál es $P(0)$ para un estado con $\theta = 60^\circ$?

```exercise:number
id: medida-bloch
answer: 0.75
tolerance: 0.001
```

## En Python

Escribe una función que simule una medición. Recibe las amplitudes y un número aleatorio `u` entre 0 y 1, y devuelve el resultado: $0$ si `u` es menor que $P(0)$, y si no $1$.

```exercise:python
id: medida-simular
input: alfa, beta | float / complex | amplitudes ya normalizadas | 0.6, 0.8
input: u | float | número sorteado, 0 <= u < 1 | 0.37
output: medir | int | resultado de la medición: 0 o 1 | 1
---
def medir(alfa, beta, u):
    return 0
---
>>> medir(0.6, 0.8, 0.37)
1
---
>>> medir(0.6, 0.8, 0.35)
0
>>> medir(0, 1, 0.0)
1
---
>>> medir(0.6j, 0.8, 0.35)
0
>>> medir(1, 0, 0.999)
0
>>> medir(0.8, -0.6, 0.65)
1
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 2.
