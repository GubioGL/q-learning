Fótons viajam rápido, quase não interagem com o ambiente e já são, na prática, transportados em fibras ópticas. Isso os torna candidatos naturais a qubits. Esta aula mostra como codificar informação quântica em luz, quais componentes fazem portas e por que as portas de 2 qubits são o problema.

## Onde guardar um qubit num fóton

Um qubit precisa de dois estados ortogonais. Um fóton oferece duas propriedades fáceis de controlar e medir:

- **Polarização**: a direção em que o campo elétrico da luz oscila. Duas opções ortogonais: horizontal, $\ket{H}$, e vertical, $\ket{V}$.
- **Modo**: o caminho por onde o fóton viaja (uma fibra, um trajeto no espaço). Com dois caminhos, $A$ e $B$, temos $\ket{A}$ e $\ket{B}$.

Podemos usar $\ket{0}=\ket{H}$ e $\ket{1}=\ket{V}$ (qubit de polarização) ou $\ket{0}=\ket{A}$ e $\ket{1}=\ket{B}$ (qubit de modo). Os dois ao mesmo tempo dão **dois qubits em um fóton**: $\ket{H_A}$ é "polarizado horizontalmente, no caminho $A$", e assim por diante, com 4 estados de base.

Se o primeiro qubit é a polarização ($H\!\to\!0$, $V\!\to\!1$) e o segundo é o modo ($A\!\to\!0$, $B\!\to\!1$), qual estado de base de 2 qubits é $\ket{V_A}$?

```exercise:text
id: optica-codificacao
answer: 10|1 0
```

<!-- ILUSTRAR: dois caminhos A e B (linhas horizontais) com um fóton; ao lado, a polarização H (seta horizontal) e V (seta vertical) desenhadas sobre o fóton; tabela dos 4 estados |H_A⟩,|V_A⟩,|H_B⟩,|V_B⟩ -->

## Componentes e o que eles fazem

Cada componente linear realiza uma operação **unitária** sobre o estado do fóton.

- **Divisor de feixe** (*beamsplitter*), parametrizado por um ângulo $\theta$: atua nos dois modos, sem tocar na polarização. É uma rotação no espaço $\{\ket{A},\ket{B}\}$. Uma versão comum é
$$
\begin{pmatrix}\cos\frac\theta2 & -\sin\frac\theta2\\ \sin\frac\theta2 & \cos\frac\theta2\end{pmatrix}.
$$
Com $\theta=\pi/2$ e um fóton que entra em $A$, sai em superposição igual de $A$ e $B$: é um divisor **50:50** (não é exatamente a porta $H$, que tem outro sinal).
- **Defasador** (*phase shifter*): multiplica por $e^{i\theta}$ a amplitude de **um** dos modos. Atua como uma porta de fase de 1 qubit.
- **Placa de onda** (*wave plate*): atua só na polarização, e realiza, por exemplo, a troca $\ket{H}\leftrightarrow\ket{V}$ (como $X$) ou um Hadamard de polarização.
- **Divisor de feixe polarizador** (PBS): $\ket{H}$ segue no mesmo modo e $\ket{V}$ troca de modo. É a ponte entre os dois codificadores: converte polarização em caminho.
- **Fonte** e **detector**: a fonte idealmente emite um número fixo de fótons (fontes reais são probabilísticas); o detector indica se (e quantos) fótons chegaram.

Fótons são medidos com facilidade: o detector diz se há fóton em certo caminho; para polarização, basta um filtro polarizador antes do detector.

Qual componente converte polarização em caminho?

```exercise:text
id: optica-pbs
answer: PBS|divisor de feixe polarizador|polarizing beamsplitter|beamsplitter polarizador
```

### Exemplo: gerar um estado de Bell com um fóton

Comece com um fóton horizontalmente polarizado no caminho $A$: $\ket{H_A}$. Uma placa de onda tipo Hadamard o leva a $\tfrac{1}{\sqrt2}(\ket{H_A}+\ket{V_A})$. Um PBS troca de caminho apenas o $V$:

$$
\tfrac{1}{\sqrt2}(\ket{H_A}+\ket{V_B}) = \tfrac{1}{\sqrt2}(\ket{00}+\ket{11}).
$$

É um estado de Bell, com um único fóton e dois componentes. O emaranhamento é entre **duas propriedades** do mesmo fóton, não entre dois fótons.

<!-- ILUSTRAR: circuito óptico: fonte → placa de onda (Hadamard) → PBS → saída em A e B, com os termos H_A e V_B sendo separados pelo PBS -->

## Portas de 1 qubit são fáceis

Com um qubit codificado em dois modos, os divisores de feixe e defasadores produzem **qualquer** unitária 2×2: o divisor controla o "quanto de cada modo" e o defasador controla a fase relativa. Para um fóton que entra em $A$ e passa por um divisor com $\theta = \pi$, a probabilidade de sair em $B$ é...

```exercise:number
id: optica-prob-saida
answer: 1
tolerance: 0.001
```

Implemente um divisor de feixe sobre as amplitudes $(a_A, a_B)$ de um fóton nos modos $A$ e $B$, com a matriz de rotação acima.

```exercise:python
id: optica-divisor
input: estado | np.ndarray | amplitudes [a_A, a_B] do fóton nos modos A e B, formato (2,) | np.array([1, 0])
input: theta | float | ângulo do divisor em radianos | 1.5707963267948966
output: divisor_de_feixe | np.ndarray | amplitudes após o divisor, formato (2,) | np.array([0.7071067811865476, 0.7071067811865476])
---
import numpy as np

def divisor_de_feixe(estado, theta):
    return estado
---
>>> divisor_de_feixe(np.array([1, 0]), np.pi / 2)
np.array([0.7071067811865476, 0.7071067811865476])
---
>>> divisor_de_feixe(np.array([1, 0]), np.pi)
np.array([0, 1])
---
>>> divisor_de_feixe(np.array([0.6, 0.8]), np.pi / 2)
np.array([-0.1414213562373095, 0.98994949366116654])
```

