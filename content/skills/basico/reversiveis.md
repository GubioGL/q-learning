Se a saída de um AND é $0$, quais eram as entradas? Não dá para saber: podia ser $00$, $01$ ou $10$. Essa perda de informação importa, porque **toda porta quântica é reversível**.

## O que é reversível

Uma porta é **reversível** quando a saída determina a entrada: entradas diferentes sempre levam a saídas diferentes. Por isso ela precisa ter o mesmo número de bits na entrada e na saída.

- NOT é reversível: basta aplicar NOT de novo.
- AND, OR e XOR não são: entram 2 bits e sai só 1.

Quantas entradas diferentes de um OR produzem a saída $1$?

```exercise:number
id: reversiveis-or
answer: 3
```

## CNOT: o XOR reversível

Para tornar o XOR reversível, guardamos uma das entradas. A **CNOT** (NOT controlado) tem um bit de controle $A$ e um alvo $B$:

$$
(A, B) \longrightarrow (A,\; A \oplus B).
$$

O alvo é invertido só se o controle for $1$. Aplicando duas vezes, voltamos ao início, porque $A \oplus A \oplus B = B$.

Qual é a saída da CNOT para a entrada $A = 1$, $B = 1$? Escreva os dois bits juntos, controle primeiro.

```exercise:text
id: reversiveis-cnot
answer: 10
```

## Toffoli: o AND reversível

A **porta de Toffoli** tem dois controles e um alvo:

$$
(A, B, C) \longrightarrow (A,\; B,\; AB \oplus C).
$$

![Porta de Toffoli: dois controles e um alvo](/content/basico/toffoli.svg)

Com o alvo em $C = 0$, a terceira saída é exatamente $AB$, ou seja, o AND. Com $C = 1$, ela é $\overline{AB}$, a NAND. Como a NAND é universal, **a Toffoli é universal para a computação clássica**. Logo, tudo o que um computador clássico faz pode ser feito de forma reversível, usando alguns bits auxiliares.

Existem $n!$ formas de embaralhar $n$ itens, e uma porta reversível é só um embaralhamento das entradas. Quantas portas reversíveis diferentes de **2 bits** existem? (São $2^2 = 4$ entradas para embaralhar.)

```exercise:number
id: reversiveis-contagem
answer: 24
```

## Em Python

Escreva a Toffoli e use-a para construir o AND.

```exercise:python
id: reversiveis-toffoli
---
def toffoli(a, b, c):
    return (a, b, c)  # corrija a terceira saída

def AND(a, b):
    return 0  # use toffoli
---
assert toffoli(1, 1, 0) == (1, 1, 1)
assert toffoli(1, 1, 1) == (1, 1, 0)
assert toffoli(1, 0, 1) == (1, 0, 1)
assert [AND(a, b) for a in (0, 1) for b in (0, 1)] == [0, 0, 0, 1]
assert all(toffoli(*toffoli(a, b, c)) == (a, b, c) for a in (0, 1) for b in (0, 1) for c in (0, 1))
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 1.
