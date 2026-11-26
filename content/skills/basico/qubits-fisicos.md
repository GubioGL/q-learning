Até agora tratamos o qubit como um vetor $\alpha\ket{0}+\beta\ket{1}$, pura matemática. Mas alguém precisa **construir** isso: um objeto real, que guarde $\ket{0}$, $\ket{1}$ e superposições, e que a gente consiga controlar e medir. O que serve de qubit? E por que é tão difícil mantê-lo funcionando?

## Qualquer sistema com dois estados

Qualquer sistema físico quântico com dois estados bem distintos pode ser um qubit. Compare com o bit clássico: pode ser uma tensão alta ou baixa num fio, um ímã para cima ou para baixo. Cada tecnologia tem vantagens e desvantagens. No mundo quântico acontece o mesmo:

| Qubit | Os dois estados são... | Como é controlado |
|---|---|---|
| **Supercondutor** | dois níveis de energia de um circuito elétrico resfriado quase ao zero absoluto | pulsos de micro-ondas |
| **Íon aprisionado** | dois níveis de energia de um átomo com carga, preso no vácuo por campos elétricos | lasers (ou micro-ondas) |
| **Átomo neutro** | dois níveis de energia de um átomo sem carga, segurado por feixes de luz | lasers |
| **Fóton** | duas polarizações da luz, por exemplo vertical e horizontal | lâminas de onda e divisores de feixe |

Há também qubits de **spin** (uma propriedade magnética de elétrons e núcleos, "para cima" ou "para baixo"), controlados por pulsos de micro-ondas ou de radiofrequência.

Do ponto de vista da informação, todos guardam o mesmo: dois estados, $\ket{0}$ e $\ket{1}$. Tudo o que vimos sobre a esfera de Bloch vale para qualquer um deles. O que muda é a engenharia.

![Quatro tipos de qubit físico: supercondutor, íon aprisionado, átomo neutro e fóton. Nos três primeiros, |0⟩ é o nível de energia baixo (ponto azul embaixo) e |1⟩ o nível alto (ponto laranja em cima). No fóton, |0⟩ é a polarização vertical e |1⟩ a horizontal.](/content/basico/qubits-fisicos-niveis.svg)

Num qubit de íon aprisionado, $\ket{0}$ e $\ket{1}$ são dois ___ do átomo: níveis de energia ou polarizações?

```exercise:text
id: qf-estados
answer: níveis de energia | niveis de energia | nível de energia | nivel de energia | energia
```

## O que um bom qubit precisa ter

O físico David DiVincenzo listou, em 2000 (*Fortschritte der Physik* 48, 771), requisitos para um computador quântico. Cinco são para **computar**:

1. **Qubits bem definidos e escaláveis**: dois estados distintos e a possibilidade de juntar muitos qubits.
2. **Inicialização**: colocar todos em $\ket{0}$ antes de começar, como zerar um contador.
3. **Coerência longa**: o estado precisa durar muito mais do que uma porta leva para operar (explicamos abaixo).
4. **Portas universais**: um conjunto de operações que, combinadas, produz qualquer cálculo.
5. **Medida**: ler cada qubit individualmente no fim.

Mais dois são para **comunicação**, usados em redes quânticas: converter qubits parados em qubits "voadores" (fótons) e transmiti-los com fidelidade. Se uma tecnologia não consegue ser reinicializada em $\ket{0}$, qual requisito da lista falha?

```exercise:text
id: qf-requisito
answer: inicialização | inicializacao | initialization | 2 | item 2 | requisito 2
```

## Decoerência: o inimigo

Um qubit não vive isolado. Calor, vibrações, campos eletromagnéticos perdidos, tudo interage com ele e bagunça o estado de modo incontrolável. Esse efeito se chama **decoerência**. Para quem programa, é **ruído**: o qubit que devia estar em $\ket{+}$ vai se desfazendo, e a conta sai errada.

A informação não some de uma vez: ela **decai** aos poucos. O **tempo de coerência** é a escala desse decaimento. Cada porta leva um tempo curto. A razão dá uma **ordem de grandeza** do teto de portas que cabem antes de a informação se degradar:

$$
\text{portas possíveis} \lesssim \frac{\text{tempo de coerência}}{\text{duração de uma porta}}.
$$

Exemplo: coerência de $100\ \mu\text{s}$ e portas de $50\ \text{ns}$. Como $100\ \mu\text{s} = 100\,000\ \text{ns}$, o teto é $100\,000/50$ portas. Quantas?

```exercise:number
id: qf-operacoes
answer: 2000
```

![À esquerda, o vetor de estado na esfera de Bloch encolhe para dentro da esfera nos instantes t1, t2, t3 (decoerência). À direita, uma barra de duração T2 no eixo do tempo t contém cinco quadradinhos, as portas que cabem antes de o estado se perder.](/content/basico/qubits-fisicos-decaimento.svg)

## Erros se acumulam

Mesmo dentro do tempo de coerência, cada porta erra de vez em quando. Suponha que cada porta erra com a mesma probabilidade $p$, de modo independente das outras. Com $n$ portas, a chance de **nenhuma** errar é

$$
P(\text{sucesso}) = (1-p)^n.
$$

Exemplo: $p=0{,}1$ e $n=2$: $0{,}9\times 0{,}9 = 0{,}81$. Agora de cabeça: $p=0{,}5$ e $n=3$. Qual é a chance de sucesso?

```exercise:number
id: qf-sucesso-p05
answer: 0.125
tolerance: 0.001
```

Para $p$ pequeno vale $(1-p)^n \approx e^{-pn}$. Com $p=0{,}001$ e $n=1000$, $pn=1$ e $e^{-1}\approx 0{,}37$: só 37% de chance de nenhuma porta errar, mesmo com erro de uma em mil! Por isso se trabalha em qubits melhores e em **correção de erros**, que junta muitos qubits físicos para formar um qubit lógico mais estável.

Qual é a chance de sucesso com $p=0{,}001$ e $n=1000$? (Valor entre 0 e 1.)

```exercise:number
id: qf-sucesso
answer: 0.368
tolerance: 0.01
```

## Escala hoje

Os maiores processadores atuais têm de centenas a alguns milhares de qubits físicos, todos ruidosos; o número de qubits sozinho não mede o desempenho (importam também os erros e as conexões). O termo **NISQ** (*Noisy Intermediate-Scale Quantum*), cunhado por John Preskill em 2018, descreve máquinas de dezenas a centenas de qubits ruidosos, ainda sem correção de erros em grande escala. O objetivo é chegar a muitos qubits lógicos estáveis.

Outra limitação é a conectividade. Em chips supercondutores, as portas entre dois qubits costumam funcionar só entre vizinhos, ligados por um mapa de conexões. Em íons aprisionados, em geral todos conversam com todos, e átomos neutros podem ser movidos de lugar. Quando o circuito pede uma porta entre qubits não vizinhos, ele é reescrito com operações de troca (SWAP) que levam os qubits para perto.

## Em Python

Escreva uma função que calcula a probabilidade de sucesso. Use exatamente `(1 - p_erro) ** n` (sem arredondar).

```exercise:python
id: qf-prob-sucesso
input: p_erro, n | float, int | probabilidade de erro por porta (entre 0 e 1) e número de portas | 0.1, 2
output: prob_sucesso | float | probabilidade de nenhuma porta errar, (1 - p_erro) ** n | 0.81
---
def prob_sucesso(p_erro, n):
    return 0.0
---
>>> prob_sucesso(0, 50)
1.0
---
>>> prob_sucesso(0.5, 3)
0.125
>>> prob_sucesso(0.1, 2)
0.81
---
>>> prob_sucesso(0.001, 1000)
0.36769542477096373
>>> prob_sucesso(0.01, 100)
0.3660323412732292
>>> prob_sucesso(1, 4)
0.0
```

> Fontes: T. G. Wong, *Introduction to Classical and Quantum Computing*, seção 2.5 (Physical Qubits); B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 4.8 (A Word on Hardware); D. P. DiVincenzo, "The Physical Implementation of Quantum Computation", *Fortschr. Phys.* 48, 771 (2000); J. Preskill, "Quantum Computing in the NISQ era and beyond", *Quantum* 2, 79 (2018).
