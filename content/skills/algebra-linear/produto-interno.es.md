¿Cuánto se parecen dos estados? La respuesta es un solo número: el **producto interno**.

## Bra por ket

Multiplicando la fila $\bra{\phi}$ por la columna $\ket{\psi}$, obtenemos un número complejo, el **braket**:

$$
\braket{\phi|\psi} = \begin{pmatrix} c^* & d^* \end{pmatrix}\begin{pmatrix} \alpha \\ \beta \end{pmatrix} = c^*\alpha + d^*\beta,
$$

donde $\ket{\phi} = c\ket{0} + d\ket{1}$. Cambiar el orden conjuga el resultado: $\braket{\psi|\phi} = \braket{\phi|\psi}^*$.

¿Cuánto vale $\braket{+|0}$? (Usa tres decimales.)

```exercise:number
id: interno-mais-zero
answer: 0.7071
tolerance: 0.001
```

## Norma y normalización

El producto interno de un estado consigo mismo es la suma de los módulos al cuadrado:

$$
\braket{\psi|\psi} = |\alpha|^2 + |\beta|^2.
$$

Estar normalizado es, por tanto, lo mismo que $\braket{\psi|\psi} = 1$.

Si $\ket{\psi} = A\left(\ket{0} + 2\ket{1}\right)$ y queremos $\braket{\psi|\psi} = 1$, ¿cuánto vale $A^2$ (con $A$ real)?

```exercise:number
id: interno-normalizacao
answer: 0.2
tolerance: 0.001
```

## Estados ortogonales

Cuando $\braket{\phi|\psi} = 0$, los estados son **ortogonales**: existe una medición que los distingue con certeza. Es el caso de $\ket{0}$ y $\ket{1}$, y también de $\ket{+}$ y $\ket{-}$:

$$
\braket{+|-} = \frac12\big(1\cdot 1 + 1\cdot(-1)\big) = 0.
$$

En la esfera de Bloch, los estados ortogonales están en puntos **opuestos**, a $180^\circ$ uno del otro.

Un conjunto de estados normalizados y ortogonales entre sí es **ortonormal**. En símbolos, $\braket{e_i|e_j} = \delta_{ij}$, que vale $1$ si $i = j$ y $0$ si no.

¿Son ortogonales los estados $\tfrac{1}{\sqrt2}(\ket{0} + i\ket{1})$ y $\tfrac{1}{\sqrt2}(\ket{0} - i\ket{1})$? Responde `sí` o `no`.

```exercise:text
id: interno-ortogonais
answer: sí | si
```

Cuidado con el conjugado: $\begin{pmatrix}1 & -i\end{pmatrix}\begin{pmatrix}1 \\ -i\end{pmatrix} = 1 + i^2 = 0$.

## En Python

```exercise:python
id: interno-codigo
---
def producto_interno(phi, psi):
    # <phi|psi>: conjuga las componentes de phi
    return 0
---
assert producto_interno([1, 0], [0, 1]) == 0
assert producto_interno([1j, 0], [1, 0]) == -1j
assert producto_interno([1, 1j], [1, -1j]) == 0
assert abs(producto_interno([0.6, 0.8j], [0.6, 0.8j]) - 1) < 1e-9
```

> Para profundizar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
