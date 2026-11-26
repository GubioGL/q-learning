Resolver sistemas lineares $A\vec x=\vec b$ é o cavalo de batalha da ciência computacional, e o tamanho do sistema cresce rápido. O algoritmo HHL (de Harrow, Hassidim e Lloyd) usa a estimação de fase para "inverter" a matriz $A$ **dentro de um estado quântico**, com custo que cresce só com $\log N$ no tamanho. Vale entender o que ele promete, e também o que **não** promete.

## O problema e o que a saída é

Seja $A$ uma matriz $N\times N$ **hermitiana** (igual à sua adjunta; todos os autovalores são reais) com $N=2^n$, e $\vec b$ um vetor. Queremos $\vec x=A^{-1}\vec b$. Em vez de entregar os números $x_j$, o HHL entrega um estado de $n$ qubits com essas amplitudes:

$$
\ket{b}=\frac{1}{\|\vec b\|}\sum_j b_j\ket j,\qquad \ket{x}=\frac{1}{\|\vec x\|}\sum_j x_j\ket j .
$$

Estados quânticos já são normalizados, então perde-se o comprimento de $\vec x$ (só a direção resta).

## Exemplo $2\times2$ resolvido à mão

$$
A=\begin{pmatrix}2&1\\1&2\end{pmatrix},\qquad \vec b=\begin{pmatrix}1\\0\end{pmatrix}\ (\ket b=\ket0).
$$

$A$ tem autovetores $\ket+=\tfrac1{\sqrt2}(1,1)$ com autovalor $\lambda_1=3$, e $\ket-=\tfrac1{\sqrt2}(1,-1)$ com $\lambda_2=1$ (confira: $A\ket+=(3,3)/\sqrt2$). Escreva $\ket b$ na base de autovetores:

$$
\ket0=\tfrac1{\sqrt2}\ket+ + \tfrac1{\sqrt2}\ket-.
$$

Inverter $A$ é dividir cada componente pelo seu autovalor:

$$
A^{-1}\ket0=\tfrac1{\sqrt2}\left(\tfrac13\ket+ + \tfrac11\ket-\right)\ \propto\ \tfrac13\ket++\ket-\ \propto\ (2,-1)^T.
$$

(porque $\tfrac13(1,1)+(1,-1)=(\tfrac43,-\tfrac23)$.) Normalizando, $\ket x=\tfrac1{\sqrt5}(2\ket0-\ket1)$. Confira multiplicando $A$ por $(2,-1)$: dá $(3,0)$, proporcional a $\vec b$. 

A ideia do HHL é fazer exatamente isso com $N$ gigante: decompor $\ket b$ em autovetores de $A$ (sem conhecê-los), dividir cada componente pelo autovalor, recompor.

## Quatro palavras novas

- **Registro de relógio**: grupo de $t$ qubits extra, onde a estimação de fase escreve o autovalor (é o "registro" da estimação de fase).
- **Ancila**: um qubit auxiliar, que começa em $\ket0$ e serve de "marcador" do ramo certo.
- **Descomputar**: aplicar ao contrário uma etapa para apagar o que ela escreveu, e assim desemaranhar o registro de volta a $\ket0$.
- **Pós-seleção**: medir a ancila e **guardar só os resultados** em que deu 1, repetindo o algoritmo quando deu 0.

## Os passos, com o exemplo

<!-- ILUSTRAR: diagrama de blocos do HHL com três registros: ancila (1 qubit), registro de relógio (t qubits) e registro de dados (n qubits); etapas em sequência: preparar |b>, estimação de fase de e^{iAτ}, rotação controlada da ancila, estimação de fase inversa, medida da ancila; cada etapa rotulada e com o estado ao lado -->

<!-- ILUSTRAR: plano 2D com os vetores |+>=(1,1)/√2 e |->=(1,-1)/√2 como eixos tracejados, o vetor b=|0> decomposto neles, e o vetor x ∝ (2,-1) onde a componente de |+> foi dividida por 3 e a de |-> por 1 -->

Para não confundir com o $t$ da estimação de fase (número de qubits), chamamos de $\tau$ o **tempo** em $e^{iA\tau}$.

