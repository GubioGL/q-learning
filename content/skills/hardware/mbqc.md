Um computador quântico normal funciona assim: prepara os qubits, aplica portas, mede no fim. A **computação baseada em medidas** (MBQC, do inglês *measurement-based quantum computation*) inverte o papel: os qubits já começam todos emaranhados num grande estado fixo, e a computação consiste **apenas em medir**, um qubit por vez, escolhendo como medir. Esta aula mostra como isso é possível.

## Estados de grafo

Um **grafo** é um conjunto de nós ligados por arestas. Um **estado de grafo** (ou de *cluster*) associa a cada nó um qubit e é construído assim:

1. todo qubit começa em $\ket{+} = \tfrac{1}{\sqrt2}(\ket{0}+\ket{1})$;
2. para cada aresta entre dois nós, aplica-se uma porta $C\text{-}Z$ aos dois qubits correspondentes.

Lembre que $C\text{-}Z$ troca o sinal só do termo $\ket{11}$. A ordem das $C\text{-}Z$ não importa, pois todas são diagonais. Para um grafo em cadeia com 4 nós (1–2, 2–3, 3–4), quantas portas $C\text{-}Z$ são aplicadas?

```exercise:number
id: mbqc-arestas
answer: 3
```

<!-- ILUSTRAR: grafo em cadeia de 4 nós ao lado do circuito equivalente: quatro linhas |+⟩ com C-Z entre as linhas 1-2, 2-3 e 3-4 -->

## Um exemplo mínimo: dois qubits

Vamos computar com o menor grafo possível: dois nós ligados. O primeiro qubit guarda o dado $\ket{\psi} = \alpha\ket{0}+\beta\ket{1}$; o segundo é um $\ket{+}$ novo.

Estado inicial e depois da $C\text{-}Z$:

$$
\ket{\psi}\otimes\ket{+} = \tfrac{1}{\sqrt2}\big(\alpha\ket{00}+\alpha\ket{01}+\beta\ket{10}+\beta\ket{11}\big)
\;\xrightarrow{C\text{-}Z}\;
\tfrac{1}{\sqrt2}\big(\alpha\ket{00}+\alpha\ket{01}+\beta\ket{10}-\beta\ket{11}\big).
$$

Agora medimos **só o primeiro qubit**, mas não na base padrão. Usamos uma **base rotacionada** com ângulo $\theta$:

$$
\ket{+_\theta} = \tfrac{1}{\sqrt2}(\ket{0}+e^{i\theta}\ket{1}), \qquad
\ket{-_\theta} = \tfrac{1}{\sqrt2}(\ket{0}-e^{i\theta}\ket{1}).
$$

(Com $\theta=0$ é a base $\ket{\pm}$ usual.) Projetar o primeiro qubit em $\ket{+_\theta}$ significa multiplicar pelo bra $\bra{+_\theta} = \tfrac{1}{\sqrt2}(\bra{0}+e^{-i\theta}\bra{1})$. Os termos com primeiro qubit $0$ ficam como estão, e os com $1$ ganham o fator $e^{-i\theta}$. O segundo qubit fica com:

$$
\ket{\text{saída}} \propto (\alpha + \beta e^{-i\theta})\ket{0} + (\alpha - \beta e^{-i\theta})\ket{1}.
$$

Isto é, normalizando, $\tfrac{1}{\sqrt2}\begin{pmatrix}\alpha+\beta e^{-i\theta}\\ \alpha-\beta e^{-i\theta}\end{pmatrix} = H\,R_{-\theta}\ket{\psi}$ com $R_{-\theta}=\mathrm{diag}(1,e^{-i\theta})$. Chamamos essa porta de $J(-\theta)$, onde $J(\alpha)=\tfrac{1}{\sqrt2}\begin{pmatrix}1&e^{i\alpha}\\1&-e^{i\alpha}\end{pmatrix}=H\,R_{\alpha}$. Ou seja: **uma medida** em um ângulo escolhido por nós aplicou uma porta de 1 qubit ao dado e o **transportou** do qubit 1 para o qubit 2.

Se o resultado for $\ket{-_\theta}$ (resultado $b=1$), o sinal dos termos muda: o segundo qubit fica com $(\alpha-\beta e^{-i\theta})\ket{0}+(\alpha+\beta e^{-i\theta})\ket{1}$, que é o anterior com $\ket{0}$ e $\ket{1}$ trocados, isto é, passado por $X$.

## Correções clássicas

