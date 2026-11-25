Con varios qubits, podemos medirlos todos o solo algunos. La regla de Born sigue siendo la misma, pero la medición parcial trae una novedad: ¿qué pasa con los qubits que **no** se midieron?

## Medirlos todos

Si $\ket{\psi} = \sum c_{ij}\ket{ij}$, la probabilidad de obtener el resultado $ij$ es $|c_{ij}|^2$, y el estado colapsa en $\ket{ij}$.

Para $\ket{\psi} = \tfrac12\ket{00} + \tfrac12\ket{01} + \tfrac{1}{\sqrt2}\ket{11}$, ¿cuál es la probabilidad de obtener $11$?

```exercise:number
id: multiplos-todos
answer: 0.5
tolerance: 0.001
```

## Medir solo uno

Para medir solo el primer qubit, sumamos las probabilidades de todos los términos compatibles:

$$
P(\text{primero} = 0) = |c_{00}|^2 + |c_{01}|^2.
$$

Después de la medición, quedan solo los términos compatibles, **renormalizados**.

![Medir el primer qubit: sumar, filtrar y renormalizar](/content/computacao-quantica/medida-parcial.es.svg)

En el estado anterior, ¿cuál es la probabilidad de que el **primer** qubit dé $0$?

```exercise:number
id: multiplos-parcial
answer: 0.5
tolerance: 0.001
```

Si dio $0$, quedan $\tfrac12\ket{00} + \tfrac12\ket{01}$. Dividiendo entre la raíz de la probabilidad, $\sqrt{1/2}$, el estado pasa a ser

$$
\frac{1}{\sqrt2}\big(\ket{00} + \ket{01}\big) = \ket{0}\otimes\ket{+}.
$$

¿Y si el primero dio $1$? ¿Cuál es la probabilidad de que el **segundo** dé $1$ a continuación?

```exercise:number
id: multiplos-condicional
answer: 1
```

Observa: antes de la medición, el segundo qubit tenía probabilidad $\tfrac14 + \tfrac12 = \tfrac34$ de dar $1$. El resultado del primero cambió nuestra predicción para el segundo. Los dos estaban **correlacionados**.

## En Python

Escribe una función que reciba las 4 amplitudes, en el orden $00, 01, 10, 11$, y el resultado de medir el primer qubit. Devuelve el par `(probabilidad, estado_despues)`. Las pruebas solo usan resultados con probabilidad mayor que cero.

```exercise:python
id: multiplos-codigo
---
def medir_primero(estado, resultado):
    probabilidad = 0
    despues = list(estado)
    return probabilidad, despues
---
cerca = lambda u, v: all(abs(a - b) < 1e-9 for a, b in zip(u, v))
r = 2**-0.5
p, e = medir_primero([0.5, 0.5, 0, r], 0)
assert abs(p - 0.5) < 1e-9
assert cerca(e, [r, r, 0, 0])
p, e = medir_primero([0.5, 0.5, 0, r], 1)
assert abs(p - 0.5) < 1e-9
assert cerca(e, [0, 0, 0, 1])
p, e = medir_primero([0.6, 0, 0, 0.8j], 1)
assert abs(p - 0.64) < 1e-9
assert cerca(e, [0, 0, 0, 1j])
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
