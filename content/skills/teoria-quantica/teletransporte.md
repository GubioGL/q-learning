Alice tem um qubit num estado que ela própria não conhece e quer que Bob o tenha. Ela não pode copiá-lo nem medi-lo sem estragar. O **teletransporte quântico** resolve o problema com um par emaranhado e dois bits clássicos.

## Os ingredientes

- o qubit de Alice em $\ket{\psi} = \alpha\ket{0} + \beta\ket{1}$;
- um par $\ket{\Phi^+}$ compartilhado entre Alice e Bob;
- um canal clássico, como telefone ou internet.

![Circuito do teletransporte quântico](/content/teoria-quantica/teletransporte.svg)

## O protocolo

1. Alice faz uma **medida de Bell** nos seus dois qubits: CNOT (controle em $\ket{\psi}$), depois H, depois mede os dois.
2. Alice envia os dois bits, $m_1$ (do qubit $\psi$) e $m_2$ (da metade do par), para Bob.
3. Bob aplica X se $m_2 = 1$ e depois Z se $m_1 = 1$.

Antes da medida, o estado dos três qubits pode ser reescrito como

$$
\begin{aligned}
\tfrac12\Big[\ &\ket{00}\big(\alpha\ket{0} + \beta\ket{1}\big) + \ket{01}\big(\alpha\ket{1} + \beta\ket{0}\big) \\
+\ &\ket{10}\big(\alpha\ket{0} - \beta\ket{1}\big) + \ket{11}\big(\alpha\ket{1} - \beta\ket{0}\big)\Big].
\end{aligned}
$$

Os dois primeiros dígitos são $m_1m_2$, e o parêntese é o que ficou com Bob. Cada resultado pede uma correção conhecida.

Qual é a probabilidade de Alice obter $m_1m_2 = 11$?

```exercise:number
id: teletransporte-prob
answer: 0.25
tolerance: 0.001
```

Alice obteve $m_1 m_2 = 01$. Que porta Bob aplica? (Uma letra.)

```exercise:text
id: teletransporte-x
answer: X
```

E se ela obteve $10$?

```exercise:text
id: teletransporte-z
answer: Z
```

## O que não acontece

- **Não há cópia.** A medida destrói o estado do lado de Alice, como exige a não-clonagem.
- **Não é mais rápido que a luz.** Sem os dois bits, o qubit de Bob é totalmente aleatório.
- **Nada material viaja.** O que se transfere é o estado.

Quantos bits clássicos é preciso enviar para teletransportar **5 qubits**?

```exercise:number
id: teletransporte-bits
answer: 10
```

Compare com a codificação superdensa: lá, 1 qubit mais um par emaranhado valem 2 bits; aqui, 2 bits mais um par valem 1 qubit. Os protocolos são espelhos um do outro.

## Em Python

Escreva a correção de Bob. `estado` é o par de amplitudes que ficou com ele.

```exercise:python
id: teletransporte-codigo
input: estado | tuple | par (a, b) com as 2 amplitudes de Bob | (0.8, 0.6)
input: m1, m2 | int | bits enviados por Alice, 0 ou 1 | 0, 1
output: corrigir | tuple | par de amplitudes corrigido | (0.6, 0.8)
---
def corrigir(estado, m1, m2):
    a, b = estado
    # X se m2 = 1, depois Z se m1 = 1
    return (a, b)
---
>>> corrigir((0.8, 0.6), 0, 1)
(0.6, 0.8)
---
>>> corrigir((0.6, 0.8), 0, 0)
(0.6, 0.8)
>>> corrigir((0.6, -0.8j), 1, 0)
(0.6, 0.8j)
---
>>> corrigir((-0.8j, 0.6), 1, 1)
(0.6, 0.8j)
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 6.
