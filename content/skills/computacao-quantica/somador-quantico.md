Um computador quântico que não soubesse somar seria difícil de levar a sério. Somar é a operação mais simples de uma conta, e quase todo algoritmo precisa dela. Vamos construí-la com CNOT e Toffoli, e depois ver o que muda quando a entrada está em superposição.

## O somador clássico, em resumo

(Revisão rápida; os detalhes estão na skill de somadores binários.) Em cada coluna, o **somador completo** soma três bits: $a$, $b$ e o vai-um $c_\text{in}$ da coluna anterior. Ele devolve o bit $s$ da coluna e o vai-um $c_\text{out}$ para a seguinte:

$$
s = a \oplus b \oplus c_\text{in}, \qquad c_\text{out} = 1 \text{ se pelo menos dois de } (a, b, c_\text{in}) \text{ forem } 1.
$$

Por exemplo, $1 + 1 + 0 = 2 = 10_2$, então $s = 0$ e $c_\text{out} = 1$. Encadear $n$ blocos assim é o somador **ripple-carry**.

Quanto dá $1 + 1 + 1$ numa coluna? Escreva primeiro $s$ e depois $c_\text{out}$, sem espaço (por exemplo, `01` quer dizer $s=0$ e $c_\text{out}=1$).

```exercise:text
id: somador-coluna
answer: 11
```

## Por que não dá para usar o somador direto

Uma porta quântica é reversível: a saída deve permitir recuperar a entrada. O somador completo recebe 3 bits e devolve 2, então não é reversível. Quantas das 8 entradas dão $s = 1$ e $c_\text{out} = 0$? (Quem recebe essa saída não consegue saber de qual delas ela veio.)

```exercise:number
id: somador-colisao
answer: 3
```

A saída tem uma pista: são as entradas com **exatamente um** bit $1$. A solução é a de sempre: manter as entradas e usar um qubit extra, iniciado em $\ket{0}$, para guardar o vai-um.

## Um somador completo com 4 qubits

Os qubits são $c_\text{in}$, $a$, $b$ e um qubit de saída $c_\text{out}$, que começa em $\ket{0}$. Quatro portas, em ordem:

1. Toffoli com controles $a, b$ e alvo $c_\text{out}$: soma $ab$ ao vai-um.
2. CNOT de $a$ para $b$: agora $b$ guarda $a \oplus b$.
3. Toffoli com controles $c_\text{in}, b$ e alvo $c_\text{out}$: soma $c_\text{in}(a \oplus b)$.
4. CNOT de $c_\text{in}$ para $b$: agora $b$ guarda $a \oplus b \oplus c_\text{in}$.

No fim, $c_\text{out} = ab \oplus c_\text{in}(a\oplus b)$, que é exatamente o "pelo menos dois são 1". E o qubit $b$ virou a soma $s$:

$$
\ket{c_\text{in}}\ket{a}\ket{b}\ket{0} \;\longmapsto\; \ket{c_\text{in}}\ket{a}\ket{s}\ket{c_\text{out}}.
$$

Como só usamos CNOT e Toffoli, que são reversíveis, o bloco todo é uma permutação dos 16 estados da base e portanto uma porta quântica válida.

![Circuito de 4 fios com Toffoli, CNOT, Toffoli e CNOT, mostrando ab, a⊕b e por fim s no fio b e o vai-um no fio c_out.](/content/computacao-quantica/somador-4-portas.svg)

Acompanhe a entrada $c_\text{in}=1, a=1, b=0$ pelas portas. Qual é o valor do qubit $b$ no fim?

```exercise:number
id: somador-cout
answer: 0
```

## Ripple-carry quântico

Para somar dois números de $n$ bits, usamos $n$ blocos em fila. O vai-um de saída do bloco $i$ é o vai-um de entrada do bloco $i+1$, então cada bloco precisa de um qubit para o vai-um que ele produz. O registrador $b$ é **sobrescrito** pela soma, e o último vai-um é o bit mais alto do resultado ($n+1$ bits).

Omitindo os vai-um intermediários da resposta (eles são lixo), a saída é a soma em $b$ mais o último vai-um. Contando os qubits: $n$ qubits de $a$, $n$ de $b$, e $n+1$ de vai-um (o primeiro começa em $0$). São $3n + 1$ qubits e, com 2 Toffoli e 2 CNOT por coluna, $4n$ portas.

![Três blocos somadores em fila, com o vai-um de cada coluna entrando na seguinte, b_i virando s_i e o último vai-um como bit mais alto.](/content/computacao-quantica/ripple-carry.svg)

Quantos qubits usa a soma de dois números de 3 bits?

```exercise:number
id: somador-qubits
answer: 10
```

Quantas portas (Toffoli e CNOT juntas) tem um somador de 4 bits?

