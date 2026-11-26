Medir algo en el mundo cuántico (energía, espín, posición) corresponde a una matriz con una propiedad especial: es **hermítica**. Aquí veremos qué significa, por qué los resultados de la medida son números reales y cómo toda matriz hermítica 2x2 se escribe con las puertas de Pauli.

## El adjunto y la condición hermítica

Ya viste la conjugada transpuesta: el **adjunto** $A^\dagger$ de una matriz $A$ intercambia filas y columnas y conjuga cada entrada. Ejemplo:

$$
A = \begin{pmatrix}1 & 2i\\ 3 & 4\end{pmatrix}
\quad\Rightarrow\quad
A^\dagger = \begin{pmatrix}1 & 3\\ -2i & 4\end{pmatrix}.
$$

Una matriz es **hermítica** cuando es igual a su propio adjunto:

$$
A^\dagger = A.
$$

¿Qué exige esto de las entradas? En la diagonal, $a_{jj} = a_{jj}^*$, así que son **reales**. Fuera de la diagonal, $a_{jk} = a_{kj}^*$: el elemento simétrico es el conjugado. Un ejemplo hermítico:

$$
\begin{pmatrix} 2 & 1-i\\ 1+i & 3\end{pmatrix}.
$$

¿Es hermítica la matriz $\begin{pmatrix}1 & i\\ i & 1\end{pmatrix}$? (Responde sí o no.)

```exercise:text
id: hermitianas-checar
answer: no | n
```

## Autovalores reales

Repasando: si $A\ket{v} = \lambda\ket{v}$ con $\ket{v}\neq 0$, entonces $\ket{v}$ es un **autovector** de $A$ y $\lambda$ su **autovalor**. La novedad es lo que garantiza la condición $A^\dagger = A$:

- **los autovalores de una hermítica son siempre reales**;
- los autovectores de autovalores **distintos** son ortogonales;
- por el **teorema espectral**, siempre se pueden elegir los autovectores formando una base ortonormal (si un autovalor se repite, elegimos con cuidado dentro de él).

¿Por qué es real el autovalor? En una frase: $\bra{v}A\ket{v} = \lambda\braket{v|v}$; como $A^\dagger = A$, ese número es igual a su conjugado, luego real, y $\braket{v|v}>0$ es real, así que $\lambda$ es real.

Ejemplo para $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ (no es una puerta de Pauli): $A\begin{pmatrix}1\\1\end{pmatrix} = \begin{pmatrix}3\\3\end{pmatrix}$, autovalor $3$; $A\begin{pmatrix}1\\-1\end{pmatrix} = \begin{pmatrix}1\\-1\end{pmatrix}$, autovalor $1$. Los dos autovectores son ortogonales.

Para $A = \begin{pmatrix}1&2\\2&1\end{pmatrix}$, ¿cuál es el autovalor asociado al autovector $\begin{pmatrix}1\\-1\end{pmatrix}$?

```exercise:number
id: hermitianas-autovalor-2x2
answer: -1
```

La **traza** de una matriz es la **suma de la diagonal**: $\mathrm{tr}\begin{pmatrix}a&b\\c&d\end{pmatrix} = a+d$. Para una hermítica, la traza también es la suma de los autovalores. ¿Cuál es la traza de $A = \begin{pmatrix}5&1\\1&-2\end{pmatrix}$?

```exercise:number
id: hermitianas-traco
answer: 3
```

## Observables

En mecánica cuántica, una magnitud que se puede medir es un **observable**, representado por una matriz hermítica $A$. Las reglas:

- los resultados posibles de la medida son los **autovalores** de $A$ (reales, como debe ser para un aparato de medida);
- tras medir el resultado $\lambda$, el estado queda en el autovector correspondiente (si $\lambda$ no se repite);
- el valor medio, tras muchas medidas en un estado $\ket{\psi}$, es $\bra{\psi}A\ket{\psi}$.

Ejemplo: el observable $Z$ en un estado $\alpha\ket{0}+\beta\ket{1}$ da $+1$ con probabilidad $|\alpha|^2$ y $-1$ con $|\beta|^2$; el valor medio es $|\alpha|^2 - |\beta|^2$. Es la medida en la base estándar, solo que rotulando los resultados con $\pm1$.

¿Cuál es el valor medio de $Z$ en el estado $\tfrac{\sqrt3}{2}\ket{0} + \tfrac12\ket{1}$?

