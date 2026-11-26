Dado um número composto $N$, como achar um divisor? Não se conhece método clássico rápido (os melhores levam tempo sub-exponencial no número de dígitos, isto é, bem pior que polinomial), e o **RSA**, sistema de criptografia usado na internet, depende dessa dificuldade. O algoritmo de Shor fatora em tempo polinomial num computador quântico. A ideia central é que **fatorar se reduz a achar um período**, e achar períodos é exatamente o que a estimação de fase faz bem.

## Aritmética modular em um minuto

Escrevemos $a \bmod N$ para o resto da divisão de $a$ por $N$. Exemplo: $49 \bmod 15 = 4$, pois $49=3\cdot15+4$. Dizemos que $a\equiv b \pmod N$ se têm o mesmo resto. O **mdc** (máximo divisor comum) de dois números é o maior inteiro que divide ambos: $\gcd(12,18)=6$. O algoritmo de Euclides o calcula rápido: $\gcd(a,b)=\gcd(b,\ a \bmod b)$, parando quando o resto é 0.

## Do período aos fatores (parte clássica), com $N=15$

Escolha um número $a$ sem fator comum com $N$, digamos $a=7$. Calcule as potências de $7$ módulo 15:

| $x$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|
| $7^x \bmod 15$ | 1 | 7 | 4 | 13 | 1 | 7 | 4 | 13 | 1 |

A sequência é **periódica**. O menor $r>0$ com $a^r\equiv1 \pmod N$ é a **ordem** (ou período) de $a$ módulo $N$. Aqui $r=4$.

<!-- ILUSTRAR: relógio de 15 posições (resíduos mod 15) com setas 1 → 7 → 4 → 13 → 1 formando um ciclo de comprimento 4, mais o gráfico de barras de 7^x mod 15 para x=0..11 mostrando a repetição de período 4 -->

Qual é o período de $2$ módulo $15$? (Calcule $2,4,8,\dots$ até voltar a 1.)

```exercise:number
id: shor-periodo-2-mod-15
answer: 4
tolerance: 0.001
```

Como $r=4$ é par, podemos olhar o "meio do ciclo": $7^{r/2}=7^2=49\equiv4 \pmod{15}$. Então $7^4-1 = (7^2-1)(7^2+1)=48\cdot50$, e $48\cdot 50 = 2400 = 160\cdot15$ é múltiplo de 15. Os fatores $48$ e $50$ não são múltiplos de 15 (cada um carrega só uma parte: $48$ é múltiplo de $3$ e $50$ é múltiplo de $5$). Os mdc's separam as partes:

$$
\gcd(7^2-1,\,15)=\gcd(48,15)=3,\qquad \gcd(7^2+1,\,15)=\gcd(50,15)=5,
$$

e $3\cdot5=15$. O mesmo vale em geral. Se $r$ é par, então $a^r-1=(a^{r/2}-1)(a^{r/2}+1)$ é múltiplo de $N$. Se além disso $a^{r/2}\not\equiv-1\pmod N$ (o caso $a^{r/2}\equiv1$ é impossível, pois $r$ é o menor expoente), nenhum fator sozinho é múltiplo de $N$ e os dois mdc's dão divisores de verdade:

$$
p=\gcd\!\big(a^{r/2}-1,\ N\big),\qquad q=\gcd\!\big(a^{r/2}+1,\ N\big).
$$

Quanto vale $\gcd(a^{r/2}+1,15)$ com $a=2$ e $r=4$ (então $a^{r/2}=4$)?

```exercise:number
id: shor-mdc-a2
answer: 5
tolerance: 0.001
```

Quando falha? Se $r$ for ímpar, ou se $a^{r/2}\equiv-1 \pmod N$ (por exemplo $a=14$, $N=15$: $r=2$ e $14\equiv-1$). Basta sortear outro $a$; para $N$ ímpar e não potência de primo, cada sorteio funciona com probabilidade de pelo menos $1/2$. Se o sorteio já der $\gcd(a,N)>1$, achamos um divisor sem fazer nada.

Em resumo, a parte clássica é rápida. O difícil é achar $r$: para $N$ de $n$ bits, o **valor** de $r$ pode chegar perto de $N$ (exponencial em $n$), e calcular a tabela acima seria impraticável.

Implemente a parte clássica:

```exercise:python
id: shor-periodo
input: a | int | base, com mdc(a, N) = 1 | 7
input: N | int | módulo, N > 1 | 15
output: ordem | int | menor r > 0 tal que a**r % N == 1 | 4
---
def ordem(a, N):
    return 0
---
>>> ordem(7, 15)
4
---
>>> ordem(2, 21)
6
---
>>> ordem(14, 15)
2
```

