Três amigos querem formar dois times para um jogo, mas cada par de amigos que se desentende só atrapalha se ficar no mesmo time. Como separar o máximo de pares de desafetos? É um problema de otimização combinatória, e o QAOA ataca esse tipo de problema com um circuito parametrizado, no mesmo espírito do VQE.

## Otimização combinatória e MaxCut

Um problema **combinatório** pede a melhor entre muitas escolhas discretas (aqui, $2^n$ divisões possíveis). **MaxCut**: dado um grafo (vértices ligados por arestas), divida os vértices em dois grupos para maximizar o número de arestas que ligam vértices de **grupos diferentes**. Essas arestas são as "cortadas".

Representamos a divisão por uma string de bits $z = z_1 z_2\dots z_n$: o bit diz o grupo de cada vértice. O **valor do corte** $C(z)$ é simplesmente o número de arestas cujos extremos têm bits diferentes.

Exemplo: um caminho $0 - 1 - 2$ (arestas $(0,1)$ e $(1,2)$) com $z = 010$ separa o vértice 1 dos outros dois: as duas arestas são cortadas, $C = 2$. Com $z=000$, $C=0$.

![Dois grafos de MaxCut com a divisão z = 010. Cada vértice é colorido pelo seu bit: azul para 0 e laranja para 1, com o número do vértice ao lado. À esquerda, o caminho 0-1-2; à direita, o triângulo. As arestas cortadas, entre cores diferentes, são verdes e contínuas; a aresta (0,2) do triângulo não é cortada e é tracejada. Em ambos o valor do corte é C=2.](/content/nisq/qaoa-maxcut-grafos.svg)

Qual é o valor máximo do corte de um triângulo (3 vértices, as 3 arestas)? Dica: com 2 grupos, dois vértices sempre ficam juntos.

```exercise:number
id: qaoa-maxcut-triangulo
answer: 2
tolerance: 0.001
```

## Do corte ao hamiltoniano

Para escrever $C(z)$ como operador, use o sinal $s_i = (-1)^{z_i}$ ($+1$ para bit 0, $-1$ para bit 1). Cada aresta contribui $\frac{1 - s_is_j}{2}$: vale $1$ se os sinais diferem e $0$ se são iguais. Trocando $s_i$ por $Z_i$, o **hamiltoniano de custo** é

$$
H_C = \sum_{(i,j)} \frac{1 - Z_iZ_j}{2}.
$$

Ele é diagonal na base computacional: $H_C\ket{z} = C(z)\ket{z}$. Checagem de uma aresta: em $\ket{01}$ temos $Z_0Z_1\ket{01} = (+1)(-1)\ket{01} = -\ket{01}$, logo $\frac{1-(-1)}{2} = 1$: aresta cortada. Em $\ket{00}$, $Z_0Z_1=+1$ e o valor é $0$.

Quanto vale $\frac{1 - Z_0Z_1}{2}$ aplicado a $\ket{01}$ (o autovalor)?

```exercise:number
id: qaoa-autovalor-aresta
answer: 1
tolerance: 0.001
```

Maximizar o corte é achar o autoestado de **maior** autovalor de $H_C$ (ou o de menor de $-H_C$, tal como no VQE). Note que $H_C$ é uma soma de termos $ZZ$, exatamente os que a aula de trotterização implementa com CNOT-Rz-CNOT.

## O circuito do QAOA

O **QAOA** (*quantum approximate optimization algorithm*) é construído em três passos.

**Passo 1, estado inicial.** Uma Hadamard em cada qubit dá $\ket{+}^{\otimes n}$, a superposição uniforme de todas as divisões, cada uma com probabilidade $2^{-n}$.

**Passo 2, operador de custo.** Aplique $e^{-i\gamma H_C}$, que multiplica cada $\ket z$ pela fase $e^{-i\gamma C(z)}$. Para cada aresta, é um $e^{-i\theta ZZ}$ com $\theta = -\gamma/2$ (o $\tfrac12$ constante é fase global), feito com CNOT-Rz-CNOT. Divisões com cortes diferentes ganham fases diferentes, mas fases não mudam probabilidades.

Teste: depois de um operador de custo qualquer, partindo de $\ket{++}$ (2 qubits), qual é a probabilidade de medir $00$?

```exercise:number
id: qaoa-so-custo
answer: 0.25
tolerance: 0.001
```

**Passo 3, mixer.** Para converter as fases em probabilidades, aplique o **mixer** $e^{-i\beta H_B}$, com $H_B = \sum_i X_i$. Ele é um $R_x(2\beta)$ em cada qubit e mistura as amplitudes: sem ele, o custo seria invisível na medida.

**Repetir.** Os passos 2 e 3 formam uma camada, com seus próprios $(\gamma_k,\beta_k)$. Com $p$ camadas:

$$
\ket{\gamma,\beta} = \underbrace{e^{-i\beta_p H_B}\, e^{-i\gamma_p H_C}}_{\text{camada } p}\cdots \underbrace{e^{-i\beta_1 H_B}\, e^{-i\gamma_1 H_C}}_{\text{camada } 1}\ket{+}^{\otimes n}.
$$

São $2p$ parâmetros no total.

![Circuito QAOA com p=1 para o triângulo de 3 vértices. Cada qubit começa em |0⟩ e recebe H. A camada de custo tem três blocos, um por aresta (0,1), (1,2) e (0,2); cada bloco é CNOT, Rz(−γ) no qubit alvo, CNOT. A camada mixer aplica Rx(2β) em cada qubit. No fim, os três qubits são medidos.](/content/nisq/qaoa-circuito-triangulo.svg)

![Dois histogramas das 8 divisões do triângulo, de 000 a 111. Em cima, o estado uniforme: todas as barras iguais a 1/8. Embaixo, depois de uma camada de QAOA com bons parâmetros: as seis divisões de corte 2 (verdes) ficam com probabilidade 1/6 cada, e 000 e 111, de corte 0 (cinza), ficam com probabilidade zero.](/content/nisq/qaoa-histogramas.svg)

Quantos parâmetros reais livres tem um QAOA com $p = 3$ camadas?

```exercise:number
id: qaoa-parametros
answer: 6
tolerance: 0.001
```

Com $\beta = \pi/8$, qual é o ângulo (em radianos) da porta $R_x(2\beta)$ aplicada em cada qubit?

```exercise:number
id: qaoa-angulo-mixer
answer: 0.7854
tolerance: 0.001
```

## O laço, de novo híbrido

Como no VQE, o QAOA é um laço híbrido: o otimizador clássico escolhe $(\vec\gamma,\vec\beta)$; o chip prepara $\ket{\gamma,\beta}$ e mede muitas vezes, estimando $\langle H_C\rangle = \bra{\gamma,\beta}H_C\ket{\gamma,\beta}$, o corte médio. O otimizador procura parâmetros que maximizem esse valor. No fim, mede-se o estado e, entre as strings que saem, fica-se com a de maior corte (que é calculada de forma clássica).

Ponto de partida: no estado uniforme, cada aresta é cortada com probabilidade $\tfrac12$ (os dois bits são independentes e diferentes em metade dos casos). Então $\langle H_C\rangle = \tfrac12\cdot(\text{número de arestas})$.

Qual é o corte médio do estado uniforme no triângulo?

```exercise:number
id: qaoa-corte-medio
answer: 1.5
tolerance: 0.001
```

Como o máximo é 2, o QAOA já parte de $1{,}5/2 = 75\%$ do ótimo; cada camada tenta aumentar esse número. Com os melhores parâmetros, aumentar $p$ nunca piora o resultado e, no limite $p\to\infty$, tende ao ótimo (na prática, achar esses parâmetros fica mais difícil).

## Ligação com evolução adiabática e trotterização (leitura opcional)

Imagine um hamiltoniano que muda devagar de $-H_B$ (estado fundamental $\ket{+}^{\otimes n}$, o inicial) para $-H_C$ (estado fundamental igual ao melhor corte). O **teorema adiabático** (um sistema que muda devagar o bastante fica no estado de menor energia) diz que, se a mudança é lenta o bastante, o sistema permanece no estado fundamental instantâneo e termina na resposta. Simular essa evolução com a fórmula de Trotter alterna passos de $e^{-i\gamma H_C}$ e $e^{-i\beta H_B}$, com $\gamma$ e $\beta$ pequenos: **é exatamente a estrutura do QAOA**. A diferença é que, no QAOA, os ângulos $\gamma_k,\beta_k$ não são impostos pelo cronograma adiabático, e sim ajustados livremente pelo otimizador, o que permite obter bons resultados com poucas camadas.

## Em Python

Escreva uma função que dá o valor do corte de uma string de bits para uma lista de arestas, contando as arestas que ligam bits diferentes. Para ir além: some sobre todas as strings e confira o máximo.

```exercise:python
id: qaoa-valor-corte
input: bits | str | texto só com "0" e "1", um bit por vértice, vértices numerados de 0 | "010"
input: arestas | list | lista de pares (i, j) de vértices | [(0, 1), (1, 2)]
output: corte | int | número de arestas com extremos em bits diferentes | 2
---
def corte(bits, arestas):
    return 0
---
>>> corte("010", [(0, 1), (1, 2)])
2
---
>>> corte("000", [(0, 1)])
0
>>> corte("011", [(0, 1), (1, 2), (0, 2)])
2
---
>>> corte("0101", [(0, 1), (1, 2), (2, 3), (3, 0)])
4
>>> corte("0011", [(0, 1), (1, 2), (2, 3), (3, 0)])
2
```

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 7.3.
