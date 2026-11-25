Guardar bits no basta: un ordenador necesita **transformar** bits. De eso se encargan las puertas lógicas, pequeñas funciones que reciben bits y devuelven bits.

## Las tres puertas principales

- **NOT** invierte un bit: $0$ pasa a $1$ y $1$ pasa a $0$. Escribimos $\overline{A}$.
- **AND** da $1$ solo cuando las dos entradas son $1$. Escribimos $AB$.
- **OR** da $1$ cuando al menos una entrada es $1$. Escribimos $A+B$ (aquí el "+" no es la suma común).

![Puertas NOT, AND y OR con sus entradas y su salida](/content/basico/portas-logicas.svg)

Una **tabla de verdad** muestra la salida para todas las entradas posibles:

$$
\begin{array}{cc|c|c|c}
A & B & A \text{ AND } B & A \text{ OR } B & A \text{ XOR } B \\ \hline
0 & 0 & 0 & 0 & 0 \\
0 & 1 & 0 & 1 & 1 \\
1 & 0 & 0 & 1 & 1 \\
1 & 1 & 1 & 1 & 0
\end{array}
$$

La última columna es la puerta **XOR** ("o exclusivo", $A \oplus B$): da $1$ cuando las entradas son **diferentes**. Es la suma de dos bits sin acarreo, y reaparecerá todo el tiempo en la computación cuántica.

¿Cuántas filas tiene la tabla de verdad de una puerta con **3 entradas**?

```exercise:number
id: portas-linhas
answer: 8
```

## Combinar puertas

La salida de una puerta puede ser la entrada de otra. Por ejemplo, $\overline{AB}$ es un AND seguido de un NOT: la puerta **NAND**.

¿Cuánto vale $\overline{A B} \oplus B$ cuando $A = 1$ y $B = 1$?

```exercise:number
id: portas-nand-xor
answer: 1
```

Un resultado útil son las **leyes de De Morgan**, que cambian AND por OR cuando el NOT atraviesa la expresión:

$$
\overline{AB} = \overline{A} + \overline{B}, \qquad \overline{A + B} = \overline{A}\,\overline{B}.
$$

## Universalidad

Un conjunto de puertas es **universal** cuando, combinando solo ellas, se puede construir cualquier función de bits. ¡La NAND por sí sola ya es universal! Conectando sus dos entradas al mismo bit, obtenemos un NOT:

$$
\text{NAND}(A, A) = \overline{A A} = \overline{A}.
$$

Escribe las funciones `NOT`, `AND` y `OR` usando **únicamente** `nand`.

```exercise:python
id: portas-nand-universal
input: a, b | int | cada uno es 0 o 1 (NOT recibe solo a) | 1
output: NOT, AND, OR | int | 0 o 1 | 1
---
def nand(a, b):
    return 1 - a * b

def NOT(a):
    return 0  # usa nand

def AND(a, b):
    return 0  # usa nand

def OR(a, b):
    return 0  # pista: De Morgan
---
>>> AND(1, 1)
1
---
>>> [NOT(0), NOT(1)]
[1, 0]
>>> [AND(0, 0), AND(0, 1), AND(1, 0)]
[0, 0, 0]
---
>>> [OR(0, 0), OR(0, 1), OR(1, 0), OR(1, 1)]
[0, 1, 1, 1]
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 1.
