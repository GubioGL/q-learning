Você escreve um circuito com uma porta Toffoli e a envia para um chip de verdade. A resposta do chip: "não conheço essa porta". Cada hardware só executa um repertório pequeno de portas, as **portas nativas**, e o **compilador** é quem traduz o seu circuito para esse repertório. Esta skill mostra quais repertórios existem e o que a tradução custa.

## Conjuntos de portas de baixo nível

Um conjunto de portas é **universal** se qualquer unitária de $n$ qubits puder ser construída com ele. É **aproximadamente universal** se for possível chegar tão perto quanto se queira (erro $\varepsilon$ tão pequeno quanto se desejar), com circuitos cada vez mais longos.

Exemplos de repertórios reais:

| Hardware | Portas nativas típicas |
|----------|------------------------|
| Supercondutores | CNOT (ou CZ) e rotações de 1 qubit |
| Óptica linear | rotações de 1 qubit; CNOT/CZ só de forma probabilística (veja `optica-linear`) |
| Íons aprisionados | porta de Mølmer-Sørensen $XX(\theta)$ e rotações $R_x,R_z$ |
| Computação com correção de erros | Clifford + $T$ |

As portas **Clifford** são as geradas por $H$, $S$ e CNOT. Elas são essenciais, mas **sozinhas não são universais**: um computador clássico consegue simulá-las com eficiência. Para chegar à universalidade, junta-se pelo menos uma porta que não seja Clifford, como $T$ ou uma rotação de ângulo qualquer.

Qual porta, dentre $H$, $S$, CNOT e $T$, **não** é Clifford?

```exercise:text
id: nativas-nao-clifford
answer: T | t
```

## Um primeiro exemplo de tradução: CZ a partir de CNOT

Suponha que o chip só tenha CNOT, mas seu circuito pede um CZ (aplica $Z$ no alvo quando o controle vale 1). Como $HXH = Z$, basta cercar o alvo de Hadamards:

$$
\text{CZ} = (I\otimes H)\;\text{CNOT}\;(I\otimes H).
$$

Quando o controle é $\ket{0}$, os dois $H$ se cancelam. Quando é $\ket{1}$, o alvo sofre $HXH=Z$. Um CZ virou 1 CNOT e 2 Hadamards: compilar é isso, trocar uma porta por uma pequena sequência de portas nativas.

Quantas Hadamards entram nessa tradução do CZ?

```exercise:number
id: nativas-cz-hadamards
answer: 2
```

## CNOT + rotações de 1 qubit: universal

A ideia central: qualquer operação em $n$ qubits se reduz a CNOTs e rotações de 1 qubit. A prova tem etapas, e aqui está o roteiro.

**Uma unitária de 1 qubit são três rotações.** Toda $U$ de 1 qubit pode ser escrita (a menos de fase global) como

$$
U = R_z(\beta)\,R_y(\gamma)\,R_z(\delta).
$$

**Uma $U$ controlada vira dois CNOTs.** Existem $A_1,A_2,A_3$ de 1 qubit com $A_1A_2A_3 = I$ e $U = e^{i\alpha}A_1XA_2XA_3$. Então a versão controlada de $U$ usa dois CNOTs, as portas $A_1,A_2,A_3$ no alvo e uma fase $\alpha$ no controle. Quando o controle é $\ket{0}$, os $X$ não agem e $A_1A_2A_3=I$ cancela tudo. Quando é $\ket{1}$, os $X$ agem e sobra $U$.

**Mais controles, mais camadas.** Escolhendo $V$ com $V^2=U$, a porta duplamente controlada se faz com portas simplesmente controladas:

Chame os controles de $a$ e $b$ e o alvo de $t$. Em ordem de aplicação:

1. $C_b\text{-}V$ ($b$ controla $V$ em $t$);
2. CNOT($a\to b$);
3. $C_b\text{-}V^{\dagger}$;
4. CNOT($a\to b$);
5. $C_a\text{-}V$.

