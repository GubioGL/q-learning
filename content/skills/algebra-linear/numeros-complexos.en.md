Real numbers are not enough for quantum computing: the amplitudes of a qubit are **complex numbers**. The good news is that the central idea fits in one picture: a complex number is a point in a plane, and multiplying by a number "of size 1" rotates that plane.

## The number $i$ and the form $a + bi$

No real number squared gives $-1$. So we invent one: $i$, defined by

$$
i^2 = -1.
$$

A **complex number** is any $z = a + bi$ with $a$ and $b$ real. We call $a$ the **real part** ($\mathrm{Re}\,z$) and $b$ the **imaginary part** ($\mathrm{Im}\,z$). Example: in $z = 3 - 2i$, $\mathrm{Re}\,z = 3$ and $\mathrm{Im}\,z = -2$ (the imaginary part is the number $-2$, without the $i$).

Adding means adding like parts: $(1+2i) + (3-i) = 4 + i$. Multiplying means distributing, remembering that $i^2=-1$:

$$
(1+2i)(3-i) = 3 - i + 6i - 2i^2 = 3 + 5i + 2 = 5 + 5i.
$$

What is the real part of $(2+i)(1+3i)$?

```exercise:number
id: complexos-produto
answer: -1
```

## The complex plane, modulus and conjugate

Draw $z = a+bi$ as the point $(a, b)$: $a$ on the horizontal axis, $b$ on the vertical one. This is the **complex plane**. The number $3+4i$ is the point $(3,4)$.

The **modulus** $|z|$ is the distance from the point to the origin, given by the Pythagorean theorem:

$$
|z| = \sqrt{a^2 + b^2}.
$$

For $3+4i$: $|z| = \sqrt{9+16} = 5$.

The **conjugate** $z^*$ flips the sign of the imaginary part: $(a+bi)^* = a - bi$. In the plane, it is the mirror image of the point across the horizontal axis. A very useful fact:

$$
z\,z^* = (a+bi)(a-bi) = a^2 + b^2 = |z|^2.
$$

That is why, in quantum physics, the probability of an amplitude $\alpha$ is $|\alpha|^2 = \alpha^*\alpha$.

![Complex plane with the point z = 3+4i, the segment of length |z| = 5 to the origin and the conjugate 3−4i mirrored across the real axis](/content/algebra-linear/complexos-plano.svg)

What is the modulus of $5 + 12i$?

```exercise:number
id: complexos-modulo
answer: 13
```

What is the conjugate of $2 - 3i$?

```exercise:text
id: complexos-conjugado
answer: 2+3i | 2 + 3i | 3i+2 | 3i + 2
```

## Polar form

A point can also be described by **distance and direction**: the modulus $r = |z|$ and the angle $\theta$ that the segment makes with the horizontal axis. By trigonometry, $a = r\cos\theta$ and $b = r\sin\theta$, so

$$
z = r(\cos\theta + i\sin\theta).
$$

Example: $z = 1 + i$ has $r = \sqrt2$ and $\theta = 45^\circ$, because $a = b$. Angles can also be measured in **radians**: $180^\circ = \pi$ rad, so $90^\circ = \pi/2$ and $45^\circ = \pi/4$.

What is the angle, in degrees, of $z = -1 + i$ (between $0^\circ$ and $360^\circ$)? Draw the point: it is in the second quadrant.

```exercise:number
id: complexos-angulo
answer: 135
tolerance: 0.001
```

## Euler's formula

There is a shorter notation for $\cos\theta + i\sin\theta$:

$$
e^{i\theta} = \cos\theta + i\sin\theta.
$$

Accept it as a definition for now (it comes from the power series of $e^x$, which we do not need here). A few values:

- $e^{i\cdot 0} = 1$
- $e^{i\pi/2} = i$
- $e^{i\pi} = -1$
- $e^{i3\pi/2} = -i$

With this, every complex number is written $z = r\,e^{i\theta}$. And something crucial holds: $e^{i\theta}$ **always has modulus 1**, since

$$
|e^{i\theta}|^2 = \cos^2\theta + \sin^2\theta = 1.
$$

That is, $e^{i\theta}$ lives on the **unit circle**, the circle of radius 1. Quantum phases are exactly numbers of this kind.

Write $2i$ in the form $r\,e^{i\theta}$: what is $\theta$ in radians (between 0 and $2\pi$)? Use $\pi \approx 3.1416$ and answer with a decimal.

```exercise:number
id: complexos-polar-euler
answer: 1.5708
tolerance: 0.001
```

## Multiplying is rotating

Multiply $z_1 = r_1 e^{i\theta_1}$ by $z_2 = r_2 e^{i\theta_2}$. The moduli multiply and the angles add:

$$
z_1 z_2 = r_1 r_2\, e^{i(\theta_1+\theta_2)}.
$$

If $z_2 = e^{i\varphi}$ has modulus 1, the product $z_1 z_2$ keeps the size of $z_1$ and only **rotates** the point by $\varphi$. Test: multiplying by $i = e^{i\pi/2}$ rotates by $90^\circ$; $1 \to i \to -1 \to -i \to 1$.

How much is $e^{i\pi/2}\cdot e^{i\pi/2}$?

```exercise:number
id: complexos-giro
answer: -1
```

What is the modulus of $e^{i\theta}$, for any real $\theta$?

```exercise:number
id: complexos-unitario
answer: 1
```

![The point 1+i multiplied by e^(iπ/2) rotates 90° on the circle of radius √2 and goes to −1+i, without changing its modulus](/content/algebra-linear/complexos-giro.svg)

## In Python

Write a function that receives a complex number and returns `np.array([modulus, angle])`, with the angle in radians between $-\pi$ and $\pi$. Hint: `np.abs(z)` and `np.angle(z)`.

```exercise:python
id: complexos-polar
input: z | complex | a nonzero complex number | 3 + 4j
output: polar | np.ndarray | [modulus, angle in radians], floats, shape (2,) | np.array([1.4142135623730951, 0.7853981633974483])
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

> To go further: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (2025), section 2.3; T. G. Wong, *Introduction to Classical and Quantum Computing* (2022), section 3.3.3.
