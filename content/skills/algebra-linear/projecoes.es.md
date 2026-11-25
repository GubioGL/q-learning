Un mismo vector se puede describir con ejes diferentes. En computación cuántica, elegir los ejes es elegir **qué medición hacer**.

## La amplitud es una proyección

En una base ortonormal $\{\ket{a}, \ket{b}\}$, todo estado se escribe

$$
\ket{\psi} = \alpha\ket{a} + \beta\ket{b}, \qquad \alpha = \braket{a|\psi}, \quad \beta = \braket{b|\psi}.
$$

Para ver por qué, multiplica por $\bra{a}$ por la izquierda: $\braket{a|\psi} = \alpha\braket{a|a} + \beta\braket{a|b} = \alpha$. El producto interno **proyecta** el estado en la dirección elegida.

![Proyección de un estado en la dirección de +](/content/algebra-linear/projecao.svg)

Así, la regla de Born toma una forma que vale en cualquier base:

$$
P(a) = |\braket{a|\psi}|^2.
$$

Para $\ket{\psi} = 0{,}6\ket{0} + 0{,}8\ket{1}$, ¿cuál es la probabilidad de obtener $\ket{+}$ en una medición en la base $\{\ket{+}, \ket{-}\}$?

```exercise:number
id: projecoes-mais
answer: 0.98
tolerance: 0.001
```

¿Y la de obtener $\ket{-}$?

```exercise:number
id: projecoes-menos
answer: 0.02
tolerance: 0.001
```

## Tres bases importantes

$$
\begin{array}{c|c}
\text{base } Z & \ket{0},\ \ket{1} \\ \hline
\text{base } X & \ket{+},\ \ket{-} \\ \hline
\text{base } Y & \ket{i} = \tfrac{1}{\sqrt2}(\ket{0} + i\ket{1}),\ \ket{-i} = \tfrac{1}{\sqrt2}(\ket{0} - i\ket{1})
\end{array}
$$

Cada una corresponde a un eje de la esfera de Bloch. Un estado que es seguro en una de ellas es 50/50 en las otras dos.

Un qubit está en $\ket{i}$. ¿Cuál es la probabilidad de obtener $\ket{+}$ en una medición en la base X?

```exercise:number
id: projecoes-i
answer: 0.5
tolerance: 0.001
```

## Medir en otra base en la práctica

El hardware suele medir solo en la base Z. Para medir en la base X, aplicamos H **antes** de la medición: como $H\ket{+} = \ket{0}$ y $H\ket{-} = \ket{1}$, el resultado $0$ significa $\ket{+}$ y el $1$ significa $\ket{-}$.

## En Python

Escribe una función que reciba un estado y una base (lista de vectores ortonormales) y devuelva la lista de probabilidades.

```exercise:python
id: projecoes-codigo
input: estado | list | lista con las 2 amplitudes [alfa, beta] | [0.6, 0.8]
input: base | list | lista de vectores ortonormales, cada uno con 2 números | BASE_X
output: probabilidades | list | una probabilidad por vector de la base, en el mismo orden | [0.98, 0.02]
---
r = 2**-0.5
BASE_Z = [[1, 0], [0, 1]]
BASE_X = [[r, r], [r, -r]]
BASE_Y = [[r, r * 1j], [r, -r * 1j]]

def probabilidades(estado, base):
    return [0 for vector in base]
---
>>> probabilidades([0.6, 0.8], BASE_X)
[0.98, 0.02]
---
>>> probabilidades([0.6, 0.8], BASE_Z)
[0.36, 0.64]
>>> probabilidades([r, r * 1j], BASE_X)
[0.5, 0.5]
---
>>> probabilidades([r, r * 1j], BASE_Y)
[1, 0]
>>> probabilidades([1, 0], BASE_Y)
[0.5, 0.5]
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
