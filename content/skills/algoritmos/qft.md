Quase todo algoritmo quântico que dá ganho exponencial esconde, no fim, a mesma pergunta: "que **frequência** tem esse padrão?". A transformada de Fourier responde isso, e a versão quântica faz a conta com muito poucas portas. Aqui você vai construí-la primeiro com números pequenos, depois em geral.

## A transformada de Fourier discreta (DFT)

Um sinal com $N$ amostras é um vetor $x = (x_0,\dots,x_{N-1})$. A DFT troca "valor em cada instante" por "quanto de cada frequência". Ela usa as **raízes da unidade**

$$
\omega = e^{2\pi i/N},
$$

que são $N$ pontos igualmente espaçados no círculo unitário ($\omega^N = 1$). A saída é

$$
y_k = \frac{1}{\sqrt N}\sum_{j=0}^{N-1} \omega^{jk}\, x_j .
$$

Exemplo com $N=4$: aqui $\omega = e^{2\pi i/4} = i$, e as potências são $\omega^0=1,\ \omega^1=i,\ \omega^2=-1,\ \omega^3=-i,\ \omega^4=1,\dots$ (o expoente só importa módulo 4). A matriz $F_{kj}=\omega^{jk}/\sqrt N$ fica

$$
F_4 = \frac12\begin{pmatrix} 1&1&1&1\\ 1&i&-1&-i\\ 1&-1&1&-1\\ 1&-i&-1&i \end{pmatrix}.
$$

Para $N=2$, $\omega=-1$ e $F_2$ é a matriz de Hadamard. Calculada direto, a DFT custa cerca de $N^2$ multiplicações. A **FFT** (transformada rápida) baixa isso para cerca de $N\log N$ separando as posições pares e ímpares: uma DFT de tamanho $N$ vira duas de tamanho $N/2$, e repete-se. Mesmo assim, cresce com $N$.

<!-- ILUSTRAR: círculo unitário com as 8 raízes oitavas da unidade (ω^0..ω^7) numeradas, destacando ω = e^{2πi/8} a 45° e mostrando que ω^8 volta ao 1 -->

Qual é o ângulo (em graus, entre 0 e 360) de $\omega^{jk}$ para $N=8$, $j=3$ e $k=5$? (Dica: $jk=15$ e só vale $jk$ módulo 8.)

```exercise:number
id: qft-angulo-raiz
answer: 315
tolerance: 0.001
```

## A QFT: a mesma conta nas amplitudes

Com $n$ qubits temos $N=2^n$ estados da base. A **transformada de Fourier quântica** (QFT) é a matriz unitária $F$ acima, aplicada ao vetor de amplitudes:

$$
\mathrm{QFT}\ket{j} = \frac{1}{\sqrt N}\sum_{k=0}^{N-1} \omega^{jk}\ket{k}.
$$

Ela é unitária (as colunas são ortonormais), então é uma porta legítima. Para $n=2$, a primeira coluna de $F_4$ diz $\mathrm{QFT}\ket{00} = \tfrac12(\ket{00}+\ket{01}+\ket{10}+\ket{11})$, a superposição uniforme, igual a $H\otimes H\ket{00}$. Qual é a amplitude de cada estado nesse caso?

```exercise:number
id: qft-amplitude-zero
answer: 0.5
tolerance: 0.001
```

Já $\mathrm{QFT}\ket{01}$ é a segunda coluna: $\tfrac12(\ket{00}+i\ket{01}-\ket{10}-i\ket{11})$. Todas as amplitudes têm o mesmo módulo, mas as **fases giram** com uma "frequência" que depende de $j$. Essa é a mensagem central: a QFT leva um número $j$ guardado na base para uma onda de frequência $j$ guardada nas fases.

Atenção: a QFT **não** faz a DFT "de graça" sobre dados clássicos. Ela transforma amplitudes, que não podemos ler todas. Seu valor está em usar o resultado dentro de outro algoritmo.

## O circuito para n = 2, passo a passo

Para $n=2$ escrevemos $j=2j_1+j_2$ (então $j_1$ é o bit mais significativo). Precisamos de uma porta de fase $R_m=\begin{pmatrix}1&0\\0&e^{2\pi i/2^m}\end{pmatrix}$; aqui basta $R_2=S$ (fase $e^{2\pi i/4}=i$). O circuito:

1. $H$ no qubit 1.
2. $S$ no qubit 1, controlada pelo qubit 2.
3. $H$ no qubit 2.
4. SWAP entre os dois qubits.

Veja o que acontece com a entrada $j=1$ (isto é, $j_1=0$, $j_2=1$, estado $\ket{01}$):

- $H$ no qubit 1: $\tfrac1{\sqrt2}(\ket0+\ket1)$, pois $j_1=0$.
- $S$ controlada: o qubit 2 vale 1, então o $\ket1$ do qubit 1 ganha a fase $i$: $\tfrac1{\sqrt2}(\ket0+i\ket1)$.
- $H$ no qubit 2 (que está em $\ket1$): $\tfrac1{\sqrt2}(\ket0-\ket1)$.
- Antes do SWAP, o estado é $\tfrac1{\sqrt2}(\ket0+i\ket1)\otimes\tfrac1{\sqrt2}(\ket0-\ket1)$. Depois do SWAP: $\tfrac12(\ket0-\ket1)(\ket0+i\ket1)=\tfrac12(\ket{00}+i\ket{01}-\ket{10}-i\ket{11})$, a segunda coluna de $F_4$. 

