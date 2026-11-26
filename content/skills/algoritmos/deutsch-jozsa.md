Alguém promete que uma função $f$ de $n$ bits é de um de dois tipos e você precisa descobrir qual, perguntando o menos possível. Um computador clássico precisa de muitas perguntas no pior caso. Um quântico resolve com uma só.

## O problema

Seja $f:\{0,1\}^n\to\{0,1\}$ com a **promessa** de que $f$ é:

- **constante**: $f(x)$ é o mesmo para todo $x$ (sempre $0$ ou sempre $1$); ou
- **balanceada**: $f(x)=0$ para exatamente metade das $2^n$ entradas e $f(x)=1$ para a outra metade.

A tarefa é dizer qual dos dois casos vale. Com $n=2$, a função de tabela $(f(00),f(01),f(10),f(11))=(0,1,1,0)$ é balanceada; $(1,1,1,1)$ é constante; $(0,0,0,1)$ viola a promessa e não nos interessa.

**Custo clássico.** Cada consulta dá um valor. Se as primeiras $2^{n-1}$ respostas forem todas iguais, ainda pode ser constante ou balanceada (a metade restante poderia ser diferente), então só com $2^{n-1}+1$ respostas iguais temos certeza de que é constante. No pior caso, são $2^{n-1}+1$ consultas para uma resposta sempre correta.

Com $n=3$, quantas consultas clássicas o pior caso exige?

```exercise:number
id: dj-consultas-classicas
answer: 5
```

## Começando pequeno: $n=1$ (Deutsch)

Aqui $f$ tem só dois valores, $f(0)$ e $f(1)$. Constante significa $f(0)=f(1)$; balanceada significa $f(0)\neq f(1)$. Clássico: duas consultas (precisa ver os dois valores). Quântico, com uma:

1. Comece com $\ket{0}\ket{1}$ e aplique $H\otimes H$: $\ket{+}\ket{-}$.
2. Aplique $U_f$. Pelo phase kickback (aula anterior), o primeiro qubit vira $\tfrac{1}{\sqrt2}\big((-1)^{f(0)}\ket0+(-1)^{f(1)}\ket1\big)$ e o segundo continua em $\ket{-}$.
3. Aplique $H$ no primeiro qubit e meça.

Veja o resultado em cada caso:

- $f$ constante: o primeiro qubit é $\pm\ket{+}$, e $H\ket{+}=\ket0$. Mede $0$.
- $f$ balanceada: é $\pm\ket{-}$, e $H\ket{-}=\ket1$. Mede $1$.

A medida $0$ diz "constante" e $1$ diz "balanceada", com certeza, usando **uma** consulta.

Com $f(0)=0$ e $f(1)=1$ (função balanceada), o que o algoritmo conclui? Responda "constante" ou "balanceada".

```exercise:text
id: dj-deutsch-conclusao
answer: balanceada | balanceado | balanced
```

<!-- ILUSTRAR: circuito do algoritmo de Deutsch: dois fios, |0⟩ e |1⟩; H em ambos; caixa U_f nos dois fios; H no fio superior; medidor no fio superior. Marcar com setas os estados intermediários |+⟩|−⟩ e (±)|+⟩ ou |−⟩ após o oráculo -->

## O caso geral

Antes da fórmula, veja o caso $n=2$ com $f=(0,1,1,0)$: depois do oráculo o registrador é $\tfrac12(\ket{00}-\ket{01}-\ket{10}+\ket{11})=\ket-\ket-$, e $H\otimes H$ leva isso a $\ket{11}$, nunca a $\ket{00}$. Agora o caso geral.

O circuito é o mesmo, com $H$ no registrador inteiro de $n$ qubits:

1. Prepare $\ket{0}^{\otimes n}\ket{1}$.
2. Aplique $H^{\otimes n}$ nos $n$ primeiros qubits e $H$ no último: o registrador fica na superposição uniforme e o último em $\ket-$.
3. Aplique $U_f$ (que age como oráculo de fase no primeiro registrador).
4. Aplique $H^{\otimes n}$ no primeiro registrador e **meça-o**.

Para acompanhar as contas, precisamos do que $H^{\otimes n}$ faz num estado da base:

$$
H^{\otimes n}\ket{x}=\frac{1}{\sqrt{2^n}}\sum_{z\in\{0,1\}^n}(-1)^{x\cdot z}\ket{z},\qquad x\cdot z=x_1z_1\oplus\cdots\oplus x_nz_n,
$$

onde $x\cdot z$ é o **produto escalar módulo 2** (soma dos produtos bit a bit, mod 2). Isso vem de $H\ket{b}=\tfrac1{\sqrt2}\sum_{c}(-1)^{bc}\ket c$, aplicado em cada qubit.

