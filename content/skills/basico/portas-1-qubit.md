Portas clássicas transformam bits; portas quânticas transformam **estados**. Com um bit só, as portas reversíveis são "não fazer nada" e NOT. Com um qubit, existem infinitas.

## Linearidade

Uma porta quântica é **linear**: basta saber o que ela faz com $\ket{0}$ e $\ket{1}$, e o resto segue.

$$
U\big(\alpha\ket{0} + \beta\ket{1}\big) = \alpha\, U\ket{0} + \beta\, U\ket{1}.
$$

Além disso, ela preserva a soma das probabilidades e é sempre reversível.

## X, Z e Y

A porta **X** é o NOT quântico: $X\ket{0} = \ket{1}$ e $X\ket{1} = \ket{0}$. Em geral, ela troca as amplitudes.

A porta **Z** muda o sinal de $\ket{1}$: $Z\ket{0} = \ket{0}$ e $Z\ket{1} = -\ket{1}$. Ela não altera $P(0)$ nem $P(1)$, mas troca $\ket{+}$ por $\ket{-}$.

A porta **Y** combina as duas: $Y\ket{0} = i\ket{1}$ e $Y\ket{1} = -i\ket{0}$.

Na esfera de Bloch, X, Y e Z são giros de $180^\circ$ em torno dos eixos $x$, $y$ e $z$.

Depois de aplicar X em $0{,}6\ket{0} + 0{,}8\ket{1}$, qual é a probabilidade de medir $0$?

```exercise:number
id: porta1q-x
answer: 0.64
tolerance: 0.001
```

## Hadamard

A porta **H** cria superposição a partir de estados básicos:

$$
H\ket{0} = \ket{+}, \qquad H\ket{1} = \ket{-}.
$$

![A porta H leva 0 a + e 1 a -, e vice-versa](/content/basico/hadamard.svg)

Aplicar H duas vezes desfaz tudo. Veja o que acontece com as amplitudes:

$$
H\ket{+} = \frac{1}{\sqrt 2}\big(\ket{+} + \ket{-}\big) = \ket{0}.
$$

As duas contribuições para $\ket{1}$ têm sinais opostos e se cancelam. Isso é **interferência**, e é ela que faz algoritmos quânticos funcionarem.

Qual é a probabilidade de medir $0$ depois de aplicar H duas vezes em $\ket{0}$?

```exercise:number
id: porta1q-hh
answer: 1
```

## Uma identidade útil

Aplicando H, depois Z, depois H, o efeito é o mesmo de uma porta X:

$$
HZH = X.
$$

Que porta (uma letra) é equivalente a aplicar H, depois X, depois H?

```exercise:text
id: porta1q-hxh
answer: Z
```

Há também as portas de fase: **S** multiplica a amplitude de $\ket{1}$ por $i$, e **T** a multiplica por $e^{i\pi/4}$. Duas T formam uma S, e duas S formam uma Z.

Quantas portas **T** seguidas equivalem a uma porta Z?

```exercise:number
id: porta1q-t
answer: 4
```

## Em Python

Represente um estado como um par `(alfa, beta)` e escreva as portas `X`, `Z` e `H`.

```exercise:python
id: porta1q-codigo
input: alfa, beta | float / complex | amplitude, número real ou complexo | 0.6, 0.8
output: X, Z, H | tuple | par (alfa, beta) depois da porta | (0.8, 0.6)
---
def X(alfa, beta):
    return (alfa, beta)

def Z(alfa, beta):
    return (alfa, beta)

def H(alfa, beta):
    return (alfa, beta)
---
>>> X(0.6, 0.8)
(0.8, 0.6)
---
>>> Z(0.6, 0.8)
(0.6, -0.8)
>>> X(1, 0)
(0, 1)
---
>>> H(1, 0)
(2**-0.5, 2**-0.5)
>>> H(0, 1)
(2**-0.5, -2**-0.5)
>>> H(*Z(*H(0.6, 0.8)))
(0.8, 0.6)
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 2.
