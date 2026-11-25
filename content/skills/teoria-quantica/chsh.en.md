Were the quantum results already decided before the measurement, and we just did not know them? In 1964, John Bell showed that this question can be **tested**. The most used version of the test is the **CHSH** inequality.

## The game

Alice and Bob are far from each other and cannot communicate during the game.

1. A referee picks a random bit $x$ for Alice and a random bit $y$ for Bob.
2. Each one answers with a bit: $a$ and $b$.
3. They win if

$$
a \oplus b = x\,y.
$$

![CHSH game: the referee sends x and y, Alice and Bob answer a and b](/content/teoria-quantica/chsh.en.svg)

In other words: the answers must be equal, except when $x = y = 1$, in which case they must be different.

## The classical limit

Always answering $0$ wins in 3 of the 4 questions. No classical strategy is better: the four conditions cannot hold at the same time, because, adding them modulo 2, the answer side gives $0$ and the question side gives $1$.

What is the highest winning probability of a classical strategy?

```exercise:number
id: chsh-classico
answer: 0.75
tolerance: 0.001
```

## The quantum advantage

Sharing a pair $\ket{\Phi^+}$ and measuring in well-chosen bases, Alice and Bob win with probability

$$
\cos^2\frac{\pi}{8} = \frac{2 + \sqrt2}{4}.
$$

What is this probability? (Three decimal places.)

```exercise:number
id: chsh-quantico
answer: 0.8536
tolerance: 0.001
```

To see where it comes from, call a measurement at angle $\theta$ the measurement in the basis $\cos\theta\ket{0} + \sin\theta\ket{1}$ and its orthogonal state. Measuring $\ket{\Phi^+}$ with angles $\theta_A$ and $\theta_B$,

$$
P(\text{equal}) = \cos^2(\theta_A - \theta_B).
$$

Alice uses $0$ (if $x=0$) or $45^\circ$ (if $x=1$); Bob uses $22.5^\circ$ (if $y=0$) or $-22.5^\circ$ (if $y=1$). In the first three cases the difference is $22.5^\circ$; in the case $x=y=1$ it is $67.5^\circ$, and then the results tend to be **different**.

## The inequality

With results $\pm1$ and $E_{xy}$ the average of their product, we define

$$
S = E_{00} + E_{01} + E_{10} - E_{11}.
$$

Every theory of **local hidden variables** obeys $|S| \le 2$. Quantum mechanics reaches $2\sqrt2$, the **Tsirelson bound**.

What is $2\sqrt2$? (Three decimal places.)

```exercise:number
id: chsh-tsirelson
answer: 2.828
tolerance: 0.001
```

Experiments confirm the violation, including those of 2015, which closed the main loopholes all at once. Even so, no signal travels faster than light: each side, alone, sees random bits.

## In Python

Compute the average winning probability for given angles (in radians). `A` and `B` are vectors with the two angles of each player.

```exercise:python
id: chsh-codigo
input: A, B | np.ndarray | two angles in radians [for 0, for 1], shape (2,) | np.array([0, 0]), np.array([0, 0])
output: win_probability | float | average winning probability, between 0 and 1 | 0.75
---
import numpy as np

def win_probability(A, B):
    total = 0
    for x in (0, 1):
        for y in (0, 1):
            equal = np.cos(A[x] - B[y]) ** 2
            # add the probability of winning in this case
    return total / 4
---
>>> win_probability(np.array([0, 0]), np.array([0, 0]))
0.75
---
>>> win_probability(np.array([0, np.pi / 4]), np.array([np.pi / 8, -np.pi / 8]))
np.cos(np.pi / 8) ** 2
---
>>> win_probability(np.array([0, np.pi / 2]), np.array([0, 0]))
0.75
>>> win_probability(np.array([np.pi / 2, 0]), np.array([0, 0]))
0.25
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 6.