O resultado $b$ da medida é aleatório (cada um com probabilidade $\tfrac12$). Para que a computação seja determinística, aplicamos $X^b$ no qubit de saída: se $b=1$ aplicamos $X$, se $b=0$ nada. É a mesma ideia do teletransporte: o resultado clássico diz qual Pauli aplicar para desfazer o desvio.

Quando o resultado é $b=1$, qual porta de Pauli corrige?

```exercise:text
id: mbqc-correcao
answer: X|porta X|x
```

Com $\theta = 0$ o padrão calcula $H$. Quantos qubits (nós) usa o padrão que implementa a sequência $H$ no alvo, $C\text{-}Z$, $H$ no alvo (que equivale a um CNOT) sobre 2 qubits de entrada, se cada $H$ gasta um nó novo de saída?

```exercise:number
id: mbqc-cnot-nos
answer: 4
```


<!-- ILUSTRAR: cadeia 1-2 no estado de grafo; o nó 1 recebe a seta "medir em base |±θ⟩"; um fio clássico leva b até uma caixa X^b no nó 2, e o dado "caminha" do nó 1 para o nó 2 -->

## Qual porta cada padrão faz?

Mais geralmente, em MBQC um **padrão** tem entradas, saídas e uma lista de instruções: criar arestas ($C\text{-}Z$), medir um nó em um ângulo, e aplicar $X$ ou $Z$ condicionados a resultados anteriores (chamados *sinais*). As regras de validade são simples: um qubit medido não pode ser usado depois, e um sinal só pode ser usado depois de emitido. As ordens e ângulos de medida podem depender de resultados anteriores: o ângulo de uma medida pode ser trocado de $\theta$ para $-\theta$ conforme um sinal, por exemplo. Exemplo: se um resultado anterior foi $1$, um $X$ pendente antes desta medida inverte o sinal da fase, e então medimos em $-\theta$ em vez de $\theta$, o que dispensa aplicar o $X$.

A porta de 1 qubit calculada pelo padrão acima, $J(-\theta)=H R_{-\theta}$, junto com $C\text{-}Z$, forma um conjunto **universal**. Logo, toda a computação quântica pode ser feita assim: um estado de grafo suficientemente grande, medidas em ângulos bem escolhidos e correções clássicas.

Implemente o passo de um nó: dado o dado $\ket\psi$ (vetor de 2 amplitudes), o ângulo $\theta$ em radianos e o resultado $b$, construa o estado de 2 qubits $\ket\psi\otimes\ket{+}$, aplique $C\text{-}Z$, projete o primeiro qubit em $\ket{+_\theta}$ (se $b=0$) ou $\ket{-_\theta}$ (se $b=1$), normalize o qubit restante e aplique $X^b$. O resultado deve ser o mesmo para $b=0$ e $b=1$.

```exercise:python
id: mbqc-passo
input: estado | np.ndarray | estado do dado [alfa, beta], normalizado, formato (2,) | np.array([1, 0])
input: theta | float | ângulo de medida em radianos | 0.0
input: b | int | resultado da medida (0 ou 1) | 0
output: passo_mbqc | np.ndarray | estado de saída já corrigido, formato (2,) | np.array([1, 1]) / np.sqrt(2)
---
import numpy as np

def passo_mbqc(estado, theta, b):
    return np.array([0.0, 0.0])
---
>>> passo_mbqc(np.array([1, 0]), 0.0, 0)
np.array([0.7071067811865476, 0.7071067811865476])
---
>>> passo_mbqc(np.array([0, 1]), np.pi / 2, 1)
np.array([-0.7071067811865476j, 0.7071067811865476j])
---
>>> passo_mbqc(np.array([1, 1]) / np.sqrt(2), np.pi / 2, 1)
np.array([0.5-0.5j, 0.5+0.5j])
```

## Computação clássica dentro do coprocessador: reversibilidade

Tanto aqui quanto nos estados mágicos, a máquina precisa de um pouco de controle clássico **dentro** do coprocessador (decidir uma correção, repetir um trecho). Mas atenção ao que isso pode ou não ser. Para o resultado de uma **medida** já guardado em um registrador clássico, qualquer conta é permitida. Já uma computação clássica feita **sobre qubits** (por exemplo, somar dois números em superposição) tem de ser **reversível**, pois toda operação sobre qubits é unitária. É por isso que circuitos clássicos viram portas como Toffoli e CNOT, com *ancillas* para guardar o que seria apagado.

Dentro do coprocessador, a computação clássica aplicada diretamente sobre qubits deve ser...

```exercise:text
id: mbqc-reversivel
answer: reversível|reversivel|reversible
```

> Fonte: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seções 4.6 e 4.7. Exposição e exemplos reescritos.
