Dois circuitos resolvem o mesmo problema, um com 100 portas e outro com 100 bilhões. Qual rodar? Para responder, precisamos de uma forma de **contar** o custo e de dizer como ele cresce quando o problema aumenta. É disso que trata a complexidade.

## Contar portas e camadas

Um circuito tem duas medidas simples:

- **Tamanho**: o número total de portas.
- **Profundidade**: o número de camadas, em que portas que mexem em qubits diferentes podem rodar ao mesmo tempo.

Exemplo: quatro qubits, com uma Hadamard em cada um, e depois CNOTs entre os pares (0,1) e (2,3). Tamanho: $4+2 = 6$ portas. Profundidade: $2$, porque as quatro Hadamards ocorrem juntas e os dois CNOTs também.

![Circuito de 4 qubits com quatro Hadamards na camada 1 e dois CNOTs na camada 2: tamanho 6, profundidade 2.](/content/hardware/complexidade-camadas.svg)

Quanto vale a profundidade de um circuito com 5 portas $H$ aplicadas uma depois da outra no **mesmo** qubit?

```exercise:number
id: compl-profundidade
answer: 5
```

Tempo de execução e erros acumulam com o tamanho, e a profundidade importa porque o qubit físico perde o estado com o tempo. Por isso se busca circuitos pequenos e rasos.

## Como o custo cresce: a notação $O(\cdot)$

O que importa é a **forma de crescimento** quando o tamanho da entrada $x$ aumenta. Dizemos que $f(x)=O(g(x))$ se, a partir de algum $x_0$, $f(x)$ fica abaixo de uma constante vezes $g(x)$:

$$
f(x) \le M\, g(x) \quad \text{para todo } x \ge x_0 .
$$

Isso ignora constantes e termos menores: $5x+100 = O(x)$ e $x + \log x = O(x)$. Também é permitido superestimar: $x = O(x^2)$.

O **tamanho da entrada** é medido em bits. Um número $N$ escrito em binário ocupa cerca de $\log_2 N$ bits, então "entrada de tamanho $n$" significa um número até $2^n$ aproximadamente.

Quantos bits (no mínimo) são necessários para escrever $N = 1000$ em binário?

```exercise:number
id: compl-bits-entrada
answer: 10
```

## Por que "polinomial" importa

Compare dois algoritmos para uma entrada de tamanho $n$: um faz $n^3$ operações, outro faz $2^n$.

| $n$ | $n^3$ | $2^n$ |
|-----|-------|-------|
| 10 | 1 000 | 1 024 |
| 30 | 27 000 | cerca de 1 bilhão |
| 100 | 1 milhão | cerca de $10^{30}$ |

Dobrar $n$ num algoritmo polinomial multiplica o custo por uma constante fixa ($8$ para $n^3$). Num exponencial, dobrar $n$ **eleva ao quadrado** o custo. Por isso a linha divisória usada em computação é: custo polinomial em $n$ é "razoável", exponencial não.

Se um algoritmo gasta $n^3$ operações, por quanto fica multiplicado o custo ao dobrar $n$?

```exercise:number
id: compl-dobra-n
answer: 8
```

## Classes: P, BPP e BQP em ideia

Uma **classe de complexidade** agrupa problemas pelo recurso necessário para resolvê-los. Falando de problemas de decisão (resposta sim/não):

- **P**: problemas que um computador clássico determinístico resolve em tempo polinomial.
- **BPP**: problemas que um computador clássico com sorteios resolve em tempo polinomial, acertando com probabilidade de pelo menos $2/3$.
- **BQP**: o mesmo, mas num computador **quântico**. É a classe do que um circuito quântico de tamanho polinomial resolve, acertando com probabilidade de pelo menos $2/3$.

