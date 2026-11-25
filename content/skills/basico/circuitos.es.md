Un programa cuántico suele dibujarse como un **circuito**: líneas que representan qubits y cajas que representan puertas.

## Leer un circuito

- Cada **línea** es un qubit; el tiempo corre de **izquierda a derecha**.
- Cada **caja** es una puerta.
- El símbolo de **medidor** al final indica una medición.

![Circuito con H, Z, H y una medición](/content/basico/circuito-hzh.svg)

El circuito de arriba empieza en $\ket{0}$ y aplica H, Z y H. Cuidado con la notación algebraica: la puerta que se aplica **primero** queda más cerca del ket, así que el orden se invierte respecto al dibujo. Si el dibujo muestra A y luego B, escribimos

$$
B\,A\,\ket{0}.
$$

Un circuito aplica X y luego H. ¿Cómo se escribe el operador total? (Escribe las dos letras en orden algebraico, sin espacio.)

```exercise:text
id: circuitos-ordem
answer: HX
```

¿Cuál es la probabilidad de medir $1$ en el circuito H, Z, H con entrada $\ket{0}$?

```exercise:number
id: circuitos-hzh
answer: 1
```

## Interferencia en un circuito

Compara dos circuitos con entrada $\ket{0}$:

- H, **medición**, H, medición: la primera medición sortea $0$ o $1$, y la segunda también.
- H, H, medición: siempre $0$.

La única diferencia es la medición del medio. Destruye la superposición y, con ella, la interferencia.

En el primer circuito, ¿cuál es la probabilidad de que la medición **final** dé $0$?

```exercise:number
id: circuitos-medida-meio
answer: 0.5
```

## Profundidad

La **profundidad** de un circuito es el número de capas de puertas, cuando las puertas en qubits diferentes pueden ejecutarse al mismo tiempo. Importa porque los qubits reales pierden la coherencia con el tiempo: los circuitos poco profundos sufren menos ruido.

Un circuito tiene 3 qubits y aplica una puerta H a cada uno, y nada más. ¿Cuál es su profundidad?

```exercise:number
id: circuitos-profundidade
answer: 1
```

## En Python: tu primer simulador

Escribe una función que ejecute un circuito de 1 qubit. Recibe una cadena de puertas en el orden del dibujo, empieza en $\ket{0}$ y devuelve $P(1)$.

```exercise:python
id: circuitos-simulador
input: circuito | str | letras X, Z y H en el orden del dibujo; puede estar vacío | "HZH"
output: prob_1 | float | probabilidad de medir 1, entre 0 y 1 | 1.0
---
r = 2**-0.5
PUERTAS = {
    "X": [[0, 1], [1, 0]],
    "Z": [[1, 0], [0, -1]],
    "H": [[r, r], [r, -r]],
}

def prob_1(circuito):
    estado = [1, 0]
    # aplica cada puerta: nuevo[i] = suma_j U[i][j] * estado[j]
    return abs(estado[1]) ** 2
---
>>> prob_1("X")
1
---
>>> prob_1("H")
0.5
>>> prob_1("")
0
---
>>> prob_1("HZH")
1
>>> prob_1("XHXH")
1
>>> prob_1("HXH")
0
```

Para montar circuitos sin programar, prueba el simulador gratuito [Quirk](https://algassert.com/quirk), que funciona en el navegador.

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 2.
