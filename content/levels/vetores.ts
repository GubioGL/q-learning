import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 3.
const vetores: Lesson = {
    id: "vetores",
    title: "Vetores: kets e bras",
    intro:
        "Um ket é um vetor coluna. O bra é o vetor linha com as componentes conjugadas.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    course: "algebra-linear",
    skill: "vetores",
    xp: 10,
    challenges: [
        {
            question: "Qual vetor representa |1⟩?",
            options: ["(1, 0)", "(0, 1)", "(1, 1)", "(0, 0)"],
            answer: 1,
            explanation: "|1⟩ tem amplitude 0 em |0⟩ e 1 em |1⟩.",
        },
        {
            question: "Qual é o conjugado de 2 − 3i?",
            options: ["−2 + 3i", "3 − 2i", "2 + 3i", "−2 − 3i"],
            answer: 2,
            explanation: "Só o sinal da parte imaginária muda.",
        },
        {
            question: "Quanto vale |3 + 4i|²?",
            options: ["5", "7", "12", "25"],
            answer: 3,
            explanation: "3² + 4² = 25.",
        },
        {
            question: "Se |ψ⟩ = (1, i)/√2, qual é ⟨ψ|?",
            options: ["(1, i)/√2", "(1, −i)/√2", "(i, 1)/√2", "(−1, i)/√2"],
            answer: 1,
            explanation: "O bra conjuga as componentes: i vira −i.",
        },
        {
            question: "Qual operação transforma um ket em bra?",
            options: ["A inversa", "Só a transposição", "Só o conjugado", "O conjugado transposto"],
            answer: 3,
            explanation: "É a adaga (†): transpor e conjugar.",
        },
    ],
};

export default vetores;
