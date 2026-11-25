Bra vezes ket dá um número. E ket vezes bra? Dá uma **matriz**, e com ela podemos escrever qualquer porta.

## Ket vezes bra

O **produto externo** multiplica uma coluna por uma linha:

$$
\ket{\psi}\bra{\phi} = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}\begin{pmatrix} c^* & d^* \end{pmatrix} = \begin{pmatrix} \alpha c^* & \alpha d^* \\ \beta c^* & \beta d^* \end{pmatrix}.
$$

Na base padrão, $\ket{i}\bra{j}$ tem um único $1$, na linha $i$ e coluna $j$. Por exemplo,

$$
\ket{0}\bra{1} = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}.
$$

Quanto vale a soma de **todos** os elementos da matriz $\ket{+}\bra{+}$?

```exercise:number
id: externo-soma
answer: 2
tolerance: 0.001
```

## Portas como produtos externos

O operador $\ket{b}\bra{a}$ leva $\ket{a}$ em $\ket{b}$ e anula tudo que é ortogonal a $\ket{a}$. Assim, dá para ler uma porta direto da fórmula:

$$
X = \ket{1}\bra{0} + \ket{0}\bra{1}, \qquad Z = \ket{0}\bra{0} - \ket{1}\bra{1}.
$$

Qual porta (uma letra) é $\ket{+}\bra{0} + \ket{-}\bra{1}$?

```exercise:text
id: externo-hadamard
answer: H
```

## Projetores

O operador $\Pi_a = \ket{a}\bra{a}$ é um **projetor**: aplicá-lo duas vezes é o mesmo que uma só, $\Pi_a^2 = \Pi_a$. Ele liga a medida à álgebra:

$$
P(a) = \bra{\psi}\Pi_a\ket{\psi},
$$

e o estado depois da medida é $\Pi_a\ket{\psi}$, renormalizado. Repare que projetores **não** são unitários: medir não é reversível.

## Relação de completude

Para qualquer base ortonormal, somar os projetores dá a identidade:

$$
\sum_i \ket{e_i}\bra{e_i} = I.
$$

Essa relação é uma ferramenta de cálculo: podemos inserir $I$ em qualquer lugar. Para mudar de base, por exemplo,

$$
\ket{\psi} = I\ket{\psi} = \sum_i \ket{e_i}\braket{e_i|\psi},
$$

que é justamente a fórmula das projeções da skill anterior.

Quanto vale o traço (soma da diagonal) de $\ket{+}\bra{+} + \ket{-}\bra{-}$?

```exercise:number
id: externo-traco
answer: 2
tolerance: 0.001
```

## Em Python

Escreva o produto externo $\ket{\psi}\bra{\phi}$, devolvendo uma lista de linhas.

```exercise:python
id: externo-codigo
input: psi, phi | list | duas listas de números reais ou complexos | [1, 2], [3, 4]
output: produto_externo | list | lista de linhas; elemento (i, j) = psi[i] · phi[j]* | [[3, 4], [6, 8]]
---
def produto_externo(psi, phi):
    # elemento (i, j) = psi[i] * conjugado de phi[j]
    return []
---
>>> produto_externo([1, 2], [3, 4])
[[3, 4], [6, 8]]
---
>>> produto_externo([1, 0], [0, 1])
[[0, 1], [0, 0]]
>>> produto_externo([1, 0], [1j, 0])
[[-1j, 0], [0, 0]]
---
>>> produto_externo([1, 1j], [1, 1j])
[[1, -1j], [1j, 1]]
>>> produto_externo([1, 2, 3], [1j, 1])
[[-1j, 1], [-2j, 2], [-3j, 3]]
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