1. **Carregar $\ket b$.** Prepara-se o registro de dados em $\ket b=\sum_j\beta_j\ket{u_j}$, onde $\ket{u_j}$ são os autovetores de $A$ (desconhecidos) e $\beta_j=\braket{u_j}{b}$. No exemplo, $\beta_1=\beta_2=\tfrac1{\sqrt2}$.
2. **Estimação de fase de $e^{iA\tau}$.** A matriz $e^{iA\tau}$ é unitária (porque $A$ é hermitiana) e tem os mesmos autovetores de $A$, com autovalores $e^{i\lambda_j\tau}=e^{2\pi i\varphi_j}$, onde $\varphi_j=\lambda_j\tau/2\pi$ é proporcional a $\lambda_j$. A estimação de fase escreve $\varphi_j$ (e portanto $\lambda_j$) no relógio:
$$
\sum_j\beta_j\ket{u_j}\ket{\tilde\lambda_j}.
$$
Aqui supomos $A$ com autovalores positivos e $\tau$ tal que $\lambda_{\max}\tau<2\pi$ (assim $\varphi_j\in(0,1)$; autovalores negativos dariam $\varphi$ perto de 1 e exigiriam uma leitura com sinal). **No exemplo**, escolha $\tau=\pi/2$: então $\varphi=\lambda/4$, e os autovalores $3$ e $1$ viram $\varphi=\tfrac34$ e $\tfrac14$, exatos com 2 qubits de relógio ($\ket{11}$ e $\ket{01}$). O estado fica $\tfrac1{\sqrt2}\big(\ket+\ket{11}+\ket-\ket{01}\big)$.
3. **Rotação controlada pelo relógio.** Para cada valor $\lambda$ lido no relógio, gira-se a ancila:
$$
\ket0\ \longmapsto\ \sqrt{1-\frac{C^2}{\lambda^2}}\,\ket0+\frac{C}{\lambda}\,\ket1 .
$$
A constante $C$ precisa de $C\le\lambda_{\min}$ para que $C/\lambda\le1$ seja uma amplitude válida. **No exemplo**, com $C=1$: o ramo de $\ket+$ ($\lambda=3$) fica com $\sqrt{8/9}\ket0+\tfrac13\ket1$, e o de $\ket-$ ($\lambda=1$) fica com $\ket1$ (sem $\ket 0$).
4. **Descomputar.** Aplica-se a estimação de fase **ao contrário**, o que zera o relógio de volta para $\ket{00}$ e o desemaranha (apaga-se o "lixo" para que ele não atrapalhe a interferência). **No exemplo**, resta $\tfrac1{\sqrt2}\big[\ket+(\sqrt{8/9}\ket0+\tfrac13\ket1)+\ket-\ket1\big]\ket{00}$.
5. **Medir a ancila.** Se der $1$, o registro de dados fica
$$
\ket{x}\ \propto\ \sum_j \frac{\beta_j}{\lambda_j}\ket{u_j}=A^{-1}\ket b ,
$$
que no exemplo é $\propto\tfrac13\ket++\ket-\propto(2,-1)$, como na conta à mão. Se der $0$, tenta-se de novo.

O efeito da rotação foi pôr $1/\lambda_j$ na amplitude, e a medida da ancila isolou esse ramo.

## Probabilidade de sucesso

A probabilidade de a ancila dar 1 é
$$
P_1=\sum_j|\beta_j|^2\frac{C^2}{\lambda_j^2}.
$$
No exemplo com $C=1$: $P_1=\tfrac12\cdot\tfrac19+\tfrac12\cdot1=\tfrac59$. Se usássemos $C=0{,}5$ (ainda $\le\lambda_{\min}=1$), qual seria $P_1$ (4 casas decimais)?

```exercise:number
id: hhl-prob-c-meio
answer: 0.1389
tolerance: 0.0005
```

Autovalores muito diferentes pioram isso. O **número de condição** é $\kappa=\lambda_{\max}/\lambda_{\min}$ (no exemplo, $3/1=3$). Se $A$ for reescalada para $\lambda_{\max}=1$, então $\lambda_{\min}=1/\kappa$ e $C\approx1/\kappa$, o que pode deixar $P_1$ da ordem de $1/\kappa^2$ (reduzida com amplificação de amplitude, a um custo de ordem $\kappa$ repetições). Quanto vale $P_1$ para $A=\mathrm{diag}(1,100)$ ($\kappa=100$), $C=1$ e $\ket b=\ket1$ (só no autovetor de autovalor 100)?

```exercise:number
id: hhl-prob-kappa-grande
answer: 0.0001
tolerance: 0.000001
```

## Conferindo no computador

A parte "quântica" do HHL, com $A$ pequena, pode ser simulada classicamente: decompõe-se $\ket b$ nos autovetores, divide-se por $\lambda_j$ e normaliza. Implemente isso. (Use `np.linalg.eigh`, que devolve autovalores e autovetores de uma matriz hermitiana: `lamb, U = np.linalg.eigh(A)`, e as colunas de `U` são os $\ket{u_j}$. A decomposição de $\ket b$ é `beta = U.T @ b`; a solução é `U @ (beta / lamb)`, depois normalizada.)

