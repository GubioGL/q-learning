Um computador quântico é, antes de tudo, bom em imitar outros sistemas quânticos: uma molécula, um ímã, um material. Imitar é deixar o sistema evoluir no tempo, e isso é calcular $e^{-iHt}$ para um operador $H$ (o hamiltoniano). Como transformar essa exponencial em portas de 1 e 2 qubits?

## Evolução no tempo

O **hamiltoniano** $H$ é o operador hermitiano que representa a energia do sistema. Se o estado inicial é $\ket{\psi(0)}$, depois de um tempo $t$ ele vira

$$
\ket{\psi(t)} = e^{-iHt}\ket{\psi(0)}.
$$

A exponencial de uma matriz $A$ é definida pela mesma série da exponencial comum: $e^{A} = I + A + A^2/2! + \dots$. Quando $H$ é hermitiano, $e^{-iHt}$ é unitária, isto é, é uma porta quântica válida.

Um caso fácil: $H = Z$. Como $Z^2 = I$, a série se reorganiza em cosseno e seno:

$$
e^{-i\theta Z} = \cos\theta\, I - i\sin\theta\, Z = \begin{pmatrix} e^{-i\theta} & 0 \\ 0 & e^{i\theta}\end{pmatrix}.
$$

Isso é a rotação $R_z(2\theta)$ que você já viu, pois $R_z(\varphi) = e^{-i\varphi Z/2}$. O mesmo vale para $X$ e $Y$ (qualquer Pauli $P$ tem $P^2=I$): $e^{-i\theta P} = \cos\theta\,I - i\sin\theta\,P$.

Qual é o ângulo $\varphi$ do $R_z(\varphi)$ equivalente a $e^{-i\theta Z}$ com $\theta = 0{,}3$?

```exercise:number
id: trot-angulo-rz
answer: 0.6
tolerance: 0.0001
```

## H como soma de termos de Pauli

Sistemas reais têm hamiltonianos com vários pedaços. Todo hamiltoniano de $n$ qubits pode ser escrito como soma de produtos de Paulis (strings de Pauli), cada uma com um coeficiente real:

$$
H = \sum_k c_k\, P_k, \qquad \text{por exemplo } H = 0{,}5\,Z_1 Z_2 + 0{,}3\,X_1 + 0{,}3\,X_2.
$$

Aqui $Z_1Z_2$ quer dizer $Z\otimes Z$, $X_1$ quer dizer $X\otimes I$, e assim por diante. Cada termo, sozinho, é fácil de exponenciar. O problema: $e^{-i(A+B)t}$ **não** é, em geral, $e^{-iAt}e^{-iBt}$. Isso só vale se $A$ e $B$ **comutam** ($AB = BA$).

$Z_1$ e $Z_2$ comutam? E $Z_1$ e $X_1$? Responda "sim" ou "não" para o primeiro par: vale $e^{-i(Z_1+Z_2)t} = e^{-iZ_1t}e^{-iZ_2t}$?

```exercise:text
id: trot-comutam
answer: sim
```

$Z_1$ e $X_1$ (ambos no qubit 1) não comutam, e é aí que mora o erro.

## Por que o produto simples falha

Teste com números: $H = X + Z$, $t = 1$, estado inicial $\ket{0}$. A evolução exata dá probabilidade $P(0) \approx 0{,}512$ de medir 0. Se trocamos $e^{-i(X+Z)}$ por $e^{-iX}e^{-iZ}$ (um único "passo"), obtemos $P(0) \approx 0{,}292$. A diferença é grande, e vem de $X$ e $Z$ não comutarem.

## A fórmula de Trotter

A ideia: dividir o tempo $t$ em $n$ passos curtos e, em cada um, aplicar os termos um de cada vez, como se comutassem. Para $H = A + B$:

$$
e^{-i(A+B)t} \;\approx\; \left( e^{-iAt/n}\, e^{-iBt/n} \right)^{n}.
$$

Essa é a fórmula de Trotter (e Suzuki generalizou o método a ordens maiores). Chama-se de **1ª ordem** porque o erro de cada passo é de segunda ordem no tamanho do passo, $(t/n)^2$, e é o esquema mais simples. Quanto menor o passo, menos importa a ordem dos termos, e no limite $n\to\infty$ a fórmula é exata.

Cada letra pode ser um grupo de termos que comutam entre si (assim o grupo se exponencia exatamente). Em $H = 0{,}5\,Z_1Z_2 + 0{,}3\,X_1 + 0{,}3\,X_2$, agrupe $A = 0{,}5\,Z_1Z_2$ e $B = 0{,}3(X_1 + X_2)$: $X_1$ e $X_2$ comutam (estão em qubits diferentes), então $e^{-iBt/n}$ é simplesmente uma rotação $R_x$ em cada qubit.

Com $n = 100$ passos, o caso $H = X+Z$, $t=1$ acima dá $P(0)\approx 0{,}5121$, quase o valor exato $0{,}5122$.

![Em cima, circuito de 2 qubits: o bloco e^{-iAt/n} seguido do bloco e^{-iBt/n}, repetido n vezes (seta de repetição e rótulo ×n). Embaixo, gráfico log-log do erro ε contra o número de passos n, de 1 a 100: o erro cai em linha reta, proporcional a 1/n, de cerca de 0,8 para 0,007.](/content/nisq/trotter-circuito-erro.svg)

