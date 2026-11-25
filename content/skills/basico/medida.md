Um qubit pode ter infinitas combinações de amplitudes, mas, quando **medimos**, só vemos $0$ ou $1$. A regra que liga as amplitudes ao resultado é o coração desta skill.

## A regra de Born

Se o estado é $\ket{\psi} = \alpha\ket{0} + \beta\ket{1}$, então

$$
P(0) = |\alpha|^2, \qquad P(1) = |\beta|^2.
$$

É por isso que o estado precisa ser normalizado: as probabilidades têm que somar 1.

![Barras com as probabilidades 0,25 e 0,75](/content/basico/born.svg)

Para $\ket{\psi} = \tfrac{1}{2}\ket{0} + \tfrac{\sqrt 3}{2}\ket{1}$, qual é a probabilidade de medir $1$?

```exercise:number
id: medida-born
answer: 0.75
tolerance: 0.001
```

## O colapso

A medida **muda** o estado. Se o resultado foi $0$, o qubit passa a estar em $\ket{0}$; se foi $1$, em $\ket{1}$. Medir de novo, em seguida, dá o mesmo resultado com certeza.

Um qubit em $\ket{+}$ foi medido e deu $1$. Qual é a probabilidade de uma segunda medida imediata dar $1$?

```exercise:number
id: medida-repetida
answer: 1
```

Por causa do colapso, uma única medida não revela $\alpha$ e $\beta$. Para estimar $|\alpha|^2$, preparamos o mesmo estado muitas vezes e contamos os resultados. Cada repetição se chama **shot**.

Um estado foi preparado e medido 1000 vezes, com 360 resultados $0$. Qual é a estimativa de $|\alpha|$?

```exercise:number
id: medida-shots
answer: 0.6
tolerance: 0.001
```

## Medindo em outra base

Perguntar "é $\ket{0}$ ou $\ket{1}$?" é só uma das perguntas possíveis. Podemos perguntar "é $\ket{+}$ ou $\ket{-}$?". Para isso, reescrevemos o estado nessa base. Por exemplo,

$$
\ket{0} = \frac{1}{\sqrt 2}\big(\ket{+} + \ket{-}\big),
$$

então um qubit em $\ket{0}$, medido na base $\{\ket{+}, \ket{-}\}$, dá cada resultado com probabilidade $\tfrac12$. Um estado pode ser certo numa base e totalmente aleatório em outra.

## A esfera de Bloch

A menos de fase global, todo estado de um qubit pode ser escrito como

$$
\ket{\psi} = \cos\frac{\theta}{2}\,\ket{0} + e^{i\phi}\sin\frac{\theta}{2}\,\ket{1},
$$

isto é, um ponto numa esfera com ângulos $\theta$ e $\phi$. O polo norte é $\ket{0}$, o polo sul é $\ket{1}$, e $\ket{+}$ e $\ket{-}$ ficam no equador.

![Esfera de Bloch com os estados 0, 1, + e -](/content/basico/bloch.svg)

Só o ângulo $\theta$ decide as probabilidades de $0$ e $1$. A fase $\phi$ não aparece nessa medida, mas aparece em outras bases.

Qual é $P(0)$ para um estado com $\theta = 60^\circ$?

```exercise:number
id: medida-bloch
answer: 0.75
tolerance: 0.001
```

## Em Python

Escreva uma função que simula uma medida. Ela recebe as amplitudes e um número aleatório `u` entre 0 e 1, e devolve o resultado: $0$ se `u` for menor que $P(0)$, senão $1$.

```exercise:python
id: medida-simular
input: alfa, beta | float / complex | amplitudes já normalizadas | 0.6, 0.8
input: u | float | número sorteado, 0 <= u < 1 | 0.37
output: medir | int | resultado da medida: 0 ou 1 | 1
---
def medir(alfa, beta, u):
    return 0
---
>>> medir(0.6, 0.8, 0.37)
1
---
>>> medir(0.6, 0.8, 0.35)
0
>>> medir(0, 1, 0.0)
1
---
>>> medir(0.6j, 0.8, 0.35)
0
>>> medir(1, 0, 0.999)
0
>>> medir(0.8, -0.6, 0.65)
1
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 2.
