Em um computador quântico com correção de erros, nem todas as portas custam o mesmo. Algumas saem quase de graça; outras precisam de uma fábrica inteira por trás. Esta aula mostra qual é a porta cara, por que ela é cara e como se compra uma porta T usando um recurso especial: o **estado mágico**.

## Por que Clifford não basta

Chamamos de **portas de Clifford** o grupo gerado por $H$, $S$ e CNOT (e, portanto, $X$, $Y$, $Z$ e $C\text{-}Z$). Elas têm uma propriedade bonita: levam $X$, $Y$, $Z$ em $X$, $Y$, $Z$ (a menos de sinal), e por isso um computador clássico consegue simulá-las com eficiência. Logo, um circuito feito **só** de Clifford não dá vantagem quântica.

Para ter computação universal falta uma porta de fora do grupo. A mais usada é a porta $T$:

$$
T = \begin{pmatrix} 1 & 0 \\ 0 & e^{i\pi/4} \end{pmatrix}.
$$

Ela é uma rotação de fase no $\ket{1}$. Dois $T$ seguidos dão a porta $S$, que dá $90^\circ$ de fase. Quantos graus de fase relativa o $T$ dá ao $\ket{1}$?

```exercise:number
id: magicos-fase-t
answer: 45
tolerance: 0.001
```

Um **código corretor de erros** guarda 1 qubit **lógico** em muitos qubits físicos, para que erros pequenos possam ser detectados e desfeitos; só algumas portas são fáceis de aplicar sem estragar essa proteção (isso se chama ser *tolerante a falhas*). Em muitos códigos de correção de erros, como o código de superfície, as portas de Clifford têm implementações tolerantes a falhas relativamente baratas. O $T$ **não**: no nível lógico ele não é nativo. Em vez de aplicá-lo, vamos *fabricar* o efeito dele.

## O estado mágico

Em vez de uma porta, preparamos um estado já "carregado" com a fase que a rotação daria:

$$
\ket{A_\theta} = \tfrac{1}{\sqrt2}\big(\ket{0} + e^{i\theta}\ket{1}\big).
$$

Para $\theta = \pi/4$ esse é o estado mágico do $T$: é o que se obtém aplicando $T$ em $\ket{+}$. Preparar esses estados é a parte cara, feita à parte com protocolos de purificação (a "fábrica"). Uma vez que se tem uma cópia, ela é consumida para realizar a rotação em qualquer qubit de dados.

<!-- ILUSTRAR: esfera de Bloch com o estado mágico |A_pi/4⟩ no equador, a 45 graus de |+⟩ em direção a |+i⟩, e uma seta curva mostrando que T leva |+⟩ até ele -->

## Injetando a porta: o circuito, passo a passo

Seja $\ket{\phi} = \alpha\ket{0} + \beta\ket{1}$ o qubit de dados e $\ket{A_\theta}$ o estado mágico. Começamos com os dois juntos:

$$
\ket{\phi}\otimes\ket{A_\theta} = \tfrac{1}{\sqrt2}\big(\alpha\ket{00} + \alpha e^{i\theta}\ket{01} + \beta\ket{10} + \beta e^{i\theta}\ket{11}\big).
$$

**Passo 1.** Aplicamos um CNOT com controle no qubit de dados e alvo no mágico. Quando o dado vale $1$, o mágico é invertido:

$$
\tfrac{1}{\sqrt2}\big(\alpha\ket{0}(\ket{0} + e^{i\theta}\ket{1}) + \beta\ket{1}(\ket{1} + e^{i\theta}\ket{0})\big).
$$

**Passo 2.** Medimos o qubit mágico na base padrão. Agrupe os termos por resultado:

- resultado $0$: sobra $\alpha\ket{0} + \beta e^{i\theta}\ket{1}$, que é exatamente $R_\theta\ket{\phi}$, a rotação desejada;
- resultado $1$: sobra $\alpha e^{i\theta}\ket{0} + \beta\ket{1}$, que, a menos de fase global, é $\alpha\ket{0} + \beta e^{-i\theta}\ket{1}$: a rotação **ao contrário**.

Pense nos pesos dos dois grupos de termos. Qual a probabilidade de medir $0$ no qubit mágico (a mesma para qualquer $\ket{\phi}$)?

```exercise:number
id: magicos-prob
answer: 0.5
tolerance: 0.001
```

Os dois grupos têm o mesmo peso, $\tfrac12$ cada.

