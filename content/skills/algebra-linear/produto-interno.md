Quão parecidos são dois estados? A resposta é um número só: o **produto interno**.

## Bra vezes ket

Multiplicando a linha $\bra{\phi}$ pela coluna $\ket{\psi}$, obtemos um número complexo, o **braket**:

$$
\braket{\phi|\psi} = \begin{pmatrix} c^* & d^* \end{pmatrix}\begin{pmatrix} \alpha \\ \beta \end{pmatrix} = c^*\alpha + d^*\beta,
$$

em que $\ket{\phi} = c\ket{0} + d\ket{1}$. Trocar a ordem conjuga o resultado: $\braket{\psi|\phi} = \braket{\phi|\psi}^*$.

Quanto vale $\braket{+|0}$? (Use três casas decimais.)

```exercise:number
id: interno-mais-zero
answer: 0.7071
tolerance: 0.001
```

## Norma e normalização

O produto interno de um estado com ele mesmo é a soma dos módulos ao quadrado:

$$
\braket{\psi|\psi} = |\alpha|^2 + |\beta|^2.
$$

Estar normalizado é, portanto, o mesmo que $\braket{\psi|\psi} = 1$.

Se $\ket{\psi} = A\left(\ket{0} + 2\ket{1}\right)$ e queremos $\braket{\psi|\psi} = 1$, quanto vale $A^2$ (com $A$ real)?

```exercise:number
id: interno-normalizacao
answer: 0.2
tolerance: 0.001
```

## Estados ortogonais

Quando $\braket{\phi|\psi} = 0$, os estados são **ortogonais**: existe uma medida que os distingue com certeza. É o caso de $\ket{0}$ e $\ket{1}$, e também de $\ket{+}$ e $\ket{-}$:

$$
\braket{+|-} = \frac12\big(1\cdot 1 + 1\cdot(-1)\big) = 0.
$$

Na esfera de Bloch, estados ortogonais ficam em pontos **opostos**, a $180^\circ$ um do outro.

Um conjunto de estados normalizados e ortogonais entre si é **ortonormal**. Em símbolos, $\braket{e_i|e_j} = \delta_{ij}$, que vale $1$ se $i = j$ e $0$ se não.

Os estados $\tfrac{1}{\sqrt2}(\ket{0} + i\ket{1})$ e $\tfrac{1}{\sqrt2}(\ket{0} - i\ket{1})$ são ortogonais? Responda `sim` ou `não`.

```exercise:text
id: interno-ortogonais
answer: sim
```

Cuidado com o conjugado: $\begin{pmatrix}1 & -i\end{pmatrix}\begin{pmatrix}1 \\ -i\end{pmatrix} = 1 + i^2 = 0$.

## Em Python

```exercise:python
id: interno-codigo
---
def produto_interno(phi, psi):
    # <phi|psi>: conjugue as componentes de phi
    return 0
---
assert produto_interno([1, 0], [0, 1]) == 0
assert produto_interno([1j, 0], [1, 0]) == -1j
assert produto_interno([1, 1j], [1, -1j]) == 0
assert abs(produto_interno([0.6, 0.8j], [0.6, 0.8j]) - 1) < 1e-9
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 3.
