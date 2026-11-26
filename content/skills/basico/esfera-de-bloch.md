Um qubit tem duas amplitudes, $\alpha$ e $\beta$, mas nem tudo nelas é mensurável: a normalização ($|\alpha|^2+|\beta|^2=1$) amarra uma à outra, e multiplicar o estado por uma fase global não muda nenhuma medida. Sobram **dois números**, como a latitude e a longitude de um ponto no globo. Essa é a ideia da esfera de Bloch: cada estado de um qubit é um ponto numa esfera.

## Fase: um número complexo como ângulo

O número $e^{i\varphi}$ é um ponto no círculo de raio 1 do plano complexo:

$$
e^{i\varphi} = \cos\varphi + i\,\sin\varphi.
$$

O ângulo $\varphi$ diz onde estamos no círculo: $\varphi = 0^\circ$ dá $1$, $\varphi = 90^\circ$ dá $i$, $\varphi = 180^\circ$ dá $-1$ e $\varphi = 270^\circ$ dá $-i$. Multiplicar por $e^{i\varphi}$ só gira, sem mudar o tamanho.

Quanto vale $e^{i\pi}$ (isto é, $\varphi = 180^\circ$)?

```exercise:number
id: bloch-fase-pi
answer: -1
```

Vamos usar também o **conjugado** $\alpha^*$, que se obtém trocando $i$ por $-i$. Por exemplo, o conjugado de $\tfrac{1}{2} + \tfrac{i}{2}$ é $\tfrac{1}{2} - \tfrac{i}{2}$. Para um número real, o conjugado é ele mesmo.

## Alguns pontos, antes da fórmula

Pense nos estados que você já conhece:

- $\ket{0}$ é o polo norte, $\theta = 0$.
- $\ket{1}$ é o polo sul, $\theta = \pi$.
- $\ket{+} = \tfrac{1}{\sqrt2}(\ket{0}+\ket{1})$ fica no equador, em $\theta = \pi/2$ e $\phi = 0$.

A fórmula geral junta tudo isso. Escolhemos a **fase global** de modo que $\alpha$ seja real e não negativo ($\phi$, a fase relativa entre as amplitudes, continua livre). Com $|\alpha|^2+|\beta|^2=1$, isso permite escrever

$$
\ket{\psi} = \cos\frac{\theta}{2}\,\ket{0} + e^{i\phi}\sin\frac{\theta}{2}\,\ket{1}, \qquad 0 \le \theta \le \pi,\; 0 \le \phi < 2\pi.
$$

- $\theta$ é o **ângulo polar**: quanto o ponto desce a partir do polo norte.
- $\phi$ é o **ângulo azimutal**: a longitude, medida ao redor do eixo vertical.

Confira: $\theta=0$ dá $\cos 0\,\ket{0} = \ket{0}$; $\theta=\pi$ dá $e^{i\phi}\ket{1}$, que é $\ket{1}$ a menos de fase global (o $\phi$ não importa nos polos); $\theta=\pi/2$, $\phi=0$ dá $\tfrac{1}{\sqrt2}(\ket{0}+\ket{1}) = \ket{+}$.

O $\theta/2$ tem um motivo: o ângulo na esfera é o **dobro** do ângulo entre os vetores de estado. Por isso $\ket{0}$ e $\ket{1}$, que são ortogonais (se distinguem com certeza numa medida), ficam em pontos opostos.

![Esfera de Bloch em 3D com eixos x, y, z; |0⟩ no topo, |1⟩ na base, |+⟩ e |−⟩ em ±x, |+i⟩ e |−i⟩ em ±y; um vetor |ψ⟩ com θ medido a partir de z e φ medido no plano xy a partir de x](/content/basico/bloch-theta-phi.svg)


## Probabilidades a partir de θ

Da fórmula, pela regra de Born:

$$
P(0) = \cos^2\frac{\theta}{2}, \qquad P(1) = \sin^2\frac{\theta}{2}.
$$

Só $\theta$ aparece: a fase $\phi$ não afeta a medida na base padrão. Para qual $\theta$ (em graus, entre 0° e 180°) temos $P(0) = 0{,}5$?

```exercise:number
id: bloch-theta
answer: 90
tolerance: 0.001
```

## A fase global não aparece

Multiplicar o estado inteiro por $e^{i\gamma}$ não muda nenhuma probabilidade, em nenhuma base. Por isso $\ket{\psi}$ e $-\ket{\psi}$ são o **mesmo** ponto. Já a fase **relativa** entre $\alpha$ e $\beta$, que é o $\phi$, muda o ponto.

$\ket{+} = \tfrac{1}{\sqrt2}(\ket{0}+\ket{1})$ e $\ket{-} = \tfrac{1}{\sqrt2}(\ket{0}-\ket{1})$ têm as mesmas probabilidades de $0$ e $1$, mas o sinal $-1 = e^{i\pi}$ é uma fase relativa: são pontos diferentes (opostos).

Dado $\ket{\psi} = \tfrac{1}{\sqrt2}\big(\ket{0} + i\ket{1}\big)$, qual é $\phi$ em graus (entre 0° e 360°)?

```exercise:number
id: bloch-phi
answer: 90
tolerance: 0.001
```

## Seis pontos de referência

