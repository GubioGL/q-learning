Um bit é $0$ **ou** $1$. Um qubit também tem esses dois estados, mas pode estar numa **combinação** deles. Essa é a primeira ideia realmente nova da computação quântica.

## Os estados $\ket{0}$ e $\ket{1}$

Escrevemos os estados de um qubit com o símbolo $\ket{\cdot}$, chamado **ket**. Os dois estados básicos são $\ket{0}$ e $\ket{1}$, que fazem o papel dos bits $0$ e $1$. Fisicamente podem ser dois níveis de energia de um átomo, duas polarizações de um fóton ou duas correntes num circuito supercondutor.

## Superposição

O estado geral de um qubit é

$$
\ket{\psi} = \alpha \ket{0} + \beta \ket{1},
$$

em que $\alpha$ e $\beta$ são números complexos chamados **amplitudes**. Quando as duas são diferentes de zero, dizemos que o qubit está em **superposição**.

As amplitudes não são livres: o estado precisa estar **normalizado**,

$$
|\alpha|^2 + |\beta|^2 = 1.
$$

![Amplitudes 0,6 e 0,8 e seus quadrados 0,36 e 0,64](/content/basico/amplitudes.svg)

O motivo aparece na próxima skill: $|\alpha|^2$ e $|\beta|^2$ são probabilidades.

Se $\alpha = 0{,}6$ e $\beta$ é real e positivo, quanto vale $\beta$?

```exercise:number
id: qubit-beta
answer: 0.8
tolerance: 0.001
```

## Dois estados famosos

As superposições mais usadas têm nome próprio:

$$
\ket{+} = \frac{1}{\sqrt 2}\big(\ket{0} + \ket{1}\big), \qquad \ket{-} = \frac{1}{\sqrt 2}\big(\ket{0} - \ket{1}\big).
$$

O sinal de menos parece detalhe, mas não é: $\ket{+}$ e $\ket{-}$ são estados diferentes, e portas quânticas conseguem distingui-los. Essa diferença entre as amplitudes se chama **fase relativa**.

Já multiplicar o estado **inteiro** por um número de módulo 1 (uma **fase global**) não muda nada do que se pode observar: $-\ket{0}$ e $\ket{0}$ são fisicamente o mesmo estado.

Qual é o módulo ao quadrado da amplitude complexa $\dfrac{1 + i}{2}$? (Lembre: $|a + bi|^2 = a^2 + b^2$.)

```exercise:number
id: qubit-modulo
answer: 0.5
```

## O que superposição não é

Um qubit em superposição **não** é um bit clássico cujo valor desconhecemos. Uma moeda escondida já é cara ou coroa. As amplitudes de um qubit podem ser negativas e se **cancelar**, o que probabilidades nunca fazem.

## Em Python

Números complexos já existem em Python: `1j` é $i$, e `abs(z)` é o módulo. Escreva uma função que recebe quaisquer amplitudes (não ambas nulas) e devolve o par normalizado.

```exercise:python
id: qubit-normalizar
input: alfa, beta | int / float / complex | amplitudes reais ou complexas, não ambas zero | 3, 4
output: normalizar | tuple | as duas amplitudes divididas pela norma | (0.6, 0.8)
---
def normalizar(alfa, beta):
    # divida as duas amplitudes pela norma do estado
    return (alfa, beta)
---
>>> normalizar(3, 4)
(0.6, 0.8)
---
>>> normalizar(0, 5)
(0, 1)
>>> normalizar(1, 1)
(2**-0.5, 2**-0.5)
---
>>> normalizar(1, 1j)
(2**-0.5, 1j * 2**-0.5)
>>> sum(abs(x)**2 for x in normalizar(1 + 1j, 2))
1
```

> Para se aprofundar: T. G. Wong, *Introduction to Classical and Quantum Computing*, cap. 2.
