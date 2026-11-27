Hoje os computadores quânticos têm dezenas a poucas centenas de qubits ruidosos e não corrigem erros. Dá para fazer algo útil com eles mesmo assim? A aposta dos algoritmos variacionais é: usar o chip quântico só para o que ele faz bem, deixar o resto para um computador comum, e tolerar circuitos curtos.

## A era NISQ

**NISQ** (do inglês *noisy intermediate-scale quantum*) é o nome da fase atual: escala intermediária (algumas dezenas a centenas de qubits) e com ruído. Circuitos profundos, como o de estimação de fase com $e^{-iHt}$ longos, acumulam erros demais. A saída é usar circuitos **rasos**, controlados por poucos números ajustáveis, e deixar um otimizador clássico procurar bons valores.

O ruído limita a **profundidade** do circuito (portas em sequência) a cerca de (tempo de coerência) ÷ (duração de uma porta). Com coerência de $200\ \mu\text{s}$ e portas de $0{,}2\ \mu\text{s}$, quantas camadas de portas, no máximo?

```exercise:number
id: vqe-nisq-raso
answer: 1000
tolerance: 0.001
```

## Circuito parametrizado (ansatz)

Um **ansatz** é uma família de circuitos com parâmetros reais $\vec\theta = (\theta_1,\dots,\theta_m)$, que prepara o estado $\ket{\psi(\vec\theta)}$. Exemplo de 1 qubit:

$$
\ket{\psi(\theta)} = R_y(\theta)\ket{0} = \cos\tfrac{\theta}{2}\ket{0} + \sin\tfrac{\theta}{2}\ket{1}.
$$

Variar $\theta$ de $0$ a $2\pi$ percorre o círculo inteiro da esfera de Bloch no plano $xz$: $\ket{0}$ ($\theta=0$), $\ket{+}$ ($\pi/2$), $\ket{1}$ ($\pi$), $\ket{-}$ ($3\pi/2$) e de volta. Neste texto os ângulos estão em radianos, salvo quando indicado. Para vários qubits, o ansatz típico alterna camadas de rotações com portas de emaranhamento (CNOT). Quanto mais **expressivo** o ansatz (isto é, quanto mais estados ele consegue produzir), mais perto do estado fundamental ele chega, mas mais fundo e mais difícil de otimizar ele fica.

![Esfera de Bloch com o círculo verde de estados Ry(θ)|0⟩ no plano xz. Passando por |0⟩ em cima (θ=0), |+⟩ (θ=π/2), |1⟩ embaixo (θ=π) e |−⟩ atrás (θ=3π/2). Um estado |ψ(θ)⟩ qualquer está marcado com o ângulo θ medido a partir de |0⟩.](/content/nisq/vqe-circulo-bloch.svg)

Para $\ket{\psi(\theta)} = R_y(\theta)\ket{0}$ com $\theta=\pi/3$, qual é a probabilidade de medir $1$? (responda com 2 casas decimais.)

```exercise:number
id: vqe-prob-ry
answer: 0.25
tolerance: 0.001
```

## O princípio variacional

Muitos problemas (química, materiais, otimização) pedem o **estado fundamental**: o estado de menor energia $E_0$ de um hamiltoniano $H$ (o menor autovalor). Para qualquer estado $\ket{\psi}$ a **energia esperada** é

$$
E = \bra{\psi}H\ket{\psi}.
$$

O fato central: **nenhum estado tem energia esperada abaixo de $E_0$**. A razão: escreva $\ket{\psi} = \sum_j c_j\ket{E_j}$ em autovetores de $H$, com $\sum|c_j|^2=1$. Então $E = \sum_j |c_j|^2 E_j$ é uma média ponderada dos autovalores, e uma média nunca fica abaixo do menor valor. Logo, para o ansatz,

$$
E(\vec\theta) = \bra{\psi(\vec\theta)}H\ket{\psi(\vec\theta)} \;\ge\; E_0.
$$

Minimizar $E(\vec\theta)$ dá uma **cota superior** de $E_0$ que é exata se o ansatz contém o estado fundamental.

