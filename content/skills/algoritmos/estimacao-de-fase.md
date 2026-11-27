Uma porta quântica $U$ tem autovetores, e cada autovetor só ganha uma fase quando passa por ela. Descobrir essa fase é como ler a "velocidade de rotação" escondida na porta. A **estimação de fase** faz isso, e é o motor por trás do algoritmo de Shor, do HHL e de simulações químicas.

## O problema

Seja $U$ unitária e $\ket{u}$ um autovetor dela:

$$
U\ket{u} = e^{2\pi i\varphi}\ket{u}, \qquad 0\le\varphi<1.
$$

Como $U$ é unitária, o autovalor tem módulo 1 e sempre dá para escrevê-lo assim; $\varphi$ é a **fase** (em voltas completas: $\varphi=\tfrac14$ é um quarto de volta, 90°). Temos acesso ao circuito de $U$ (e a versões controladas dele) e a uma cópia de $\ket{u}$. Queremos $\varphi$ com $t$ bits de precisão.

Exemplo: $U=S$ e $\ket{u}=\ket1$. Como $S\ket1=i\ket1 = e^{2\pi i\cdot\frac14}\ket1$, a resposta é $\varphi=\tfrac14=0.01_2$. Qual é $\varphi$ para $U=T$ e $\ket{u}=\ket1$ (use $T\ket1=e^{i\pi/4}\ket1$)?

```exercise:number
id: fase-t
answer: 0.125
tolerance: 0.0001
```

## Exemplo com 2 qubits de registro, antes da regra geral

Use $U=S$, $\ket{u}=\ket1$ e um registro de $t=2$ qubits, mais o qubit-alvo que guarda $\ket u$. O **registro** é o grupo de $t$ qubits onde a fase vai aparecer; o **alvo** é o qubit (ou grupo) que guarda $\ket u$.

1. Ponha o registro em $H\otimes H\ket{00}=\tfrac12(\ket{00}+\ket{01}+\ket{10}+\ket{11})$.
2. O qubit menos significativo do registro controla $U^1=S$; o mais significativo controla $U^2=S^2=Z$. Cada vez que o controle vale 1, o alvo $\ket1$ devolve a fase $i$ (para $S$) ou $-1$ (para $S^2$). A fase **fica no registro** (esse é o efeito de "kickback" dos oráculos): o termo $\ket{x}$ ganha $i^{x}=e^{2\pi i\,x/4}$, com $x$ o número escrito no registro.
3. Resultado: $\tfrac12(\ket{00}+i\ket{01}-\ket{10}-i\ket{11})$, que é exatamente a segunda coluna de $F_4$, ou seja, $\mathrm{QFT}\ket{01}$.
4. Aplicando a QFT inversa, voltamos a $\ket{01}$. Medindo, lemos $y=1$, e $\varphi = y/2^t = 1/4$. Acertamos.

![Circuito da estimação de fase com dois qubits de registro: H, S e Z controladas, QFT inversa e medida, com a fase subindo do alvo para o registro](/content/algoritmos/estimacao-de-fase-circuito.svg)

Se trocarmos $S$ por $Z$ (com $\ket u=\ket1$ e $t=2$), qual inteiro $y$ o registro mostra? ($Z\ket1=-\ket1$, então $\varphi=\tfrac12$ e $y=\varphi\cdot 2^t$.)

```exercise:number
id: fase-y-z-t2
answer: 2
tolerance: 0.001
```

## A regra geral

Com $t$ qubits no registro:

1. Prepare o registro em $\ket{0}^{\otimes t}$ e o alvo em $\ket{u}$. Aplique $H$ em todo o registro: $\tfrac1{\sqrt{2^t}}\sum_{x}\ket{x}\ket{u}$.
2. Para cada $k=0,\dots,t-1$, aplique $U^{2^k}$ ao alvo, controlada pelo qubit do registro de peso $2^k$. Como $U^{2^k}\ket u=e^{2\pi i\varphi 2^k}\ket u$, o termo $\ket x$, com $x=\sum_k x_k2^k$, recebe a fase $e^{2\pi i\varphi x}$:
$$
\frac{1}{\sqrt{2^t}}\sum_{x=0}^{2^t-1} e^{2\pi i\,\varphi\, x}\ket{x}\ \ket{u}.
$$
3. Aplique a QFT inversa no registro e meça.

Por que dá certo: compare com $\mathrm{QFT}\ket y=\tfrac1{\sqrt{2^t}}\sum_x e^{2\pi i\,xy/2^t}\ket x$. Se $\varphi=y/2^t$ exatamente (um número com $t$ bits binários), a soma acima é $\mathrm{QFT}\ket y$, e a QFT inversa entrega $\ket y$ com certeza.

Com $t=3$ e $\varphi=0.101_2=\tfrac58$, qual inteiro $y$ o registro mostra?

```exercise:number
id: fase-y-101
answer: 5
tolerance: 0.001
```

## O custo e mais exemplos

Repare no custo: se só soubermos repetir $U$, o qubit de peso $2^k$ pede $2^k$ aplicações, e o total é $1+2+\cdots+2^{t-1}=2^t-1$. Cada qubit extra no registro **dobra** o custo. (No Shor, calcula-se $U^{2^k}$ direto, sem repetir.) Se $t$ sobe de 5 para 6, por qual fator, aproximadamente, o número total de aplicações de $U$ é multiplicado?

