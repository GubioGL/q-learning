Uma lista com $N$ itens sem nenhuma ordem, e um único item é o que você procura. Sem estrutura, não há atalho clássico: no pior caso é preciso olhar quase todos. O algoritmo de Grover acha o item com cerca de $\sqrt N$ consultas.

## O problema

Seja $f:\{0,1\}^n\to\{0,1\}$ com $N=2^n$ entradas. Sabemos que existe um (ou poucos) $w$ **marcado**, com $f(w)=1$, e $f(x)=0$ nos outros. A tarefa é encontrar $w$.

Clássico: em média $N/2$ consultas, e $N-1$ no pior caso. Quântico (Grover): da ordem de $\sqrt N$. Veja a escala: com $N=10^6$, são cerca de $10^6$ consultas contra cerca de $785$.

## Ferramentas: duas reflexões

O algoritmo é feito de duas **reflexões**, e a ideia geométrica é: duas reflexões seguidas formam uma rotação.

**Estado de partida.** Aplicando $H^{\otimes n}$ em $\ket{0\cdots0}$ obtemos o estado uniforme

$$
\ket{\psi}=\frac{1}{\sqrt N}\sum_x\ket x.
$$

Medi-lo agora acharia $w$ com probabilidade $1/N$, o mesmo que chutar.

**Reflexão 1: o oráculo de fase.** Com o oráculo de fase da primeira aula, $O_f\ket x=(-1)^{f(x)}\ket x$, só $\ket w$ troca de sinal:

$$
O_f=I-2\ket w\bra w.
$$

Isso é uma reflexão: mantém o que é ortogonal a $\ket w$ e inverte a componente em $\ket w$.

**Reflexão 2: a difusão.** Defina

$$
D=2\ket\psi\bra\psi-I,
$$

uma reflexão em torno de $\ket\psi$ (mantém o que é paralelo a $\ket\psi$, inverte o resto). Na prática, $D=H^{\otimes n}(2\ket{0}\bra{0}-I)H^{\otimes n}$, e $2\ket0\bra0-I$ é "trocar o sinal de todos os estados exceto $\ket{0\cdots0}$", o que é equivalente, a menos de fase global, a uma porta $Z$ multicontrolada cercada de portas $X$ em todos os qubits. Essa fase global $-1$ passa a importar se $G$ for usada de forma controlada (por exemplo, em contagem de amplitude).

O efeito de $D$ em um estado $\sum a_x\ket x$ com média $\bar a=\tfrac1N\sum a_x$ é $a_x\mapsto 2\bar a-a_x$: cada amplitude é **refletida em torno da média**.

**Um passo de Grover** é $G=D\,O_f$.

## Exemplo com $N=4$ ($n=2$), item marcado $w=11$

Começamos com $\ket\psi=\tfrac12(1,1,1,1)$ (amplitudes de $\ket{00},\ket{01},\ket{10},\ket{11}$). Pense nas amplitudes como alturas de barras:

- Inicial: quatro barras de altura $\tfrac12$.
- Depois do oráculo: troca o sinal de $\ket{11}$, e a barra dele vira $-\tfrac12$ (fica abaixo do zero). Barras: $\tfrac12,\tfrac12,\tfrac12,-\tfrac12$.
- A **média** das amplitudes caiu para $\bar a=\tfrac14$.
- Difusão: cada barra é refletida em torno da média, $a\mapsto2\bar a-a$. As três primeiras ficam em $2\cdot\tfrac14-\tfrac12=0$; a última em $2\cdot\tfrac14+\tfrac12=1$.

<!-- ILUSTRAR: três gráficos de barras lado a lado para N=4 (amplitudes de 00,01,10,11): (1) todas 1/2; (2) após o oráculo, a barra de 11 em -1/2, com uma linha tracejada na média 1/4; (3) após a difusão, barras 0,0,0 e 1 (a de 11). Setas mostrando a reflexão em torno da linha da média -->

Resultado: $(0,0,0,1)=\ket{11}$. Com **uma** iteração, achamos $w$ com probabilidade 1; um clássico precisaria de até 3 consultas.

O efeito geral é o mesmo: a difusão $D$ reflete cada amplitude em torno da média. Como o oráculo puxa a média para baixo, a barra marcada, que ficou negativa, vira a mais alta depois da reflexão.

## Visão geométrica

Todo o jogo acontece num **plano** de dimensão 2. Defina

