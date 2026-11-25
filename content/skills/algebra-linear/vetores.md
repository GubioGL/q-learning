Até aqui usamos kets como símbolos. Agora damos a eles uma forma concreta: **vetores**. Com isso, toda a computação quântica vira contas com listas de números complexos.

## Kets são vetores coluna

Escolhemos

$$
\ket{0} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \qquad \ket{1} = \begin{pmatrix} 0 \\ 1 \end{pmatrix},
$$

e então o estado geral é

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1} = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}.
$$

![Os vetores 0, 1 e + no plano](/content/algebra-linear/vetores.svg)

Somar vetores e multiplicar por um número se faz componente a componente.

Qual é a primeira componente de $2\ket{0} + 3\left(\ket{0} - \ket{1}\right)$?

```exercise:number
id: vetores-soma
answer: 5
```

## Complexo conjugado

O conjugado de $z = a + bi$ é $z^* = a - bi$. Duas propriedades que usaremos sempre:

$$
z^* z = a^2 + b^2 = |z|^2, \qquad (e^{i\theta})^* = e^{-i\theta}.
$$

Quanto vale $(3 + 4i)^*(3 + 4i)$?

```exercise:number
id: vetores-conjugado
answer: 25
```

## Bras são vetores linha

Para cada ket existe um **bra**: transpomos a coluna em linha e conjugamos cada componente.

$$
\ket{\psi} = \begin{pmatrix} \alpha \\ \beta \end{pmatrix} \quad\Longrightarrow\quad \bra{\psi} = \begin{pmatrix} \alpha^* & \beta^* \end{pmatrix}.
$$

Essa operação (transpor e conjugar) é o **conjugado transposto**, escrito com uma adaga: $\bra{\psi} = \ket{\psi}^\dagger$.

Se $\ket{\psi} = \begin{pmatrix} 0{,}6 \\ 0{,}8i \end{pmatrix}$, qual é a segunda componente de $\bra{\psi}$? Escreva no formato `0.8i` ou `-0.8i`.

```exercise:text
id: vetores-bra
answer: -0.8i | -0,8i | -0.8 i | -0,8 i
```

## Em Python

Escreva `bra`, que recebe um ket (lista de números complexos) e devolve a lista conjugada. Todo número em Python tem o método `.conjugate()`.

```exercise:python
id: vetores-bra-codigo
---
def bra(ket):
    return ket
---
assert bra([1, 0]) == [1, 0]
assert bra([0.6, 0.8j]) == [0.6, -0.8j]
assert bra([1 + 2j, 3 - 1j]) == [1 - 2j, 3 + 1j]
assert bra(bra([1j, 2])) == [1j, 2]
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
