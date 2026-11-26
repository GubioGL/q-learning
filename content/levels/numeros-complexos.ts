import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seção 2.3, e T. G. Wong, Introduction to Classical and Quantum Computing (2022), seção 3.3.3.
const numerosComplexos: Lesson = {
    id: "numeros-complexos",
    title: "Números complexos",
    intro:
        "Um número complexo é um ponto num plano; multiplicar por e^{iθ} gira esse ponto.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seção 2.3, e T. G. Wong, Introduction to Classical and Quantum Computing (2022), seção 3.3.3",
    course: "algebra-linear",
    skill: "numeros-complexos",
    xp: 10,
    challenges: [
        {
            question: "Qual é o módulo de 3 + 4i?",
            options: ["7", "√7", "5", "25"],
            answer: 2,
            explanation: "|z| = √(3² + 4²) = √25 = 5. Somar 3 e 4 ou esquecer a raiz são os erros típicos.",
        },
        {
            question: "Qual é o conjugado de 2 − 3i?",
            options: ["−2 − 3i", "2 + 3i", "3 − 2i", "−2 + 3i"],
            answer: 1,
            explanation: "O conjugado só troca o sinal da parte imaginária: 2 + 3i.",
        },
        {
            question: "Quanto vale e^{iπ}?",
            options: ["1", "−1", "i", "−i"],
            answer: 1,
            explanation: "cos π + i sen π = −1 + 0i.",
        },
        {
            question: "Qual é o módulo de e^{iθ} para qualquer θ real?",
            options: ["θ", "0", "cos θ", "1"],
            answer: 3,
            explanation: "cos²θ + sen²θ = 1: e^{iθ} sempre está no círculo de raio 1.",
        },
        {
            question: "O que acontece com o ponto z no plano complexo ao multiplicá-lo por e^{iπ/2}?",
            options: ["Gira 90° e mantém a distância à origem", "Gira 90° e dobra a distância", "Reflete em relação ao eixo horizontal", "Gira 180° e mantém a distância"],
            answer: 0,
            explanation: "Multiplicar por um número de módulo 1 só soma o ângulo (aqui 90°); o módulo não muda.",
        },
        {
            question: "Em z = r e^{iθ}, o que são r e θ?",
            options: ["r é a parte real e θ a imaginária", "r é o ângulo e θ a distância", "r é o módulo e θ o ângulo", "r é o conjugado e θ o módulo"],
            answer: 2,
            explanation: "Forma polar: r é a distância à origem e θ o ângulo com o eixo horizontal.",
        },
    ],
};

export default numerosComplexos;
