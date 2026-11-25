Los bits representan números. ¿Y las letras? Basta con acordar una tabla: cada carácter recibe un número, y el número pasa a binario. La tabla más famosa es **ASCII**.

## La tabla ASCII

ASCII usa **7 bits** por carácter, así que tiene $2^7 = 128$ códigos. Algunos de ellos:

$$
\begin{array}{c|c|c}
\text{carácter} & \text{decimal} & \text{binario} \\ \hline
\text{0} & 48 & 0110000 \\
\text{A} & 65 & 1000001 \\
\text{B} & 66 & 1000010 \\
\text{a} & 97 & 1100001
\end{array}
$$

En la práctica, guardamos cada carácter en un byte (8 bits), con un cero a la izquierda.

![La letra A pasa a 65, que pasa a 01000001](/content/basico/ascii-a.es.svg)

Las letras están en orden: si A es 65, entonces B es 66, C es 67, y así sucesivamente.

¿Cuál es el código decimal de la letra **E**?

```exercise:number
id: ascii-e
answer: 69
```

## El truco del sexto bit

Compara A ($1000001$) con a ($1100001$): solo cambia un bit, el que vale $2^5 = 32$. Esto vale para todas las letras, así que cambiar entre mayúscula y minúscula es invertir un único bit.

Si M tiene el código 77, ¿cuál es el código de **m**?

```exercise:number
id: ascii-m
answer: 109
```

¿Qué palabra de dos letras (un saludo en portugués) hay en `01001111 01001001`?

```exercise:text
id: ascii-palavra
answer: OI
```

## Más allá de ASCII

En 128 códigos no caben "ñ", "ã" ni los emojis. El estándar actual, **Unicode**, da un número a más de cien mil caracteres. La codificación UTF-8 mantiene ASCII intacto y usa de 2 a 4 bytes para el resto.

## En Python

`ord("A")` devuelve $65$, y `format(65, "08b")` devuelve `"01000001"`. Escribe una función que transforme un texto ASCII en bits, 8 por carácter, sin espacios.

```exercise:python
id: ascii-texto-para-bits
input: texto | str | texto ASCII de cualquier longitud, incluso vacío | "A"
output: texto_a_bits | str | 8 caracteres "0" o "1" por letra, sin espacios | "01000001"
---
def texto_a_bits(texto):
    # junta los 8 bits de cada carácter
    return ""
---
>>> texto_a_bits("A")
"01000001"
---
>>> texto_a_bits("OI")
"0100111101001001"
---
>>> texto_a_bits("")
""
>>> len(texto_a_bits("qubit"))
40
>>> texto_a_bits(" a")
"0010000001100001"
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 1.