```exercise:number
id: somador-portas
answer: 16
```

Repare que os vai-um intermediários ficaram nos qubits de vai-um, não voltaram a $\ket{0}$. São **lixo**: dependem das entradas. Na próxima skill veremos por que o lixo importa quando o registrador está em superposição, e como limpá-lo.

## Somar em superposição

Como a soma é uma permutação linear dos estados da base, ela age em superposições termo a termo. Se $a$ está em $\tfrac{1}{2}\big(\ket{0}+\ket{1}+\ket{2}+\ket{3}\big)$ (dois qubits em $\ket{+}$) e $b = 1$, o somador produz

$$
\tfrac12\big(\ket{0}\ket{1} + \ket{1}\ket{2} + \ket{2}\ket{3} + \ket{3}\ket{4}\big),
$$

onde o primeiro ket é $a$ e o segundo é a soma (omitindo os qubits de vai-um intermediários, que também dependem de $a$). **Uma** execução calculou quatro somas ao mesmo tempo. Mas medir o registrador de soma dá só **uma** delas, escolhida ao acaso. O truque dos algoritmos quânticos é organizar a interferência para que a resposta útil seja a mais provável.

Com esse $a$ e $b = 1$, qual é a probabilidade de a soma medida ser $4$?

```exercise:number
id: somador-superposicao
answer: 0.25
tolerance: 0.001
```

## Em Python

Primeiro simule o somador completo bit a bit, aplicando as 4 portas na ordem certa a uma lista `[c_in, a, b, c_out]`. As funções `toffoli` e `cnot` já estão prontas.

```exercise:python
id: somador-codigo
input: cin | int | 0 ou 1 | 1
input: a | int | 0 ou 1 | 1
input: b | int | 0 ou 1 | 1
output: somador_completo | tuple | (s, cout), os dois bits da soma cin + a + b | (1, 1)
---
def toffoli(bits, c1, c2, alvo):
    novo = list(bits)
    novo[alvo] ^= bits[c1] & bits[c2]
    return novo

def cnot(bits, controle, alvo):
    novo = list(bits)
    novo[alvo] ^= bits[controle]
    return novo

def somador_completo(cin, a, b):
    bits = [cin, a, b, 0]  # posições 0, 1, 2, 3
    # aplique as 4 portas na ordem
    return (0, 0)
---
>>> somador_completo(1, 1, 1)
(1, 1)
---
>>> somador_completo(0, 1, 0)
(1, 0)
---
>>> somador_completo(1, 0, 1)
(0, 1)
```

Agora encadeie colunas para somar. Os números vêm como listas de bits com o bit **menos** significativo primeiro (assim $6 = 110$ vira `[0, 1, 1]`).

```exercise:python
id: somador-ripple
input: a | list | bits de a, menos significativo primeiro | [1, 1]
input: b | list | bits de b, mesmo tamanho de a | [1, 0]
output: soma | list | n+1 bits da soma, menos significativo primeiro | [0, 0, 1]
---
def somador_completo(cin, a, b):
    s = a ^ b ^ cin
    cout = (a & b) | (cin & (a ^ b))
    return (s, cout)

def soma(a, b):
    resultado = []
    return resultado
---
>>> soma([1, 1], [1, 0])
[0, 0, 1]
---
>>> soma([1, 0, 1], [1, 1, 0])
[0, 0, 0, 1]
---
>>> soma([0], [1])
[1, 0]
```

Por fim, a soma em superposição. O registrador $a$ tem 2 qubits, com amplitudes `amps` nos valores $0, 1, 2, 3$. Some a constante $b$ e devolva as probabilidades de medir cada soma $0, \dots, 7$.

```exercise:python
id: somador-distribuicao
input: amps | np.ndarray | amplitudes de a nos valores 0, 1, 2, 3, formato (4,) | np.array([0.5, 0.5, 0.5, 0.5])
input: b | int | constante somada, de 0 a 3 | 1
output: distribuicao_soma | np.ndarray | probabilidade de cada soma 0 a 7, formato (8,) | np.array([0, 0.25, 0.25, 0.25, 0.25, 0, 0, 0])
---
import numpy as np

def distribuicao_soma(amps, b):
    return np.zeros(8)
---
>>> distribuicao_soma(np.array([0.5, 0.5, 0.5, 0.5]), 1)
np.array([0, 0.25, 0.25, 0.25, 0.25, 0, 0, 0])
---
>>> distribuicao_soma(np.array([1, 0, 0, 0]), 3)
np.array([0, 0, 0, 1, 0, 0, 0, 0])
---
>>> distribuicao_soma(np.array([0.6, 0, 0.8, 0]), 2)
np.array([0, 0, 0.36, 0, 0.64, 0, 0, 0])
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), seção 4.5 (Quantum Adders).
