import type { LevelText } from "@/lib/lesson";

const universalidade: LevelText = {
    title: "Universal gates",
    intro:
        "A set is universal if it approximates any unitary. H, S and CNOT (Clifford) are not enough; with the T gate, they are.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 4",
    challenges: [
        {
            question: "Which set is universal for quantum computing?",
            options: ["{X, Z}", "{H, S, CNOT}", "{H, T, CNOT}", "{X, CNOT}"],
            explanation: "T takes the set beyond the Clifford group.",
        },
        {
            question: "What does the Gottesman–Knill theorem say?",
            options: ["Every circuit can be simulated", "Clifford circuits can be simulated efficiently", "The T gate is unnecessary", "Qubits cannot be copied"],
            explanation: "With input and measurement in the standard basis, a classical computer can handle them.",
        },
        {
            question: "How many T gates make an S?",
            options: ["1", "2", "4", "8"],
            explanation: "T² = S.",
        },
        {
            question: "Why do we talk about approximating, and not generating exactly?",
            options: ["Because gates are noisy", "Because there are infinitely many unitaries", "Because measurement collapses", "Because H is real"],
            explanation: "A finite set of gates cannot generate every unitary exactly.",
        },
        {
            question: "What is missing from the set {X, Z, CNOT}?",
            options: ["Two-qubit gates", "Creating superposition", "Reversibility", "Unitarity"],
            explanation: "X, Z and CNOT take basis states to basis states, up to a sign.",
        },
    ],
};

export default universalidade;