```exercise:python
id: shor-fatores
input: a | int | base, com mdc(a, N) = 1 | 7
input: r | int | ordem de a módulo N | 4
input: N | int | número a fatorar | 15
output: fatores | tuple | (p, q) com 1 < p < q e p*q = N; se r é ímpar ou a**(r//2) % N == N-1, devolve (0, 0) | (3, 5)
---
from math import gcd

def fatores(a, r, N):
    return (0, 0)
---
>>> fatores(7, 4, 15)
(3, 5)
---
>>> fatores(2, 6, 21)
(3, 7)
---
>>> fatores(14, 2, 15)
(0, 0)
>>> fatores(4, 3, 21)
(0, 0)
```

## A parte quântica, 1: a porta $U_a$

Seja $n$ o número de bits de $N$ ($n=4$ para $N=15$). Defina a unitária $U_a$ nos estados $\ket y$ com $y<N$:
$$
U_a\ket{y} = \ket{a\,y \bmod N}.
$$
Para $N=15$ e $a=7$: $U_7\ket1=\ket7$, $U_7\ket7=\ket{49\bmod15}=\ket4$, $U_7\ket4=\ket{28\bmod15}=\ket{13}$ e $U_7\ket{13}=\ket{91\bmod15}=\ket1$. A porta apenas **roda o ciclo** $1\to7\to4\to13\to1$. É uma permutação (porque $\gcd(a,N)=1$), logo unitária. Ela faz a exponenciação modular: $U_a^{x}\ket1=\ket{a^x\bmod N}$. Em circuito, calcula-se $U_a^{2^k}$ diretamente como multiplicação por $a^{2^k}\bmod N$ (obtido por quadrados sucessivos, fácil classicamente), então cada potência custa só um circuito de multiplicação modular de tamanho polinomial em $n$.

## A parte quântica, 2: os autoestados

Um ciclo tem "ondas" como autovetores. Para $N=15$, $a=7$, os quatro estados (escreva os coeficientes na ordem $\ket1,\ket7,\ket4,\ket{13}$):

$$
\ket{u_0}=\tfrac12(1,\,1,\,1,\,1),\quad
\ket{u_1}=\tfrac12(1,\,-i,\,-1,\,i),\quad
\ket{u_2}=\tfrac12(1,\,-1,\,1,\,-1),\quad
\ket{u_3}=\tfrac12(1,\,i,\,-1,\,-i).
$$

Confira $\ket{u_1}$: $U_7$ move cada coeficiente uma casa ($\ket1\to\ket7$ etc.), dando $\tfrac12(i,\,1,\,-i,\,-1)=i\cdot\tfrac12(1,\,-i,\,-1,\,i)$. Logo $U_7\ket{u_1}=i\ket{u_1}=e^{2\pi i\cdot\frac14}\ket{u_1}$: fase $\tfrac14$. Do mesmo jeito, $\ket{u_s}$ tem fase $s/4$. No caso geral, com período $r$:
$$
\ket{u_s}=\frac1{\sqrt r}\sum_{k=0}^{r-1}e^{-2\pi i\,sk/r}\ket{a^k \bmod N},\qquad U_a\ket{u_s}=e^{2\pi i\,s/r}\ket{u_s},\quad s=0,\dots,r-1.
$$
**A fase de $U_a$ é $s/r$, e o período está escondido no denominador.**

<!-- ILUSTRAR: o ciclo 1 → 7 → 4 → 13 desenhado como 4 pontos num círculo; ao lado, as quatro ondas |u_0>..|u_3> como os 4 coeficientes de cada uma desenhados como setas no plano complexo (girando 0, 90°, 180°, 270° por passo) -->

**O truque.** Não sabemos fabricar $\ket{u_s}$ (isso exigiria conhecer $r$), mas somando os quatro:
$$
\ket{u_0}+\ket{u_1}+\ket{u_2}+\ket{u_3}=\tfrac12\,(4,\,0,\,0,\,0)=2\ket{1},\qquad\text{ou seja}\qquad \frac1{\sqrt r}\sum_{s=0}^{r-1}\ket{u_s}=\ket{1},
$$
porque as fases se cancelam em todos os termos, exceto em $k=0$. E $\ket1$ é fácil de preparar. Pela seção "vários autoestados" da estimação de fase, rodar o algoritmo com $\ket1$ no alvo sorteia um $s$ ao acaso (cada um com probabilidade $1/r$) e entrega a estimativa de $s/r$.

Para $N=15$ e $a=7$, sai $s/4$ com $s\in\{0,1,2,3\}$. Qual é a probabilidade de a medida cair em $s=1$ ou $s=3$, que dão $r=4$ diretamente? (Para $s=0$ não se aprende nada; para $s=2$ a fração reduzida é $\tfrac12$.)

```exercise:number
id: shor-prob-r-direto
answer: 0.5
tolerance: 0.001
```

O circuito é a estimação de fase da seção anterior, com $t=2n$ qubits no registro (basta $2^t\ge N^2$, para ter precisão suficiente na etapa de frações contínuas; para $N=21$, $n=5$, $t=9$ já serve), controlando $U_a^{2^k}$ e finalizando com a QFT inversa.

