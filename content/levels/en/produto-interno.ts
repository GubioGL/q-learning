import type { LevelText } from "@/lib/lesson";

const produtoInterno: LevelText = {
    title: "Inner product",
    intro:
        "The inner product ⟨φ|ψ⟩ multiplies the conjugated components of φ by those of ψ and adds them. Orthogonal states have inner product zero.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 3",
    challenges: [
        {
            question: "What is ⟨0|1⟩?",
            options: ["0", "1", "1/√2", "i"],
            explanation: "|0⟩ and |1⟩ are orthogonal.",
        },
        {
            question: "What is ⟨+|+⟩?",
            options: ["0", "1/2", "1/√2", "1"],
            explanation: "|+⟩ is normalized.",
        },
        {
            question: "What is ⟨+|1⟩?",
            options: ["0", "1/2", "1/√2", "1"],
            explanation: "The amplitude of |1⟩ in |+⟩ is 1/√2.",
        },
        {
            question: "Which pair is orthogonal?",
            options: ["|0⟩ and |+⟩", "|1⟩ and |−⟩", "|+⟩ and |−⟩", "|0⟩ and −|0⟩"],
            explanation: "(1·1 + 1·(−1))/2 = 0.",
        },
        {
            question: "If ⟨φ|ψ⟩ = 2i/3, what is ⟨ψ|φ⟩?",
            options: ["2i/3", "−2i/3", "2/3", "3/(2i)"],
            explanation: "Swapping the order conjugates the result.",
        },
    ],
};

export default produtoInterno;
