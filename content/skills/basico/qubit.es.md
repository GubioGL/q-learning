Un bit es $0$ **o** $1$. Un qubit también tiene esos dos estados, pero puede estar en una **combinación** de ellos. Esta es la primera idea realmente nueva de la computación cuántica.

## Los estados $\ket{0}$ y $\ket{1}$

Escribimos los estados de un qubit con el símbolo $\ket{\cdot}$, llamado **ket**. Los dos estados básicos son $\ket{0}$ y $\ket{1}$, que hacen el papel de los bits $0$ y $1$. Físicamente pueden ser dos niveles de energía de un átomo, dos polarizaciones de un fotón o dos corrientes en un circuito superconductor.

## Superposición

El estado general de un qubit es

$$
\ket{\psi} = \alpha \ket{0} + \beta \ket{1},
$$

donde $\alpha$ y $\beta$ son números complejos llamados **amplitudes**. Cuando las dos son distintas de cero, decimos que el qubit está en **superposición**.

Las amplitudes no son libres: el estado debe estar **normalizado**,

$$
|\alpha|^2 + |\beta|^2 = 1.
$$

![Amplitudes 0,6 y 0,8 y sus cuadrados 0,36 y 0,64](/content/basico/amplitudes.es.svg)

El motivo aparece en la próxima skill: $|\alpha|^2$ y $|\beta|^2$ son probabilidades.

Si $\alpha = 0{,}6$ y $\beta$ es real y positivo, ¿cuánto vale $\beta$?

```exercise:number
id: qubit-beta
answer: 0.8
tolerance: 0.001
```

## Dos estados famosos

Las superposiciones más usadas tienen nombre propio:

$$
\ket{+} = \frac{1}{\sqrt 2}\big(\ket{0} + \ket{1}\big), \qquad \ket{-} = \frac{1}{\sqrt 2}\big(\ket{0} - \ket{1}\big).
$$

El signo menos parece un detalle, pero no lo es: $\ket{+}$ y $\ket{-}$ son estados diferentes, y las puertas cuánticas pueden distinguirlos. Esa diferencia entre las amplitudes se llama **fase relativa**.

En cambio, multiplicar el estado **entero** por un número de módulo 1 (una **fase global**) no cambia nada de lo que se puede observar: $-\ket{0}$ y $\ket{0}$ son físicamente el mismo estado.

¿Cuál es el módulo al cuadrado de la amplitud compleja $\dfrac{1 + i}{2}$? (Recuerda: $|a + bi|^2 = a^2 + b^2$.)

```exercise:number
id: qubit-modulo
answer: 0.5
```

## Lo que la superposición no es

Un qubit en superposición **no** es un bit clásico cuyo valor desconocemos. Una moneda escondida ya es cara o cruz. Las amplitudes de un qubit pueden ser negativas y **cancelarse**, algo que las probabilidades nunca hacen.

## En Python

Los números complejos ya existen en Python: `1j` es $i$, y `abs(z)` es el módulo. Escribe una función que reciba dos amplitudes cualesquiera (no ambas nulas) y devuelva el par normalizado.

```exercise:python
id: qubit-normalizar
---
def normalizar(alfa, beta):
    # divide las dos amplitudes entre la norma del estado
    return (alfa, beta)
---
assert abs(normalizar(3, 4)[0] - 0.6) < 1e-9
assert abs(normalizar(3, 4)[1] - 0.8) < 1e-9
assert abs(sum(abs(x)**2 for x in normalizar(1 + 1j, 2)) - 1) < 1e-9
assert abs(normalizar(1, 1j)[1] - 1j / 2**0.5) < 1e-9
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 2.
