import type { LevelText } from "@/lib/lesson";

const produtoTensorial: LevelText = {
    title: "Tensor product",
    intro:
        "The tensor product joins qubits. With n qubits there are 2ⁿ amplitudes. The order of the basis is |00⟩, |01⟩, |10⟩, |11⟩.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 4",
    challenges: [
        {
            question: "How many amplitudes does a 3-qubit state have?",
            options: ["3", "6", "8", "9"],
            explanation: "2³ = 8.",
        },
        {
            question: "What is |1⟩ ⊗ |0⟩?",
            options: ["|01⟩", "|10⟩", "|11⟩", "|1⟩ + |0⟩"],
            explanation: "The qubit on the left comes first.",
        },
        {
            question: "Which vector represents |01⟩?",
            options: ["(1, 0, 0, 0)", "(0, 1, 0, 0)", "(0, 0, 1, 0)", "(0, 0, 0, 1)"],
            explanation: "|01⟩ is the second in the order 00, 01, 10, 11.",
        },
        {
            question: "What is (I ⊗ X)|00⟩?",
            options: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
            explanation: "X acts only on the second qubit.",
        },
        {
            question: "When we measure n qubits, how many bits do we get?",
            options: ["n", "2n", "2ⁿ", "n²"],
            explanation: "There are 2ⁿ amplitudes, but the measurement returns only n bits.",
        },
    ],
};

export default produtoTensorial;
