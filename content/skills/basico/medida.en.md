A qubit can have infinitely many combinations of amplitudes, but when we **measure** it we only see $0$ or $1$. The rule that connects the amplitudes to the result is the heart of this skill.

## The Born rule

If the state is $\ket{\psi} = \alpha\ket{0} + \beta\ket{1}$, then

$$
P(0) = |\alpha|^2, \qquad P(1) = |\beta|^2.
$$

That is why the state must be normalized: the probabilities have to add up to 1.

![Bars with the probabilities 0.25 and 0.75](/content/basico/born.en.svg)

For $\ket{\psi} = \tfrac{1}{2}\ket{0} + \tfrac{\sqrt 3}{2}\ket{1}$, what is the probability of measuring $1$?

```exercise:number
id: medida-born
answer: 0.75
tolerance: 0.001
```

## Collapse

Measurement **changes** the state. If the result was $0$, the qubit is now in $\ket{0}$; if it was $1$, in $\ket{1}$. Measuring again right away gives the same result with certainty.

A qubit in $\ket{+}$ was measured and gave $1$. What is the probability that a second, immediate measurement gives $1$?

```exercise:number
id: medida-repetida
answer: 1
```

Because of collapse, a single measurement does not reveal $\alpha$ and $\beta$. To estimate $|\alpha|^2$, we prepare the same state many times and count the results. Each repetition is called a **shot**.

A state was prepared and measured 1000 times, with 360 results $0$. What is the estimate of $|\alpha|$?

```exercise:number
id: medida-shots
answer: 0.6
tolerance: 0.001
```

## Measuring in another basis

Asking "is it $\ket{0}$ or $\ket{1}$?" is only one of the possible questions. We can ask "is it $\ket{+}$ or $\ket{-}$?". To do so, we rewrite the state in that basis. For example,

$$
\ket{0} = \frac{1}{\sqrt 2}\big(\ket{+} + \ket{-}\big),
$$

so a qubit in $\ket{0}$, measured in the basis $\{\ket{+}, \ket{-}\}$, gives each result with probability $\tfrac12$. A state can be certain in one basis and completely random in another.

## The Bloch sphere

Up to a global phase, every state of one qubit can be written as

$$
\ket{\psi} = \cos\frac{\theta}{2}\,\ket{0} + e^{i\phi}\sin\frac{\theta}{2}\,\ket{1},
$$

that is, a point on a sphere with angles $\theta$ and $\phi$. The north pole is $\ket{0}$, the south pole is $\ket{1}$, and $\ket{+}$ and $\ket{-}$ are on the equator.

![Bloch sphere with the states 0, 1, + and -](/content/basico/bloch.svg)

Only the angle $\theta$ decides the probabilities of $0$ and $1$. The phase $\phi$ does not appear in this measurement, but it does in other bases.

What is $P(0)$ for a state with $\theta = 60^\circ$?

```exercise:number
id: medida-bloch
answer: 0.75
tolerance: 0.001
```

## In Python

Write a function that simulates a measurement. It takes the amplitudes and a random number `u` between 0 and 1, and returns the result: $0$ if `u` is smaller than $P(0)$, otherwise $1$.

```exercise:python
id: medida-simular
input: alpha, beta | float / complex | amplitudes, already normalized | 0.6, 0.8
input: u | float | random number, 0 <= u < 1 | 0.37
output: measure | int | measurement result: 0 or 1 | 1
---
def measure(alpha, beta, u):
    return 0
---
>>> measure(0.6, 0.8, 0.37)
1
---
>>> measure(0.6, 0.8, 0.35)
0
>>> measure(0, 1, 0.0)
1
---
>>> measure(0.6j, 0.8, 0.35)
0
>>> measure(1, 0, 0.999)
0
>>> measure(0.8, -0.6, 0.65)
1
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, ch. 2.
