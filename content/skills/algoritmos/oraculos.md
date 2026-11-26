Você tem uma função $f$ guardada numa "caixa-preta": dá para perguntar o valor de $f(x)$, mas não dá para ler o código por dentro. Quantas perguntas são necessárias para descobrir uma propriedade de $f$? Os primeiros algoritmos quânticos respondem a esse tipo de pergunta, e o objeto que torna isso possível é o **oráculo**.

## Como é um algoritmo quântico

Quase todo algoritmo quântico segue o mesmo roteiro:

1. **Preparar** um estado inicial simples, em geral $\ket{0\cdots0}$.
2. **Aplicar portas** (um circuito) que espalham a informação em superposição e fazem as amplitudes interferirem.
3. **Medir** e ler um resultado clássico.

O truque é que o passo 2 faz as amplitudes "erradas" se cancelarem e as "certas" se somarem, de modo que a medida final revela algo útil com alta probabilidade. Quando o algoritmo trabalha com uma função $f$ dada como caixa-preta, o passo 2 inclui chamadas ao oráculo.

<!-- ILUSTRAR: esquema em três blocos horizontais: "preparar |0...0⟩" -> "circuito com portas H e chamadas ao oráculo U_f (caixa cinza)" -> "medir (relógio/medidor)", mostrando o roteiro geral de um algoritmo quântico -->

## O oráculo de bit

Seja $f:\{0,1\}^n \to \{0,1\}$ uma função que recebe $n$ bits e devolve um bit. Uma porta quântica precisa ser reversível (unitária), e $\ket{x}\mapsto\ket{f(x)}$ geralmente não é: se $f$ vale $0$ em duas entradas, não dá para voltar atrás. A saída é **guardar a entrada** e somar o resultado num qubit extra:

$$
U_f\ket{x,y} = \ket{x,\; y\oplus f(x)},
$$

onde $x$ tem $n$ bits, $y$ é um bit e $\oplus$ é a soma módulo 2 (o XOR). Usar $y=0$ dá $U_f\ket{x,0}=\ket{x,f(x)}$, o valor de $f$.

**Exemplo com $n=1$.** Seja $f(0)=0$ e $f(1)=1$ (ou seja, $f(x)=x$). Então $U_f\ket{0,y}=\ket{0,y}$ e $U_f\ket{1,y}=\ket{1,1\oplus y}$: o qubit $y$ só é invertido quando $x=1$. Isso é exatamente a porta **CNOT**. Já com $f(x)=0$ para todo $x$, $U_f$ é a identidade, e com $f(x)=1$ para todo $x$, $U_f=I\otimes X$.

Seja $f(0)=1$ e $f(1)=0$. Qual é o valor do segundo bit depois de aplicar $U_f$ a $\ket{0,1}$?

```exercise:number
id: oraculos-bit-saida
answer: 0
```

$U_f$ é **unitária** (é uma permutação dos estados da base) e é sua própria inversa, pois aplicá-la duas vezes soma $f(x)$ duas vezes e $f(x)\oplus f(x)=0$.

Monte a matriz de $U_f$ para uma função dada pela tabela de valores.

```exercise:python
id: oraculos-matriz-bit
input: f | list | tabela de f: f[x] é 0 ou 1, com len(f) = 2**n | [0, 1]
input: n | int | número de bits de x | 1
output: oraculo_bit | np.ndarray | matriz de U_f, formato (2**(n+1), 2**(n+1)), base ordenada por 2*x + y | np.array([[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]])
---
import numpy as np

def oraculo_bit(f, n):
    return np.eye(2 ** (n + 1))
---
>>> oraculo_bit([0, 1], 1)
np.array([[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]])
---
>>> oraculo_bit([1, 0], 1)
np.array([[0,1,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,1]])
---
>>> oraculo_bit([1, 1], 1)
np.array([[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]])
>>> oraculo_bit([0, 0, 0, 1], 2)[6, 7]
1.0
>>> oraculo_bit([0, 0, 0, 1], 2)[7, 7]
0.0
```

## Phase kickback: o resultado vai para a fase

Agora um truque central. Prepare o qubit extra em $\ket{-}=\tfrac{1}{\sqrt2}(\ket0-\ket1)$ e aplique $U_f$:

$$
U_f\ket{x}\ket{-}=\tfrac{1}{\sqrt2}\big(\ket{x,f(x)}-\ket{x,1\oplus f(x)}\big).
$$

Veja os dois casos:

- Se $f(x)=0$: sobra $\tfrac{1}{\sqrt2}(\ket{x,0}-\ket{x,1})=\ket{x}\ket{-}$, nada muda.
- Se $f(x)=1$: sobra $\tfrac{1}{\sqrt2}(\ket{x,1}-\ket{x,0})=-\ket{x}\ket{-}$, um sinal de menos aparece.