Verifique pelos quatro casos $(a,b)$:

- $00$: nenhuma porta age.
- $01$: age $V$ (passo 1), os CNOTs não mexem em $b$ ($a=0$), age $V^\dagger$ (passo 3) e o passo 5 não age. Sobra $V^\dagger V = I$.
- $10$: o passo 1 não age; o CNOT leva $b$ a 1, então o passo 3 aplica $V^\dagger$; o segundo CNOT devolve $b$ a 0; o passo 5 aplica $V$. Sobra $I$.
- $11$: o passo 1 aplica $V$; o CNOT leva $b$ a 0, então o passo 3 não age; o segundo CNOT devolve $b$ a 1; o passo 5 aplica $V$ de novo. Sobra $V^2=U$.

Essa construção funciona para qualquer $n$, mas o resultado geral (sem usar estrutura nenhuma da unitária) tem tamanho **exponencial**. Isso não é falha da prova: uma unitária geral de $n$ qubits tem cerca de $4^n$ números livres, e cada um precisa entrar em algum ângulo de rotação.

## Do conjunto universal ao Clifford + T

Combinando as peças, qualquer unitária pode ser aproximada com CNOT, $H$ e $T$. É por isso que o conjunto **Clifford + $T$** é o padrão de computação tolerante a falhas: as portas Clifford são baratas de proteger contra erro, e a porta $T$ é a cara, então se **conta quantas $T$** um circuito usa.

## Exemplo: decompor a Toffoli em CNOT + T

A Toffoli (CCX) tem três qubits, dois controles $a,b$ e um alvo $t$. Uma decomposição conhecida usa só $H$, CNOT, $T$ e $T^\dagger$ (o inverso de $T$). Em ordem de aplicação:

1. $H$ em $t$.
2. CNOT($b\to t$), depois $T^\dagger$ em $t$.
3. CNOT($a\to t$), depois $T$ em $t$.
4. CNOT($b\to t$), depois $T^\dagger$ em $t$.
5. CNOT($a\to t$), depois $T$ em $b$ e $T$ em $t$, depois $H$ em $t$.
6. CNOT($a\to b$), depois $T$ em $a$ e $T^\dagger$ em $b$.
7. CNOT($a\to b$).

<!-- ILUSTRAR: circuito de 3 fios (a, b, t) com a decomposição da Toffoli acima, gates coloridos: CNOT em azul, T/T† em laranja, H em cinza; legenda com "6 CNOT, 7 T/T†, 2 H" -->

Contagem: 6 CNOTs, 7 portas do tipo $T$ (contando $T^\dagger$) e 2 Hadamards. Confira você mesmo: conte os $T$ e $T^\dagger$ nos passos 2 a 6 (um no passo 2, um no 3, um no 4, dois no 5 e dois no 6).

Quantas portas do tipo $T$ (incluindo $T^\dagger$) tem essa decomposição?

```exercise:number
id: nativas-toffoli-t
answer: 7
```

## Conectividade e SWAP

Em chips reais, só alguns pares de qubits físicos se conectam. Imagine três qubits em linha, $0 - 1 - 2$, e um CNOT entre 0 e 2, que não são vizinhos. O compilador resolve com **SWAPs**:

- troca os estados de 0 e 1 (um SWAP),
- faz o CNOT entre 1 e 2, agora vizinhos,
- troca de volta (outro SWAP).

Um SWAP custa **3 CNOTs**:

$$
\text{SWAP}(a,b) = \text{CNOT}(a\to b)\;\text{CNOT}(b\to a)\;\text{CNOT}(a\to b).
$$

Quantos CNOTs, no total, tem o CNOT remoto com o esquema acima (dois SWAPs e um CNOT)?

```exercise:number
id: nativas-cnot-remoto
answer: 7
```

Um circuito "ideal" com um CNOT virou 7. Foi o hardware, não o algoritmo, quem multiplicou o custo, e isso se repete em circuitos grandes.

