Já vimos que X, Y e Z viram a esfera de Bloch meia-volta em torno de um eixo. E um giro de **um quarto** de volta, ou de qualquer ângulo? Existe uma porta para cada ângulo, e todas as portas de 1 qubit são feitas delas.

## As portas de fase, como giros em torno de z

Tome $\ket{+}$, na esfera de Bloch o ponto $(1, 0, 0)$ no equador. A porta **S** multiplica a amplitude de $\ket{1}$ por $i$:

$$
S\ket{+} = \tfrac{1}{\sqrt2}\big(\ket{0} + i\ket{1}\big) = \ket{+i}.
$$

O ponto foi de $(1,0,0)$ para $(0,1,0)$: andou $90^\circ$ ao longo do equador, um giro em torno do eixo $z$. A porta **T**, com fase $e^{i\pi/4}$, gira $45^\circ$. E $Z$, com fase $e^{i\pi} = -1$, gira $180^\circ$.

A família toda é a **porta de fase**

$$
P(\phi) = \begin{pmatrix} 1 & 0 \\ 0 & e^{i\phi} \end{pmatrix}, \qquad Z = P(\pi),\quad S = P(\tfrac{\pi}{2}),\quad T = P(\tfrac{\pi}{4}).
$$

Ela soma $\phi$ à longitude na esfera e não mexe no ângulo polar. Se aplicarmos $S$ a $\ket{+}$, qual é a longitude do ponto resultante, em graus?

```exercise:number
id: rot-s-mais
answer: 90
```

Agora aplique $S$ e depois $T$ a $\ket{+}$. Qual é a longitude final, em graus?

```exercise:number
id: rot-st-mais
answer: 135
```

Quantas portas $T$ seguidas, aplicadas a um qubit, equivalem exatamente à porta $Z$? (Use $T = P(\pi/4)$ e $Z = P(\pi)$.)

```exercise:number
id: rot-t-para-z
answer: 4
```

## Rx, Ry e Rz

Antes da fórmula, um caso: $X$ vira a esfera meia-volta em torno de $x$, e o giro de $180^\circ$ em torno de $x$ leva $\ket{0}$ a $-i\ket{1}$. O fator $-i$ é fase global, então o ponto é o mesmo de $X\ket{0} = \ket{1}$. Para outros ângulos, o giro de ângulo $\theta$ em torno do eixo de uma matriz de Pauli $\sigma$ ($\sigma = X$, $Y$ ou $Z$) é

$$
R_\sigma(\theta) = e^{-i\theta\sigma/2} = \cos\tfrac{\theta}{2}\, I - i \sin\tfrac{\theta}{2}\, \sigma.
$$

A segunda igualdade vale porque $\sigma^2 = I$: na série de potências da exponencial, as potências pares dão $I$ e as ímpares dão $\sigma$, exatamente como na fórmula de Euler $e^{i x} = \cos x + i\sin x$.

Escrevendo $c = \cos\tfrac\theta2$ e $s = \sin\tfrac\theta2$:

$$
R_x(\theta) = \begin{pmatrix} c & -is \\ -is & c \end{pmatrix}, \quad
R_y(\theta) = \begin{pmatrix} c & -s \\ s & c \end{pmatrix}, \quad
R_z(\theta) = \begin{pmatrix} e^{-i\theta/2} & 0 \\ 0 & e^{i\theta/2} \end{pmatrix}.
$$

![Esfera de Bloch com setas circulares em torno de cada eixo (Rx, Ry, Rz) e o ponto |0⟩ levado por Ry(θ) a ângulo polar θ.](/content/computacao-quantica/bloch-rotacoes.svg)

**Por que $\theta/2$?** Na esfera de Bloch, $\ket{0}$ e $\ket{1}$ ficam em polos opostos ($180^\circ$), embora sejam ortogonais, o que no espaço de estados é um "ângulo reto". O ângulo da esfera é o dobro do ângulo que aparece nas amplitudes, daí o $\theta/2$ dentro de cosseno e seno.

Teste: $R_y(\theta)\ket{0} = \cos\tfrac\theta2\ket{0} + \sin\tfrac\theta2\ket{1}$. É o estado com **ângulo polar** $\theta$ (quanto o ponto desce a partir do polo norte) e $\phi = 0$: $R_y$ desce o ponto pelo meridiano do plano $xz$. Com $\theta = 60^\circ$, qual é a probabilidade de medir $1$?

```exercise:number
id: rot-ry-prob
answer: 0.25
tolerance: 0.001
```

$R_x(\theta)\ket{0} = \cos\tfrac\theta2\ket{0} - i\sin\tfrac\theta2\ket{1}$. Com $\theta = 120^\circ$, qual é a probabilidade de medir $1$?

```exercise:number
id: rot-rx-prob
answer: 0.75
tolerance: 0.001
```

$R_z$ só multiplica as amplitudes por fases, então não muda as probabilidades na base padrão.

## Rz contra fase: o que é só fase global

Compare $R_z(\phi)$ e $P(\phi)$:

$$
R_z(\phi) = e^{-i\phi/2}\begin{pmatrix} 1 & 0 \\ 0 & e^{i\phi} \end{pmatrix} = e^{-i\phi/2}\, P(\phi).
$$

As duas diferem por um número $e^{-i\phi/2}$ multiplicando tudo: uma **fase global**, que nenhuma medida detecta. Vale o mesmo para as meias-voltas: $R_x(\pi) = -iX$, $R_y(\pi) = -iY$, $R_z(\pi) = -iZ$. Como um giro de $\theta + 2\pi$ muda o sinal da matriz, $R_z(2\pi) = -I$, e só o giro de $4\pi$ volta à matriz identidade.

