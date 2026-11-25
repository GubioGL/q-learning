import type { LevelText } from "@/lib/lesson";

const circuitos: LevelText = {
    title: "Quantum circuits",
    intro:
        "In a circuit, each line is a qubit and time runs from left to right. In algebra, the first gate sits closest to the ket.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 2",
    challenges: [
        {
            question: "What does each horizontal line represent?",
            options: ["A qubit", "A gate", "A measurement", "An instant of time"],
            explanation: "The lines are qubits; the boxes are gates.",
        },
        {
            question: "The drawing shows X and then Z. What is the total operator?",
            options: ["XZ", "ZX", "X + Z", "HXH"],
            explanation: "The gate applied first is on the right: ZX.",
        },
        {
            question: "What is the result of measuring X|0⟩?",
            options: ["Always 0", "Always 1", "50% each", "It depends on the phase"],
            explanation: "X|0⟩ = |1⟩.",
        },
        {
            question: "In the circuit H, measurement, H, what is the chance that the final measurement gives 0?",
            options: ["0", "0.5", "0.75", "1"],
            explanation: "The measurement in the middle destroys the superposition, and the second H leaves 50/50.",
        },
        {
            question: "Why are shallow (low-depth) circuits desirable?",
            options: ["They use less ink", "They need no measurement", "They suffer less from noise", "They are always universal"],
            explanation: "Qubits lose coherence over time; fewer layers, fewer errors.",
        },
    ],
};

export default circuitos;
