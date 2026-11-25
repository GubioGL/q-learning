Algunos estados de dos qubits son simplemente "un qubit aquí, otro allí". Otros no se pueden separar de ninguna manera: están **entrelazados**.

## Estados producto

Un **estado producto** se puede escribir como $\ket{a}\otimes\ket{b}$. Por ejemplo,

$$
\frac12\big(\ket{00} + \ket{01} + \ket{10} + \ket{11}\big) = \ket{+}\otimes\ket{+}.
$$

En un estado producto, medir un qubit no cambia nada en la predicción para el otro.

## Estados entrelazados

Un estado **entrelazado** es aquel que no es producto. El ejemplo clásico es

$$
\ket{\Phi^+} = \frac{1}{\sqrt2}\big(\ket{00} + \ket{11}\big).
$$

Vamos a demostrarlo. Si fuera producto, tendríamos $c_{00} = a_0b_0$, $c_{01} = a_0b_1$, $c_{10} = a_1b_0$ y $c_{11} = a_1b_1$. Como $c_{01} = 0$, o bien $a_0 = 0$ (y entonces $c_{00} = 0$), o bien $b_1 = 0$ (y entonces $c_{11} = 0$). En los dos casos hay contradicción.

![Estado producto y estado entrelazado: cuadrícula de amplitudes](/content/computacao-quantica/emaranhamento.es.svg)

## Una prueba rápida

Para dos qubits en estado puro, hay un criterio sencillo:

$$
\text{producto} \iff c_{00}\,c_{11} = c_{01}\,c_{10}.
$$

En la cuadrícula de amplitudes, esto equivale a decir que el determinante es cero. La cantidad

$$
C = 2\,|c_{00}c_{11} - c_{01}c_{10}|
$$

es la **concurrencia**: vale $0$ para estados producto y $1$ para los máximamente entrelazados.

¿Cuál es la concurrencia de $\ket{\Phi^+}$?

```exercise:number
id: emaranhamento-bell
answer: 1
tolerance: 0.001
```

¿Y la de $0{,}6\ket{00} + 0{,}8\ket{11}$?

```exercise:number
id: emaranhamento-parcial
answer: 0.96
tolerance: 0.001
```

El estado $\tfrac12\left(\ket{00} - \ket{01} + \ket{10} - \ket{11}\right)$, ¿es `producto` o `entrelazado`?

```exercise:text
id: emaranhamento-teste
answer: producto
```

## Lo que el entrelazamiento no hace

En el estado $\ket{\Phi^+}$, medir un qubit determina el resultado del otro, por lejos que esté. Pero eso **no transmite un mensaje**: cada lado, por sí solo, ve únicamente bits aleatorios 50/50. La correlación solo aparece cuando los dos comparan los resultados, y para eso necesitan un canal común.

## En Python

```exercise:python
id: emaranhamento-codigo
input: c00, c01, c10, c11 | float / complex | las 4 amplitudes del estado, normalizadas | 0.6, 0, 0, 0.8
output: concurrencia | float | la concurrencia, entre 0 y 1 | 0.96
---
def concurrencia(c00, c01, c10, c11):
    return 0
---
>>> concurrencia(0.6, 0, 0, 0.8)
0.96
---
>>> concurrencia(2**-0.5, 0, 0, 2**-0.5)
1
>>> concurrencia(0.5, 0.5, 0.5, 0.5)
0
---
>>> concurrencia(0.6, 0, 0, 0.8j)
0.96
>>> concurrencia(0.5, 0.5, 0.5, -0.5)
1
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
