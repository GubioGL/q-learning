import type { LevelText } from "@/lib/lesson";

const produtoTensorial: LevelText = {
    title: "Producto tensorial",
    intro:
        "El producto tensorial une qubits. Con n qubits hay 2ⁿ amplitudes. El orden de la base es |00⟩, |01⟩, |10⟩, |11⟩.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    challenges: [
        {
            question: "¿Cuántas amplitudes tiene un estado de 3 qubits?",
            options: ["3", "6", "8", "9"],
            explanation: "2³ = 8.",
        },
        {
            question: "¿Cuánto es |1⟩ ⊗ |0⟩?",
            options: ["|01⟩", "|10⟩", "|11⟩", "|1⟩ + |0⟩"],
            explanation: "El qubit de la izquierda va primero.",
        },
        {
            question: "¿Qué vector representa |01⟩?",
            options: ["(1, 0, 0, 0)", "(0, 1, 0, 0)", "(0, 0, 1, 0)", "(0, 0, 0, 1)"],
            explanation: "|01⟩ es el segundo en el orden 00, 01, 10, 11.",
        },
        {
            question: "¿Cuánto es (I ⊗ X)|00⟩?",
            options: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
            explanation: "X actúa solo sobre el segundo qubit.",
        },
        {
            question: "Al medir n qubits, ¿cuántos bits obtenemos?",
            options: ["n", "2n", "2ⁿ", "n²"],
            explanation: "Hay 2ⁿ amplitudes, pero la medición devuelve solo n bits.",
        },
    ],
};

export default produtoTensorial;