Exemplo: $H = Z$ tem autovalores $+1$ e $-1$. O estado $\ket{1}$ dá $E=-1=E_0$. O estado $\ket{+}$ dá $E = 0$ (média de $+1$ e $-1$ com pesos iguais), acima de $E_0$, como previsto.

Qual é o menor valor possível de $\bra{\psi}H\ket{\psi}$ para $H = Z + X$ (o menor autovalor)? Dica: $(Z+X)^2 = 2I$, então os autovalores são $\pm\sqrt2$.

```exercise:number
id: vqe-energia-minima
answer: -1.4142
tolerance: 0.001
```

## Medir $\langle H\rangle$ por termos de Pauli

O chip só entrega bits de medida, não $\bra\psi H\ket\psi$ diretamente. Mas $H = \sum_k c_k P_k$ (veja a aula de trotterização), e pela linearidade

$$
\bra{\psi}H\ket{\psi} = \sum_k c_k \bra{\psi}P_k\ket{\psi}.
$$

Cada $\langle P_k\rangle$ se estima repetindo o circuito muitas vezes (*shots*) e medindo na base de $P_k$: o resultado é $+1$ ou $-1$ e o valor esperado é a média. Para $Z$, mede-se direto. Para $X$, aplica-se antes uma porta $H$ (Hadamard) para trocar de base e então mede-se em $Z$. Para $Y$, usa-se $S^\dagger$ e depois $H$.

Exemplo: se $\langle Z\rangle = 0{,}6$ e $\langle X\rangle = 0{,}8$, então para $H = 0{,}5Z + 0{,}3X$ temos $E = 0{,}5\cdot0{,}6 + 0{,}3\cdot0{,}8$.

Calcule esse valor.

```exercise:number
id: vqe-soma-termos
answer: 0.54
tolerance: 0.0001
```

Qual porta se aplica antes de medir em $Z$ para estimar $\langle X\rangle$?

```exercise:text
id: vqe-base-x
answer: H | Hadamard | hadamard
```

Como cada termo estimado vem de um número finito de shots, $E(\vec\theta)$ tem ruído estatístico, que cai com $1/\sqrt{\text{shots}}$. Reduzir o ruído por um fator 10 exige quantas vezes mais shots?

```exercise:number
id: vqe-shots
answer: 100
tolerance: 0.001
```

## O laço híbrido

O VQE (*variational quantum eigensolver*) junta as peças em um laço:

1. O computador **clássico** escolhe $\vec\theta$.
2. O **chip quântico** prepara $\ket{\psi(\vec\theta)}$ e mede os termos de $H$.
3. O clássico soma tudo, obtém $E(\vec\theta)$, e um **otimizador** (por exemplo descida de gradiente; COBYLA e Nelder-Mead são só nomes de otimizadores clássicos que não usam derivadas) propõe novos $\vec\theta$.
4. Repete até a energia parar de cair.

![O laço do VQE. Um bloco clássico (otimizador) envia os parâmetros θ para um bloco quântico (estado |ψ(θ)⟩ e medida de H), que devolve a energia E(θ). Embaixo, a energia E cai a cada iteração k e se aproxima da linha tracejada E0, o menor autovalor.](/content/nisq/vqe-laco-hibrido.svg)

O quântico entrega só uma função $E(\vec\theta)$; a otimização é clássica. Limitações reais: o ruído pode esconder o mínimo, a **paisagem** de $E(\vec\theta)$ (o gráfico da energia em função dos parâmetros, com seus vales e planícies) pode ter muitos mínimos locais e regiões planas, e nada garante que o ansatz alcance o estado fundamental.

Um $H$ tem 3 termos de Pauli que exigem 3 bases de medida diferentes. Quantos circuitos diferentes o chip executa em cada iteração do laço?

```exercise:number
id: vqe-laco-classico
answer: 3
tolerance: 0.001
```

## Exemplo completo de 1 qubit

Tome $H = Z + 0{,}5X$ e o ansatz $R_y(\theta)\ket{0}$. Para esse estado, $\langle Z\rangle = \cos\theta$ e $\langle X\rangle = \sin\theta$, então