Qual é a entrada superior esquerda de $R_z(2\pi)$?

```exercise:number
id: rot-rz-2pi
answer: -1
```

**Mas cuidado com portas controladas.** Numa versão controlada, a fase global do alvo vira uma fase **relativa** entre controle $\ket{0}$ e controle $\ket{1}$, e isso é observável. Por isso $R_z(\phi)$ controlada e $P(\phi)$ controlada **não** são a mesma porta.

## Qualquer porta de 1 qubit: decomposição ZYZ

Qualquer unitária $U$ de 1 qubit pode ser escrita, para três ângulos $\beta,\gamma,\delta$ e uma fase global $\alpha$, como

$$
U = e^{i\alpha}\, R_z(\beta)\, R_y(\gamma)\, R_z(\delta).
$$

Isto é o equivalente dos ângulos de Euler: três giros dão qualquer orientação. Exemplos, que você pode conferir multiplicando as matrizes:

$$
H = e^{i\pi/2}\, R_y(\tfrac\pi2)\, R_z(\pi), \qquad X = e^{i\pi/2}\, R_y(\pi)\, R_z(\pi).
$$

(Aqui $\beta = 0$ e a ordem de aplicação é da direita para a esquerda: $R_z$ primeiro.)

A igualdade é exata, com a fase $e^{i\alpha}$ que não se mede. São três ângulos livres, como os de Euler.

Por exemplo, que ângulo $\gamma$ faz $R_y(\gamma)\ket{0} = \ket{+}$, em graus? Como $\ket{+}$ tem $\theta = 90^\circ$ na esfera de Bloch:

```exercise:number
id: rot-ry-mais
answer: 90
```

A mesma ideia prepara qualquer estado a partir de $\ket{0}$: $R_y(\theta)$ desce do polo norte até o ângulo polar $\theta$, e $R_z(\phi)$ gira até a longitude $\phi$. O resultado é $\cos\tfrac\theta2\ket{0} + e^{i\phi}\sin\tfrac\theta2\ket{1}$, a menos de fase global.

## Rotações e CNOT: universalidade exata

Na próxima skill veremos que um conjunto **finito** de portas só consegue **aproximar** as unitárias. Se permitirmos **todas** as rotações de 1 qubit, o quadro muda: todas as portas de 1 qubit mais a CNOT geram **exatamente**, a menos de fase global, qualquer unitária de $n$ qubits. As portas de 1 qubit são os $R_z$ e $R_y$ da decomposição ZYZ, e a CNOT cria o emaranhamento.

O preço é o conjunto ser infinito (um $\theta$ real para cada giro). Com portas finitas, como a T (que é $R_z(\pi/4)$ a menos de fase global), um ângulo genérico só pode ser **aproximado**, e a precisão custa mais portas.

![Camadas de giros Rz Ry Rz e CNOTs formam qualquer unitária, e Rz(θ) é aproximada por uma sequência de H e T.](/content/computacao-quantica/universalidade-rotacoes.svg)

Quantas portas $T$ seguidas implementam $R_z(3\pi/4)$, a menos de fase global? (Lembre que $T$ é $R_z(\pi/4)$ a menos de fase global.)

```exercise:number
id: rot-t-tres
answer: 3
```

## Em Python

Implemente as três rotações como matrizes $2\times 2$ (complexas).

```exercise:python
id: rot-codigo
input: eixo | str | "x", "y" ou "z" | "z"
input: theta | float | ângulo em radianos | 3.141592653589793
output: rotacao | np.ndarray | matriz 2x2 da rotação R_eixo(theta), formato (2, 2) | np.array([[-1j, 0], [0, 1j]])
---
import numpy as np

def rotacao(eixo, theta):
    return np.eye(2, dtype=complex)
---
>>> rotacao("z", np.pi)
np.array([[-1j, 0], [0, 1j]])
---
>>> rotacao("y", np.pi / 2)
np.array([[1, -1], [1, 1]]) / np.sqrt(2)
---
>>> rotacao("x", np.pi)
np.array([[0, -1j], [-1j, 0]])
```

Agora monte a decomposição ZYZ e confira com o Hadamard. A função `rotacao` já está pronta; falta combinar as três matrizes (a primeira a agir é $R_z(\delta)$).

```exercise:python
id: rot-zyz
input: beta | float | ângulo do último Rz | 0.0
input: gamma | float | ângulo do Ry | 1.5707963267948966
input: delta | float | ângulo do primeiro Rz | 3.141592653589793
output: zyz | np.ndarray | matriz 2x2 de Rz(beta) Ry(gamma) Rz(delta), formato (2, 2) | np.array([[-1j, -1j], [-1j, 1j]]) / np.sqrt(2)
---
import numpy as np

def rotacao(eixo, theta):
    c, s = np.cos(theta / 2), np.sin(theta / 2)
    if eixo == "x":
        return np.array([[c, -1j * s], [-1j * s, c]])
    if eixo == "y":
        return np.array([[c, -s], [s, c]])
    return np.array([[np.exp(-1j * theta / 2), 0], [0, np.exp(1j * theta / 2)]])

def zyz(beta, gamma, delta):
    return np.eye(2, dtype=complex)
---
>>> zyz(0, np.pi / 2, np.pi)
np.array([[-1j, -1j], [-1j, 1j]]) / np.sqrt(2)
---
>>> zyz(0, 0, 0)
np.eye(2)
---
>>> zyz(0, np.pi, np.pi)
np.array([[0, -1j], [-1j, 0]])
```

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 3.5; T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), seção 4.5.
