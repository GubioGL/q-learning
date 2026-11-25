import type { LevelText } from "@/lib/lesson";

const qubit: LevelText = {
    title: "The qubit",
    intro:
        "The state of a qubit is α|0⟩ + β|1⟩, with |α|² + |β|² = 1. When both amplitudes are nonzero, it is in superposition.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 2",
    challenges: [
        {
            question: "What is the normalization condition?",
            options: ["α + β = 1", "|α|² + |β|² = 1", "|α| + |β| = 1", "α² = β²"],
            explanation: "The sum of the squared moduli is 1, because they are probabilities.",
        },
        {
            question: "Which of these states is normalized?",
            options: ["|0⟩ + |1⟩", "0.5|0⟩ + 0.5|1⟩", "0.6|0⟩ + 0.8|1⟩", "0.3|0⟩ + 0.7|1⟩"],
            explanation: "0.36 + 0.64 = 1.",
        },
        {
            question: "What is the difference between |+⟩ and |−⟩?",
            options: ["The probability of measuring 0", "The relative phase", "The global phase", "Nothing"],
            explanation: "The sign of |1⟩ differs: that is the relative phase. The probabilities of 0 and 1 are equal in both.",
        },
        {
            question: "The states |0⟩ and −|0⟩ are physically…",
            options: ["the same", "orthogonal", "entangled", "opposite"],
            explanation: "They differ only by a global phase, which is not observable.",
        },
        {
            question: "The amplitudes of a qubit can be…",
            options: ["only 0 or 1", "only positive reals", "only reals", "complex numbers"],
            explanation: "Amplitudes are complex, and that is why they can interfere.",
        },
    ],
};

export default qubit;