$$
E(\theta) = \cos\theta + 0{,}5\sin\theta.
$$

Em $\theta=0$ ($\ket{0}$): $E=1$. Em $\theta = \pi/2$ ($\ket{+}$): $E = 0{,}5$. O mínimo está em $\theta = \pi + \arctan(0{,}5) \approx 3{,}60$ rad ($206{,}6^\circ$), fora do intervalo $[0,\pi]$, e vale $-\sqrt{1+0{,}25} \approx -1{,}118$. Em geral, o mínimo de $a\cos\theta + b\sin\theta$ é $-\sqrt{a^2+b^2}$. Esse valor é exatamente o menor autovalor de $H$: o ansatz de 1 qubit já cobre o estado fundamental.

![Gráfico da energia E(θ) = cos θ + 0,5 sen θ para θ de 0 a 2π. A curva começa em 1, desce até o mínimo −√5/2 ≈ −1,118 em θ* = π + arctan(1/2) ≈ 3,60 rad e volta a subir. A linha tracejada E0 marca o menor autovalor de H.](/content/nisq/vqe-curva-energia.svg)

Antes de otimizar: quanto vale $E(\theta) = \cos\theta + \sin\theta$ em $\theta = \pi/2$?

```exercise:number
id: vqe-energia-pi2
answer: 1
tolerance: 0.001
```

Para $H = Z + X$, em qual $\theta$ (em graus, entre 0° e 360°) $E(\theta) = \cos\theta + \sin\theta$ é mínima? (Dica: ache o ângulo em radianos e converta.)

```exercise:number
id: vqe-theta-otimo
answer: 225
tolerance: 0.5
```

## Em Python

Escreva a energia esperada $\bra\psi H\ket\psi$ para um estado e um hamiltoniano dados. Retorne um float real (a parte imaginária é zero se $H$ é hermitiano). Dica: `np.conj(estado) @ H @ estado` é complexo; devolva `.real`.

```exercise:python
id: vqe-energia-esperada
input: estado | np.ndarray | vetor normalizado, formato (2,), amplitudes possivelmente complexas | np.array([1, 0])
input: H | np.ndarray | matriz hermitiana, formato (2, 2) | np.array([[1, 0.5], [0.5, -1]])
output: energia | float | valor real de ⟨ψ|H|ψ⟩ | 1.0
---
import numpy as np

def energia(estado, H):
    return 0.0
---
>>> energia(np.array([1, 0]), np.array([[1, 0.5], [0.5, -1]]))
1.0
---
>>> energia(np.array([1, 1]) / np.sqrt(2), np.array([[1, 0.5], [0.5, -1]]))
0.5
>>> energia(np.array([1, 1j]) / np.sqrt(2), np.array([[0, -1j], [1j, 0]]))
1.0
---
>>> energia(np.array([np.cos(np.pi / 8), np.sin(np.pi / 8)]), np.array([[1, 0.5], [0.5, -1]]))
1.0606601717798212
>>> energia(np.array([0, 1]), np.array([[1, 0.5], [0.5, -1]]))
-1.0
```

Agora um laço de otimização simples: varra $\theta$ numa grade de `n` pontos, `theta = 2*np.pi*k/n` com `k = 0, ..., n-1`, calcule $E(\theta)=\cos\theta + b\sin\theta$ (ou seja, $\bra\psi H\ket\psi$ com $H = Z + bX$ e $\ket\psi = R_y(\theta)\ket 0$) e retorne o menor valor da grade.

```exercise:python
id: vqe-varredura
input: b | float | coeficiente do termo X em H = Z + b X | 0.5
input: n | int | número de pontos da grade, theta = 2*pi*k/n | 360
output: minimo | float | menor energia encontrada na grade | -1.1180017740581412
---
import numpy as np

def minimo(b, n):
    return 0.0
---
>>> minimo(0.5, 360)
-1.1180017740581412
---
>>> minimo(0.0, 360)
-1.0
---
>>> minimo(1.0, 8)
-1.4142135623730951
```

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 7.2.
