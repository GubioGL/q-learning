O somador deixou qubits de vai-um cheios de lixo. Quase todo circuito usa qubits auxiliares assim, e a pergunta é o que fazer com eles no fim. Esta skill junta o que falta: preparar, medir em outras bases, adiar medidas e limpar.

## Ancillas: qubits de rascunho

Uma **ancilla** é um qubit auxiliar que não faz parte da entrada nem da resposta, só ajuda no cálculo, como o rascunho de uma conta. Por convenção ela começa em $\ket{0}$, um estado fácil de preparar e que o circuito pode supor conhecido.

Outros estados iniciais saem de $\ket{0}$ com uma porta: $X$ dá $\ket{1}$ e $H$ dá $\ket{+}$.

Para preparar uma ancilla em $\ket{-}$ a partir de $\ket{0}$, aplicamos duas portas em sequência. Quais são, na ordem de aplicação? (Escreva primeiro a porta aplicada primeiro, com as duas letras juntas, como `ZX` para "Z e depois X".)

```exercise:text
id: reg-ancilla-mais
answer: XH | X H | X,H | X, H | HZ | H Z | H,Z | H, Z | YH | Y H | HY | H Y
```

## Medir só parte do registrador

Você já sabe medir um qubit de um par: somar as probabilidades dos termos compatíveis e renormalizar o que sobra. O ponto novo é o que isso significa com ancillas. Se um registrador $A$ está **emaranhado** com a ancilla, medir a ancilla escolhe também o estado de $A$.

Exemplo: o estado $\tfrac{1}{\sqrt3}\big(\ket{00} + \ket{01} + \ket{10}\big)$, com a ancilla à direita. Medindo a ancilla:

- resultado $0$ (termos $\ket{00}$ e $\ket{10}$): $A$ fica em $\tfrac{1}{\sqrt2}(\ket{0} + \ket{1}) = \ket{+}$;
- resultado $1$ (termo $\ket{01}$): $A$ fica em $\ket{0}$.

Qual é a probabilidade de a ancilla dar $0$? (Duas casas decimais.)

```exercise:number
id: reg-parcial
answer: 0.67
tolerance: 0.01
```

Medir a ancilla mudou o que se sabe sobre $A$ sem encostar em $A$. Guarde isso: é por aí que "lixo" estraga um cálculo.

## Medição adiada

Em muitos circuitos, o resultado de uma medida decide uma porta: "meça o qubit 1; se der $1$, aplique $X$ no qubit 2". O **princípio da medição adiada** diz que isso equivale a trocar a porta condicionada por uma **porta controlada** (aqui, uma CNOT com controle no qubit 1) e medir só no fim.

Teste com $\ket{+}\ket{0}$. De um jeito, medimos o qubit 1 (50% para cada resultado) e, se der $1$, viramos o qubit 2. Do outro, aplicamos a CNOT e medimos os dois no fim. Nos dois, os qubits terminam iguais: $00$ ou $11$, com 50% cada. As estatísticas coincidem.

![Dois circuitos equivalentes: medir o qubit 1 e aplicar X condicionado ao qubit 2, ou usar uma CNOT e medir no fim, com as mesmas probabilidades.](/content/computacao-quantica/medicao-adiada.svg)

Por isso é comum desenhar circuitos com todas as medidas no final.

Agora com números. O qubit 1 está em $0{,}6\ket{0} + 0{,}8\ket{1}$ e o qubit 2 em $\ket{0}$. Medimos o qubit 1 e, se der $1$, aplicamos $X$ no qubit 2 (ou, equivalentemente, uma CNOT e medimos no fim). Qual é a probabilidade de o qubit 2 ser medido $1$?

```exercise:number
id: reg-adiada
answer: 0.64
tolerance: 0.001
```

## Medir em outra base

O hardware só mede na base padrão ($\ket{0}$, $\ket{1}$). Para medir na base $\{\ket{+}, \ket{-}\}$, aplicamos uma porta que **gira** essa base para a padrão e depois medimos como sempre. Para $\ket{\pm}$, a porta é $H$, pois $H\ket{+} = \ket{0}$ e $H\ket{-} = \ket{1}$. Então:

- resultado $0$ depois do $H$ quer dizer "era $\ket{+}$";
- resultado $1$ depois do $H$ quer dizer "era $\ket{-}$".

Em geral, para a base $\{\ket{u_0}, \ket{u_1}\}$ aplica-se a unitária que leva $\ket{u_0} \to \ket{0}$ e $\ket{u_1} \to \ket{1}$. Para a base $\{\ket{+i}, \ket{-i}\}$ (eixo $y$ da esfera de Bloch), vale $\ket{\pm i} = S\,\ket{\pm}$, então a porta é $H S^\dagger$: primeiro $S^\dagger$, depois $H$.

Agora uma conta. O estado $\tfrac{\sqrt3}{2}\ket{0} + \tfrac12\ket{1}$ é medido na base $\{\ket{+}, \ket{-}\}$. Qual é a probabilidade de obter $\ket{+}$? (Três casas decimais.) Dica: aplique $H$ e olhe a amplitude de $\ket{0}$.

```exercise:number
id: reg-base-x
answer: 0.933
tolerance: 0.001
```

## Descartar um qubit