```exercise:python
id: hhl-estado-x
input: A | np.ndarray | matriz real simétrica positiva definida, formato (N, N) | np.array([[2, 1], [1, 2]])
input: b | np.ndarray | vetor normalizado, formato (N,) | np.array([1, 0])
output: estado_x | np.ndarray | o estado normalizado proporcional a A^{-1} b, formato (N,), com a primeira componente não nula positiva | np.array([2, -1]) / np.sqrt(5)
---
import numpy as np

def estado_x(A, b):
    return b
---
>>> estado_x(np.array([[2, 1], [1, 2]]), np.array([1, 0]))
np.array([2, -1]) / np.sqrt(5)
---
>>> estado_x(np.array([[1, 0], [0, 2]]), np.array([1, 1]) / np.sqrt(2))
np.array([2, 1]) / np.sqrt(5)
---
>>> estado_x(np.diag([1.0, 2.0, 4.0]), np.ones(3) / np.sqrt(3))
np.array([4, 2, 1]) / np.sqrt(21)
```

Agora a probabilidade de sucesso da ancila:

```exercise:python
id: hhl-prob-ancila
input: A | np.ndarray | matriz real simétrica positiva definida, formato (N, N) | np.array([[2, 1], [1, 2]])
input: b | np.ndarray | vetor normalizado, formato (N,) | np.array([1, 0])
input: C | float | constante da rotação, C <= menor autovalor | 1.0
output: prob_ancila | float | P(ancila = 1) = soma de |beta_j|^2 C^2 / lambda_j^2 | 0.5555555555555556
---
import numpy as np

def prob_ancila(A, b, C):
    return 0.0
---
>>> prob_ancila(np.array([[2, 1], [1, 2]]), np.array([1, 0]), 1.0)
0.5555555555555556
---
>>> prob_ancila(np.array([[2, 1], [1, 2]]), np.array([1, 0]), 0.5)
0.1388888888888889
---
>>> prob_ancila(np.diag([1.0, 2.0, 4.0]), np.ones(3) / np.sqrt(3), 1.0)
0.4375
```

## Limitações: o que o HHL **não** resolve

O custo cresce com $\log N$ nos qubits, mas as letras miúdas pesam:

- **Leitura.** A saída é o estado $\ket x$, não a lista $x_1,\dots,x_N$. Medir só dá uma amostra por execução, e reconstruir os $N$ números custa pelo menos da ordem de $N$ execuções, o que anula o ganho. O HHL serve quando queremos uma **grandeza global** de $\ket x$ (como $\bra x M\ket x$, para um observável $M$, ou comparar com outro estado), não a solução inteira.
- **Entrada.** Preparar $\ket b$ também precisa ser barato; carregar um vetor arbitrário de $N$ números custa da ordem de $N$ operações, a não ser que $\vec b$ tenha estrutura (ou venha de um passo quântico anterior).
- **Esparsidade.** Implementar $e^{iAt}$ de forma eficiente exige que $A$ seja **esparsa** (poucos elementos não nulos por linha, digamos $s$) e que se saiba calcular onde estão e quanto valem. O custo cresce com $s$.
- **Condicionamento.** O custo cresce com $\kappa$ (na versão original, com $\kappa^2$; versões posteriores melhoraram para quase linear em $\kappa$), e se $A$ for quase singular ($\lambda_{\min}$ perto de 0) o HHL fica caro. Também é preciso um relógio com resolução suficiente para separar $\lambda_{\min}$ de 0.

Quando a matriz é esparsa e bem condicionada e só se quer uma propriedade da solução, o ganho pode ser exponencial. Para matrizes de **posto baixo** com acesso por amostragem, porém, algoritmos clássicos "dequantizados" eliminam a vantagem exponencial; para esparsas e bem condicionadas não se espera isso. Por isso se diz que o HHL é uma **sub-rotina** promissora, e não uma solução geral para sistemas lineares.

O que torna a leitura de todas as componentes de $\ket x$ cara no HHL?

```exercise:text
id: hhl-leitura
answer: medir dá uma amostra por execução | precisa de muitas medidas | muitas medidas | N medidas | repetir a medida muitas vezes | só se mede uma amostra
```

> Para se aprofundar: B. Valiron, *Introduction to Quantum Algorithms and Quantum Programming* (notas de curso, 2025), seção 6.3. Artigo original: A. Harrow, A. Hassidim, S. Lloyd, "Quantum algorithm for linear systems of equations" (2009).
