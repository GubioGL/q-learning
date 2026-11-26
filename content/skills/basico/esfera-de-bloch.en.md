A qubit has two amplitudes, $\alpha$ and $\beta$, but not everything in them is measurable: normalization ($|\alpha|^2+|\beta|^2=1$) ties one to the other, and multiplying the state by a global phase changes no measurement. That leaves **two numbers**, like the latitude and longitude of a point on a globe. This is the idea of the Bloch sphere: every state of a qubit is a point on a sphere.

## Phase: a complex number as an angle

The number $e^{i\varphi}$ is a point on the circle of radius 1 in the complex plane:

$$
e^{i\varphi} = \cos\varphi + i\,\sin\varphi.
$$

The angle $\varphi$ tells us where we are on the circle: $\varphi = 0^\circ$ gives $1$, $\varphi = 90^\circ$ gives $i$, $\varphi = 180^\circ$ gives $-1$ and $\varphi = 270^\circ$ gives $-i$. Multiplying by $e^{i\varphi}$ only rotates, without changing the size.

What is $e^{i\pi}$ (that is, $\varphi = 180^\circ$)?

```exercise:number
id: bloch-fase-pi
answer: -1
```

We will also use the **conjugate** $\alpha^*$, obtained by swapping $i$ for $-i$. For example, the conjugate of $\tfrac{1}{2} + \tfrac{i}{2}$ is $\tfrac{1}{2} - \tfrac{i}{2}$. For a real number, the conjugate is the number itself.

## A few points, before the formula

Think of the states you already know:

- $\ket{0}$ is the north pole, $\theta = 0$.
- $\ket{1}$ is the south pole, $\theta = \pi$.
- $\ket{+} = \tfrac{1}{\sqrt2}(\ket{0}+\ket{1})$ sits on the equator, at $\theta = \pi/2$ and $\phi = 0$.

The general formula brings all of this together. We choose the **global phase** so that $\alpha$ is real and non-negative ($\phi$, the relative phase between the amplitudes, stays free). With $|\alpha|^2+|\beta|^2=1$, this lets us write

$$
\ket{\psi} = \cos\frac{\theta}{2}\,\ket{0} + e^{i\phi}\sin\frac{\theta}{2}\,\ket{1}, \qquad 0 \le \theta \le \pi,\; 0 \le \phi < 2\pi.
$$

- $\theta$ is the **polar angle**: how far the point descends from the north pole.
- $\phi$ is the **azimuthal angle**: the longitude, measured around the vertical axis.

Check: $\theta=0$ gives $\cos 0\,\ket{0} = \ket{0}$; $\theta=\pi$ gives $e^{i\phi}\ket{1}$, which is $\ket{1}$ up to a global phase ($\phi$ does not matter at the poles); $\theta=\pi/2$, $\phi=0$ gives $\tfrac{1}{\sqrt2}(\ket{0}+\ket{1}) = \ket{+}$.

The $\theta/2$ has a reason: the angle on the sphere is **twice** the angle between the state vectors. That is why $\ket{0}$ and $\ket{1}$, which are orthogonal (a measurement can tell them apart with certainty), sit at opposite points.

![3D Bloch sphere with axes x, y, z; |0⟩ at the top, |1⟩ at the bottom, |+⟩ and |−⟩ at ±x, |+i⟩ and |−i⟩ at ±y; a vector |ψ⟩ with θ measured from z and φ measured in the xy plane from x](/content/basico/bloch-theta-phi.svg)


## Probabilities from θ

From the formula, by the Born rule:

$$
P(0) = \cos^2\frac{\theta}{2}, \qquad P(1) = \sin^2\frac{\theta}{2}.
$$

Only $\theta$ appears: the phase $\phi$ does not affect a measurement in the standard basis. For which $\theta$ (in degrees, between 0° and 180°) do we have $P(0) = 0.5$?

```exercise:number
id: bloch-theta
answer: 90
tolerance: 0.001
```

## The global phase does not show up

Multiplying the whole state by $e^{i\gamma}$ changes no probability, in any basis. So $\ket{\psi}$ and $-\ket{\psi}$ are the **same** point. The **relative** phase between $\alpha$ and $\beta$, which is $\phi$, does change the point.

$\ket{+} = \tfrac{1}{\sqrt2}(\ket{0}+\ket{1})$ and $\ket{-} = \tfrac{1}{\sqrt2}(\ket{0}-\ket{1})$ have the same probabilities of $0$ and $1$, but the sign $-1 = e^{i\pi}$ is a relative phase: they are different points (opposite).

Given $\ket{\psi} = \tfrac{1}{\sqrt2}\big(\ket{0} + i\ket{1}\big)$, what is $\phi$ in degrees (between 0° and 360°)?

```exercise:number
id: bloch-phi
answer: 90
tolerance: 0.001
```

## Six reference points

| State | $\theta$ | $\phi$ | Where it sits |
|---|---|---|---|
| $\ket{0}$ | $0$ | (any) | north pole, $+z$ axis |
| $\ket{1}$ | $\pi$ | (any) | south pole, $-z$ axis |
| $\ket{+}$ | $\pi/2$ | $0$ | equator, $+x$ axis |
| $\ket{-}$ | $\pi/2$ | $\pi$ | equator, $-x$ axis |
| $\ket{+i}$ (also written $\ket{i}$) $= \tfrac{1}{\sqrt2}(\ket{0}+i\ket{1})$ | $\pi/2$ | $\pi/2$ | equator, $+y$ axis |
| $\ket{-i} = \tfrac{1}{\sqrt2}(\ket{0}-i\ket{1})$ | $\pi/2$ | $3\pi/2$ | equator, $-y$ axis |

