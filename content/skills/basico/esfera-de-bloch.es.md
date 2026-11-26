Un qubit tiene dos amplitudes, $\alpha$ y $\beta$, pero no todo en ellas es medible: la normalización ($|\alpha|^2+|\beta|^2=1$) ata una a la otra, y multiplicar el estado por una fase global no cambia ninguna medición. Quedan **dos números**, como la latitud y la longitud de un punto en el globo. Esa es la idea de la esfera de Bloch: cada estado de un qubit es un punto en una esfera.

## Fase: un número complejo como ángulo

El número $e^{i\varphi}$ es un punto en el círculo de radio 1 del plano complejo:

$$
e^{i\varphi} = \cos\varphi + i\,\sin\varphi.
$$

El ángulo $\varphi$ dice dónde estamos en el círculo: $\varphi = 0^\circ$ da $1$, $\varphi = 90^\circ$ da $i$, $\varphi = 180^\circ$ da $-1$ y $\varphi = 270^\circ$ da $-i$. Multiplicar por $e^{i\varphi}$ solo gira, sin cambiar el tamaño.

¿Cuánto vale $e^{i\pi}$ (es decir, $\varphi = 180^\circ$)?

```exercise:number
id: bloch-fase-pi
answer: -1
```

Usaremos también el **conjugado** $\alpha^*$, que se obtiene cambiando $i$ por $-i$. Por ejemplo, el conjugado de $\tfrac{1}{2} + \tfrac{i}{2}$ es $\tfrac{1}{2} - \tfrac{i}{2}$. Para un número real, el conjugado es el propio número.

## Algunos puntos, antes de la fórmula

Piensa en los estados que ya conoces:

- $\ket{0}$ es el polo norte, $\theta = 0$.
- $\ket{1}$ es el polo sur, $\theta = \pi$.
- $\ket{+} = \tfrac{1}{\sqrt2}(\ket{0}+\ket{1})$ está en el ecuador, en $\theta = \pi/2$ y $\phi = 0$.

La fórmula general junta todo esto. Elegimos la **fase global** de modo que $\alpha$ sea real y no negativo ($\phi$, la fase relativa entre las amplitudes, sigue libre). Con $|\alpha|^2+|\beta|^2=1$, esto permite escribir

$$
\ket{\psi} = \cos\frac{\theta}{2}\,\ket{0} + e^{i\phi}\sin\frac{\theta}{2}\,\ket{1}, \qquad 0 \le \theta \le \pi,\; 0 \le \phi < 2\pi.
$$

- $\theta$ es el **ángulo polar**: cuánto desciende el punto desde el polo norte.
- $\phi$ es el **ángulo azimutal**: la longitud, medida alrededor del eje vertical.

Compruébalo: $\theta=0$ da $\cos 0\,\ket{0} = \ket{0}$; $\theta=\pi$ da $e^{i\phi}\ket{1}$, que es $\ket{1}$ salvo una fase global ($\phi$ no importa en los polos); $\theta=\pi/2$, $\phi=0$ da $\tfrac{1}{\sqrt2}(\ket{0}+\ket{1}) = \ket{+}$.

El $\theta/2$ tiene una razón: el ángulo en la esfera es el **doble** del ángulo entre los vectores de estado. Por eso $\ket{0}$ y $\ket{1}$, que son ortogonales (se distinguen con certeza en una medición), quedan en puntos opuestos.

![Esfera de Bloch en 3D con ejes x, y, z; |0⟩ arriba, |1⟩ abajo, |+⟩ y |−⟩ en ±x, |+i⟩ y |−i⟩ en ±y; un vector |ψ⟩ con θ medido desde z y φ medido en el plano xy desde x](/content/basico/bloch-theta-phi.svg)


## Probabilidades a partir de θ

De la fórmula, por la regla de Born:

$$
P(0) = \cos^2\frac{\theta}{2}, \qquad P(1) = \sin^2\frac{\theta}{2}.
$$

Solo aparece $\theta$: la fase $\phi$ no afecta la medición en la base estándar. ¿Para qué $\theta$ (en grados, entre 0° y 180°) se cumple $P(0) = 0,5$?

```exercise:number
id: bloch-theta
answer: 90
tolerance: 0.001
```

## La fase global no aparece

Multiplicar el estado entero por $e^{i\gamma}$ no cambia ninguna probabilidad, en ninguna base. Por eso $\ket{\psi}$ y $-\ket{\psi}$ son el **mismo** punto. En cambio, la fase **relativa** entre $\alpha$ y $\beta$, que es $\phi$, sí cambia el punto.

$\ket{+} = \tfrac{1}{\sqrt2}(\ket{0}+\ket{1})$ y $\ket{-} = \tfrac{1}{\sqrt2}(\ket{0}-\ket{1})$ tienen las mismas probabilidades de $0$ y $1$, pero el signo $-1 = e^{i\pi}$ es una fase relativa: son puntos distintos (opuestos).

Dado $\ket{\psi} = \tfrac{1}{\sqrt2}\big(\ket{0} + i\ket{1}\big)$, ¿cuál es $\phi$ en grados (entre 0° y 360°)?

```exercise:number
id: bloch-phi
answer: 90
tolerance: 0.001
```

## Seis puntos de referencia

| Estado | $\theta$ | $\phi$ | Dónde está |
|---|---|---|---|
| $\ket{0}$ | $0$ | (cualquiera) | polo norte, eje $+z$ |
| $\ket{1}$ | $\pi$ | (cualquiera) | polo sur, eje $-z$ |
| $\ket{+}$ | $\pi/2$ | $0$ | ecuador, eje $+x$ |
| $\ket{-}$ | $\pi/2$ | $\pi$ | ecuador, eje $-x$ |
| $\ket{+i}$ (también escrito $\ket{i}$) $= \tfrac{1}{\sqrt2}(\ket{0}+i\ket{1})$ | $\pi/2$ | $\pi/2$ | ecuador, eje $+y$ |
| $\ket{-i} = \tfrac{1}{\sqrt2}(\ket{0}-i\ket{1})$ | $\pi/2$ | $3\pi/2$ | ecuador, eje $-y$ |