$$
\ket{w^\perp}=\frac{1}{\sqrt{N-1}}\sum_{x\ne w}\ket x,
$$

o estado uniforme sobre os itens não marcados. Então $\ket w$ e $\ket{w^\perp}$ são ortonormais e

$$
\ket\psi=\sin\theta\,\ket w+\cos\theta\,\ket{w^\perp},\qquad \sin\theta=\frac{1}{\sqrt N}.
$$

Isto é, $\ket\psi$ forma o ângulo $\theta$ com $\ket{w^\perp}$ (bem perto, quando $N$ é grande: $\theta\approx1/\sqrt N$).

<!-- ILUSTRAR: plano 2D com eixo horizontal |w⊥⟩ e vertical |w⟩. Desenhar |s⟩ a um ângulo θ pequeno acima do eixo horizontal. Passo 1: reflexão do oráculo, levando |s⟩ ao simétrico abaixo do eixo horizontal (ângulo −θ). Passo 2: reflexão em torno de |s⟩ original, levando o vetor para o ângulo 3θ. Mostrar as duas flechas curvas e os ângulos θ, −θ, 3θ; depois a sequência 5θ, 7θ... aproximando-se do eixo |w⟩ -->

- $O_f$ reflete em torno do eixo $\ket{w^\perp}$: o ângulo medido a partir de $\ket{w^\perp}$ troca de sinal, de $\theta$ para $-\theta$.
- $D$ reflete em torno de $\ket\psi$ (ângulo $\theta$): o ângulo $-\theta$ vira $2\theta-(-\theta)=3\theta$.

Cada iteração gira o estado de $2\theta$ em direção a $\ket w$. Depois de $k$ iterações:

$$
G^k\ket\psi=\sin\big((2k+1)\theta\big)\ket w+\cos\big((2k+1)\theta\big)\ket{w^\perp},
$$

e a probabilidade de medir $w$ é $\sin^2\!\big((2k+1)\theta\big)$.

Confira com $N=4$: $\sin\theta=\tfrac12$, $\theta=30^\circ$, e para $k=1$, $(2k+1)\theta=90^\circ$, $\sin^2=1$. Exatamente o que vimos.

Para $N=8$ e $k=1$ a amplitude do item marcado fica em $\tfrac{5}{4\sqrt2}\approx0{,}884$: não chega a 1, mas é bem melhor que $1/\sqrt8$. Pela fórmula, $\sin\theta=1/\sqrt8$, $\theta\approx20{,}7^\circ$, $3\theta\approx62{,}1^\circ$. Qual é a probabilidade de sucesso, $\sin^2 3\theta$? (Dica: $\sin3\theta=3\sin\theta-4\sin^3\theta$.)

```exercise:number
id: grover-prob-n8
answer: 0.78125
tolerance: 0.0001
```

Agora à mão: reflita em torno da média as amplitudes $(\tfrac12,\tfrac12,\tfrac12,-\tfrac12)$ (média $\tfrac14$). Qual é a nova amplitude do item que estava em $-\tfrac12$?

```exercise:number
id: grover-reflexao-media
answer: 1
```

Com $N=4$, uma iteração dá probabilidade $1$. E se aplicarmos uma segunda? Calcule $\sin^2(5\theta)$ com $\theta=30^\circ$.

```exercise:number
id: grover-overshoot
answer: 0.25
tolerance: 0.0001
```

## Quantas iterações?

Queremos $(2k+1)\theta\approx\pi/2$, isto é,

$$
k\approx\frac{\pi}{4\theta}-\frac12,\qquad \sin\theta=\sqrt{M/N},
$$

arredondado para o inteiro mais próximo, onde $M$ é o número de itens marcados ($M=1$ no caso básico). Para $N$ grande, isso é cerca de $\tfrac\pi4\sqrt{N/M}$: da ordem de $\sqrt N$. Mais itens marcados, menos iterações.

Com $N=1024$ e $M=1$ ($\theta=\arcsin(1/32)\approx0{,}03126$), quantas iterações?

```exercise:number
id: grover-iteracoes-1024
answer: 25
```

**Atenção: não vale "mais é melhor".** A rotação não para sozinha. Se passar de $\pi/2$, o estado se afasta de $\ket w$ e a probabilidade cai, oscilando. Por isso é preciso conhecer $M$; se não o conhecemos, usa-se um número aleatório de iterações (algoritmo BBHT) ou contagem quântica.

