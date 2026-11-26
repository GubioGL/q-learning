Como um computador soma $6+7$? Com portas lógicas, exatamente como você faria no papel: coluna por coluna, "vai um" para a próxima. Este é o primeiro circuito que **calcula** de verdade, e mostra como poucas portas viram aritmética.

## Soma binária à mão

Some $0110$ ($=6$) e $0111$ ($=7$), começando pela coluna da direita:

```
  0 1 1 0
+ 0 1 1 1
---------
```

- coluna 0: $0+1 = 1$, sem vai-um.
- coluna 1: $1+1 = 10_2$: escreve $0$ e **vai 1**.
- coluna 2: $1+1+1$ (o vai-um) $= 11_2$: escreve $1$ e vai $1$.
- coluna 3: $0+0+1 = 1$.

Resultado: $1101_2 = 13$. Em cada coluna, somamos no máximo **três** bits (dois da conta mais o vai-um) e o total, de $0$ a $3$, cabe em dois bits: um bit de **soma** e um bit de **vai-um** (em inglês, *carry*).

Some $1011$ e $0110$ à mão. Quanto dá em decimal? (O resultado tem 5 bits.)

```exercise:number
id: som-soma
answer: 17
```

Nessa mesma conta, quantos vai-um são gerados ao todo (contando o que sai da última coluna)?

```exercise:number
id: som-vaium
answer: 3
```

## Meio-somador

A primeira coluna não tem vai-um chegando, então só soma dois bits $A$ e $B$. A tabela:

$$
\begin{array}{cc|cc}
A & B & \text{vai-um } C & \text{soma } S \\ \hline
0 & 0 & 0 & 0 \\
0 & 1 & 0 & 1 \\
1 & 0 & 0 & 1 \\
1 & 1 & 1 & 0
\end{array}
$$

Olhe as colunas: a soma $S$ é $1$ quando as entradas são **diferentes** (XOR) e o vai-um $C$ é $1$ só quando as duas são $1$ (AND):

$$
S = A \oplus B, \qquad C = AB.
$$

Com duas portas, um XOR e um AND, temos o **meio-somador** (*half adder*). Ele é "meio" porque não aceita vai-um de entrada.

Qual porta calcula a soma $S$ do meio-somador? Responda com o nome (AND, OR ou XOR).

```exercise:text
id: som-meio
answer: XOR
```

## Somador completo

Da segunda coluna em diante, entra também o vai-um da coluna anterior, $C_{in}$. O **somador completo** (*full adder*) soma três bits, $A$, $B$ e $C_{in}$, e devolve $S$ e o vai-um de saída $C_{out}$.

Exemplo com $A=1$, $B=1$, $C_{in}=1$ ($1+1+1=3=11_2$). O primeiro meio-somador soma $A+B = 1+1$: soma $0$, vai-um $1$. O segundo soma esse $0$ com $C_{in}=1$: soma $1$, vai-um $0$. A soma final é $1$, e os dois vai-um ($1$ e $0$) juntam-se num OR: $C_{out}=1$. Resultado $11_2$, certo.

Em geral, some em duas etapas com dois meio-somadores. O primeiro soma $A$ e $B$; o segundo soma o resultado com $C_{in}$. Como os dois podem gerar vai-um, mas nunca os dois ao mesmo tempo, um OR junta os vai-um:

$$
S = A \oplus B \oplus C_{in}, \qquad C_{out} = AB + C_{in}(A\oplus B).
$$

Contagem de portas: 2 XORs, 2 ANDs e 1 OR, ou seja, **5 portas**.

![Somador ripple-carry de 4 bits calculando 1111 + 0001. Quatro caixas em fila: meio-somador (HA) na coluna do bit menos significativo, à direita, e somadores completos (FA) nas outras. Um vai-um 1 (seta verde) escorre da direita para a esquerda por todas as colunas. As somas são 0000 e o último vai-um é o bit 1: resultado 10000.](/content/basico/somador-ripple-carry.svg)