```exercise:number
id: fase-custo-dobra
answer: 2
tolerance: 0.05
```

Um segundo exemplo, agora com $t=4$: se $\varphi=0.1011_2=\tfrac12+\tfrac18+\tfrac1{16}=\tfrac{11}{16}$, qual inteiro $y$ o registro mostra?

```exercise:number
id: fase-y-11
answer: 11
tolerance: 0.001
```

E se $U\ket u=-\ket u$ (autovalor $-1=e^{2\pi i\cdot\frac12}$), qual é $\varphi$?

```exercise:number
id: fase-menos-um
answer: 0.5
tolerance: 0.0001
```

## E se $\varphi$ não cabe em $t$ bits?

Exemplo: $U=T$ e $\ket u=\ket1$ dão $\varphi=\tfrac18=0.001_2$, que precisa de 3 bits. Com apenas $t=2$ qubits, o melhor que o registro pode escrever é $y/4$, com $y=0,1,2,3$ (ou seja, $0,\ 0{,}25,\ 0{,}5,\ 0{,}75$). Fazendo a conta (a fórmula está logo abaixo), as probabilidades de medir $y=0,1,2,3$ são

$$
0{,}427,\quad 0{,}427,\quad 0{,}073,\quad 0{,}073 .
$$

Os dois valores mais próximos de $\tfrac18$ ($0$ e $\tfrac14$) são os mais prováveis, mas o resultado é **aleatório**; com $t=3$ teríamos certeza. Em geral, a probabilidade de medir $y$ é

$$
P(y)=\left|\frac{1}{2^t}\sum_{x=0}^{2^t-1}e^{2\pi i\,x\,(\varphi-y/2^t)}\right|^2 ,
$$

que vale 1 quando $\varphi=y/2^t$ exatamente e fica pequena quando $\varphi$ está longe de $y/2^t$. Em resumo: mede-se, com boa probabilidade, uma fração de $t$ bits **perto** de $\varphi$, e cada qubit extra dobra a resolução. (Para quem quiser os números exatos: a fração de $t$ bits mais próxima de $\varphi$ sai com probabilidade de pelo menos $4/\pi^2\approx0{,}405$, e para obter $\varphi$ com erro menor que $2^{-n}$ com probabilidade pelo menos $1-\epsilon$ usa-se $t=n+\lceil\log_2(2+\tfrac1{2\epsilon})\rceil$ qubits; veja a fonte.)

![Histogramas de P(y) para φ = 1/8: com t=2 há quatro barras (0,427; 0,427; 0,073; 0,073) e com t=3 uma única barra em y=1](/content/algoritmos/estimacao-de-fase-histogramas.svg)

Confira no computador:

```exercise:python
id: fase-prob-medida
input: phi | float | a fase φ, em [0, 1) | 0.25
input: t | int | número de qubits do registro, t >= 1 | 2
output: prob_medida | np.ndarray | vetor de tamanho 2**t com P(y) para y = 0..2**t-1, floats reais | np.array([0, 1, 0, 0])
---
import numpy as np

def prob_medida(phi, t):
    return np.zeros(2 ** t)
---
>>> prob_medida(0.25, 2)
np.array([0, 1, 0, 0])
---
>>> prob_medida(0.5, 1)
np.array([0, 1])
---
>>> prob_medida(0.125, 2)
np.array([0.4267766952966369, 0.4267766952966369, 0.0732233047033631, 0.0732233047033631])
```

Quantos qubits de registro são necessários para representar $\varphi=\tfrac18$ (da porta $T$) sem erro?

```exercise:number
id: fase-qubits-t
answer: 3
tolerance: 0.001
```

## Vários autoestados

E se não tivermos um autovetor, mas um estado qualquer? Como os autovetores de $U$ formam uma base, $\ket\psi=\sum_j c_j\ket{u_j}$ com $U\ket{u_j}=e^{2\pi i\varphi_j}\ket{u_j}$. Por linearidade, o circuito leva

$$
\ket\psi\ket{0}\ \longmapsto\ \sum_j c_j\,\ket{\tilde\varphi_j}\ket{u_j},
$$

onde $\ket{\tilde\varphi_j}$ é o registro com a estimativa de $\varphi_j$. Medindo o registro, obtemos $\varphi_j$ com probabilidade $|c_j|^2$, e o alvo **colapsa** em $\ket{u_j}$. Isto é útil: no Shor, não sabemos construir os autoestados, mas sabemos construir uma soma deles.

Exemplo: $U=T$ e $\ket\psi=\tfrac{\sqrt3}{2}\ket0+\tfrac12\ket1$. $T\ket0=\ket0$ ($\varphi=0$) e $T\ket1$ tem $\varphi=\tfrac18$. Qual é a probabilidade de medir $\varphi=\tfrac18$ (com $t\ge3$)?

```exercise:number
id: fase-superposicao
answer: 0.25
tolerance: 0.001
```

Qual bloco do circuito, aplicado ao registro antes da medida, converte a fase codificada em um número binário legível?

```exercise:text
id: fase-bloco-final
answer: QFT inversa | transformada de Fourier quântica inversa | qft^-1 | qft inversa | qft-1
```

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 5.6. As probabilidades de acerto citadas são o resultado padrão de M. Nielsen e I. Chuang, *Quantum Computation and Quantum Information*, cap. 5.