Sabe-se que P está contida em BPP, e BPP em BQP. Não se sabe se BQP é estritamente maior: ela pode ser igual a BPP. Os resultados mais famosos (como fatorar números) são exemplos de algoritmos quânticos mais rápidos que o melhor clássico conhecido, o que não é o mesmo que uma prova de que BQP é maior.

Em BQP exige-se também que os circuitos de cada tamanho de entrada sejam gerados por um algoritmo clássico polinomial (uma família "uniforme"), para que o circuito em si não esconda a resposta.

Um problema de decisão está em P. Em quantas das três classes P, BPP e BQP ele está (contando a própria P)?

```exercise:number
id: compl-classe-quantica
answer: 3
```

## Repetir para ganhar confiança

Por que $2/3$? Porque é arbitrário: **repetir** o algoritmo eleva a confiança. Em problemas de decisão, em geral você não consegue verificar a resposta. O truque é repetir $k$ vezes e ficar com a resposta que apareceu mais vezes (**voto da maioria**). Enquanto cada rodada acerta com probabilidade maior que $1/2$, a chance de a maioria errar cai exponencialmente com $k$. É por isso que o $2/3$ pode ser trocado por qualquer valor acima de $1/2$ sem mudar a classe, e multiplicar o tempo por uma constante não muda o $O(\cdot)$.

Quando a resposta **pode** ser verificada (por exemplo, conferir um fator de um número), basta uma rodada certa: depois de $k$ rodadas, a chance de ao menos uma acertar é

$$
1-(1-p)^k .
$$

Com $p = 2/3$ e $k=2$ isso dá $1-(1/3)^2 = 8/9$.

Com resposta verificável, qual é a probabilidade de acertar em pelo menos uma de 3 rodadas, com $p=2/3$ cada? Dê o valor em fração decimal.

```exercise:number
id: compl-tres-rodadas
answer: 0.96296296
tolerance: 0.0001
```

Escreva uma função que devolva o menor número de rodadas necessário para alcançar uma confiança alvo.

```exercise:python
id: compl-min-repeticoes
input: p | float | chance de acerto de uma rodada, entre 0 e 1 (exclusivo) | 0.5
input: alvo | float | confiança desejada, entre 0 e 1 (exclusivo) | 0.9
output: min_repeticoes | int | menor k com 1-(1-p)**k >= alvo | 4
---
def min_repeticoes(p, alvo):
    k = 0
    return k
---
>>> min_repeticoes(0.5, 0.9)
4
---
>>> min_repeticoes(2/3, 0.99)
5
---
>>> min_repeticoes(0.9, 0.5)
1
```

## Cuidado: a constante escondida e a compilação

O $O(\cdot)$ esconde constantes. Um algoritmo com $10^{40}+\log x$ operações é $O(\log x)$, porém inútil na prática. Em computação quântica, constantes enormes são comuns, então se faz **estimativa de recursos**: contar de fato o número de portas, qubits e o tempo.

Além disso, o custo que importa é o do circuito **depois da compilação** para o hardware. Decompor portas em um conjunto nativo, corrigir erros e encaixar os qubits lógicos na conectividade do chip podem inflar o custo muito acima do circuito "ideal". É o assunto da próxima skill.

Um circuito ideal tem 1000 portas; a compilação multiplica o número por 12. Quantas portas há no circuito compilado?

```exercise:number
id: compl-compilado
answer: 12000
```

### Resumo

- Tamanho é o número de portas; profundidade, o número de camadas.
- $O(\cdot)$ descreve crescimento, ignorando constantes; polinomial é razoável, exponencial não.
- P, BPP e BQP agrupam problemas por recurso: clássico, clássico com sorteio, quântico.
- A confiança pode ser aumentada repetindo; constantes escondidas e a compilação exigem contagem concreta.

Um algoritmo gasta $2^n$ operações. Ao passar de $n$ para $n+1$, por qual fator o custo é multiplicado?

```exercise:number
id: compl-resumo-exponencial
answer: 2
```

Fonte: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 4.1. Texto e exemplos originais.