**Passo 3: correção.** No caso $1$ temos $R_{-\theta}$ e queremos $R_{\theta}$: falta aplicar $R_{2\theta}$. Para o estado mágico do $T$, $\theta = 45^\circ$, então a correção é uma rotação de ângulo $2\theta$, que é a porta $S$, de Clifford e portanto barata! Esse é o truque: a parte cara foi empurrada para a preparação do estado, e o que acontece no circuito é só Clifford, uma medida e uma correção condicionada ao resultado clássico.

Qual rotação $R_{2\theta}$ (em graus) corrige o resultado $1$ quando $\theta = 45^\circ$?

```exercise:number
id: magicos-correcao
answer: 90
tolerance: 0.001
```

Essa rotação de $90^\circ$ é a porta $S$.

<!-- ILUSTRAR: circuito do gadget de injeção: linha do dado |φ⟩ e linha do |A_theta⟩; CNOT do dado para o mágico; medida do mágico; fio clássico levando o resultado a uma porta S condicional na linha do dado; saída T|φ⟩ -->

## Voltando ao código

Vamos implementar a etapa de correção para o $T$. A função recebe o estado do dado logo após a medida e o resultado $m$. Se $m=0$ não há nada a fazer. Se $m=1$, aplique $S$ e depois multiplique o estado por $e^{-i\pi/4}$ (um ajuste de fase global, que não muda nada fisicamente, apenas faz o resultado coincidir exatamente com $T\ket{\phi}$ nos testes).

```exercise:python
id: magicos-injecao-t
input: estado | np.ndarray | estado do qubit de dados após a medida do mágico, formato (2,), complexo | np.array([1, np.exp(1j*np.pi/4)]) / np.sqrt(2)
input: m | int | resultado da medida do qubit mágico (0 ou 1) | 0
output: corrigir_t | np.ndarray | estado igual a T|φ⟩ (com a fase global ajustada), formato (2,) | np.array([1, np.exp(1j*np.pi/4)]) / np.sqrt(2)
---
import numpy as np

def corrigir_t(estado, m):
    return estado
---
>>> corrigir_t(np.array([1, np.exp(1j*np.pi/4)]) / np.sqrt(2), 0)
np.array([0.7071067811865476, 0.5+0.5j])
---
>>> corrigir_t(np.array([np.exp(1j*np.pi/4), 1]) / np.sqrt(2), 1)
np.array([0.7071067811865476, 0.5+0.5j])
---
>>> corrigir_t(np.array([0.6*np.exp(1j*np.pi/4), 0.8]), 1)
np.array([0.6, 0.8*np.exp(1j*np.pi/4)])
```

## Resultado probabilístico e repetição

No gadget acima, o resultado $1$ para $\theta=\pi/4$ pode ser corrigido com $S$, então o $T$ sai determinístico. Para um ângulo geral, a correção $R_{2\theta}$ pode não ser Clifford. Aí o esquema vira *repetir até dar certo*. Se cada nova tentativa usa um estado $\ket{A_\theta}$ igual, o ângulo acumulado no $\ket{1}$ é $(n_0-n_1)\theta$, onde $n_0$ e $n_1$ contam os resultados $0$ e $1$: um passeio aleatório. Para quando $n_0=n_1+1$ (o ângulo é exatamente $\theta$). Esse passeio termina com probabilidade $1$, mas o número médio de rodadas é infinito. Uma alternativa usual: após uma falha, injetar $\ket{A_{2\theta}}$ (o ângulo que corrige o erro), depois $\ket{A_{4\theta}}$ se falhar de novo, e assim por diante, o que dá em média 2 rodadas.

Esse padrão exige que o coprocessador tenha algum controle clássico próprio (repetir um trecho de circuito, fazer contas simples): enviar cada resultado ao computador clássico demoraria demais.

## Por que isso ajuda na correção de erros

Em um código corretor, o que é barato é o que age "pouco" sobre os qubits protegidos: as portas de Clifford podem ser feitas de modo que um erro físico não se espalhe de forma perigosa. Uma porta $T$ lógica diretamente aplicada não tem essa proteção. Com estados mágicos:

1. as portas de Clifford e as medidas são feitas no código, baratas e protegidas;
2. a única coisa não-Clifford é o **recurso** $\ket{A_\theta}$, preparado à parte e **verificado e purificado** antes de ser usado (se um estado sair ruim, é descartado, sem tocar nos dados);
3. o custo de um algoritmo se mede em quantos estados mágicos (portas $T$) ele consome. É por isso que o "T-count" é a métrica central do hardware tolerante a falhas.

Um circuito só de Clifford pode ser simulado com eficiência por qual tipo de computador (uma palavra)?

```exercise:text
id: magicos-clifford-simulavel
answer: clássico|classico
```

> Fonte: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 4.5. Exposição e exemplos reescritos.
