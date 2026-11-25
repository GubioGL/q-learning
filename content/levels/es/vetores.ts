import type { LevelText } from "@/lib/lesson";

const vetores: LevelText = {
    title: "Vectores: kets y bras",
    intro:
        "Un ket es un vector columna. El bra es el vector fila con las componentes conjugadas.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    challenges: [
        {
            question: "¿Qué vector representa |1⟩?",
            options: ["(1, 0)", "(0, 1)", "(1, 1)", "(0, 0)"],
            explanation: "|1⟩ tiene amplitud 0 en |0⟩ y 1 en |1⟩.",
        },
        {
            question: "¿Cuál es el conjugado de 2 − 3i?",
            options: ["−2 + 3i", "3 − 2i", "2 + 3i", "−2 − 3i"],
            explanation: "Solo cambia el signo de la parte imaginaria.",
        },
        {
            question: "¿Cuánto vale |3 + 4i|²?",
            options: ["5", "7", "12", "25"],
            explanation: "3² + 4² = 25.",
        },
        {
            question: "Si |ψ⟩ = (1, i)/√2, ¿cuál es ⟨ψ|?",
            options: ["(1, i)/√2", "(1, −i)/√2", "(i, 1)/√2", "(−1, i)/√2"],
            explanation: "El bra conjuga las componentes: i pasa a −i.",
        },
        {
            question: "¿Qué operación transforma un ket en bra?",
            options: ["La inversa", "Solo la transposición", "Solo el conjugado", "El conjugado transpuesto"],
            explanation: "Es la daga (†): transponer y conjugar.",
        },
    ],
};

export default vetores;