### Tamanho do erro

Cada passo erra por algo proporcional a $(t/n)^2$ vezes o comutador $[A,B] = AB - BA$. Somando $n$ passos, um limite típico é

$$
\text{erro} \lesssim \frac{\lVert [A,B]\rVert\, t^2}{2n},
$$

onde $\lVert\cdot\rVert$ é o tamanho (norma) da matriz. Não é uma lei exata, é um limite que vale quando esse número é pequeno. O que importa é a escala, $\text{erro} \sim t^2/n$.

Exemplo: com $t = 1$ e $n = 10$ o erro é da ordem de $0{,}1$; dobrando para $n=20$, cai para $0{,}05$. Dobrar o tempo simulado quadruplica o erro, a menos que se multiplique $n$ por 4.

Se o tempo $t$ passa de 1 para 3, por qual fator é preciso multiplicar $n$ para manter o mesmo erro?

```exercise:number
id: trot-fator-n
answer: 9
tolerance: 0.001
```

Se com $n = 10$ passos o erro é $0{,}04$, quantos passos são necessários para chegar a $0{,}01$ (mesmo $t$)?

```exercise:number
id: trot-n-necessario
answer: 40
tolerance: 0.001
```

O custo é claro: mais precisão pede circuitos mais fundos, e em hardware ruidoso (veja o curso de hardware) profundidade é cara. Fórmulas de ordem maior reduzem o erro por passo, mas exigem mais portas por passo.

## O circuito de $e^{-i\theta Z\otimes Z}$

Falta implementar cada termo. Para um termo de um qubit, é uma rotação ($R_x$, $R_y$ ou $R_z$). Para $Z_1Z_2$, a exponencial $e^{-i\theta Z\otimes Z}$ multiplica os estados da base por uma fase que depende da **paridade** (se os dois bits são iguais ou diferentes):

- $\ket{00}$ e $\ket{11}$ (paridade par, $ZZ=+1$): fase $e^{-i\theta}$;
- $\ket{01}$ e $\ket{10}$ (paridade ímpar, $ZZ=-1$): fase $e^{+i\theta}$.

O truque é calcular a paridade no qubit 2 com uma CNOT, aplicar a fase com uma rotação $R_z$ nele, e desfazer a CNOT:

$$
e^{-i\theta Z\otimes Z} = \text{CNOT}\,\big(I\otimes R_z(2\theta)\big)\,\text{CNOT}.
$$

![Circuito de 2 qubits para e^{-iθ Z⊗Z}: uma CNOT com controle em q1 e alvo em q2, depois Rz(2θ) em q2, depois a mesma CNOT. Entre as duas CNOTs, o qubit q2 guarda a paridade q1 XOR q2.](/content/nisq/trotter-zz-cnot.svg)

Confira com $\ket{01}$: a CNOT leva a $\ket{01}$ (controle 0, nada muda), o qubit 2 está em $\ket{1}$, onde $R_z(2\theta)$ dá $e^{+i\theta}$, e a segunda CNOT desfaz. Resultado: $e^{i\theta}\ket{01}$, como previsto. Em $\ket{11}$ a CNOT vira $\ket{10}$, o alvo em $\ket{0}$ ganha $e^{-i\theta}$, e a segunda CNOT volta para $\ket{11}$.

No circuito, a fase $e^{-i\theta ZZ}$ de um estado com paridade ímpar é $e^{+i\theta}$. Para $\theta = 0{,}2$, qual é a fase (em radianos, com sinal) que o estado $\ket{10}$ recebe em $e^{-i\theta Z\otimes Z}$?

```exercise:number
id: trot-fase-impar
answer: 0.2
tolerance: 0.0001
```

Para termos como $X_1X_2$ ou $Y_1Y_2$, basta antes e depois girar a base (com $H$ para $X$; com $S^\dagger$ e depois $H$ para $Y$) e usar o mesmo circuito.

## Em Python

Simule em NumPy a trotterização de 1ª ordem de $H = X + Z$ para 1 qubit, partindo de $\ket{0}$. Use $e^{-ia P} = \cos a\,I - i\sin a\,P$ em que cada passo é $S = U_X\,U_Z$, com $U_P = e^{-iPt/n}$; retorne a probabilidade de medir $0$ no final. Dica: `np.linalg.matrix_power(S, n)`.

```exercise:python
id: trot-simula
input: t | float | tempo total de evolução | 1.0
input: n | int | número de passos de Trotter (n ≥ 1) | 1
output: prob0 | float | probabilidade de medir 0 ao final, partindo de |0⟩ | 0.2919265817264289
---
import numpy as np

X = np.array([[0, 1], [1, 0]])
Z = np.array([[1, 0], [0, -1]])
I = np.eye(2)

def prob0(t, n):
    return 0.0
---
>>> prob0(1.0, 1)
0.2919265817264289
---
>>> prob0(1.0, 2)
0.45467644055464135
>>> prob0(0.0, 3)
1.0
---
>>> prob0(0.5, 1)
0.7701511529340699
>>> prob0(1.0, 100)
0.5121366410416753
```

Com $n$ grande, $p_0 \to 0{,}5122$, o valor exato; com $n=1$ o erro é grande. Veja a convergência no resultado.

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seções 5.7 e 7.1.
