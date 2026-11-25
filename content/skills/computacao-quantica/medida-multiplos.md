Com vários qubits, podemos medir todos ou só alguns. A regra de Born continua a mesma, mas a medida parcial traz uma novidade: o que acontece com os qubits que **não** foram medidos?

## Medindo todos

Se $\ket{\psi} = \sum c_{ij}\ket{ij}$, a probabilidade de obter o resultado $ij$ é $|c_{ij}|^2$, e o estado colapsa em $\ket{ij}$.

Para $\ket{\psi} = \tfrac12\ket{00} + \tfrac12\ket{01} + \tfrac{1}{\sqrt2}\ket{11}$, qual é a probabilidade de obter $11$?

```exercise:number
id: multiplos-todos
answer: 0.5
tolerance: 0.001
```

## Medindo só um

Para medir só o primeiro qubit, somamos as probabilidades de todos os termos compatíveis:

$$
P(\text{primeiro} = 0) = |c_{00}|^2 + |c_{01}|^2.
$$

Depois da medida, ficam só os termos compatíveis, **renormalizados**.

![Medir o primeiro qubit: somar, filtrar e renormalizar](/content/computacao-quantica/medida-parcial.svg)

No estado acima, qual é a probabilidade de o **primeiro** qubit dar $0$?

```exercise:number
id: multiplos-parcial
answer: 0.5
tolerance: 0.001
```

Se deu $0$, sobraram $\tfrac12\ket{00} + \tfrac12\ket{01}$. Dividindo pela raiz da probabilidade, $\sqrt{1/2}$, o estado fica

$$
\frac{1}{\sqrt2}\big(\ket{00} + \ket{01}\big) = \ket{0}\otimes\ket{+}.
$$

E se o primeiro deu $1$? Qual é a probabilidade de o **segundo** dar $1$ em seguida?

```exercise:number
id: multiplos-condicional
answer: 1
```

Repare: antes da medida, o segundo qubit tinha probabilidade $\tfrac14 + \tfrac12 = \tfrac34$ de dar $1$. O resultado do primeiro mudou nossa previsão para o segundo. Os dois estavam **correlacionados**.

## Em Python

Escreva uma função que recebe as 4 amplitudes, na ordem $00, 01, 10, 11$, e o resultado da medida do primeiro qubit. Ela devolve o par `(probabilidade, estado_depois)`. Os testes só usam resultados com probabilidade maior que zero.

```exercise:python
id: multiplos-codigo
---
def medir_primeiro(estado, resultado):
    probabilidade = 0
    depois = list(estado)
    return probabilidade, depois
---
perto = lambda u, v: all(abs(a - b) < 1e-9 for a, b in zip(u, v))
r = 2**-0.5
p, e = medir_primeiro([0.5, 0.5, 0, r], 0)
assert abs(p - 0.5) < 1e-9
assert perto(e, [r, r, 0, 0])
p, e = medir_primeiro([0.5, 0.5, 0, r], 1)
assert abs(p - 0.5) < 1e-9
assert perto(e, [0, 0, 0, 1])
p, e = medir_primeiro([0.6, 0, 0, 0.8j], 1)
assert abs(p - 0.64) < 1e-9
assert perto(e, [0, 0, 0, 1j])
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 4.