| Estado | $\theta$ | $\phi$ | Onde fica |
|---|---|---|---|
| $\ket{0}$ | $0$ | (qualquer) | polo norte, eixo $+z$ |
| $\ket{1}$ | $\pi$ | (qualquer) | polo sul, eixo $-z$ |
| $\ket{+}$ | $\pi/2$ | $0$ | equador, eixo $+x$ |
| $\ket{-}$ | $\pi/2$ | $\pi$ | equador, eixo $-x$ |
| $\ket{+i}$ (também escrito $\ket{i}$) $= \tfrac{1}{\sqrt2}(\ket{0}+i\ket{1})$ | $\pi/2$ | $\pi/2$ | equador, eixo $+y$ |
| $\ket{-i} = \tfrac{1}{\sqrt2}(\ket{0}-i\ket{1})$ | $\pi/2$ | $3\pi/2$ | equador, eixo $-y$ |

Nos polos o $\phi$ não importa. No norte, $\sin 0 = 0$ apaga o termo de $\ket{1}$. No sul, $\cos\frac{\pi}{2} = 0$ apaga o termo de $\ket{0}$, e o $e^{i\phi}$ que sobra multiplica o estado inteiro: é uma fase global. Cada par de pontos opostos é uma base ortogonal, e cada eixo é uma pergunta de medida diferente. Todo o equador dá $\tfrac12$ para $0$ e para $1$, e os pontos se diferenciam só pela fase $\phi$, que as outras bases enxergam.

## Coordenadas cartesianas

Numa esfera de raio 1, o ponto do estado tem coordenadas

$$
x = \sin\theta\cos\phi, \qquad y = \sin\theta\sin\phi, \qquad z = \cos\theta.
$$

(Aqui é $\theta$ inteiro, não a metade.) Com as amplitudes em mãos, dá para calcular direto, sem achar os ângulos:

$$
x = 2\,\mathrm{Re}(\alpha^*\beta), \qquad y = 2\,\mathrm{Im}(\alpha^*\beta), \qquad z = |\alpha|^2 - |\beta|^2.
$$

Exemplo: $\alpha = \tfrac{1}{\sqrt2}$, $\beta = \tfrac{i}{\sqrt2}$. Então $\alpha^*\beta = \tfrac{1}{\sqrt2}\cdot\tfrac{i}{\sqrt2} = \tfrac{i}{2}$, logo $x = 0$, $y = 2\cdot\tfrac12 = 1$ e $z = \tfrac12-\tfrac12 = 0$: o ponto $(0,1,0)$, que é $\ket{+i}$.

O produto $\alpha^*\beta$ só depende da diferença de fase entre as amplitudes, então uma fase global some. E $z = P(0) - P(1)$ resume a medida na base padrão.

Qual é $z$ para $\theta = 60^\circ$ (use $z = \cos\theta$, sem a metade)?

```exercise:number
id: bloch-z
answer: 0.5
tolerance: 0.001
```

Qual é $x$ para $\theta = 90^\circ$ e $\phi = 180^\circ$?

```exercise:number
id: bloch-x
answer: -1
tolerance: 0.001
```

Agora no sentido contrário: o ponto $(0, 0, -1)$ é qual estado da base padrão (responda 0 ou 1)?

```exercise:text
id: bloch-ida-volta
answer: 1 | 1⟩ | 1>
```

## Portas como rotações

Uma porta de 1 qubit leva um ponto da esfera para outro: ela **gira** a esfera inteira (a menos de uma fase global, que não muda o ponto). Três exemplos, todos meias-voltas ($180^\circ$):

- **X**: gira em torno do eixo $x$. Troca $\ket{0}$ por $\ket{1}$ e deixa $\ket{\pm}$ onde estão.
- **Z**: gira em torno do eixo $z$. Deixa $\ket{0}$ e $\ket{1}$ parados e leva $\ket{+}$ em $\ket{-}$.
- **H**: gira em torno do eixo $\tfrac{1}{\sqrt2}(\hat x + \hat z)$, a meio caminho entre $x$ e $z$. Leva $\ket{0}$ em $\ket{+}$ e $\ket{1}$ em $\ket{-}$: troca os eixos $x$ e $z$ e inverte o eixo $y$.

![Três esferas de Bloch: X gira meia-volta em torno de x, Z em torno de z, H em torno do eixo entre x e z; em cada uma o estado ψ vai a ψ′ e a mesma meia-volta o traz de volta](/content/basico/meias-voltas-xzh.svg)

Qual porta (X, Y, Z ou H) deixa $\ket{0}$ e $\ket{1}$ no lugar, mas leva $\ket{+}$ em $\ket{-}$? Responda com a letra.

```exercise:text
id: bloch-porta-z
answer: Z
```

## Em Python

Escreva uma função que recebe as amplitudes e retorna `np.array([x, y, z])` de floats reais, com as fórmulas de $\alpha^*\beta$. Dica: `np.conj(estado[0]) * estado[1]` é complexo; use `.real` e `.imag`.

```exercise:python
id: bloch-coordenadas
input: estado | np.ndarray | vetor normalizado com as 2 amplitudes [alfa, beta] (podem ser complexas), formato (2,) | np.array([1, 1]) / np.sqrt(2)
output: bloch_xyz | np.ndarray | coordenadas [x, y, z] do ponto, floats reais, formato (3,) | np.array([1, 0, 0])
---
import numpy as np

def bloch_xyz(estado):
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

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, seção 2.4 (Bloch Sphere Mapping).
