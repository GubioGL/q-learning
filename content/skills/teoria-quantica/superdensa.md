Quantos bits clássicos cabem num qubit? Sozinho, **um**. Com emaranhamento compartilhado antes, um qubit enviado pode carregar **dois**: é a codificação superdensa.

## O protocolo

Alice e Bob compartilham um par $\ket{\Phi^+}$, um qubit com cada um. Alice quer enviar dois bits.

1. Alice aplica uma porta no **seu** qubit, conforme os bits:

$$
\begin{array}{c|c|c}
\text{bits} & \text{porta} & \text{estado do par} \\ \hline
00 & I & \ket{\Phi^+} \\
01 & X & \ket{\Psi^+} \\
10 & Z & \ket{\Phi^-} \\
11 & ZX & \ket{\Psi^-}
\end{array}
$$

2. Alice envia seu qubit a Bob.
3. Bob, com os dois qubits, faz uma **medida de Bell** (CNOT, depois H) e lê os dois bits.

![Circuito da codificação superdensa](/content/teoria-quantica/superdensa.svg)

Funciona porque os quatro estados de Bell são ortogonais, e portanto distinguíveis com certeza.

Alice quer enviar `10`. Qual porta ela aplica? (Uma letra.)

```exercise:text
id: superdensa-porta
answer: Z
```

Bob obteve o estado $\ket{\Psi^+}$. Que bits Alice enviou?

```exercise:text
id: superdensa-bits
answer: 01
```

## Não é mágica

O recurso foi **pago antes**: alguém distribuiu o par emaranhado. Ao todo, dois qubits chegam a Bob, um antes e um depois da escolha da mensagem. O que surpreende é que o primeiro chegou **antes** de Alice decidir o que dizer.

Quantos qubits Alice envia, depois de escolher a mensagem, para transmitir **100 bits** com esse protocolo?

```exercise:number
id: superdensa-cem
answer: 50
```

Se um espião captura só o qubit de Alice em trânsito, não descobre nada: sozinho, ele é 50/50 em qualquer base, seja qual for a mensagem.

## Em Python

Escreva o lado de Alice: dados os bits, aplique X e/ou Z no **primeiro** qubit do par. As matrizes $4\times 4$ já estão prontas com `np.kron`.

```exercise:python
id: superdensa-codigo
input: b1, b2 | int | 0 ou 1 | 1, 0
output: codificar | np.ndarray | vetor com as 4 amplitudes, na ordem 00, 01, 10, 11, formato (4,) | np.array([2**-0.5, 0, 0, -2**-0.5])
---
import numpy as np

I = np.eye(2)
H = np.array([[1, 1], [1, -1]]) / np.sqrt(2)
X_NO_PRIMEIRO = np.kron(np.array([[0, 1], [1, 0]]), I)
Z_NO_PRIMEIRO = np.kron(np.array([[1, 0], [0, -1]]), I)
CNOT = np.array([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]])
PAR = np.array([1, 0, 0, 1]) / np.sqrt(2)  # ordem 00, 01, 10, 11

def codificar(b1, b2):
    estado = PAR.copy()
    # b2 = 1 pede X; b1 = 1 pede Z (X primeiro)
    return estado

def decodificar(estado):
    # Bob: CNOT, depois H no primeiro; devolve o resultado mais provável
    i = int(np.argmax(np.abs(np.kron(H, I) @ CNOT @ estado)))
    return (i // 2, i % 2)
---
>>> decodificar(codificar(1, 0))
(1, 0)
---
>>> decodificar(codificar(0, 0))
(0, 0)
>>> decodificar(codificar(0, 1))
(0, 1)
---
>>> decodificar(codificar(1, 1))
(1, 1)
>>> codificar(0, 1)
np.array([0, 2**-0.5, 2**-0.5, 0])
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 6.
