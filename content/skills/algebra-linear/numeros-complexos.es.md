Los números reales no bastan para la computación cuántica: las amplitudes de un qubit son **números complejos**. La buena noticia es que la idea central cabe en una imagen: un número complejo es un punto en un plano, y multiplicar por un número "de tamaño 1" gira ese plano.

## El número $i$ y la forma $a + bi$

Ningún número real elevado al cuadrado da $-1$. Entonces inventamos uno: $i$, definido por

$$
i^2 = -1.
$$

Un **número complejo** es cualquier $z = a + bi$ con $a$ y $b$ reales. Llamamos a $a$ la **parte real** ($\mathrm{Re}\,z$) y a $b$ la **parte imaginaria** ($\mathrm{Im}\,z$). Ejemplo: en $z = 3 - 2i$, $\mathrm{Re}\,z = 3$ e $\mathrm{Im}\,z = -2$ (la parte imaginaria es el número $-2$, sin la $i$).

Sumar es sumar partes iguales: $(1+2i) + (3-i) = 4 + i$. Multiplicar es distribuir, recordando que $i^2=-1$:

$$
(1+2i)(3-i) = 3 - i + 6i - 2i^2 = 3 + 5i + 2 = 5 + 5i.
$$

¿Cuál es la parte real de $(2+i)(1+3i)$?

```exercise:number
id: complexos-produto
answer: -1
```

## Plano complejo, módulo y conjugado

Dibuja $z = a+bi$ como el punto $(a, b)$: $a$ en el eje horizontal, $b$ en el vertical. Ese es el **plano complejo**. El número $3+4i$ es el punto $(3,4)$.

El **módulo** $|z|$ es la distancia del punto al origen, dada por el teorema de Pitágoras:

$$
|z| = \sqrt{a^2 + b^2}.
$$

Para $3+4i$: $|z| = \sqrt{9+16} = 5$.

El **conjugado** $z^*$ cambia el signo de la parte imaginaria: $(a+bi)^* = a - bi$. En el plano, es el reflejo del punto respecto al eje horizontal. Un hecho muy usado:

$$
z\,z^* = (a+bi)(a-bi) = a^2 + b^2 = |z|^2.
$$

Por eso, en la física cuántica, la probabilidad de una amplitud $\alpha$ es $|\alpha|^2 = \alpha^*\alpha$.

![Plano complejo con el punto z = 3+4i, el segmento de longitud |z| = 5 hasta el origen y el conjugado 3−4i reflejado en el eje real](/content/algebra-linear/complexos-plano.svg)

¿Cuál es el módulo de $5 + 12i$?

```exercise:number
id: complexos-modulo
answer: 13
```

¿Cuál es el conjugado de $2 - 3i$?

```exercise:text
id: complexos-conjugado
answer: 2+3i | 2 + 3i | 3i+2 | 3i + 2
```

## Forma polar

Un punto también se describe por **distancia y dirección**: el módulo $r = |z|$ y el ángulo $\theta$ que el segmento forma con el eje horizontal. Por trigonometría, $a = r\cos\theta$ y $b = r\sin\theta$, así que

$$
z = r(\cos\theta + i\sin\theta).
$$

Ejemplo: $z = 1 + i$ tiene $r = \sqrt2$ y $\theta = 45^\circ$, porque $a = b$. Los ángulos también se miden en **radianes**: $180^\circ = \pi$ rad, así que $90^\circ = \pi/2$ y $45^\circ = \pi/4$.

¿Cuál es el ángulo, en grados, de $z = -1 + i$ (entre $0^\circ$ y $360^\circ$)? Dibuja el punto: está en el segundo cuadrante.

```exercise:number
id: complexos-angulo
answer: 135
tolerance: 0.001
```

## La fórmula de Euler

Existe una notación más corta para $\cos\theta + i\sin\theta$:

$$
e^{i\theta} = \cos\theta + i\sin\theta.
$$

Acéptala como definición por ahora (nace de la serie de potencias de $e^x$, que aquí no necesitamos). Algunos valores:

- $e^{i\cdot 0} = 1$
- $e^{i\pi/2} = i$
- $e^{i\pi} = -1$
- $e^{i3\pi/2} = -i$

Con esto, todo complejo se escribe $z = r\,e^{i\theta}$. Y vale algo crucial: $e^{i\theta}$ **siempre tiene módulo 1**, pues

$$
|e^{i\theta}|^2 = \cos^2\theta + \sin^2\theta = 1.
$$

Es decir, $e^{i\theta}$ vive en el **círculo unitario**, el círculo de radio 1. Las fases cuánticas son exactamente números de este tipo.

Escribe $2i$ en la forma $r\,e^{i\theta}$: ¿cuánto vale $\theta$ en radianes (entre 0 y $2\pi$)? Usa $\pi \approx 3{,}1416$ y responde con decimal.

```exercise:number
id: complexos-polar-euler
answer: 1.5708
tolerance: 0.001
```

## Multiplicar es girar

Multiplica $z_1 = r_1 e^{i\theta_1}$ por $z_2 = r_2 e^{i\theta_2}$. Los módulos se multiplican y los ángulos se suman:

$$
z_1 z_2 = r_1 r_2\, e^{i(\theta_1+\theta_2)}.
$$

Si $z_2 = e^{i\varphi}$ tiene módulo 1, el producto $z_1 z_2$ mantiene el tamaño de $z_1$ y solo **gira** el punto en $\varphi$. Prueba: multiplicar por $i = e^{i\pi/2}$ gira $90^\circ$; $1 \to i \to -1 \to -i \to 1$.

¿Cuánto vale $e^{i\pi/2}\cdot e^{i\pi/2}$?

```exercise:number
id: complexos-giro
answer: -1
```

¿Cuál es el módulo de $e^{i\theta}$, para cualquier $\theta$ real?

```exercise:number
id: complexos-unitario
answer: 1
```

![El punto 1+i multiplicado por e^(iπ/2) gira 90° en el círculo de radio √2 y va a −1+i, sin cambiar el módulo](/content/algebra-linear/complexos-giro.svg)

## En Python

Escribe una función que reciba un complejo y devuelva `np.array([módulo, ángulo])`, con el ángulo en radianes entre $-\pi$ y $\pi$. Pista: `np.abs(z)` y `np.angle(z)`.

```exercise:python
id: complexos-polar
input: z | complex | un número complejo distinto de cero | 3 + 4j
output: polar | np.ndarray | [módulo, ángulo en radianes], floats, forma (2,) | np.array([1.4142135623730951, 0.7853981633974483])
---
import numpy as np

def polar(z):
    return np.array([0.0, 0.0])
---
>>> polar(1 + 1j)
np.array([1.4142135623730951, 0.7853981633974483])
---
>>> polar(1j)
np.array([1.0, 1.5707963267948966])
---
>>> polar(-2)
np.array([2.0, 3.141592653589793])
```

> Para profundizar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (2025), sección 2.3; T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), sección 3.3.3.
