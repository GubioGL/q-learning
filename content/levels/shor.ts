import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), sec. 6.2.
const shor: Lesson = {
    id: "shor",
    title: "Algoritmo de Shor",
    intro: "Fatorar vira achar o período de aˣ mod N, e o período sai da estimação de fase.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (notas de curso, 2025), seção 6.2",
    course: "algoritmos",
    skill: "shor",
    xp: 20,
    challenges: [
        {
            question: "Qual é o período de 2ˣ mod 21 (1, 2, 4, 8, 16, 11, 1, …)?",
            options: ["3", "6", "5", "10"],
            answer: 1,
            explanation: "O menor r > 0 com 2^r ≡ 1 (mod 21) é 6.",
        },
        {
            question: "Com N = 15, a = 11 e r = 2, quais divisores saem de mdc(a^{r/2} ± 1, N)?",
            options: ["1 e 15", "2 e 7", "3 e 5", "4 e 11"],
            answer: 2,
            explanation: "a^{r/2} = 11: mdc(10, 15) = 5 e mdc(12, 15) = 3.",
        },
        {
            question: "Em qual caso o sorteio de a deve ser descartado?",
            options: ["r par e a^{r/2} ≢ −1 (mod N)", "r é potência de 2", "mdc(a, N) = 1", "r ímpar, ou a^{r/2} ≡ −1 (mod N)"],
            answer: 3,
            explanation: "Com r ímpar não há r/2; com a^{r/2} ≡ −1, N divide a^{r/2}+1 e os mdc's dão só 1 e N.",
        },
        {
            question: "A unitária da estimação de fase do Shor é...",
            options: ["U_a|y⟩ = |a + y mod N⟩", "U_a|y⟩ = |a·y mod N⟩", "U_a|y⟩ = |y^a mod N⟩", "a QFT sobre N"],
            answer: 1,
            explanation: "Multiplicar por a módulo N roda o ciclo 1 → a → a² → …; sua fase é s/r.",
        },
        {
            question: "Por que se usa |1⟩ no registro alvo, sem conhecer os autoestados de U_a?",
            options: ["Porque |1⟩ é um autoestado de fase 0", "Porque |1⟩ é a soma uniforme dos autoestados |u_s⟩, e um s ao acaso é sorteado", "Porque medir |1⟩ dá o período diretamente", "Porque U_a não altera |1⟩"],
            answer: 1,
            explanation: "Σ_s |u_s⟩/√r = |1⟩, então a estimação de fase entrega s/r para um s aleatório.",
        },
        {
            question: "Com N = 15 e t = 8, a medida y = 64 dá y/2^t = 1/4. Que candidato a r sai?",
            options: ["8", "64", "4", "2"],
            answer: 2,
            explanation: "O denominador de 1/4 é 4, e 7⁴ ≡ 1 (mod 15) confirma para a = 7.",
        },
    ],
};

export default shor;
