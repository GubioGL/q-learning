¿Cuántos bits clásicos caben en un qubit? Por sí solo, **uno**. Con entrelazamiento compartido de antemano, un qubit enviado puede llevar **dos**: es la codificación superdensa.

## El protocolo

Alice y Bob comparten un par $\ket{\Phi^+}$, un qubit cada uno. Alice quiere enviar dos bits.

1. Alice aplica una puerta a **su** qubit, según los bits:

$$
\begin{array}{c|c|c}
\text{bits} & \text{puerta} & \text{estado del par} \\ \hline
00 & I & \ket{\Phi^+} \\
01 & X & \ket{\Psi^+} \\
10 & Z & \ket{\Phi^-} \\
11 & ZX & \ket{\Psi^-}
\end{array}
$$

2. Alice envía su qubit a Bob.
3. Bob, con los dos qubits, hace una **medición de Bell** (CNOT y luego H) y lee los dos bits.

![Circuito de la codificación superdensa](/content/teoria-quantica/superdensa.es.svg)

Funciona porque los cuatro estados de Bell son ortogonales y, por tanto, distinguibles con certeza.

Alice quiere enviar `10`. ¿Qué puerta aplica? (Una letra.)

```exercise:text
id: superdensa-porta
answer: Z
```

Bob obtuvo el estado $\ket{\Psi^+}$. ¿Qué bits envió Alice?

```exercise:text
id: superdensa-bits
answer: 01
```

## No es magia

El recurso se **pagó antes**: alguien distribuyó el par entrelazado. En total, dos qubits llegan a Bob, uno antes y otro después de elegir el mensaje. Lo sorprendente es que el primero llegó **antes** de que Alice decidiera qué decir.

¿Cuántos qubits envía Alice, después de elegir el mensaje, para transmitir **100 bits** con este protocolo?

```exercise:number
id: superdensa-cem
answer: 50
```

Si un espía captura solo el qubit de Alice en tránsito, no descubre nada: por sí solo, es 50/50 en cualquier base, sea cual sea el mensaje.

## En Python

Escribe el lado de Alice: dados los bits, aplica X y/o Z al **primer** qubit del par.

```exercise:python
id: superdensa-codigo
input: b1, b2 | int | 0 o 1 | 1, 0
output: codificar | list | lista con las 4 amplitudes, en el orden 00, 01, 10, 11 | [2**-0.5, 0, 0, -2**-0.5]
---
r = 2**-0.5
PAR = [r, 0, 0, r]  # orden 00, 01, 10, 11

def x_en_el_primero(e):
    return [e[2], e[3], e[0], e[1]]

def z_en_el_primero(e):
    return [e[0], e[1], -e[2], -e[3]]

def codificar(b1, b2):
    estado = PAR
    # b2 = 1 pide X; b1 = 1 pide Z (X primero)
    return estado

def decodificar(e):
    # Bob: CNOT, luego H en el primero; devuelve el resultado más probable
    e = [e[0], e[1], e[3], e[2]]
    e = [r * (e[0] + e[2]), r * (e[1] + e[3]), r * (e[0] - e[2]), r * (e[1] - e[3])]
    i = max(range(4), key=lambda k: abs(e[k]))
    return (i // 2, i % 2)
---
>>> decodificar(codificar(1, 0))
(1, 0)
---
>>> decodificar(codificar(0, 0))
(0, 0)
>>> decodificar(codificar(0, 1))
(0, 1)
---
>>> decodificar(codificar(1, 1))
(1, 1)
>>> codificar(0, 1)
[0, 2**-0.5, 2**-0.5, 0]
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 6.
