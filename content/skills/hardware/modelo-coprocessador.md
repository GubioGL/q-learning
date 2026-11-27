Quando você roda um programa em Python, ele não acontece dentro do computador quântico. Seu notebook (a CPU clássica) escreve a lista de instruções, manda para um chip quântico e depois recebe de volta uma sequência de zeros e uns. Esta skill mostra esse arranjo, chamado **modelo de coprocessador**, e o que ele permite e proíbe.

## Coprocessador: um ajudante com memória própria

Um **coprocessador** é um circuito especializado que obedece ao processador principal para uma tarefa específica. Uma placa de vídeo (GPU), por exemplo, faz contas com matrizes muito rápido. Três características se repetem:

1. Ele tem **memória própria**, separada da memória do computador.
2. As operações que ele sabe fazer atuam nessa memória local.
3. O uso típico tem três passos: **reservar e inicializar** a memória, **agir** sobre ela, **ler** o resultado e liberar a memória.

Um computador quântico segue o mesmo molde. A **QPU** (do inglês *quantum processing unit*, a unidade de processamento quântico) é o coprocessador, e sua memória é feita de qubits.

![A CPU clássica envia instruções de portas e medidas à QPU e recebe de volta apenas bits medidos; as amplitudes não voltam.](/content/hardware/coprocessador-cpu-qpu.svg)

Quantas amplitudes de um estado de 3 qubits a CPU consegue ler diretamente da QPU numa rodada? Responda com um número.

```exercise:number
id: copro-sigla-qpu
answer: 0
```

## O fluxo de uma execução

Pense num programa que sorteia um bit usando um qubit.

1. **Preparar**: a CPU pede um qubit e ele começa em $\ket{0}$.
2. **Aplicar portas**: a CPU manda a instrução "Hadamard". O qubit passa a $\tfrac{1}{\sqrt2}(\ket{0}+\ket{1})$.
3. **Medir**: a CPU manda medir. O qubit vira $\ket{0}$ ou $\ket{1}$, com 50% de chance cada.
4. **Ler**: o resultado volta à CPU como um **bit clássico**, e a CPU decide o que fazer em seguida.

Com $n$ qubits, o passo 2 é uma sequência de portas, e o passo 3 devolve $n$ bits. Quem controla tudo, inclusive o "se isso, faça aquilo", é a CPU.

Em quantos dos quatro passos acima um dado viaja da QPU para a CPU?

```exercise:number
id: copro-passos-leitura
answer: 1
```

## O que se pode e o que não se pode fazer com a memória quântica

Aqui está a diferença para uma memória comum. Numa RAM você pode olhar qualquer posição, copiar e escrever por cima. Na memória quântica:

| Operação | Pode? | Motivo |
|----------|-------|--------|
| Inicializar num estado de base ($\ket{0}$) | sim | é o passo 1 do fluxo |
| Aplicar portas (operações unitárias) | sim | é o que o hardware oferece |
| Medir e receber bits | sim | única saída para o mundo clássico |
| Ler as amplitudes $\alpha,\beta$ diretamente | **não** | a medida só entrega um bit; as amplitudes ficam escondidas |
| Copiar um estado desconhecido | **não** | teorema da não-clonagem |
| Medir um estado desconhecido sem, em geral, alterá-lo | **não** | a medida colapsa a superposição (só um estado já de base, como $\ket{0}$, passa ileso) |
| Aplicar qualquer unitária arbitrária numa instrução | **não** | só um conjunto pequeno de portas é nativo (veja `portas-nativas`) |

Por isso um circuito quântico não "imprime" seu estado: ele é rodado muitas vezes (cada rodada se chama **shot**) e a CPU junta as estatísticas dos bits obtidos.

Você recebe um qubit que está em $\ket{0}$ ou em $\ket{+}$ e pode medi-lo **uma única vez** na base padrão. Essa medida distingue os dois casos com certeza? Responda `sim` ou `nao`. (Dica: $\ket{0}$ dá sempre 0; $\ket{+}$ dá 0 com chance 50%.)

```exercise:text
id: copro-distinguir
answer: nao | não
```

Você roda 3 shots do circuito que mede $\ket{+}$. Qual é a probabilidade de os três resultados serem 0?

```exercise:number
id: copro-tres-zeros
answer: 0.125
tolerance: 0.0001
```

## Um circuito é um programa

Até aqui, "circuito" parecia um desenho. No modelo de coprocessador, ele é literalmente um **programa**: uma lista de instruções, uma por porta, na ordem em que a CPU as envia. O circuito

$$
\ket{0} \xrightarrow{H} \xrightarrow{Z} \xrightarrow{H} \;\to\; \text{medir}
$$

é o programa "inicialize, aplique H, aplique Z, aplique H, meça". Como em qualquer programa, você pode nomear pedaços (sub-circuitos), repeti-los e gerar um circuito por meio de código. O programa clássico em volta pode, por exemplo, escolher qual circuito enviar com base em um bit medido antes.

Como $HZH = X$, medir esse circuito dá sempre 1. Qual é o nome da primeira porta que a CPU envia à QPU depois da inicialização?

```exercise:text
id: copro-primeira-porta
answer: H | Hadamard | h
```

## Na prática: simulando a chamada

A QPU entrega probabilidades de medida, que vêm das amplitudes pela regra de Born. Escreva uma função que simula o fluxo "inicializar em $\ket{0}$, aplicar uma porta $U$ de 1 qubit, medir" e devolve a chance de obter 1.

```exercise:python
id: copro-prob-um
input: U | np.array | matriz unitária 2x2 (shape (2, 2)) | np.array([[0, 1], [1, 0]])
output: prob_um | float | probabilidade de medir 1 depois de aplicar U a |0⟩ | 1.0
---
import numpy as np

def prob_um(U):
    # estado inicial |0>, como vetor de shape (2,)
    return 0.0
---
>>> prob_um(np.array([[0, 1], [1, 0]]))
1.0
---
>>> prob_um(np.array([[1, 1], [1, -1]]) / np.sqrt(2))
0.5
---
>>> prob_um(np.array([[1, 0], [0, -1]]))
0.0
```

### Resumo

- A CPU clássica controla; a QPU guarda qubits e executa portas e medidas.
- O fluxo é: preparar, aplicar portas, medir, ler bits.
- Só o resultado das medidas sai da QPU; não se leem amplitudes nem se copiam estados.
- Um circuito é um programa: uma lista de instruções gerada e enviada pela CPU.

Você roda 10 shots de um circuito de 5 qubits, medindo todos no fim de cada shot. Quantos bits clássicos chegam à CPU no total?

```exercise:number
id: copro-resumo-bits
answer: 50
```

Fonte: ideias do modelo de coprocessador seguem B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 3.1. Texto e exemplos originais.
