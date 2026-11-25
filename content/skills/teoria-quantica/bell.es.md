Los cuatro **estados de Bell** son los estados más importantes de dos qubits. Están máximamente entrelazados y forman una base.

## Los cuatro estados

$$
\ket{\Phi^\pm} = \frac{1}{\sqrt2}\big(\ket{00} \pm \ket{11}\big), \qquad
\ket{\Psi^\pm} = \frac{1}{\sqrt2}\big(\ket{01} \pm \ket{10}\big).
$$

En los $\Phi$, los dos qubits dan resultados **iguales** en la base Z; en los $\Psi$, resultados **diferentes**.

En el estado $\ket{\Psi^-}$, el primer qubit dio $0$. ¿Cuál será el resultado del segundo, también en la base Z?

```exercise:number
id: bell-psi
answer: 1
```

## Preparar y medir

El circuito H + CNOT lleva la base estándar a la base de Bell:

$$
\ket{00}\to\ket{\Phi^+}, \quad \ket{10}\to\ket{\Phi^-}, \quad \ket{01}\to\ket{\Psi^+}, \quad \ket{11}\to\ket{\Psi^-}.
$$

![Circuito que prepara estados de Bell y el inverso que los mide](/content/teoria-quantica/bell-medida.es.svg)

Como el circuito es unitario, ejecutarlo **al revés** (CNOT y luego H) identifica qué estado de Bell tenemos. Esto es una **medición de Bell**: dos bits que señalan uno de los cuatro estados.

La medición de Bell de un par dio los bits $10$ (primero el qubit que pasó por H). ¿Cuál era el estado? Responde `phi+`, `phi-`, `psi+` o `psi-`.

```exercise:text
id: bell-medida
answer: phi- | phi -
```

## De uno a otro con una puerta local

Aplicando puertas solo al **primer** qubit, pasamos de un estado de Bell a otro:

$$
(Z\otimes I)\ket{\Phi^+} = \ket{\Phi^-}, \qquad (X\otimes I)\ket{\Phi^+} = \ket{\Psi^+}.
$$

¿Qué puerta (una letra), aplicada al primer qubit, lleva $\ket{\Psi^+}$ a $\ket{\Psi^-}$ salvo una fase global? Considera solo X y Z.

```exercise:text
id: bell-porta
answer: Z
```

## Correlación en todas las bases

En $\ket{\Phi^+}$, los resultados también son iguales en la base X, porque

$$
\ket{\Phi^+} = \frac{1}{\sqrt2}\big(\ket{++} + \ket{--}\big).
$$

Un par clásico de monedas acordadas no puede imitar esto en todas las bases a la vez. La próxima skill mide esa diferencia.

¿Cuál es la probabilidad de que los dos resultados sean **iguales** al medir $\ket{\Phi^+}$ con los dos lados en la base X?

```exercise:number
id: bell-base-x
answer: 1
```

## En Python

Escribe una función que reciba los bits `(a, b)` y devuelva las 4 amplitudes del estado de Bell preparado a partir de $\ket{ab}$.

```exercise:python
id: bell-codigo
input: a, b | int | 0 o 1 | 1, 0
output: estado_de_bell | list | lista con las 4 amplitudes, en el orden 00, 01, 10, 11 | [2**-0.5, 0, 0, -2**-0.5]
---
r = 2**-0.5

def estado_de_bell(a, b):
    estado = [0, 0, 0, 0]
    # H en el primero: (|0> + (-1)^a |1>) / raíz de 2; luego CNOT
    return estado
---
>>> estado_de_bell(0, 0)
[2**-0.5, 0, 0, 2**-0.5]
---
>>> estado_de_bell(1, 0)
[2**-0.5, 0, 0, -2**-0.5]
---
>>> estado_de_bell(0, 1)
[0, 2**-0.5, 2**-0.5, 0]
>>> estado_de_bell(1, 1)
[0, 2**-0.5, -2**-0.5, 0]
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 6.