A saída é um **produto** de dois qubits (sem emaranhamento), e cada qubit recebeu uma fase que depende de alguns bits de $j$. Qual é o ângulo (em graus, entre 0 e 360) da amplitude de $\ket{01}$ no estado $\mathrm{QFT}\ket{10}$ (que é $j=2$, a terceira coluna de $F_4$)?

```exercise:number
id: qft-fase-10
answer: 180
tolerance: 0.001
```

## Fração binária e o caso geral

Para generalizar usamos a **fração binária**

$$
0.j_1j_2\cdots j_m = \frac{j_1}{2}+\frac{j_2}{4}+\cdots+\frac{j_m}{2^m}.
$$

Exemplo: $0.101 = \tfrac12+\tfrac18 = 0{,}625$. Para $n=3$ e $j=j_1j_2j_3$, o resultado da QFT é, por extenso,

$$
\mathrm{QFT}\ket{j_1j_2j_3}=\tfrac1{\sqrt8}\big(\ket0+e^{2\pi i\,0.j_3}\ket1\big)\big(\ket0+e^{2\pi i\,0.j_2j_3}\ket1\big)\big(\ket0+e^{2\pi i\,0.j_1j_2j_3}\ket1\big).
$$

Para $n=2$ são os dois últimos fatores, que você viu acima (com $j=1$: $0.j_2=\tfrac12$ e $0.j_1j_2=\tfrac14$). Em geral, o qubit $l$ da saída leva a fase $e^{2\pi i\,0.j_{n-l+1}\cdots j_n}$.

Receita do circuito, qubit a qubit (com $R_m$ de fase $e^{2\pi i/2^m}$; casos conhecidos: $R_1=Z$, $R_2=S$ e $R_3=T$, com fase de 45°):

1. No qubit 1: $H$, depois $R_2$ controlada pelo qubit 2, $R_3$ controlada pelo qubit 3, ..., $R_n$ controlada pelo qubit $n$.
2. No qubit 2: $H$, depois $R_2$ controlada pelo qubit 3, ..., $R_{n-1}$ controlada pelo qubit $n$.
3. Continue até o qubit $n$, que só recebe $H$.
4. No fim, **inverta a ordem** dos qubits com SWAPs: sem isso, o qubit 1 teria a fase $0.j_1\cdots j_n$, mas a fórmula manda a fase $0.j_n$ para ele.

<!-- ILUSTRAR: circuito da QFT para n=3 com três fios; H no q1 seguido de R2 (controle q2) e R3 (controle q3); H no q2 seguido de R2 (controle q3); H no q3; SWAP entre q1 e q3 no final; cada porta controlada com bolinha e caixa de fase -->

<!-- ILUSTRAR: as quatro colunas de F_4 como quatro "ondas": para cada j=0..3, os 4 pontos ω^{jk} (k=0..3) no círculo unitário, mostrando que a frequência de rotação das fases cresce com j -->

Quantas portas controladas $R_m$ o circuito tem para $n$ qubits? O qubit 1 usa $n-1$, o 2 usa $n-2$, e assim por diante: $(n-1)+(n-2)+\cdots+1 = n(n-1)/2$. Quantas para $n=5$?

```exercise:number
id: qft-contagem-controladas
answer: 10
tolerance: 0.001
```

No total são $n$ portas $H$, $n(n-1)/2$ fases controladas e cerca de $n/2$ SWAPs: da ordem de $n^2$ portas, contra os $N\log N = 2^n\,n$ passos da FFT. Esse é o ganho exponencial, com a ressalva de que a saída é um estado quântico.

Se aplicarmos a QFT e depois a QFT inversa a $\ket j$, que estado obtemos?

```exercise:text
id: qft-ida-volta
answer: o mesmo | o mesmo estado | j | ele mesmo | identidade | o mesmo j
```

## QFT inversa

Como $F$ é unitária, a inversa é a adjunta (conjugada transposta). Como $F$ é simétrica, basta conjugar: $F^{-1}_{kj}=\omega^{-jk}/\sqrt N$. No circuito: percorra as portas **de trás para a frente** e troque cada $R_m$ por $R_m^\dagger$ (fase $e^{-2\pi i/2^m}$). A QFT inversa transforma "onda de frequência $j$" de volta em $\ket{j}$, e é por isso que ela aparece no fim da estimação de fase.

## Em Python

Escreva a matriz $F$ de $n$ qubits com NumPy. Dica: `np.outer(k, k)` dá todos os produtos $jk$.

```exercise:python
id: qft-matriz
input: n | int | número de qubits, n >= 1 | 2
output: qft_matriz | np.ndarray | matriz F complexa (2**n, 2**n) com F[k][j] = exp(2πi·j·k/N)/sqrt(N), N = 2**n | np.array([[1, 1, 1, 1], [1, 1j, -1, -1j], [1, -1, 1, -1], [1, -1j, -1, 1j]]) / 2
---
import numpy as np

def qft_matriz(n):
    return np.eye(2 ** n, dtype=complex)
---
>>> qft_matriz(2)
np.array([[1, 1, 1, 1], [1, 1j, -1, -1j], [1, -1, 1, -1], [1, -1j, -1, 1j]]) / 2
---
>>> qft_matriz(1)
np.array([[1, 1], [1, -1]]) / np.sqrt(2)
---
>>> qft_matriz(3)[1]
np.exp(2j * np.pi * np.arange(8) / 8) / np.sqrt(8)
>>> qft_matriz(3)[3][5]
np.exp(2j * np.pi * 15 / 8) / np.sqrt(8)
```

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 5.5.
