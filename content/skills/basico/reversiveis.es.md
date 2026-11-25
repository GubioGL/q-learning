Si la salida de un AND es $0$, ¿cuáles eran las entradas? No hay forma de saberlo: podía ser $00$, $01$ o $10$. Esta pérdida de información importa, porque **toda puerta cuántica es reversible**.

## Qué es reversible

Una puerta es **reversible** cuando la salida determina la entrada: entradas diferentes siempre llevan a salidas diferentes. Por eso necesita tener el mismo número de bits en la entrada y en la salida.

- NOT es reversible: basta con aplicar NOT otra vez.
- AND, OR y XOR no lo son: entran 2 bits y sale solo 1.

¿Cuántas entradas diferentes de un OR producen la salida $1$?

```exercise:number
id: reversiveis-or
answer: 3
```

## CNOT: el XOR reversible

Para hacer reversible el XOR, conservamos una de las entradas. La **CNOT** (NOT controlado) tiene un bit de control $A$ y un objetivo $B$:

$$
(A, B) \longrightarrow (A,\; A \oplus B).
$$

El objetivo se invierte solo si el control es $1$. Aplicándola dos veces volvemos al inicio, porque $A \oplus A \oplus B = B$.

¿Cuál es la salida de la CNOT para la entrada $A = 1$, $B = 1$? Escribe los dos bits juntos, primero el control.

```exercise:text
id: reversiveis-cnot
answer: 10
```

## Toffoli: el AND reversible

La **puerta de Toffoli** tiene dos controles y un objetivo:

$$
(A, B, C) \longrightarrow (A,\; B,\; AB \oplus C).
$$

![Puerta de Toffoli: dos controles y un objetivo](/content/basico/toffoli.svg)

Con el objetivo en $C = 0$, la tercera salida es exactamente $AB$, es decir, el AND. Con $C = 1$, es $\overline{AB}$, la NAND. Como la NAND es universal, **la Toffoli es universal para la computación clásica**. Por lo tanto, todo lo que hace un ordenador clásico se puede hacer de forma reversible, usando algunos bits auxiliares.

Existen $n!$ formas de barajar $n$ elementos, y una puerta reversible no es más que una forma de barajar las entradas. ¿Cuántas puertas reversibles diferentes de **2 bits** existen? (Hay $2^2 = 4$ entradas para barajar.)

```exercise:number
id: reversiveis-contagem
answer: 24
```

## En Python

Escribe la Toffoli y úsala para construir el AND.

```exercise:python
id: reversiveis-toffoli
input: a, b, c | int | cada uno es 0 o 1 (AND recibe solo a y b) | 1
output: toffoli | tuple | tres bits (a, b, c) después de la puerta | (1, 1, 1)
output: AND | int | 0 o 1 | 1
---
def toffoli(a, b, c):
    return (a, b, c)  # corrige la tercera salida

def AND(a, b):
    return 0  # usa toffoli
---
>>> toffoli(1, 1, 0)
(1, 1, 1)
---
>>> toffoli(1, 1, 1)
(1, 1, 0)
>>> toffoli(1, 0, 1)
(1, 0, 1)
>>> toffoli(*toffoli(1, 1, 0))
(1, 1, 0)
---
>>> [AND(0, 0), AND(0, 1), AND(1, 0), AND(1, 1)]
[0, 0, 0, 1]
>>> toffoli(0, 1, 1)
(0, 1, 1)
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 1.
