Medir algo no mundo quântico (energia, spin, posição) corresponde a uma matriz com uma propriedade especial: ela é **hermitiana**. Aqui veremos o que isso significa, por que os resultados da medida são números reais e como toda matriz hermitiana 2x2 se escreve com as portas de Pauli.

## O adjunto e a condição hermitiana

Você já viu o conjugado transposto: o **adjunto** $A^\dagger$ de uma matriz $A$ troca linhas por colunas e conjuga cada entrada. Exemplo:

$$
A = \begin{pmatrix}1 & 2i\\ 3 & 4\end{pmatrix}
\quad\Rightarrow\quad
A^\dagger = \begin{pmatrix}1 & 3\\ -2i & 4\end{pmatrix}.
$$

Uma matriz é **hermitiana** quando é igual ao próprio adjunto:

$$
A^\dagger = A.
$$

O que isso exige das entradas? Na diagonal, $a_{jj} = a_{jj}^*$, então elas são **reais**. Fora da diagonal, $a_{jk} = a_{kj}^*$: o elemento simétrico é o conjugado. Exemplo hermitiano:

$$
\begin{pmatrix} 2 & 1-i\\ 1+i & 3\end{pmatrix}.
$$

A matriz $\begin{pmatrix}1 & i\\ i & 1\end{pmatrix}$ é hermitiana? (Responda sim ou não.)

```exercise:text
id: hermitianas-checar
answer: não | nao | n
```

## Autovalores reais

Revisando: se $A\ket{v} = \lambda\ket{v}$ com $\ket{v}\neq 0$, então $\ket{v}$ é um **autovetor** de $A$ e $\lambda$ o seu **autovalor**. A novidade é o que a condição $A^\dagger = A$ garante:

- **os autovalores de uma hermitiana são sempre reais**;
- autovetores de autovalores **diferentes** são ortogonais;
- pelo **teorema espectral**, é sempre possível escolher os autovetores formando uma base ortonormal (se um autovalor se repete, escolhemos com cuidado dentro dele).

Por que o autovalor é real? Em uma frase: $\bra{v}A\ket{v} = \lambda\braket{v|v}$; como $A^\dagger = A$, esse número é igual ao seu conjugado, logo real, e $\braket{v|v}>0$ é real, então $\lambda$ é real.

Exemplo para $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ (não é uma porta de Pauli): $A\begin{pmatrix}1\\1\end{pmatrix} = \begin{pmatrix}3\\3\end{pmatrix}$, autovalor $3$; $A\begin{pmatrix}1\\-1\end{pmatrix} = \begin{pmatrix}1\\-1\end{pmatrix}$, autovalor $1$. Os dois autovetores são ortogonais.

Para $A = \begin{pmatrix}1&2\\2&1\end{pmatrix}$, qual é o autovalor associado ao autovetor $\begin{pmatrix}1\\-1\end{pmatrix}$?

```exercise:number
id: hermitianas-autovalor-2x2
answer: -1
```

O **traço** de uma matriz é a **soma da diagonal**: $\mathrm{tr}\begin{pmatrix}a&b\\c&d\end{pmatrix} = a+d$. Para uma hermitiana, o traço também é a soma dos autovalores. Qual é o traço de $A = \begin{pmatrix}5&1\\1&-2\end{pmatrix}$?

```exercise:number
id: hermitianas-traco
answer: 3
```

## Observáveis

Em mecânica quântica, uma grandeza que se pode medir é um **observável**, representado por uma matriz hermitiana $A$. As regras:

- os resultados possíveis da medida são os **autovalores** de $A$ (reais, como deve ser para um aparelho de medida);
- após medir o resultado $\lambda$, o estado fica no autovetor correspondente (se $\lambda$ não se repete);
- o valor médio, depois de muitas medidas num estado $\ket{\psi}$, é $\bra{\psi}A\ket{\psi}$.

Exemplo: o observável $Z$ num estado $\alpha\ket{0}+\beta\ket{1}$ dá $+1$ com probabilidade $|\alpha|^2$ e $-1$ com $|\beta|^2$; o valor médio é $|\alpha|^2 - |\beta|^2$. É a medida na base padrão, só que rotulando os resultados com $\pm1$.

