import type { LevelText } from "@/lib/lesson";

const vetores: LevelText = {
    title: "Vectors: kets and bras",
    intro:
        "A ket is a column vector. The bra is the row vector with the conjugated components.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 3",
    challenges: [
        {
            question: "Which vector represents |1⟩?",
            options: ["(1, 0)", "(0, 1)", "(1, 1)", "(0, 0)"],
            explanation: "|1⟩ has amplitude 0 on |0⟩ and 1 on |1⟩.",
        },
        {
            question: "What is the conjugate of 2 − 3i?",
            options: ["−2 + 3i", "3 − 2i", "2 + 3i", "−2 − 3i"],
            explanation: "Only the sign of the imaginary part changes.",
        },
        {
            question: "What is |3 + 4i|²?",
            options: ["5", "7", "12", "25"],
            explanation: "3² + 4² = 25.",
        },
        {
            question: "If |ψ⟩ = (1, i)/√2, what is ⟨ψ|?",
            options: ["(1, i)/√2", "(1, −i)/√2", "(i, 1)/√2", "(−1, i)/√2"],
            explanation: "The bra conjugates the components: i becomes −i.",
        },
        {
            question: "Which operation turns a ket into a bra?",
            options: ["The inverse", "Only the transpose", "Only the conjugate", "The conjugate transpose"],
            explanation: "It is the dagger (†): transpose and conjugate.",
        },
    ],
};

export default vetores;
