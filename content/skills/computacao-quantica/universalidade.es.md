La NAND basta para cualquier cálculo clásico. ¿Existe un conjunto pequeño de puertas que baste para cualquier cálculo **cuántico**?

## Universal, pero aproximado

Hay infinitas unitarias, así que un conjunto finito de puertas no puede generarlas todas con exactitud. Pedimos algo más modesto: un conjunto es **universal** si puede **aproximar** cualquier unitaria con la precisión que queramos.

## Qué necesita un conjunto universal

- crear **superposición** (X, Z y CNOT solas no pueden);
- crear **entrelazamiento** (solo con puertas de 1 qubit no se puede);
- usar amplitudes **complejas** (H y CNOT solo producen números reales);
- ir más allá del **grupo de Clifford**.

¿Cuál de estas capacidades le falta al conjunto de todas las puertas de **1 qubit**? Responde `superposición` o `entrelazamiento`.

```exercise:text
id: universal-falta
answer: entrelazamiento
```

## El grupo de Clifford

H, S y CNOT generan el **grupo de Clifford**. Crean superposición, entrelazamiento y números complejos, y aun así **no** son universales. El **teorema de Gottesman–Knill** dice que los circuitos con solo esas puertas, entradas en la base estándar y mediciones en la base Z se pueden simular con eficiencia en un ordenador clásico.

Al añadir la puerta T, todo cambia: $\{H, T, \text{CNOT}\}$ es universal.

![El conjunto Clifford más T es universal](/content/computacao-quantica/universalidade.es.svg)

No hace falta incluir la S, porque se obtiene con puertas T. ¿Cuántas?

```exercise:number
id: universal-s
answer: 2
```

## Cuánto cuesta aproximar

El **teorema de Solovay–Kitaev** garantiza que aproximar una puerta de 1 qubit con error $\varepsilon$ exige un número de puertas que crece solo como una potencia de $\log(1/\varepsilon)$. Mejorar mucho la precisión cuesta poco.

En los ordenadores con corrección de errores, las puertas de Clifford suelen ser baratas y la T, cara. Por eso se cuenta el número de puertas T, el **T-count**, de un algoritmo.

¿Cuál es el T-count del circuito T, H, T, S, CNOT, T? (Cuenta solo las puertas T que aparecen.)

```exercise:number
id: universal-tcount
answer: 3
```

## En Python

La puerta S equivale a un múltiplo de T. Cada puerta diagonal `[1, e^{i k π/4}]` se puede describir solo con el entero $k$: Z es $k = 4$, S es $k = 2$ y T es $k = 1$. Escribe una función que reciba un circuito de puertas diagonales y devuelva el **menor** número de puertas T necesario para reescribirlo, sabiendo que S y Z son gratis.

```exercise:python
id: universal-codigo
---
K = {"Z": 4, "S": 2, "T": 1}

def t_count_minimo(circuito):
    # suma los k; la paridad dice si sobra una T
    return circuito.count("T")
---
assert t_count_minimo("") == 0
assert t_count_minimo("T") == 1
assert t_count_minimo("TT") == 0
assert t_count_minimo("TSTZT") == 1
assert t_count_minimo("SZS") == 0
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
