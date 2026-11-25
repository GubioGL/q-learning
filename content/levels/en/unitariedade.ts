import type { LevelText } from "@/lib/lesson";

const unitariedade: LevelText = {
    title: "Unitarity",
    intro:
        "A circuit without measurements is a single unitary. Unitaries preserve inner products and are reversible.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 3",
    challenges: [
        {
            question: "The product of two unitaries is…",
            options: ["always unitary", "always Hermitian", "always the identity", "sometimes not invertible"],
            explanation: "(VU)†(VU) = U†V†VU = I.",
        },
        {
            question: "What is the inverse of VU?",
            options: ["V†U†", "U†V†", "UV", "V†U"],
            explanation: "The order is reversed when undoing.",
        },
        {
            question: "If ⟨φ|ψ⟩ = 0.5, what is it after applying the same U to both?",
            options: ["0", "0.25", "0.5", "1"],
            explanation: "Unitaries preserve inner products.",
        },
        {
            question: "Every eigenvalue of a unitary…",
            options: ["is real", "is positive", "has modulus 1", "is zero"],
            explanation: "The norm is preserved, so |λ| = 1.",
        },
        {
            question: "Which of these gates is NOT its own inverse?",
            options: ["X", "H", "Z", "S"],
            explanation: "S² = Z, which is not the identity.",
        },
    ],
};

export default unitariedade;