<!-- ILUSTRAR: três qubits físicos numa linha 0-1-2 com arestas; sequência de três painéis mostrando SWAP(0,1), CNOT(1,2), SWAP(0,1), destacando o qubit lógico que viaja -->

## Estudo de caso: profundidade × portas × ancillas

Queremos a porta $C^n\text{-}R_\theta$: aplicar $R_\theta=\mathrm{diag}(1,e^{i\theta})$ ao qubit alvo quando os $n$ qubits de controle valem 1 (a fase $e^{i\theta}$ só aparece no termo com controles e alvo todos em 1). Há duas estratégias.

**Sem ancillas (circuito exponencial).** Aplicando a regra do $C\text{-}C\text{-}U$ repetidamente, cada nível triplica as portas. Com $n$ controles saem

$$
N^{\text{CNOT}}_n = 3^n - 1, \qquad N^{R}_n = 3^n ,
$$

portas de rotação com ângulos $\pm\theta/2^n$. Para $n=1$: 2 CNOTs e 3 rotações; para $n=2$: 8 CNOTs e 9 rotações. O circuito cresce exponencialmente com o número de controles e não dá para paralelizar, porque todas as rotações caem no mesmo qubit alvo.

**Com ancillas (circuito polinomial).** Uma **ancilla** é um qubit auxiliar, que começa em $\ket{0}$ e volta a $\ket{0}$ ao final. A ideia: calcular o produto $x_1x_2\cdots x_n$ dos controles numa ancilla com uma escada de Toffolis, aplicar **um** $C\text{-}R_\theta$ controlado pela ancilla, e desfazer a escada. Para $n$ controles, o esquema simples usa $n-1$ ancillas e $2(n-1)$ Toffolis. O custo agora cresce de modo linear.

O que se paga? Qubits extras. A troca típica é esta: **menos portas e menos profundidade custam mais qubits**.

<!-- ILUSTRAR: circuito de C^3-Rθ com escada de Toffolis em duas ancillas (calcula x1x2, depois (x1x2)x3), um C-Rθ da última ancilla para o alvo, e a escada desfeita; legenda com "2 ancillas, 4 Toffolis" -->

Para escolher entre as duas estratégias, o compilador compara custos. Contando só CNOTs, e supondo cada Toffoli decomposta em 6 CNOTs e o $C\text{-}R_\theta$ final em 2 CNOTs, o esquema com ancillas gasta $12(n-1)+2$ CNOTs e precisa de $n-1$ ancillas; o esquema sem ancillas gasta $3^n-1$. Escreva a função que devolve o menor custo em CNOTs disponível dado o número de ancillas livres.

```exercise:python
id: nativas-custo-cnots
input: n | int | número de controles, n >= 1 | 4
input: ancillas | int | ancillas livres no chip, ancillas >= 0 | 3
output: cnots | int | menor número de CNOTs entre as estratégias possíveis | 38
---
def cnots(n, ancillas):
    return 0
---
>>> cnots(4, 3)
38
---
>>> cnots(4, 2)
80
---
>>> cnots(2, 1)
8
```

A partir de quantos controles $n$ o esquema com ancillas gasta estritamente menos CNOTs que o sem ancillas? (Compare $12(n-1)+2$ com $3^n-1$.)

```exercise:number
id: nativas-ponto-de-virada
answer: 4
```

## Resumo

- Cada hardware executa um conjunto pequeno de portas nativas; o compilador traduz o resto.
- Clifford não é universal; Clifford + $T$ é, aproximadamente, e conta-se quantas $T$ se gasta.
- Toffoli = 6 CNOT + 7 $T$/$T^\dagger$ + 2 $H$; SWAP = 3 CNOT.
- Conectividade e ancillas trocam portas por qubits extras: custo ideal e custo compilado podem diferir muito.

Fonte: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seções 4.2 a 4.4. Texto e exemplos originais; a decomposição da Toffoli é um resultado clássico (veja também Nielsen e Chuang, *Quantum Computation and Quantum Information*).
