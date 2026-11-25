Se estados são vetores, portas são **matrizes**. E as matrizes que servem de porta quântica têm uma propriedade especial: são unitárias.

## Uma porta é uma matriz

As colunas da matriz dizem para onde vão os estados da base: a primeira coluna é $U\ket{0}$ e a segunda é $U\ket{1}$.

$$
X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \quad
Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \quad
Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}, \quad
H = \frac{1}{\sqrt 2}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}.
$$

Para aplicar a porta, multiplicamos matriz por vetor:

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} \alpha \\ \beta \end{pmatrix} = \begin{pmatrix} a\alpha + b\beta \\ c\alpha + d\beta \end{pmatrix}.
$$

Uma porta leva $\ket{0}$ em $\ket{1}$ e $\ket{1}$ em $-\ket{0}$. Qual é o elemento da **primeira linha, segunda coluna** da matriz?

```exercise:number
id: unitarias-coluna
answer: -1
```

## Portas em sequência

Aplicar $A$ e depois $B$ é multiplicar por $BA$. A ordem importa: em geral $AB \neq BA$. Por exemplo,

$$
XZ = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}, \qquad ZX = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}.
$$

Como $XZ = -ZX$, dizemos que X e Z **anticomutam**.

## A condição de unitariedade

O conjugado transposto $U^\dagger$ se obtém trocando linhas por colunas e conjugando. Uma matriz é **unitária** quando

$$
U^\dagger U = I.
$$

Ou seja, a inversa de $U$ é $U^\dagger$. É exatamente isso que faz a porta preservar a norma:

$$
\bra{\psi}U^\dagger U\ket{\psi} = \braket{\psi|\psi} = 1.
$$

Outra forma de ver: as **colunas** de $U$ formam um conjunto ortonormal.

Que valor positivo de $k$ torna $k\begin{pmatrix} 1 & 1 \\ 1 & -1\end{pmatrix}$ unitária? (Três casas decimais.)

```exercise:number
id: unitarias-k
answer: 0.7071
tolerance: 0.001
```

A matriz $\begin{pmatrix} 1 & 1 \\ 0 & 1\end{pmatrix}$ é unitária? Responda `sim` ou `não`.

```exercise:text
id: unitarias-cisalhamento
answer: não | nao
```

## Em Python

Escreva uma função que testa se uma matriz $2\times 2$ (lista de linhas) é unitária, com tolerância de $10^{-9}$.

```exercise:python
id: unitarias-codigo
input: U | list | lista de 2 linhas, cada linha com 2 números | [[0, 1], [1, 0]]
output: eh_unitaria | bool | True se U é unitária, senão False | True
---
def eh_unitaria(U):
    # verifique se a matriz U†U é a identidade
    return True
---
>>> eh_unitaria([[1, 1], [0, 1]])
False
---
>>> eh_unitaria([[0, -1j], [1j, 0]])
True
>>> eh_unitaria([[1, 1], [1, -1]])
False
---
>>> eh_unitaria([[2**-0.5, 2**-0.5], [2**-0.5, -2**-0.5]])
True
>>> eh_unitaria([[1, 0], [0, 1j]])
True
>>> eh_unitaria([[0.6, 0.8], [0.6, 0.8]])
False
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