Com $N=64$ e $M=4$ itens marcados ($\sin\theta=1/4$, $\theta\approx0{,}2527$ rad), quantas iterações?

```exercise:number
id: grover-iteracoes-n64
answer: 3
```

## Simulação

Simule Grover com NumPy: monte o estado uniforme, aplique $k$ vezes o oráculo ($-1$ em $w$) e a difusão (refletir em torno da média), e devolva a probabilidade de medir $w$.

```exercise:python
id: grover-simulacao
input: n | int | número de qubits (N = 2**n) | 2
input: marcado | int | índice w do item marcado, 0 <= w < 2**n | 3
input: k | int | número de iterações de Grover | 1
output: prob_sucesso | float | probabilidade de medir o estado marcado depois de k iterações | 1.0
---
import numpy as np

def prob_sucesso(n, marcado, k):
    return 0.0
---
>>> prob_sucesso(2, 3, 1)
1.0
---
>>> prob_sucesso(3, 5, 1)
0.78125
>>> prob_sucesso(3, 5, 0)
0.125
---
>>> prob_sucesso(3, 2, 2)
0.9453125
>>> prob_sucesso(4, 0, 3)
0.9613189697265625
>>> prob_sucesso(4, 9, 6)
0.020380768924951553
```

Dica: com `psi = np.ones(N) / np.sqrt(N)`, o oráculo é `psi[marcado] *= -1` e a difusão é `psi = 2 * psi.mean() - psi`.

## Para ir além: amplitude amplification (opcional)

Esta seção generaliza o Grover e pode ser pulada numa primeira leitura.

O método não precisa começar no estado uniforme. Suponha um algoritmo quântico $\mathcal A$ (um circuito unitário) que prepara

$$
\mathcal A\ket{0\cdots0}=\sin\theta\,\ket{\text{bom}}+\cos\theta\,\ket{\text{ruim}},
$$

onde "bom" e "ruim" são estados normalizados e ortogonais, e $p=\sin^2\theta$ é a probabilidade de medir um resultado bom. Uma tentativa direta acerta com probabilidade $p$; repetir dá em média $1/p$ tentativas.

O mesmo truque das duas reflexões funciona:

- reflexão 1: troca o sinal da parte "boa" (o oráculo, que reconhece resultados bons);
- reflexão 2: reflexão em torno do estado inicial $\mathcal A\ket{0\cdots0}$, feita por $\mathcal A\,(2\ket0\bra0-I)\,\mathcal A^{-1}$.

Cada rodada gira de $2\theta$ e, depois de $k$ rodadas, a probabilidade de sucesso é $\sin^2((2k+1)\theta)$. Como $\theta\approx\sqrt p$, bastam cerca de $\tfrac\pi4\sqrt{1/p}$ rodadas em vez de $1/p$: um ganho **quadrático**. O Grover é o caso em que $\mathcal A=H^{\otimes n}$ e $p=1/N$.

Se um algoritmo acerta com probabilidade $p=1/100$, quantas rodadas de amplificação (mesma fórmula, com $\sin\theta=\sqrt p$)?

```exercise:number
id: grover-amplificacao
answer: 7
```

Esse resultado é **ótimo**: nenhum algoritmo quântico acha um item marcado numa lista não estruturada com bem menos que $\sqrt N$ consultas (Bennett, Bernstein, Brassard e Vazirani, 1997; Zalka, 1999, mostra que a constante $\pi/4$ também é a melhor possível). Por isso Grover dá um ganho quadrático, não exponencial.

## Resumo

- Problema: achar $w$ com $f(w)=1$ entre $N=2^n$ entradas, sem estrutura.
- Passo de Grover: oráculo de fase (reflexão que inverte $\ket w$) e difusão (reflexão em torno de $\ket\psi$); juntas, uma rotação de $2\theta$, com $\sin\theta=1/\sqrt N$.
- Depois de $k$ passos, $P(w)=\sin^2((2k+1)\theta)$; o melhor $k$ é o inteiro mais próximo de $\tfrac{\pi}{4\theta}-\tfrac12$ (cerca de $\tfrac\pi4\sqrt N$).
- Opcional: a amplitude amplification generaliza, e qualquer algoritmo com sucesso $p$ vira $\sim\sqrt{1/p}$ rodadas.

---

Fonte: texto original; o assunto segue B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 5.4.
