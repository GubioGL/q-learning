Um circuito com muitas portas custa mais espaço, mais energia e mais tempo. Mas dois circuitos de tamanhos bem diferentes podem fazer **exatamente a mesma coisa**. A álgebra booleana é o conjunto de regras que permite trocar um circuito por outro equivalente, e menor, sem precisar testar todas as entradas.

Aqui usamos a notação da skill de portas lógicas: $\overline{A}$ é NOT, $AB$ é AND e $A+B$ é OR. Para o XOR, não há precedência universal: escreva sempre com parênteses, como $(A\oplus B)$.

## Precedência: quem vem primeiro

Assim como na aritmética a multiplicação vem antes da soma, aqui o **NOT** vem primeiro, depois o **AND** e por último o **OR**:

$$
\overline{A} + B\,C \;=\; (\overline{A}) + (B\,C).
$$

Exemplo com $A=0$, $B=1$, $C=0$: primeiro $\overline{A}=1$, depois $BC = 0$, e por fim $1+0=1$. Se alguém lesse como $(\overline{A}+B)\,C$, obteria $(1+1)\cdot 0 = 0$: outro resultado. Parênteses mudam o circuito.

Quanto vale $\overline{A} + B\,C$ para $A=0$, $B=1$, $C=0$?

```exercise:number
id: bool-precedencia
answer: 1
```

## As regras de sempre

AND e OR se comportam de modo parecido com $\times$ e $+$ nos números:

- **Comutatividade**: $AB = BA$ e $A+B = B+A$ (a ordem das entradas não importa).
- **Associatividade**: $(AB)C = A(BC)$ e $(A+B)+C = A+(B+C)$ (dá para agrupar como quiser, então "AND de três entradas" faz sentido sem parênteses).
- **Distributividade**: $A(B+C) = AB + AC$. Tem também uma segunda, que **não** existe na aritmética comum: $A + BC = (A+B)(A+C)$.

Confira a segunda com $A=1$, $B=0$, $C=0$: o lado esquerdo é $1 + 0 = 1$ e o direito é $(1)(1)=1$. Com $A=0$, $B=1$, $C=1$: esquerdo $0+1=1$, direito $(1)(1)=1$. Em ambos os casos iguais, como deveria.

## Identidades com 0 e 1

Estas valem para qualquer bit $A$, e dá para verificar testando $A=0$ e $A=1$:

| Regra | Em palavras |
|---|---|
| $A\cdot 0 = 0$ | AND com 0 sempre dá 0 |
| $A\cdot 1 = A$ | AND com 1 deixa passar |
| $A + 0 = A$ | OR com 0 deixa passar |
| $A + 1 = 1$ | OR com 1 sempre dá 1 |
| $AA = A$ e $A+A = A$ | repetir não muda nada |
| $A\overline{A} = 0$ | um bit e o seu contrário nunca são 1 juntos |
| $A+\overline{A} = 1$ | um dos dois sempre é 1 |
| $\overline{\overline{A}} = A$ | dois NOTs se cancelam |

As duas linhas de $A\overline{A}$ e $A+\overline{A}$ são as que mais ajudam a simplificar.

## Leis de De Morgan

Você já viu estas duas regras em portas lógicas; aqui é uma revisão. Elas trocam AND por OR passando um NOT por cima:

$$
\overline{A+B} = \overline{A}\,\overline{B}, \qquad \overline{AB} = \overline{A}+\overline{B}.
$$

Em palavras: "não (A ou B)" é "não A e não B". Se não choveu **nem** nevou, então não choveu **e** não nevou. A barra grande se "quebra" e o operador troca.

Ao quebrar a barra, **troque o operador**. Escrever $\overline{AB} = \overline{A}\,\overline{B}$ é o erro clássico: teste com $A=1$, $B=0$: o lado esquerdo é $\overline{0}=1$ e o direito $0\cdot 1=0$.

Para quantas das 4 combinações de $(A,B)$ as expressões $\overline{A+B}$ e $\overline{A}+\overline{B}$ dão o **mesmo** valor? (Dica: pela regra de De Morgan, a primeira é $\overline{A}\,\overline{B}$.)

```exercise:number
id: bool-demorgan
answer: 2
```

## Simplificando um circuito

Receita: procure um fator comum, junte com a distributividade e aplique uma identidade. Exemplo:

$$
AB + A\overline{B} = A(B + \overline{B}) = A\cdot 1 = A.
$$

O circuito original precisa de 1 NOT, 2 ANDs e 1 OR (4 portas) e o resultado é só um fio com $A$: nenhuma porta. Outro exemplo, mais sutil, usando a segunda distributividade:

$$
A + \overline{A}B = (A+\overline{A})(A+B) = 1\cdot(A+B) = A+B.
$$

Quantas portas (NOT, AND, OR de 2 entradas) tem o circuito direto de $AB + A\overline{B}$?

```exercise:number
id: bool-portas
answer: 4
```

Simplifique $AB + A\overline{B}$. Responda com a letra.

```exercise:text
id: bool-simplifica
answer: A
```

Simplifique $A + \overline{A}B$ (escreva na forma "X+Y").

```exercise:text
id: bool-absorcao
answer: A+B | B+A | A + B | B + A
```

![Em cima, um circuito com quatro portas: um NOT em B, dois ANDs (AB e A·NOT B) e um OR que os soma. Uma seta com a identidade A(B + B barra) = A leva ao circuito simplificado embaixo: um único fio de A direto para a saída.](/content/basico/circuito-absorcao.svg)

## Em Python

Para saber se dois circuitos são equivalentes, basta comparar as saídas nas 4 combinações de $(A,B)$. Escreva `equivalentes(f, g)`, que recebe duas funções de dois bits e retorna `True` se dão a mesma saída em todas as combinações, e `False` caso contrário.

```exercise:python
id: bool-equivalentes
input: f, g | function | funções que recebem dois bits (0 ou 1) e devolvem 0 ou 1 | lambda a, b: a, lambda a, b: a
output: equivalentes | bool | True se f(a, b) == g(a, b) nas 4 combinações | True
---
def equivalentes(f, g):
    return False  # compare f e g para (0,0), (0,1), (1,0), (1,1)
---
>>> equivalentes(lambda a, b: max(a * b, a * (1 - b)), lambda a, b: a)
True
---
>>> equivalentes(lambda a, b: 1 - max(a, b), lambda a, b: (1 - a) * (1 - b))
True
>>> equivalentes(lambda a, b: 1 - a * b, lambda a, b: (1 - a) * (1 - b))
False
---
>>> equivalentes(lambda a, b: max(a, (1 - a) * b), lambda a, b: max(a, b))
True
>>> equivalentes(lambda a, b: a * b, lambda a, b: max(a, b))
False
>>> equivalentes(lambda a, b: a, lambda a, b: b)
False
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, seção 1.4 (Circuit Simplification and Boolean Algebra).
