¿Estaban ya decididos los resultados cuánticos antes de la medición, y simplemente no los conocíamos? En 1964, John Bell mostró que esta pregunta se puede **poner a prueba**. La versión más usada de la prueba es la desigualdad **CHSH**.

## El juego

Alice y Bob están lejos uno del otro y no pueden comunicarse durante el juego.

1. Un árbitro sortea un bit $x$ para Alice y un bit $y$ para Bob.
2. Cada uno responde con un bit: $a$ y $b$.
3. Ganan si

$$
a \oplus b = x\,y.
$$

![Juego CHSH: el árbitro envía x e y, Alice y Bob responden a y b](/content/teoria-quantica/chsh.es.svg)

Es decir: las respuestas deben ser iguales, excepto cuando $x = y = 1$, caso en el que deben ser diferentes.

## El límite clásico

Responder siempre $0$ gana en 3 de las 4 preguntas. Ninguna estrategia clásica es mejor: las cuatro condiciones no pueden cumplirse a la vez, porque, sumándolas módulo 2, el lado de las respuestas da $0$ y el de las preguntas da $1$.

¿Cuál es la mayor probabilidad de victoria de una estrategia clásica?

```exercise:number
id: chsh-classico
answer: 0.75
tolerance: 0.001
```

## La ventaja cuántica

Compartiendo un par $\ket{\Phi^+}$ y midiendo en bases bien elegidas, Alice y Bob ganan con probabilidad

$$
\cos^2\frac{\pi}{8} = \frac{2 + \sqrt2}{4}.
$$

¿Cuánto vale esa probabilidad? (Tres decimales.)

```exercise:number
id: chsh-quantico
answer: 0.8536
tolerance: 0.001
```

Para entender de dónde viene, llama medición con ángulo $\theta$ a la medición en la base $\cos\theta\ket{0} + \sin\theta\ket{1}$ y su ortogonal. Midiendo $\ket{\Phi^+}$ con ángulos $\theta_A$ y $\theta_B$,

$$
P(\text{iguales}) = \cos^2(\theta_A - \theta_B).
$$

Alice usa $0$ (si $x=0$) o $45^\circ$ (si $x=1$); Bob usa $22{,}5^\circ$ (si $y=0$) o $-22{,}5^\circ$ (si $y=1$). En los tres primeros casos la diferencia es $22{,}5^\circ$; en el caso $x=y=1$ es $67{,}5^\circ$, y entonces los resultados tienden a ser **diferentes**.

## La desigualdad

Con resultados $\pm1$ y $E_{xy}$ la media de su producto, se define

$$
S = E_{00} + E_{01} + E_{10} - E_{11}.
$$

Toda teoría de **variables ocultas locales** cumple $|S| \le 2$. La mecánica cuántica llega a $2\sqrt2$, el **límite de Tsirelson**.

¿Cuánto vale $2\sqrt2$? (Tres decimales.)

```exercise:number
id: chsh-tsirelson
answer: 2.828
tolerance: 0.001
```

Los experimentos confirman la violación, incluidos los de 2015, que cerraron de una vez las principales escapatorias. Aun así, ninguna señal viaja más rápido que la luz: cada lado, por sí solo, ve bits aleatorios.

## En Python

Calcula la probabilidad media de victoria para ángulos dados (en radianes). `A` y `B` son vectores con los dos ángulos de cada jugador.

```exercise:python
id: chsh-codigo
input: A, B | np.ndarray | dos ángulos en radianes [para 0, para 1], forma (2,) | np.array([0, 0]), np.array([0, 0])
output: prob_victoria | float | probabilidad media de victoria, entre 0 y 1 | 0.75
---
import numpy as np

def prob_victoria(A, B):
    total = 0
    for x in (0, 1):
        for y in (0, 1):
            iguales = np.cos(A[x] - B[y]) ** 2
            # suma la probabilidad de ganar en este caso
    return total / 4
---
>>> prob_victoria(np.array([0, 0]), np.array([0, 0]))
0.75
---
>>> prob_victoria(np.array([0, np.pi / 4]), np.array([np.pi / 8, -np.pi / 8]))
np.cos(np.pi / 8) ** 2
---
>>> prob_victoria(np.array([0, np.pi / 2]), np.array([0, 0]))
0.75
>>> prob_victoria(np.array([np.pi / 2, 0]), np.array([0, 0]))
0.25
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 6.