En los polos $\phi$ no importa. En el norte, $\sin 0 = 0$ anula el término de $\ket{1}$. En el sur, $\cos\frac{\pi}{2} = 0$ anula el término de $\ket{0}$, y el $e^{i\phi}$ que queda multiplica todo el estado: es una fase global. Cada par de puntos opuestos es una base ortogonal, y cada eje es una pregunta de medición distinta. Todo el ecuador da $\tfrac12$ para $0$ y para $1$, y los puntos se diferencian solo por la fase $\phi$, que las otras bases sí distinguen.

## Coordenadas cartesianas

En una esfera de radio 1, el punto del estado tiene coordenadas

$$
x = \sin\theta\cos\phi, \qquad y = \sin\theta\sin\phi, \qquad z = \cos\theta.
$$

(Aquí es $\theta$ entero, no la mitad.) Con las amplitudes a mano, se puede calcular directamente, sin hallar los ángulos:

$$
x = 2\,\mathrm{Re}(\alpha^*\beta), \qquad y = 2\,\mathrm{Im}(\alpha^*\beta), \qquad z = |\alpha|^2 - |\beta|^2.
$$

Ejemplo: $\alpha = \tfrac{1}{\sqrt2}$, $\beta = \tfrac{i}{\sqrt2}$. Entonces $\alpha^*\beta = \tfrac{1}{\sqrt2}\cdot\tfrac{i}{\sqrt2} = \tfrac{i}{2}$, luego $x = 0$, $y = 2\cdot\tfrac12 = 1$ y $z = \tfrac12-\tfrac12 = 0$: el punto $(0,1,0)$, que es $\ket{+i}$.

El producto $\alpha^*\beta$ solo depende de la diferencia de fase entre las amplitudes, así que una fase global desaparece. Y $z = P(0) - P(1)$ resume la medición en la base estándar.

¿Cuánto vale $z$ para $\theta = 60^\circ$ (usa $z = \cos\theta$, sin la mitad)?

```exercise:number
id: bloch-z
answer: 0.5
tolerance: 0.001
```

¿Cuánto vale $x$ para $\theta = 90^\circ$ y $\phi = 180^\circ$?

```exercise:number
id: bloch-x
answer: -1
tolerance: 0.001
```

Ahora al revés: el punto $(0, 0, -1)$, ¿qué estado de la base estándar es (responde 0 o 1)?

```exercise:text
id: bloch-ida-volta
answer: 1 | 1⟩ | 1>
```

## Puertas como rotaciones

Una puerta de 1 qubit lleva un punto de la esfera a otro: **gira** la esfera entera (salvo una fase global, que no cambia el punto). Tres ejemplos, todos medias vueltas ($180^\circ$):

- **X**: gira en torno al eje $x$. Intercambia $\ket{0}$ y $\ket{1}$ y deja $\ket{\pm}$ donde están.
- **Z**: gira en torno al eje $z$. Deja quietos $\ket{0}$ y $\ket{1}$ y lleva $\ket{+}$ a $\ket{-}$.
- **H**: gira en torno al eje $\tfrac{1}{\sqrt2}(\hat x + \hat z)$, a medio camino entre $x$ y $z$. Lleva $\ket{0}$ a $\ket{+}$ y $\ket{1}$ a $\ket{-}$: intercambia los ejes $x$ y $z$ e invierte el eje $y$.

![Tres esferas de Bloch: X gira media vuelta en torno a x, Z en torno a z, H en torno al eje entre x y z; en cada una el estado ψ pasa a ψ′ y la misma media vuelta lo devuelve](/content/basico/meias-voltas-xzh.svg)

¿Qué puerta (X, Y, Z o H) deja $\ket{0}$ y $\ket{1}$ en su lugar, pero lleva $\ket{+}$ a $\ket{-}$? Responde con la letra.

```exercise:text
id: bloch-porta-z
answer: Z
```

## En Python

Escribe una función que reciba las amplitudes y devuelva `np.array([x, y, z])` de floats reales, con las fórmulas de $\alpha^*\beta$. Pista: `np.conj(estado[0]) * estado[1]` es complejo; usa `.real` y `.imag`.

```exercise:python
id: bloch-coordenadas
input: estado | np.ndarray | vector normalizado con las 2 amplitudes [alfa, beta] (pueden ser complejas), forma (2,) | np.array([1, 1]) / np.sqrt(2)
output: bloch_xyz | np.ndarray | coordenadas [x, y, z] del punto, floats reales, forma (3,) | np.array([1, 0, 0])
---
import numpy as np

def bloch_xyz(estado):
    return np.array([0.0, 0.0, 0.0])
---
>>> bloch_xyz(np.array([1, 1]) / np.sqrt(2))
np.array([1, 0, 0])
---
>>> bloch_xyz(np.array([1, 1j]) / np.sqrt(2))
np.array([0, 1, 0])
>>> bloch_xyz(np.array([0, 1]))
np.array([0, 0, -1])
---
>>> bloch_xyz(np.array([1j, 1j]) / np.sqrt(2))
np.array([1, 0, 0])
>>> bloch_xyz(np.array([0.8660254037844386, 0.5j]))
np.array([0, 0.8660254037844386, 0.5])
>>> bloch_xyz(np.array([-1, 1]) / np.sqrt(2))
np.array([-1, 0, 0])
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, sección 2.4 (Bloch Sphere Mapping).