<!-- ILUSTRAR: circuito completo do Shor: registro superior de t qubits com H, bloco "U_a^(2^k) controlado" sobre o registro inferior de n qubits inicializado em |1>, QFT^-1 no registro superior e medição; uma caixa lateral mostrando "y / 2^t ≈ s/r" -->

Para $N=15$ ($n=4$ bits), com $t=2n$, quantos qubits tem o registro de fase?

```exercise:number
id: shor-qubits-registro
answer: 8
tolerance: 0.001
```

## Das frações contínuas ao período

Medimos $y$, com $y/2^t\approx s/r$. Precisamos recuperar $r$ a partir de um decimal aproximado. O método é o das **frações contínuas**: escreve-se o número como $a_0+\cfrac{1}{a_1+\cfrac1{a_2+\cdots}}$, onde os $a_i$ são os quocientes do algoritmo de Euclides. Cortar a expansão depois de cada termo dá uma lista de frações cada vez melhores, os **convergentes**.

Exemplo com $N=21$, $a=2$ e $t=9$ (os restos de $2^x \bmod 21$ são $1,2,4,8,16,11,1,\dots$, então $r=6$). Uma medida típica é $y=85$, com $85/512\approx0{,}1660$. Aplicando Euclides a $85/512$:

| passo | divisão | quociente | resto |
|---|---|---|---|
| 1 | $512 \div 85$ | 6 | 2 |
| 2 | $85 \div 2$ | 42 | 1 |
| 3 | $2 \div 1$ | 2 | 0 |

Quocientes: $0;\,6,\,42,\,2$ (o primeiro, $0$, é a parte inteira de $85/512$). Os convergentes:

- só $0$: $\tfrac01$;
- até o $6$: $0+\tfrac16=\tfrac16$;
- até o $42$: $\cfrac{1}{6+\frac1{42}}=\tfrac{42}{253}$;
- completo: $\tfrac{85}{512}$.

Regra: escolha o **último convergente com denominador menor que $N$**. Aqui é $\tfrac16$ (o próximo, $253$, passa de $21$), então $r=6$ é o candidato. Verificamos classicamente: $2^6=64=3\cdot21+1\equiv1$. Confirmado, e $r$ é par: $2^3=8$ dá $\gcd(7,21)=7$ e $\gcd(9,21)=3$.

<!-- ILUSTRAR: tabela animada de convergentes de 85/512 (0/1, 1/6, 42/253, 85/512) sobre uma reta numérica mostrando como se aproximam do valor 0,1660 e destacando 1/6 como o último com denominador < 21 -->

Isso funciona quando $y$ é o inteiro mais próximo de $2^t s/r$: então $|y/2^t-s/r|<\tfrac1{2r^2}$ (pois $r<N$ e $2^t\ge N^2$), e $s/r$ aparece entre os convergentes. Esse $y$ sai com probabilidade de pelo menos $4/\pi^2$ (por $s$), então às vezes a medida é ruim ou dá um $s$ com $\gcd(s,r)>1$ (a fração reduzida tem denominador menor que $r$). Nesses casos o teste $a^r\equiv1$ falha e **repete-se**. Em $N=15$, $a=7$, o caso $s=2$ é assim: $\tfrac24=\tfrac12$, e $7^2=49\equiv4\ne1$.

Qual é o candidato a $r$ se $N=15$, $t=8$ e a medida foi $y=192$?

```exercise:number
id: shor-r-de-192
answer: 4
tolerance: 0.001
```

Implemente a recuperação de $r$:

```exercise:python
id: shor-fracoes-continuas
input: y | int | resultado da medida, 0 <= y < 2**t | 85
input: t | int | número de qubits do registro de fase | 9
input: N | int | número a fatorar | 21
output: candidato_r | int | denominador do último convergente de y/2**t com denominador < N (1 se y = 0) | 6
---
def candidato_r(y, t, N):
    return 0
---
>>> candidato_r(85, 9, 21)
6
---
>>> candidato_r(192, 8, 15)
4
---
>>> candidato_r(0, 8, 15)
1
>>> candidato_r(171, 9, 21)
3
```

## O custo total e o que não é o Shor

Cada multiplicação modular custa da ordem de $n^2$ portas e há $t=2n$ delas, o que dá cerca de $n^3$ no total (a QFT, com $O(n^2)$ portas, é mais barata). Só a **estimação de fase** e a **QFT** são quânticas; escolha de $a$, mdc, frações contínuas e teste final ficam no computador clássico. Fatorar números grandes (RSA de 2048 bits) exige milhares de qubits com correção de erros, muito além dos aparelhos atuais.

Qual parte do Shor usa a transformada de Fourier quântica?

```exercise:text
id: shor-onde-qft
answer: estimação de fase | estimacao de fase | achar o período | encontrar o período | busca do período | cálculo do período
```

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 6.2. Algoritmo original: P. Shor, "Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer" (1997).