Qual é o valor médio de $Z$ no estado $\tfrac{\sqrt3}{2}\ket{0} + \tfrac12\ket{1}$?

```exercise:number
id: hermitianas-media
answer: 0.5
tolerance: 0.001
```

## Pauli: hermitianas e unitárias

As matrizes de Pauli e a identidade são

$$
I = \begin{pmatrix}1&0\\0&1\end{pmatrix},\quad
X = \begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
Y = \begin{pmatrix}0&-i\\ i&0\end{pmatrix},\quad
Z = \begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

Como você viu em unitariedade, cada uma é hermitiana e unitária, então $\sigma^2 = I$ e os autovalores só podem ser $\pm1$. Autovetores: $X\ket{\pm}=\pm\ket{\pm}$; $Z\ket{0}=\ket{0}$, $Z\ket{1}=-\ket{1}$; $Y\ket{+i}=+\ket{+i}$ e $Y\ket{-i}=-\ket{-i}$. Medir nas bases da esfera de Bloch é medir os observáveis $X$, $Y$ e $Z$.

Uma porta é a exponencial de um observável: as rotações $R_\sigma(\theta)=e^{-i\theta\sigma/2}$ (skill de rotações, no curso de Computação Quântica) fazem essa ponte entre observáveis e circuitos.

## Toda hermitiana 2x2 é uma combinação de Pauli

Uma matriz 2x2 hermitiana tem 4 números reais livres: dois na diagonal e a parte real e imaginária de um elemento fora dela. Há exatamente quatro matrizes "de referência", $\sigma_0=I$, $\sigma_1=X$, $\sigma_2=Y$, $\sigma_3=Z$, então

$$
A = a_0 I + a_1 X + a_2 Y + a_3 Z, \qquad a_k \in \mathbb{R}.
$$

Para achar os $a_k$ (com $\mathrm{tr}$ = soma da diagonal), observe que $I$ tem traço 2 e $X$, $Y$, $Z$ têm traço 0, e que $\mathrm{tr}(\sigma_j\sigma_k) = 2$ se $j=k$ e $0$ caso contrário. Logo

$$
a_k = \tfrac12\,\mathrm{tr}(\sigma_k A).
$$

Exemplo: $A = \begin{pmatrix}3 & 1-i\\ 1+i & 1\end{pmatrix}$. Na diagonal, $a_0 + a_3 = 3$ e $a_0 - a_3 = 1$, então $a_0 = 2$, $a_3 = 1$. O elemento superior direito é $a_1 - i a_2 = 1 - i$, então $a_1 = 1$ e $a_2 = 1$. Assim $A = 2I + X + Y + Z$.

![A = [[3, 1−i],[1+i, 1]] escrita como 2I + X + Y + Z, com a origem de cada coeficiente](/content/algebra-linear/hermitiana-pauli.svg)

Na decomposição de $A = \begin{pmatrix}1 & 2\\ 2 & -3\end{pmatrix}$ em $a_0 I + a_1 X + a_2 Y + a_3 Z$, qual é $a_3$?

```exercise:number
id: hermitianas-pauli-a3
answer: 2
```

## Em Python

Defina `X`, `Y`, `Z` como arrays 2x2 dentro da função. Ela recebe uma matriz 2x2 hermitiana e devolve `np.array([a0, a1, a2, a3])` (floats reais) usando $a_k = \tfrac12\mathrm{tr}(\sigma_k A)$. Dica: `np.trace(M @ A)`; use `.real` no fim.

```exercise:python
id: hermitianas-decompor
input: A | np.ndarray | matriz hermitiana de formato (2, 2), entradas podem ser complexas | np.array([[3, 1 - 1j], [1 + 1j, 1]])
output: coef | np.ndarray | [a0, a1, a2, a3] reais, formato (4,) | np.array([2, 1, 1, 1])
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

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (2025), seções 2.3 e 2.9; T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), seções 3.3.3 e 3.3.4.