Os dois casos cabem numa fórmula só:

$$
U_f\ket{x}\ket{-}=(-1)^{f(x)}\ket{x}\ket{-}.
$$

O qubit extra continua em $\ket{-}$, intacto, e o valor $f(x)$ "voltou" (*kickback*, em inglês: coice) para o primeiro registrador como uma **fase** $\pm1$. Como o qubit $\ket{-}$ não muda, podemos esquecê-lo e dizer que temos um **oráculo de fase**:

$$
O_f\ket{x}=(-1)^{f(x)}\ket{x},
$$

uma matriz diagonal com $(-1)^{f(x)}$ na diagonal. Por linearidade, numa superposição cada componente $x$ ganha o seu próprio sinal:

$$
O_f\sum_x a_x\ket{x}=\sum_x (-1)^{f(x)}a_x\ket{x}.
$$

<!-- ILUSTRAR: circuito do phase kickback: fio superior "|x⟩" e fio inferior "|−⟩" entram na caixa U_f; na saída aparece "(−1)^{f(x)} |x⟩" no fio superior e "|−⟩" inalterado no inferior, com uma seta curva do fio de baixo para o de cima indicando que a informação "voltou" como fase -->

Se $f(x)=1$ para um certo $x$, qual é o fator que multiplica $\ket{x}$ no oráculo de fase?

```exercise:number
id: oraculos-kickback-sinal
answer: -1
```

O mesmo vale para qualquer autovetor: se $U\ket u=e^{i\varphi}\ket u$ e o controle está em superposição, $\ket u$ passa intacto e a fase $e^{i\varphi}$ vai para o controle. Essa ideia reaparece na estimação de fase.

A fase global $-1$ sozinha é invisível, mas aqui ela é **relativa**: só alguns $x$ trocam de sinal, e é isso que a interferência vai explorar nos próximos algoritmos.

## Registradores e ordem dos bits (revisão)

Você já viu que $n$ qubits guardam um número natural em binário, por exemplo $5=0101_2\Rightarrow\ket{0101}$, e que $n$ qubits cobrem $2^n$ valores. Aqui vale uma **convenção**: o site escreve o bit mais significativo primeiro (*big-endian*), então em $\ket{x_1x_2\cdots x_n}$ o qubit $x_1$ é o de maior peso e o índice na base é $2^{n-1}x_1+\cdots+x_n$. Por exemplo, em $\ket{x,y}$ o índice é $2x+y$. O Qiskit usa a ordem contrária (*little-endian*); cuidado ao comparar com ele.

Quantos qubits são necessários para representar todos os naturais de $0$ a $999$?

```exercise:number
id: oraculos-qubits-1000
answer: 10
```

## Como se constrói $U_f$

Até aqui $f$ foi uma caixa-preta. Se tivermos a tabela de $f$, podemos montar $U_f$ com uma porta $X$ multicontrolada no qubit extra para cada entrada $x$ com $f(x)=1$ (controles ajustados para casar com $x$): funciona, mas o circuito tem tamanho exponencial em $n$. Se $f$ tiver uma fórmula, dá para calculá-la com Toffoli e CNOT usando qubits auxiliares, que depois são desfeitos (descomputação) para não deixar lixo; aí o tamanho é linear. Veja a aula de registradores e o somador quântico. Para uma $f$ com saída de $m$ bits, aplicamos o mesmo raciocínio bit a bit.

## Complexidade de consultas e de circuito

Há duas maneiras de medir o custo de um algoritmo com oráculo:

- **Complexidade de consultas**: quantas vezes chamamos $U_f$ (ou $O_f$). Cada chamada conta como um passo, não importa o que há dentro.
- **Complexidade de circuito**: quantas portas elementares o circuito usa no total, incluindo o interior do oráculo e as portas entre as chamadas.

Os algoritmos das próximas aulas mostram ganhos na complexidade de **consultas**: um algoritmo quântico pode precisar de bem menos perguntas à caixa-preta que qualquer algoritmo clássico. Isso é uma prova limpa de vantagem, mas é mais modesto do que parece: se implementarmos $f$ de verdade, o custo do oráculo entra na conta.

## Resumo

- Um oráculo de bit é $U_f\ket{x,y}=\ket{x,y\oplus f(x)}$, unitário e auto-inverso.
- Com o qubit extra em $\ket{-}$, ele vira um oráculo de fase: $\ket{x}\mapsto(-1)^{f(x)}\ket{x}$.
- Ordem de bits: o mais significativo primeiro (big-endian); $U_f$ tem tamanho exponencial se feito pela tabela e linear se feito por uma fórmula.
- Complexidade de consultas conta chamadas ao oráculo; complexidade de circuito conta portas.

---

Fonte: texto original, com a estrutura do assunto seguindo B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seções 5.1 a 5.4.
