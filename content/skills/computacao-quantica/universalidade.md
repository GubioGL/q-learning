A NAND basta para qualquer cálculo clássico. Existe um conjunto pequeno de portas que baste para qualquer cálculo **quântico**?

## Universal, mas aproximado

Há infinitas unitárias, então um conjunto finito de portas não pode gerar todas com exatidão. Pedimos algo mais modesto: um conjunto é **universal** se consegue **aproximar** qualquer unitária com a precisão que quisermos.

## O que um conjunto universal precisa ter

- criar **superposição** (X, Z e CNOT sozinhas não conseguem);
- criar **emaranhamento** (só portas de 1 qubit não conseguem);
- usar amplitudes **complexas** (H e CNOT só produzem números reais);
- ir além do **grupo de Clifford**.

Qual destas capacidades falta ao conjunto com todas as portas de **1 qubit**? Responda `superposição` ou `emaranhamento`.

```exercise:text
id: universal-falta
answer: emaranhamento
```

## O grupo de Clifford

H, S e CNOT geram o **grupo de Clifford**. Elas criam superposição, emaranhamento e números complexos, e mesmo assim **não** são universais. O **teorema de Gottesman–Knill** diz que circuitos só com essas portas, entrada na base padrão e medidas na base Z podem ser simulados com eficiência num computador clássico.

Acrescentando a porta T, tudo muda: $\{H, T, \text{CNOT}\}$ é universal.

![Conjunto Clifford mais T é universal](/content/computacao-quantica/universalidade.svg)

Não é preciso listar a S, pois ela se obtém com portas T. Quantas?

```exercise:number
id: universal-s
answer: 2
```

## Quanto custa aproximar

O **teorema de Solovay–Kitaev** garante que aproximar uma porta de 1 qubit com erro $\varepsilon$ exige um número de portas que cresce só como uma potência de $\log(1/\varepsilon)$. Melhorar muito a precisão custa pouco.

Em computadores com correção de erros, as portas de Clifford costumam ser baratas e a T, cara. Por isso se conta o número de portas T, o **T-count**, de um algoritmo.

Qual é o T-count do circuito T, H, T, S, CNOT, T? (Conte só as portas T que aparecem.)

```exercise:number
id: universal-tcount
answer: 3
```

## Em Python

A porta S equivale a um múltiplo de T. Cada porta diagonal `[1, e^{i k π/4}]` pode ser descrita só pelo inteiro $k$: Z é $k = 4$, S é $k = 2$ e T é $k = 1$. Escreva uma função que recebe um circuito de portas diagonais e devolve o **menor** número de portas T necessário para reescrevê-lo, sabendo que S e Z são de graça.

```exercise:python
id: universal-codigo
input: circuito | str | letras Z, S e T; pode ser vazio | "TSTZT"
output: t_count_minimo | int | menor número de portas T | 1
---
K = {"Z": 4, "S": 2, "T": 1}

def t_count_minimo(circuito):
    # some os k; a paridade diz se sobra uma T
    return circuito.count("T")
---
>>> t_count_minimo("TT")
0
---
>>> t_count_minimo("T")
1
>>> t_count_minimo("")
0
---
>>> t_count_minimo("TSTZT")
1
>>> t_count_minimo("SZS")
0
>>> t_count_minimo("TTTT")
0
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
