Um circuito inteiro, por maior que seja, é uma única matriz unitária. Esta skill junta as peças do curso e tira consequências.

## Produto de unitárias é unitária

Se $U$ e $V$ são unitárias, $VU$ também é, porque o conjugado transposto inverte a ordem:

$$
(VU)^\dagger (VU) = U^\dagger V^\dagger V U = U^\dagger U = I.
$$

Logo, qualquer sequência de portas é uma porta, e qualquer circuito sem medida pode ser **desfeito**: basta aplicar as portas inversas na ordem contrária.

Um circuito aplica H, depois S, depois X. Qual porta deve ser aplicada **primeiro** para desfazê-lo? (Uma letra.)

```exercise:text
id: unitariedade-desfazer
answer: X
```

## O que as unitárias preservam

Unitárias preservam **todos** os produtos internos:

$$
\braket{U\phi|U\psi} = \bra{\phi}U^\dagger U\ket{\psi} = \braket{\phi|\psi}.
$$

Daí sai uma lição: nenhuma porta consegue tornar dois estados mais distinguíveis do que já eram. Estados ortogonais continuam ortogonais, e estados parecidos continuam parecidos.

Se $\braket{\phi|\psi} = 0{,}3$, quanto vale o produto interno depois de aplicar H nos dois estados?

```exercise:number
id: unitariedade-preserva
answer: 0.3
```

## Autovalores

Se $U\ket{v} = \lambda\ket{v}$, dizemos que $\ket{v}$ é um **autovetor** e $\lambda$ um **autovalor**. Como a norma é preservada, todo autovalor de uma unitária tem módulo 1:

$$
\lambda = e^{i\theta}.
$$

Por exemplo, $X\ket{+} = \ket{+}$ e $X\ket{-} = -\ket{-}$.

Qual é o autovalor de X associado a $\ket{-}$?

```exercise:number
id: unitariedade-autovalor
answer: -1
```

## Hermitianas e unitárias

Uma matriz é **hermitiana** quando $A^\dagger = A$. As portas X, Y, Z e H são hermitianas **e** unitárias, e por isso são as próprias inversas: $X^2 = I$. Já a S não é hermitiana, porque $S^\dagger \neq S$.

Qual é a menor quantidade de portas S (contando só S) que precisa ser aplicada **depois** de uma S para voltar à identidade?

```exercise:number
id: unitariedade-s
answer: 3
```

## Em Python

Escreva uma função que recebe uma lista de matrizes $2\times 2$ na ordem do desenho e devolve a matriz do circuito inteiro.

```exercise:python
id: unitariedade-circuito
---
r = 2**-0.5
I = [[1, 0], [0, 1]]
X = [[0, 1], [1, 0]]
Z = [[1, 0], [0, -1]]
S = [[1, 0], [0, 1j]]
H = [[r, r], [r, -r]]

def vezes(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]

def matriz_do_circuito(portas):
    total = I
    # a porta aplicada depois multiplica pela esquerda
    return total
---
perto = lambda A, B: all(abs(A[i][j] - B[i][j]) < 1e-9 for i in range(2) for j in range(2))
assert perto(matriz_do_circuito([]), I)
assert perto(matriz_do_circuito([H, Z, H]), X)
assert perto(matriz_do_circuito([S, S]), Z)
assert perto(matriz_do_circuito([X, S]), [[0, 1], [1j, 0]])
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