![Somador completo feito de dois meio-somadores (HA) e uma porta OR. O primeiro HA (roxo) soma A e B; o segundo HA (amarelo) soma esse resultado com Cin. Dentro de cada HA, XOR (símbolo de soma) dá o bit de soma e AND (símbolo &) dá o vai-um. Os dois vai-um entram no OR, que produz Cout; a soma S sai do segundo HA.](/content/basico/somador-completo-2ha.svg)

Para $A=1$, $B=1$, $C_{in}=1$, qual é o bit de soma $S$? (Veja o exemplo acima.)

```exercise:number
id: som-completo
answer: 1
```

Agora para $A=1$, $B=0$, $C_{in}=1$: quanto vale o vai-um de saída $C_{out}$? (Dica: $1+0+1 = 2 = 10_2$.)

```exercise:number
id: som-completo-cout
answer: 1
```

## Somador ripple-carry

Para somar números de $n$ bits, ligue os somadores em fila: o $C_{out}$ de cada coluna vira o $C_{in}$ da seguinte. Como o vai-um "escorre" (*ripple*) da direita para a esquerda, o circuito se chama **ripple-carry**. A primeira coluna não tem vai-um de entrada, então um meio-somador basta (ou um somador completo com $C_{in}=0$).

Some $1111 + 0001$ à mão. Na coluna 0 o meio-somador gera vai-um $1$. Em quantos somadores **completos** (colunas 1 a 3) chega vai-um igual a $1$?

```exercise:number
id: som-ripple
answer: 3
```

O caminho do vai-um atravessa as $n$ colunas, então o atraso do circuito cresce com $n$.

## Quantas portas?

Um somador completo tem 5 portas e um meio-somador, 2. Para somar números de $n=2$ bits (um meio-somador na coluna 0 e um somador completo na coluna 1), quantas portas ao todo?

```exercise:number
id: som-portas-n2
answer: 7
```

Em geral, com $n$ bits: $n-1$ somadores completos e um meio-somador, ou seja,

$$
5(n-1) + 2 = 5n - 3
$$

portas. O custo cresce **linearmente** em $n$: dobrar os bits dobra, aproximadamente, as portas. Quantas portas tem um somador ripple-carry de $n=4$ bits com meio-somador na primeira coluna?

```exercise:number
id: som-portas-n4
answer: 17
```

## Em Python

Implemente o somador completo e o ripple-carry usando-o. Os números são listas de bits com o bit **menos significativo** (o da direita, que vale $1$) **primeiro**. Exemplo: $11 = 1011_2$ vira `[1, 1, 0, 1]`. O resultado tem um bit a mais, para o vai-um final. Dica: `a ^ b` é XOR, `a & b` é AND e `a | b` é OR.

```exercise:python
id: som-ripple-python
input: a, b, cin | int | cada um é 0 ou 1 (para somador_completo) | 1, 1, 1
output: somador_completo | list | [soma, vai_um], dois bits | [1, 1]
input: a, b | list | listas de n bits (0 ou 1), bit menos significativo primeiro (para ripple) | [1, 1, 0, 1], [1, 1, 1, 0]
output: ripple | list | lista de n+1 bits, bit menos significativo primeiro | [0, 1, 0, 0, 1]
---
def somador_completo(a, b, cin):
    return [0, 0]  # [soma, vai_um]

def ripple(a, b):
    return [0] * (len(a) + 1)  # encadeie somador_completo, cin começa em 0
---
>>> somador_completo(1, 1, 1)
[1, 1]
---
>>> somador_completo(1, 0, 1)
[0, 1]
>>> somador_completo(0, 0, 0)
[0, 0]
---
>>> ripple([1, 1, 0, 1], [1, 1, 1, 0])
[0, 1, 0, 0, 1]
>>> ripple([1, 1, 1, 1], [1, 0, 0, 0])
[0, 0, 0, 0, 1]
>>> ripple([0, 1, 1, 0], [1, 1, 1, 0])
[1, 0, 1, 1, 0]
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, seção 1.3 (Adders).
