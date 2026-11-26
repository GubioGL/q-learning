Os números reais não bastam para a computação quântica: as amplitudes de um qubit são **números complexos**. A boa notícia é que a ideia central cabe numa imagem: um número complexo é um ponto num plano, e multiplicar por um número "de tamanho 1" é girar esse plano.

## O número $i$ e a forma $a + bi$

Nenhum número real elevado ao quadrado dá $-1$. Então inventamos um: $i$, definido por

$$
i^2 = -1.
$$

Um **número complexo** é qualquer $z = a + bi$ com $a$ e $b$ reais. Chamamos $a$ de **parte real** ($\mathrm{Re}\,z$) e $b$ de **parte imaginária** ($\mathrm{Im}\,z$). Exemplo: em $z = 3 - 2i$, $\mathrm{Re}\,z = 3$ e $\mathrm{Im}\,z = -2$ (a parte imaginária é o número $-2$, sem o $i$).

Somar é somar partes iguais: $(1+2i) + (3-i) = 4 + i$. Multiplicar é distribuir, lembrando que $i^2=-1$:

$$
(1+2i)(3-i) = 3 - i + 6i - 2i^2 = 3 + 5i + 2 = 5 + 5i.
$$

Qual é a parte real de $(2+i)(1+3i)$?

```exercise:number
id: complexos-produto
answer: -1
```

## Plano complexo, módulo e conjugado

Desenhe $z = a+bi$ como o ponto $(a, b)$: $a$ no eixo horizontal, $b$ no vertical. Esse é o **plano complexo**. O número $3+4i$ é o ponto $(3,4)$.

O **módulo** $|z|$ é a distância do ponto até a origem, dada pelo teorema de Pitágoras:

$$
|z| = \sqrt{a^2 + b^2}.
$$

Para $3+4i$: $|z| = \sqrt{9+16} = 5$.

O **conjugado** $z^*$ troca o sinal da parte imaginária: $(a+bi)^* = a - bi$. No plano, é o reflexo do ponto em relação ao eixo horizontal. Um fato muito usado:

$$
z\,z^* = (a+bi)(a-bi) = a^2 + b^2 = |z|^2.
$$

Por isso, na física quântica, a probabilidade de uma amplitude $\alpha$ é $|\alpha|^2 = \alpha^*\alpha$.

Qual é o módulo de $5 + 12i$?

```exercise:number
id: complexos-modulo
answer: 13
```

Qual é o conjugado de $2 - 3i$?

```exercise:text
id: complexos-conjugado
answer: 2+3i | 2 + 3i | 3i+2 | 3i + 2
```

![Plano complexo com o ponto z = 3+4i, o segmento de comprimento |z| = 5 até a origem e o conjugado 3−4i refletido no eixo real](/content/algebra-linear/complexos-plano.svg)

## Forma polar

Um ponto também se descreve por **distância e direção**: o módulo $r = |z|$ e o ângulo $\theta$ que o segmento faz com o eixo horizontal. Pela trigonometria, $a = r\cos\theta$ e $b = r\sin\theta$, então

$$
z = r(\cos\theta + i\sin\theta).
$$

Exemplo: $z = 1 + i$ tem $r = \sqrt2$ e $\theta = 45^\circ$, porque $a = b$. Ângulos também se medem em **radianos**: $180^\circ = \pi$ rad, então $90^\circ = \pi/2$ e $45^\circ = \pi/4$.

Qual é o ângulo, em graus, de $z = -1 + i$ (entre $0^\circ$ e $360^\circ$)? Desenhe o ponto: ele está no segundo quadrante.

```exercise:number
id: complexos-angulo
answer: 135
tolerance: 0.001
```

## A fórmula de Euler

Existe uma notação mais curta para $\cos\theta + i\sin\theta$:

$$
e^{i\theta} = \cos\theta + i\sin\theta.
$$

Aceite-a como definição por enquanto (ela nasce da série de potências de $e^x$, que não precisamos aqui). Alguns valores:

- $e^{i\cdot 0} = 1$
- $e^{i\pi/2} = i$
- $e^{i\pi} = -1$
- $e^{i3\pi/2} = -i$

Com isso, todo complexo escreve-se $z = r\,e^{i\theta}$. E vale algo crucial: $e^{i\theta}$ **sempre tem módulo 1**, pois

$$
|e^{i\theta}|^2 = \cos^2\theta + \sin^2\theta = 1.
$$

Isto é, $e^{i\theta}$ vive no **círculo unitário**, o círculo de raio 1. Fases quânticas são exatamente números desse tipo.

Escreva $2i$ na forma $r\,e^{i\theta}$: qual é $\theta$ em radianos (entre 0 e $2\pi$)? Use $\pi \approx 3{,}1416$ e responda com decimal.

```exercise:number
id: complexos-polar-euler
answer: 1.5708
tolerance: 0.001
```

## Multiplicar é girar

Multiplique $z_1 = r_1 e^{i\theta_1}$ por $z_2 = r_2 e^{i\theta_2}$. Os módulos se multiplicam e os ângulos se somam:

$$
z_1 z_2 = r_1 r_2\, e^{i(\theta_1+\theta_2)}.
$$

Se $z_2 = e^{i\varphi}$ tem módulo 1, o produto $z_1 z_2$ mantém o tamanho de $z_1$ e só **gira** o ponto por $\varphi$. Teste: multiplicar por $i = e^{i\pi/2}$ gira $90^\circ$; $1 \to i \to -1 \to -i \to 1$.

Quanto vale $e^{i\pi/2}\cdot e^{i\pi/2}$?

```exercise:number
id: complexos-giro
answer: -1
```

Qual é o módulo de $e^{i\theta}$, para qualquer $\theta$ real?

```exercise:number
id: complexos-unitario
answer: 1
```

![O ponto 1+i multiplicado por e^(iπ/2) gira 90° no círculo de raio √2 e vai para −1+i, sem mudar o módulo](/content/algebra-linear/complexos-giro.svg)

## Em Python

Escreva uma função que recebe um complexo e devolve `np.array([módulo, ângulo])`, com o ângulo em radianos entre $-\pi$ e $\pi$. Dica: `np.abs(z)` e `np.angle(z)`.

```exercise:python
id: complexos-polar
input: z | complex | um número complexo diferente de zero | 3 + 4j
output: polar | np.ndarray | [módulo, ângulo em radianos], floats, formato (2,) | np.array([1.4142135623730951, 0.7853981633974483])
---
import numpy as np

def polar(z):
    return np.array([0.0, 0.0])
---
>>> polar(1 + 1j)
np.array([1.4142135623730951, 0.7853981633974483])
---
>>> polar(1j)
np.array([1.0, 1.5707963267948966])
---
>>> polar(-2)
np.array([2.0, 3.141592653589793])
```

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (2025), seção 2.3; T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), seção 3.3.3.