Depois dos passos 2 e 3, o primeiro registrador está em

$$
\frac{1}{\sqrt{2^n}}\sum_x(-1)^{f(x)}\ket{x}.
$$

Depois do passo 4, a amplitude do estado $\ket{z}$ é

$$
\frac{1}{2^n}\sum_x(-1)^{f(x)+x\cdot z}.
$$

Só nos interessa $z=0\cdots0$, onde $x\cdot z=0$ para todo $x$:

$$
\text{amplitude de }\ket{0\cdots0}=\frac{1}{2^n}\sum_x(-1)^{f(x)}.
$$

- **$f$ constante**: todos os termos valem $+1$ (ou todos $-1$), a soma é $\pm2^n$ e a amplitude é $\pm1$. Mede $0\cdots0$ com probabilidade 1.
- **$f$ balanceada**: metade dos termos é $+1$ e metade é $-1$; a soma é $0$. A probabilidade de medir $0\cdots0$ é zero, então algum outro resultado aparece.

Portanto: se o resultado for $0\cdots0$, $f$ é constante; qualquer outro resultado, balanceada. Uma consulta, sempre correto.

<!-- ILUSTRAR: circuito do Deutsch-Jozsa geral: registrador de n fios |0⟩ com H^{⊗n}, um fio extra |1⟩ com H, caixa U_f ocupando todos os fios, H^{⊗n} nos n primeiros fios, medidor nos n primeiros. Ao lado, duas barras de histograma: constante (toda a probabilidade em 0...0) e balanceada (nada em 0...0) -->

**Exemplo com $n=2$.** Seja $f$ constante e igual a $1$. A amplitude de $\ket{00}$ é $\tfrac14(-1-1-1-1)$. Quanto vale?

```exercise:number
id: dj-amplitude-constante
answer: -1
```

Agora a balanceada $f(x_1x_2)=x_1\oplus x_2$, de tabela $(0,1,1,0)$. A soma $\sum_x(-1)^{f(x)}=1-1-1+1=0$, então a probabilidade de medir $00$ é:

```exercise:number
id: dj-prob-balanceada
answer: 0
```

## Quanto se ganha?

O algoritmo quântico usa **1** consulta; o clássico determinístico precisa de $2^{n-1}+1$. Na prática, o clássico **probabilístico** com $k$ consultas aleatórias erra com probabilidade de no máximo $2^{1-k}$, sem depender de $n$ (com $k=20$, cerca de $10^{-6}$), e o erro é só de um lado. Então a vantagem real do DJ é sobre algoritmos **exatos**. Ainda assim, ele foi um dos primeiros exemplos de separação entre computação clássica e quântica em consultas.

Simule o algoritmo: dada a tabela de $f$, calcule a probabilidade de medir $0\cdots0$.

```exercise:python
id: dj-simulacao
input: f | list | tabela de f: f[x] é 0 ou 1, com len(f) = 2**n | [1, 1, 1, 1]
input: n | int | número de bits de x | 2
output: prob_zero | float | probabilidade de medir 0...0 no primeiro registrador | 1.0
---
import numpy as np

def prob_zero(f, n):
    return 0.0
---
>>> prob_zero([1, 1, 1, 1], 2)
1.0
---
>>> prob_zero([0, 1, 1, 0], 2)
0.0
>>> prob_zero([0, 1], 1)
0.0
---
>>> prob_zero([0, 0, 0, 1], 2)
0.25
>>> prob_zero([0, 0, 0, 0, 0, 0, 0, 0], 3)
1.0
>>> prob_zero([1, 0, 0, 1, 0, 1, 1, 0], 3)
0.0
```

Nota: `f[x]` usa $x$ como inteiro com $x_1$ mais significativo, e `n` é $\log_2$ de `len(f)`. O teste com $(0,0,0,1)$ não satisfaz a promessa; só calcule a fórmula.

Dica: monte $H^{\otimes n}$ com `np.kron`, aplique o oráculo de fase `np.diag((-1.0)**np.array(f))` ao estado uniforme, aplique $H^{\otimes n}$ de novo e pegue $|\text{amplitude}[0]|^2$.

## Resumo

- Promessa: $f$ constante ou balanceada. Clássico exato: $2^{n-1}+1$ consultas.
- Deutsch-Jozsa: $H^{\otimes n}$, oráculo (com $\ket-$ no qubit extra), $H^{\otimes n}$, medir. Resultado $0\cdots0$ significa constante.
- A chave é que a amplitude de $\ket{0\cdots0}$ é $2^{-n}\sum_x(-1)^{f(x)}$.

---

Fonte: texto original; o assunto segue B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 6.1.
