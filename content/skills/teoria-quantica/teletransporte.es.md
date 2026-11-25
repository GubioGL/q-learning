Alice tiene un qubit en un estado que ella misma no conoce y quiere que Bob lo tenga. No puede copiarlo ni medirlo sin estropearlo. El **teletransporte cuántico** resuelve el problema con un par entrelazado y dos bits clásicos.

## Los ingredientes

- el qubit de Alice en $\ket{\psi} = \alpha\ket{0} + \beta\ket{1}$;
- un par $\ket{\Phi^+}$ compartido entre Alice y Bob;
- un canal clásico, como el teléfono o internet.

![Circuito del teletransporte cuántico](/content/teoria-quantica/teletransporte.es.svg)

## El protocolo

1. Alice hace una **medición de Bell** en sus dos qubits: CNOT (control en $\ket{\psi}$), luego H, y luego mide los dos.
2. Alice envía los dos bits, $m_1$ (del qubit $\psi$) y $m_2$ (de su mitad del par), a Bob.
3. Bob aplica X si $m_2 = 1$ y luego Z si $m_1 = 1$.

Antes de la medición, el estado de los tres qubits se puede reescribir como

$$
\begin{aligned}
\tfrac12\Big[\ &\ket{00}\big(\alpha\ket{0} + \beta\ket{1}\big) + \ket{01}\big(\alpha\ket{1} + \beta\ket{0}\big) \\
+\ &\ket{10}\big(\alpha\ket{0} - \beta\ket{1}\big) + \ket{11}\big(\alpha\ket{1} - \beta\ket{0}\big)\Big].
\end{aligned}
$$

Los dos primeros dígitos son $m_1m_2$, y el paréntesis es lo que le quedó a Bob. Cada resultado pide una corrección conocida.

¿Cuál es la probabilidad de que Alice obtenga $m_1m_2 = 11$?

```exercise:number
id: teletransporte-prob
answer: 0.25
tolerance: 0.001
```

Alice obtuvo $m_1 m_2 = 01$. ¿Qué puerta aplica Bob? (Una letra.)

```exercise:text
id: teletransporte-x
answer: X
```

¿Y si obtuvo $10$?

```exercise:text
id: teletransporte-z
answer: Z
```

## Lo que no ocurre

- **No hay copia.** La medición destruye el estado del lado de Alice, como exige la no clonación.
- **No es más rápido que la luz.** Sin los dos bits, el qubit de Bob es totalmente aleatorio.
- **Nada material viaja.** Lo que se transfiere es el estado.

¿Cuántos bits clásicos hay que enviar para teletransportar **5 qubits**?

```exercise:number
id: teletransporte-bits
answer: 10
```

Compara con la codificación superdensa: allí, 1 qubit más un par entrelazado valen 2 bits; aquí, 2 bits más un par valen 1 qubit. Los protocolos son espejo uno del otro.

## En Python

Escribe la corrección de Bob. `estado` es el par de amplitudes que le quedó.

```exercise:python
id: teletransporte-codigo
input: estado | tuple | par (a, b) con las 2 amplitudes de Bob | (0.8, 0.6)
input: m1, m2 | int | bits enviados por Alice, 0 o 1 | 0, 1
output: corregir | tuple | par de amplitudes corregido | (0.6, 0.8)
---
def corregir(estado, m1, m2):
    a, b = estado
    # X si m2 = 1, luego Z si m1 = 1
    return (a, b)
---
>>> corregir((0.8, 0.6), 0, 1)
(0.6, 0.8)
---
>>> corregir((0.6, 0.8), 0, 0)
(0.6, 0.8)
>>> corregir((0.6, -0.8j), 1, 0)
(0.6, 0.8j)
---
>>> corregir((-0.8j, 0.6), 1, 1)
(0.6, 0.8j)
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 6.
