Um circuito quântico quase nunca é uma porta só: são portas uma atrás da outra. Será que podemos trocar um trecho longo por um trecho curto que faz exatamente a mesma coisa? Em muitos casos, sim, e a álgebra de matrizes diz como.

## Portas em sequência: o produto vai ao contrário

Lemos um circuito da esquerda para a direita, no tempo. Se o estado passa primeiro por $A$ e depois por $B$, o resultado é $B(A\ket{\psi})$, então a matriz do circuito inteiro é

$$
U = BA.
$$

A primeira porta fica **à direita** no produto. Isso acontece porque a matriz age no ket que está à sua direita. Com três portas $A$, $B$, $C$ nessa ordem temporal: $U = CBA$.

Exemplo: primeiro $X$, depois $Z$, dá $U = ZX$. Calculando,

$$
ZX = \begin{pmatrix}1&0\\0&-1\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix} = \begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

Se o circuito aplica primeiro $X$ e depois $Z$, qual é a entrada da linha 2, coluna 1 da matriz do circuito (a de baixo à esquerda)?

```exercise:number
id: identidades-ordem
answer: -1
```

## Identidades simples

Algumas portas são a **própria inversa**: aplicar duas vezes não faz nada.

$$
XX = I, \qquad YY = I, \qquad ZZ = I, \qquad HH = I.
$$

Como $I$ é a matriz que não muda nada, dois pares iguais seguidos podem ser apagados do circuito. Conferindo $HH$: $H = \tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ e

$$
HH = \tfrac12\begin{pmatrix}1+1 & 1-1\\ 1-1 & 1+1\end{pmatrix} = I.
$$

Você pode conferir multiplicando as matrizes. (Elas têm $U^\dagger = U$ e $U^\dagger U = I$, daí $UU=I$.)

Considere o circuito, em ordem temporal, $X, H, H, X, Z, Z, H$. Cancelando pares iguais adjacentes (e repetindo, pois novos pares aparecem), quantas portas sobram?

```exercise:number
id: identidades-cancelar
answer: 1
```

## Identidades com $H$: trocar $X$ por $Z$

A porta $H$ funciona como um "tradutor" entre $X$ e $Z$. Vamos calcular $HXH$ (circuito: $H$, depois $X$, depois $H$):

$$
HXH = \tfrac12\begin{pmatrix}1&1\\1&-1\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}1&1\\1&-1\end{pmatrix}
= \tfrac12\begin{pmatrix}1&1\\-1&1\end{pmatrix}\begin{pmatrix}1&1\\1&-1\end{pmatrix}
= \tfrac12\begin{pmatrix}2&0\\0&-2\end{pmatrix} = Z.
$$

Então $HXH = Z$. Multiplicando os dois lados por $H$ dos lados certos (e usando $HH=I$), vem também $HZH = X$. Resumo:

$$
HXH = Z, \qquad HZH = X, \qquad HYH = -Y.
$$

$HYH = -Y$ é igual a $Y$ a menos de fase global: como porta isolada, $-Y$ e $Y$ têm o mesmo efeito, pois nenhuma medida enxerga o $-1$. Mas são matrizes diferentes, e o sinal importa em portas controladas ou quando $Y$ é um observável. Na esfera de Bloch, $H$ troca os eixos $x$ e $z$ e inverte o $y$, e é isso que as três igualdades dizem.

Também vale $XZX = -Z$ e $ZXZ = -X$, consequências de $XZ = -ZX$ (as portas anticomutam).

![Dois circuitos: H, X, H equivale a Z; H, Z, H equivale a X](/content/algebra-linear/circuito-hxh-hzh.svg)

O estado $\ket{0}$ passa por um circuito com $H$, depois $Z$, depois $H$. Qual é a probabilidade de medir 1 no final? (Dica: use $HZH = X$.)

```exercise:number
id: identidades-hzh
answer: 1
tolerance: 0.001
```

## Simplificando circuitos

Duas ideias bastam: (1) cancelar pares iguais; (2) trocar um trecho por outro equivalente. Exemplo: o circuito $H, X, H$ é igual a uma única porta $Z$, e três portas viram uma. Isso importa porque cada porta num computador real tem chance de erro: circuito mais curto, menos erro.

Por que simplificar é permitido? A matriz do circuito é a mesma, então o efeito em qualquer estado é o mesmo. Ao simplificar, cuidado com a ordem: o trecho cancelado precisa ser **adjacente** no circuito. Em $X, Z, X$ as duas portas $X$ não são adjacentes e não se cancelam (o resultado é $XZX = -Z$, e não $Z$).

Qual porta única equivale ao circuito $H, Z, H$? Responda com a letra.

```exercise:text
id: identidades-simplificar
answer: X
```

![Circuito X, H, H, X, Z, Z, H simplificado em três linhas: cancelam-se HH e ZZ, depois XX, restando só H](/content/algebra-linear/circuito-simplificar.svg)

## Em Python

Escreva uma função que recebe a lista das portas **na ordem temporal** (cada porta um `np.array` 2x2) e devolve a matriz do circuito. Lembre: a primeira porta fica à direita do produto.

```exercise:python
id: identidades-produto
input: portas | list | lista de matrizes np.array de formato (2, 2), na ordem em que são aplicadas | [np.array([[0, 1], [1, 0]]), np.array([[1, 0], [0, -1]])]
output: matriz_circuito | np.ndarray | matriz do circuito, formato (2, 2) | np.array([[0, 1], [-1, 0]])
---
import numpy as np

def matriz_circuito(portas):
    return np.eye(2)
---
>>> matriz_circuito([np.array([[0, 1], [1, 0]]), np.array([[1, 0], [0, -1]])])
np.array([[0, 1], [-1, 0]])
---
>>> matriz_circuito([np.array([[0, 1], [1, 0]]), np.array([[0, 1], [1, 0]])])
np.array([[1, 0], [0, 1]])
---
>>> matriz_circuito([np.array([[1, 1], [1, -1]]) / np.sqrt(2), np.array([[0, 1], [1, 0]]), np.array([[1, 1], [1, -1]]) / np.sqrt(2)])
np.array([[1, 0], [0, -1]])
```

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (2025), seção 2.3; T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), seção 3.3.3.