At the poles $\phi$ does not matter. At the north pole, $\sin 0 = 0$ erases the $\ket{1}$ term. At the south pole, $\cos\frac{\pi}{2} = 0$ erases the $\ket{0}$ term, and the leftover $e^{i\phi}$ multiplies the whole state: it is a global phase. Each pair of opposite points is an orthogonal basis, and each axis is a different measurement question. The whole equator gives $\tfrac12$ for $0$ and for $1$, and the points differ only by the phase $\phi$, which the other bases can see.

## Cartesian coordinates

On a sphere of radius 1, the state's point has coordinates

$$
x = \sin\theta\cos\phi, \qquad y = \sin\theta\sin\phi, \qquad z = \cos\theta.
$$

(Here it is the full $\theta$, not the half.) With the amplitudes in hand, you can compute directly, without finding the angles:

$$
x = 2\,\mathrm{Re}(\alpha^*\beta), \qquad y = 2\,\mathrm{Im}(\alpha^*\beta), \qquad z = |\alpha|^2 - |\beta|^2.
$$

Example: $\alpha = \tfrac{1}{\sqrt2}$, $\beta = \tfrac{i}{\sqrt2}$. Then $\alpha^*\beta = \tfrac{1}{\sqrt2}\cdot\tfrac{i}{\sqrt2} = \tfrac{i}{2}$, so $x = 0$, $y = 2\cdot\tfrac12 = 1$ and $z = \tfrac12-\tfrac12 = 0$: the point $(0,1,0)$, which is $\ket{+i}$.

The product $\alpha^*\beta$ depends only on the phase difference between the amplitudes, so a global phase drops out. And $z = P(0) - P(1)$ summarizes the measurement in the standard basis.

What is $z$ for $\theta = 60^\circ$ (use $z = \cos\theta$, without the half)?

```exercise:number
id: bloch-z
answer: 0.5
tolerance: 0.001
```

What is $x$ for $\theta = 90^\circ$ and $\phi = 180^\circ$?

```exercise:number
id: bloch-x
answer: -1
tolerance: 0.001
```

Now the other way around: which standard-basis state is the point $(0, 0, -1)$ (answer 0 or 1)?

```exercise:text
id: bloch-ida-volta
answer: 1 | 1⟩ | 1>
```

## Gates as rotations

A 1-qubit gate takes a point on the sphere to another point: it **rotates** the whole sphere (up to a global phase, which does not change the point). Three examples, all half-turns ($180^\circ$):

- **X**: rotates about the $x$ axis. It swaps $\ket{0}$ and $\ket{1}$ and leaves $\ket{\pm}$ where they are.
- **Z**: rotates about the $z$ axis. It leaves $\ket{0}$ and $\ket{1}$ fixed and takes $\ket{+}$ to $\ket{-}$.
- **H**: rotates about the axis $\tfrac{1}{\sqrt2}(\hat x + \hat z)$, halfway between $x$ and $z$. It takes $\ket{0}$ to $\ket{+}$ and $\ket{1}$ to $\ket{-}$: it swaps the $x$ and $z$ axes and flips the $y$ axis.

![Three Bloch spheres: X rotates a half-turn about x, Z about z, H about the axis between x and z; in each one the state ψ goes to ψ′ and the same half-turn brings it back](/content/basico/meias-voltas-xzh.svg)

Which gate (X, Y, Z or H) leaves $\ket{0}$ and $\ket{1}$ in place but takes $\ket{+}$ to $\ket{-}$? Answer with the letter.

```exercise:text
id: bloch-porta-z
answer: Z
```

## In Python

Write a function that takes the amplitudes and returns `np.array([x, y, z])` of real floats, using the formulas with $\alpha^*\beta$. Hint: `np.conj(state[0]) * state[1]` is complex; use `.real` and `.imag`.

```exercise:python
id: bloch-coordenadas
input: state | np.ndarray | normalized vector with the 2 amplitudes [alpha, beta] (may be complex), shape (2,) | np.array([1, 1]) / np.sqrt(2)
output: bloch_xyz | np.ndarray | coordinates [x, y, z] of the point, real floats, shape (3,) | np.array([1, 0, 0])
---
import numpy as np

def bloch_xyz(state):
    return np.array([0.0, 0.0, 0.0])
---
>>> bloch_xyz(np.array([1, 1]) / np.sqrt(2))
np.array([1, 0, 0])
---
>>> bloch_xyz(np.array([1, 1j]) / np.sqrt(2))
np.array([0, 1, 0])
>>> bloch_xyz(np.array([0, 1]))
np.array([0, 0, -1])
---
>>> bloch_xyz(np.array([1j, 1j]) / np.sqrt(2))
np.array([1, 0, 0])
>>> bloch_xyz(np.array([0.8660254037844386, 0.5j]))
np.array([0, 0.8660254037844386, 0.5])
>>> bloch_xyz(np.array([-1, 1]) / np.sqrt(2))
np.array([-1, 0, 0])
```

> To go deeper: T. G. Wong, *Introduction to Classical and Quantum Computing*, section 2.4 (Bloch Sphere Mapping).
