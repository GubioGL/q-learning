Agora a caixa-preta esconde um segredo: uma string de bits $s$. Cada consulta devolve só **um bit** de informação sobre $s$. Quantas consultas para descobrir o segredo inteiro?

## O problema

Seja $s\in\{0,1\}^n$ uma string secreta e

$$
f(x)=s\cdot x \bmod 2 = s_1x_1\oplus s_2x_2\oplus\cdots\oplus s_nx_n.
$$

Ou seja, $f(x)$ é a **paridade** dos bits de $x$ nas posições onde $s$ vale $1$. A tarefa é achar $s$.

**Exemplo com $n=3$ e $s=101$.** Então $f(x)=x_1\oplus x_3$. Para $x=111$: $1\oplus1=0$. Para $x=100$: $1$.

Qual é $f(111)$ quando $s=101$?

```exercise:number
id: bv-valor-f
answer: 0
```

**Custo clássico.** Consultar $x=100\ldots0$ dá $s_1$, consultar $x=010\ldots0$ dá $s_2$, e assim por diante: com $n$ consultas lemos os $n$ bits de $s$. E não dá para fazer melhor, porque cada consulta traz só um bit e $s$ tem $n$ bits. Com $n=8$, quantas consultas clássicas são necessárias?

```exercise:number
id: bv-consultas-classicas
answer: 8
```

## O algoritmo quântico: uma consulta

Surpresa: o circuito é **idêntico** ao de Deutsch-Jozsa.

1. Prepare $\ket{0}^{\otimes n}\ket{1}$ e aplique $H$ em tudo.
2. Aplique $U_f$ (com o qubit extra em $\ket-$ ele age como o oráculo de fase $\ket{x}\mapsto(-1)^{f(x)}\ket x$).
3. Aplique $H^{\otimes n}$ no primeiro registrador e meça.

![Circuito de Bernstein-Vazirani com n=3 e s=101: as três medidas dão 1, 0, 1; ao lado, a tabela de f(x)=x₁⊕x₃.](/content/algoritmos/bernstein-vazirani-circuito.svg)

Com $n=5$, quantas portas Hadamard o passo 1 aplica (nos $n$ qubits do registrador mais o qubit extra)?

```exercise:number
id: bv-portas-h
answer: 6
```

## Por que a medida devolve $s$

Vamos às contas. Como no DJ, antes do último $H^{\otimes n}$ o registrador está em $\tfrac{1}{\sqrt{2^n}}\sum_x(-1)^{s\cdot x}\ket x$. Depois do último, a amplitude de $\ket z$ é

$$
\frac{1}{2^n}\sum_x(-1)^{s\cdot x+z\cdot x}=\frac{1}{2^n}\sum_x(-1)^{(s\oplus z)\cdot x}.
$$

Aqui usamos que $s\cdot x\oplus z\cdot x=(s\oplus z)\cdot x$ (soma bit a bit). Agora, dois casos:

- Se $z=s$, então $s\oplus z=0\cdots0$, todos os termos valem $+1$ e a soma é $2^n$: amplitude $1$.
- Se $z\ne s$, $s\oplus z$ tem algum bit $1$, e metade dos $x$ dá $(s\oplus z)\cdot x=0$ e a outra metade dá $1$. A soma é zero.

Logo o estado final é exatamente $\ket{s}$ e a medida devolve $s$ **com probabilidade 1**, com uma única consulta.

**Verificação com $n=2$ e $s=10$.** Então $f(x_1x_2)=x_1$, de tabela $(0,0,1,1)$. O estado antes do último $H^{\otimes2}$ é $\tfrac12(\ket{00}+\ket{01}-\ket{10}-\ket{11})=\ket{-}\ket{+}$. Aplicar $H\otimes H$ dá $\ket{1}\ket{0}=\ket{10}=\ket s$. Funciona.

Para $n=3$ e $f$ de tabela $(0,1,1,0,1,0,0,1)$ (entradas $x=000,001,\dots,111$), qual string $s$ o algoritmo devolve?

```exercise:text
id: bv-segredo-n2
answer: 111
```

## Por que isso é interessante

DJ e BV usam o mesmo circuito, mas respondem perguntas diferentes: DJ distingue constante de balanceada (e o resultado $0\cdots0$ ou não); BV lê **todas** as $n$ componentes de $s$ numa só consulta. A informação que cabe em $n$ bits sai de uma chamada porque o oráculo age em todos os ramos da superposição e só a interferência do $H^{\otimes n}$ final concentra a amplitude em $\ket s$.

Note que isso é uma vantagem de **consultas** ($1$ contra $n$), polinomial, não exponencial. Foi um passo importante para algoritmos posteriores, que usam a mesma estrutura de transformada de Hadamard para extrair uma propriedade escondida da função.

Com $n=20$, quantas consultas a mais o algoritmo clássico faz que o quântico?

```exercise:number
id: bv-diferenca-consultas
answer: 19
```

## Simulação

Implemente o algoritmo: dada a tabela de $f(x)=s\cdot x \bmod 2$, devolva a string $s$ encontrada, como texto de $n$ bits.

```exercise:python
id: bv-simulacao
input: f | list | tabela de f: f[x] é 0 ou 1, com len(f) = 2**n e f(x) = s·x mod 2 | [0, 0, 1, 1]
input: n | int | número de bits de x | 2
output: segredo | str | a string s, com n caracteres "0"/"1" (bit mais significativo primeiro) | "10"
---
import numpy as np

def segredo(f, n):
    return "0" * n
---
>>> segredo([0, 0, 1, 1], 2)
"10"
---
>>> segredo([0, 1, 1, 0, 1, 0, 0, 1], 3)
"111"
>>> segredo([0, 0, 0, 0], 2)
"00"
---
>>> segredo([0, 0, 0, 0, 1, 1, 1, 1], 3)
"100"
>>> segredo([0, 1, 0, 1, 1, 0, 1, 0], 3)
"101"
>>> segredo([0, 1], 1)
"1"
```

Nota: `f[x]` usa $x$ como inteiro com $x_1$ mais significativo, e `n` é $\log_2$ de `len(f)`.

Dica: reutilize sua simulação do Deutsch-Jozsa e, no fim, pegue o índice de maior amplitude com `np.argmax(np.abs(...))`, escrito em binário com `format(i, "0%db" % n)`.

### Resumo

- Problema: $f(x)=s\cdot x\bmod2$, achar $s$. Clássico: $n$ consultas.
- Quântico: o mesmo circuito do Deutsch-Jozsa; a amplitude de $\ket z$ é $2^{-n}\sum_x(-1)^{(s\oplus z)\cdot x}$, que vale $1$ só para $z=s$.
- Uma consulta, sucesso com probabilidade 1.

---

Fonte: texto original; o assunto segue B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 6.1.