## Escalar com um fóton: modos demais

Um fóton em $n$ modos tem $n$ amplitudes, e uma rede de divisores e defasadores realiza qualquer unitária $n\times n$. Daí dá para simular $k$ qubits com $2^k$ modos, um por estado de base: o fóton no modo $w_j$ representa o $j$-ésimo estado de base. Uma CNOT, nesse esquema, é apenas uma **permutação de modos** (troca dois fios); o custo está nos $2^k$ modos. Já com **um fóton por qubit** (o caso escalável), a CNOT é difícil, como veremos.

Quantos modos são necessários para 3 qubits nessa codificação "um modo por estado de base"?

```exercise:number
id: optica-modos
answer: 8
```

O custo cresce exponencialmente, então o esquema não escala. A saída é usar **vários fótons**, contendo em cada modo quantos fótons houver. Os fótons são indistinguíveis, então o estado se descreve por contagens, como $\ket{1,1}$ (um em cada modo) ou $\ket{2,0}$ (dois no primeiro).

## Por que 2 qubits são difíceis

Fótons não se enxergam: duas ondas de luz se atravessam sem se alterar. Um componente linear sozinho não faz um fóton "condicionar" o outro, que é o que uma porta de 2 qubits precisa. O que existe é **interferência** entre fótons indistinguíveis. Um exemplo: se um fóton entra em cada porta de um divisor 50:50, o estado $\ket{1,1}$ vai para (a menos de sinal global, que depende da convenção do divisor)

$$
\tfrac{1}{\sqrt2}\big(\ket{2,0}-\ket{0,2}\big),
$$

e o termo $\ket{1,1}$ **some**. Conta dos 4 caminhos, com o divisor $\begin{pmatrix}c&-s\\s&c\end{pmatrix}$ e $c=s=\tfrac{1}{\sqrt2}$ (entrada 1 vai à saída 1 com $c$ e à saída 2 com $s$; entrada 2 vai à saída 1 com $-s$ e à saída 2 com $c$): (a) os dois fótons vão à saída 1; (b) os dois vão à saída 2; (c) o fóton 1 fica na saída 1 e o 2 na saída 2, amplitude $c\cdot c=\tfrac12$; (d) os dois trocam, amplitude $s\cdot(-s)=-\tfrac12$. Como os fótons são indistinguíveis, (c) e (d) levam ao **mesmo** estado $\ket{1,1}$ e as amplitudes se somam: $\tfrac12-\tfrac12=0$. Os dois fótons saem juntos, pelo mesmo lado. Vale para qualquer divisor 50:50. É interferência, mas ainda não é uma porta controlada completa.

Com dois fótons incidindo um em cada porta de um divisor 50:50, qual a probabilidade de saírem separados, um em cada modo?

```exercise:number
id: optica-hom
answer: 0
tolerance: 0.001
```

E qual a probabilidade de os dois fótons saírem juntos, ambos na saída 1?

```exercise:number
id: optica-hom-juntos
answer: 0.5
tolerance: 0.001
```

<!-- ILUSTRAR: divisor 50:50 com dois fótons entrando; os dois caminhos que levam a |1,1⟩ desenhados com amplitudes +1/2 e −1/2 e um sinal de cancelamento; ao lado, os dois resultados possíveis |2,0⟩ e |0,2⟩, cada um com probabilidade 1/2 -->

## Medição como recurso e fusão

Como as portas de 2 qubits não saem só de componentes lineares, usamos **medições** como parte do cálculo, ideia próxima da aula de MBQC:

1. prepara-se (de modo probabilístico) pequenos estados de grafo ou de Bell;
2. combinam-se pedaços com uma operação de **fusão** (Browne & Rudolph, 2005): dois fótons, um de cada pedaço, passam por um divisor/PBS e são detectados. Se a detecção dá certo (probabilidade $\tfrac12$ no esquema básico), os dois pedaços viram **um único estado de grafo maior** e os fótons medidos saem do grafo. Por exemplo, na fusão "tipo I" os dois nós fundidos viram um só: cadeias de $n$ e $m$ nós dão uma de $n+m-1$. Se falha, perde-se um pedaço, mas o resto se aproveita ou se repete;
3. com estados de grafo grandes, a computação segue por medidas e correções clássicas.

A fusão é probabilística, mas pode ser repetida e é "cara" em número de fótons. Mesmo assim, é um caminho para fazer porta de 2 qubits sem interação direta entre fótons.

<!-- ILUSTRAR: duas cadeias pequenas (2 nós cada), um nó de cada uma entrando num quadro de "fusão" (divisor + dois detectores); depois, a cadeia fundida com 3 nós (n+m−1), marcando que o nó fundido sai do grafo, com um sinal de "sucesso" e outro de "falha" -->

Na fusão tipo I, uma cadeia de 3 nós e uma de 4 nós são fundidas. Quantos nós tem a cadeia resultante?

```exercise:number
id: optica-fusao
answer: 6
```

> Fonte: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seções 4.6 e 4.9; fusão: D. Browne e T. Rudolph, *Resource-efficient linear optical quantum computation*, Phys. Rev. Lett. 95, 010501 (2005). Exposição e exemplos reescritos.
