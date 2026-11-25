import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 4.
const produtoTensorial: Lesson = {
    id: "produto-tensorial",
    title: "Produto tensorial",
    intro:
        "O produto tensorial junta qubits. Com n qubits há 2ⁿ amplitudes. A ordem da base é |00⟩, |01⟩, |10⟩, |11⟩.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    course: "computacao-quantica",
    skill: "produto-tensorial",
    xp: 10,
    challenges: [
        {
            question: "Quantas amplitudes tem um estado de 3 qubits?",
            options: ["3", "6", "8", "9"],
            answer: 2,
            explanation: "2³ = 8.",
        },
        {
            question: "Quanto é |1⟩ ⊗ |0⟩?",
            options: ["|01⟩", "|10⟩", "|11⟩", "|1⟩ + |0⟩"],
            answer: 1,
            explanation: "O qubit da esquerda vem primeiro.",
        },
        {
            question: "Qual vetor representa |01⟩?",
            options: ["(1, 0, 0, 0)", "(0, 1, 0, 0)", "(0, 0, 1, 0)", "(0, 0, 0, 1)"],
            answer: 1,
            explanation: "|01⟩ é o segundo na ordem 00, 01, 10, 11.",
        },
        {
            question: "Quanto é (I ⊗ X)|00⟩?",
            options: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
            answer: 1,
            explanation: "X age só no segundo qubit.",
        },
        {
            question: "Ao medir n qubits, quantos bits obtemos?",
            options: ["n", "2n", "2ⁿ", "n²"],
            answer: 0,
            explanation: "Existem 2ⁿ amplitudes, mas a medida devolve só n bits.",
        },
    ],
};

export default produtoTensorial;
