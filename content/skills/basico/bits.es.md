Todo ordenador, del móvil al superordenador, guarda información usando **bits**. Antes de hablar de qubits, conviene entender bien qué es un bit y cómo, al juntar varios, representamos números.

## El bit

Un bit es la menor unidad de información: solo tiene dos valores posibles, que escribimos como $0$ y $1$. Físicamente puede ser una tensión baja o alta en un cable, un condensador descargado o cargado, un agujero o su ausencia en una tarjeta.

Con $n$ bits podemos formar $2^n$ secuencias diferentes, porque cada bit nuevo duplica las posibilidades.

¿Cuántas secuencias diferentes existen con **4 bits**?

```exercise:number
id: bits-combinacoes
answer: 16
```

## Números en binario

En el sistema decimal, cada posición vale una potencia de 10. En binario, cada posición vale una **potencia de 2**:

![Los bits 1 0 1 con pesos 4, 2 y 1](/content/basico/binario-101.svg)

Así, la secuencia $b_{n-1}\dots b_1 b_0$ representa el número

$$
N = \sum_{k=0}^{n-1} b_k \, 2^k .
$$

Por ejemplo, $101_2 = 1\cdot 4 + 0\cdot 2 + 1\cdot 1 = 5$.

¿Cuál es el valor decimal de $1101_2$?

```exercise:number
id: bits-1101
answer: 13
```

Para hacer el camino inverso, dividimos el número entre 2 repetidamente y leemos los restos de abajo arriba. Por ejemplo, $6 = 4 + 2$, así que $6 = 110_2$.

Escribe el número $9$ en binario.

```exercise:text
id: bits-nove
answer: 1001 | 0b1001
```

## Ahora en Python

En Python, `int("101", 2)` convierte de binario a decimal. Pero vamos a escribir la conversión nosotros mismos, usando la suma anterior. Completa la función para que devuelva el valor decimal de una cadena de bits.

```exercise:python
id: bits-para-decimal
---
def binario_a_decimal(bits):
    total = 0
    # recorre los bits y suma b_k * 2**k
    return total
---
assert binario_a_decimal("0") == 0
assert binario_a_decimal("101") == 5
assert binario_a_decimal("1101") == 13
assert binario_a_decimal("11111111") == 255
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 1.