```exercise:number
id: hermitianas-media
answer: 0.5
tolerance: 0.001
```

## Pauli: hermíticas y unitarias

Las matrices de Pauli y la identidad son

$$
I = \begin{pmatrix}1&0\\0&1\end{pmatrix},\quad
X = \begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
Y = \begin{pmatrix}0&-i\\ i&0\end{pmatrix},\quad
Z = \begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

Como viste en unitariedad, cada una es hermítica y unitaria, así que $\sigma^2 = I$ y los autovalores solo pueden ser $\pm1$. Autovectores: $X\ket{\pm}=\pm\ket{\pm}$; $Z\ket{0}=\ket{0}$, $Z\ket{1}=-\ket{1}$; $Y\ket{+i}=+\ket{+i}$ e $Y\ket{-i}=-\ket{-i}$. Medir en las bases de la esfera de Bloch es medir los observables $X$, $Y$ y $Z$.

Una puerta es la exponencial de un observable: las rotaciones $R_\sigma(\theta)=e^{-i\theta\sigma/2}$ (skill de rotaciones, en el curso de Computación Cuántica) hacen ese puente entre observables y circuitos.

## Toda hermítica 2x2 es una combinación de Pauli

Una matriz hermítica 2x2 tiene 4 números reales libres: dos en la diagonal y la parte real e imaginaria de un elemento fuera de ella. Hay exactamente cuatro matrices "de referencia", $\sigma_0=I$, $\sigma_1=X$, $\sigma_2=Y$, $\sigma_3=Z$, así que

$$
A = a_0 I + a_1 X + a_2 Y + a_3 Z, \qquad a_k \in \mathbb{R}.
$$

Para hallar los $a_k$ (con $\mathrm{tr}$ = suma de la diagonal), observa que $I$ tiene traza 2 y $X$, $Y$, $Z$ tienen traza 0, y que $\mathrm{tr}(\sigma_j\sigma_k) = 2$ si $j=k$ y $0$ en otro caso. Luego

$$
a_k = \tfrac12\,\mathrm{tr}(\sigma_k A).
$$

Ejemplo: $A = \begin{pmatrix}3 & 1-i\\ 1+i & 1\end{pmatrix}$. En la diagonal, $a_0 + a_3 = 3$ y $a_0 - a_3 = 1$, así que $a_0 = 2$, $a_3 = 1$. El elemento superior derecho es $a_1 - i a_2 = 1 - i$, así que $a_1 = 1$ y $a_2 = 1$. Entonces $A = 2I + X + Y + Z$.

![A = [[3, 1−i],[1+i, 1]] escrita como 2I + X + Y + Z, con el origen de cada coeficiente](/content/algebra-linear/hermitiana-pauli.svg)

En la descomposición de $A = \begin{pmatrix}1 & 2\\ 2 & -3\end{pmatrix}$ como $a_0 I + a_1 X + a_2 Y + a_3 Z$, ¿cuál es $a_3$?

```exercise:number
id: hermitianas-pauli-a3
answer: 2
```

## En Python

Define `X`, `Y`, `Z` como arrays 2x2 dentro de la función. Recibe una matriz hermítica 2x2 y devuelve `np.array([a0, a1, a2, a3])` (floats reales) usando $a_k = \tfrac12\mathrm{tr}(\sigma_k A)$. Pista: `np.trace(M @ A)`; usa `.real` al final.

```exercise:python
id: hermitianas-decompor
input: A | np.ndarray | matriz hermítica de forma (2, 2), las entradas pueden ser complejas | np.array([[3, 1 - 1j], [1 + 1j, 1]])
output: coef | np.ndarray | [a0, a1, a2, a3] reales, forma (4,) | np.array([2, 1, 1, 1])
---
import numpy as np

def decompor_pauli(A):
    return np.array([0.0, 0.0, 0.0, 0.0])
---
>>> decompor_pauli(np.array([[3, 1 - 1j], [1 + 1j, 1]]))
np.array([2, 1, 1, 1])
---
>>> decompor_pauli(np.array([[1, 0], [0, -1]]))
np.array([0, 0, 0, 1])
>>> decompor_pauli(np.array([[0, -2j], [2j, 0]]))
np.array([0, 0, 2, 0])
---
>>> decompor_pauli(np.array([[1, 2], [2, -3]]))
np.array([-1, 2, 0, 2])
```

> Para profundizar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (2025), secciones 2.3 y 2.9; T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), secciones 3.3.3 y 3.3.4.
