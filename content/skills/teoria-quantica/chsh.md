Será que os resultados quânticos já estavam decididos antes da medida, e nós é que não sabíamos? Em 1964, John Bell mostrou que essa pergunta pode ser **testada**. A versão mais usada do teste é a desigualdade **CHSH**.

## O jogo

Alice e Bob estão longe um do outro e não podem se comunicar durante o jogo.

1. Um juiz sorteia um bit $x$ para Alice e um bit $y$ para Bob.
2. Cada um responde com um bit: $a$ e $b$.
3. Eles ganham se

$$
a \oplus b = x\,y.
$$

![Jogo CHSH: o juiz envia x e y, Alice e Bob respondem a e b](/content/teoria-quantica/chsh.svg)

Ou seja: as respostas devem ser iguais, exceto quando $x = y = 1$, caso em que devem ser diferentes.

## O limite clássico

Responder sempre $0$ ganha em 3 das 4 perguntas. Nenhuma estratégia clássica é melhor: as quatro condições não podem valer ao mesmo tempo, porque, somando-as módulo 2, o lado das respostas dá $0$ e o das perguntas dá $1$.

Qual é a maior probabilidade de vitória de uma estratégia clássica?

```exercise:number
id: chsh-classico
answer: 0.75
tolerance: 0.001
```

## A vantagem quântica

Compartilhando um par $\ket{\Phi^+}$ e medindo em bases bem escolhidas, Alice e Bob ganham com probabilidade

$$
\cos^2\frac{\pi}{8} = \frac{2 + \sqrt2}{4}.
$$

Quanto vale essa probabilidade? (Três casas decimais.)

```exercise:number
id: chsh-quantico
answer: 0.8536
tolerance: 0.001
```

Para entender de onde vem, chame de medida no ângulo $\theta$ a medida na base $\cos\theta\ket{0} + \sin\theta\ket{1}$ e sua ortogonal. Medindo $\ket{\Phi^+}$ com ângulos $\theta_A$ e $\theta_B$,

$$
P(\text{iguais}) = \cos^2(\theta_A - \theta_B).
$$

Alice usa $0$ (se $x=0$) ou $45^\circ$ (se $x=1$); Bob usa $22{,}5^\circ$ (se $y=0$) ou $-22{,}5^\circ$ (se $y=1$). Nos três primeiros casos a diferença é $22{,}5^\circ$; no caso $x=y=1$ ela é $67{,}5^\circ$, e aí os resultados tendem a ser **diferentes**.

## A desigualdade

Com resultados $\pm1$ e $E_{xy}$ a média do produto deles, define-se

$$
S = E_{00} + E_{01} + E_{10} - E_{11}.
$$

Toda teoria de **variáveis ocultas locais** obedece a $|S| \le 2$. A mecânica quântica chega a $2\sqrt2$, o **limite de Tsirelson**.

Quanto vale $2\sqrt2$? (Três casas decimais.)

```exercise:number
id: chsh-tsirelson
answer: 2.828
tolerance: 0.001
```

Experimentos confirmam a violação, inclusive os de 2015, que fecharam de uma vez as principais brechas. Ainda assim, nenhum sinal viaja mais rápido que a luz: cada lado, sozinho, vê bits aleatórios.

## Em Python

Calcule a probabilidade média de vitória para ângulos (em radianos) dados. `A` e `B` são listas com os dois ângulos de cada jogador.

```exercise:python
id: chsh-codigo
---
from math import cos, pi

def prob_vitoria(A, B):
    total = 0
    for x in (0, 1):
        for y in (0, 1):
            iguais = cos(A[x] - B[y]) ** 2
            # some a probabilidade de ganhar neste caso
    return total / 4
---
assert abs(prob_vitoria([0, pi / 4], [pi / 8, -pi / 8]) - cos(pi / 8) ** 2) < 1e-9
assert abs(prob_vitoria([0, 0], [0, 0]) - 0.75) < 1e-9
assert abs(prob_vitoria([0, pi / 2], [0, 0]) - 0.75) < 1e-9
assert abs(prob_vitoria([pi / 2, 0], [0, 0]) - 0.25) < 1e-9
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 6.