Um circuito unitário não tem "apagar": uma porta que mandasse $\ket{0}$ e $\ket{1}$ para o mesmo estado não seria reversível. **Descartar** um qubit significa só **parar de olhar** para ele. Se ele não está emaranhado com o resto, tudo bem. Se está, o resto se comporta como se ele tivesse sido medido (sem ninguém ler o resultado).

Veja o que isso estraga. Começamos com $\ket{+}$ e aplicamos $H$: dá $\ket{0}$, e medir dá $0$ com certeza. Agora, antes do $H$, copiamos o qubit para uma ancilla com uma CNOT (o "lixo"):

$$
\tfrac{1}{\sqrt2}(\ket{0} + \ket{1})\ket{0} \xrightarrow{\text{CNOT}} \tfrac{1}{\sqrt2}(\ket{00} + \ket{11}) \xrightarrow{H \text{ no 1º}} \tfrac12\big(\ket{0}(\ket{0}+\ket{1}) + \ket{1}(\ket{0}-\ket{1})\big).
$$

Agora o primeiro qubit dá $0$ só com probabilidade $\tfrac12$. A ancilla "sabe" qual dos dois ramos era, e por isso os ramos não interferem mais.

![Sem ancilla, H seguido de H dá 0 com 100%; com uma CNOT copiando para uma ancilla entre os dois H, dá 0 ou 1 com 50% cada.](/content/computacao-quantica/descartar-qubit.svg)

Com a ancilla-lixo, qual é a probabilidade de o primeiro qubit dar $0$ ao final?

```exercise:number
id: reg-lixo
answer: 0.5
tolerance: 0.001
```

## Descomputar

A saída é **desfazer** o que escrevemos no lixo. Calcule o resultado, **copie** o que importa para um registrador novo (com CNOTs), e rode o cálculo **ao contrário**: como Toffoli e CNOT são suas próprias inversas, basta repetir as mesmas portas em ordem inversa. Os vai-um do somador, por exemplo, voltam a $\ket{0}$, e o único resultado que sobra é a cópia.

No exemplo anterior, aplicar a CNOT de novo antes do $H$ devolve a ancilla a $\ket{0}$ e o primeiro qubit a $\ket{+}$, e o $H$ final dá $0$ com probabilidade $1$.

![Três etapas do somador de uma coluna: calcular, copiar s e c_out com duas CNOTs e descomputar com as portas em ordem inversa.](/content/computacao-quantica/descomputar.svg)

Contagem: num somador de 1 coluna, calcular usa 4 portas, copiar $s$ e $c_\text{out}$ usa 2 CNOTs, e descomputar repete as 4 portas ao contrário. Quantas portas no total?

```exercise:number
id: reg-descomputar
answer: 10
```

## Em Python

Escreva a medida parcial: dado um estado de dois qubits com a ancilla (segundo qubit) à direita, calcule a probabilidade de a ancilla dar $0$ e o estado de $A$ depois dessa medida.

```exercise:python
id: reg-codigo-parcial
input: estado | np.ndarray | amplitudes na ordem 00, 01, 10, 11, formato (4,) | np.array([0.5, 0.5, 0, np.sqrt(0.5)])
output: prob_ancilla_zero | float | probabilidade de o 2º qubit dar 0 | 0.25
output: estado_apos_zero | np.ndarray | estado normalizado do 1º qubit se o 2º deu 0, formato (2,) | np.array([1, 0])
---
import numpy as np

def prob_ancilla_zero(estado):
    return 0.0

def estado_apos_zero(estado):
    return np.array([1.0, 0.0])
---
>>> prob_ancilla_zero(np.array([0.5, 0.5, 0, np.sqrt(0.5)]))
0.25
>>> estado_apos_zero(np.array([0.5, 0.5, 0, np.sqrt(0.5)]))
np.array([1, 0])
---
>>> prob_ancilla_zero(np.array([1, 1, 1, 0]) / np.sqrt(3))
2 / 3
>>> estado_apos_zero(np.array([1, 1, 1, 0]) / np.sqrt(3))
np.array([1, 1]) / np.sqrt(2)
---
>>> prob_ancilla_zero(np.array([0, 0.6, 0, 0.8]))
0.0
>>> prob_ancilla_zero(np.array([0.6, 0, 0.8, 0]))
1.0
```

Agora a medida na base $\{\ket{+}, \ket{-}\}$ de um qubit: aplique $H$ e devolva as probabilidades de $+$ e $-$.

```exercise:python
id: reg-codigo-base-x
input: estado | np.ndarray | amplitudes de um qubit, formato (2,) | np.array([1, 0])
output: probs_base_x | np.ndarray | [P(+), P(-)], formato (2,) | np.array([0.5, 0.5])
---
import numpy as np

H = np.array([[1, 1], [1, -1]]) / np.sqrt(2)

def probs_base_x(estado):
    return np.array([1.0, 0.0])
---
>>> probs_base_x(np.array([1, 0]))
np.array([0.5, 0.5])
---
>>> probs_base_x(np.array([1, 1]) / np.sqrt(2))
np.array([1, 0])
---
>>> probs_base_x(np.array([1, -1]) / np.sqrt(2))
np.array([0, 1])
```

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), cap. 3 e 4; T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), seção 4.5.
