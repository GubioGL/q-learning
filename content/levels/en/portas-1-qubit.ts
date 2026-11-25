import type { LevelText } from "@/lib/lesson";

const portas1Qubit: LevelText = {
    title: "One-qubit gates",
    intro:
        "X swaps |0⟩ and |1⟩. Z changes the sign of |1⟩. H takes |0⟩ to |+⟩ and |1⟩ to |−⟩, and vice versa.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 2",
    challenges: [
        {
            question: "Which gate is the quantum NOT?",
            options: ["H", "S", "X", "Z"],
            explanation: "X|0⟩ = |1⟩ and X|1⟩ = |0⟩.",
        },
        {
            question: "What is Z|+⟩?",
            options: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
            explanation: "Z changes the sign of |1⟩, and that turns |+⟩ into |−⟩.",
        },
        {
            question: "What is H|1⟩?",
            options: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
            explanation: "H|1⟩ = (|0⟩ − |1⟩)/√2 = |−⟩.",
        },
        {
            question: "Applying H twice to |0⟩, we get…",
            options: ["|0⟩", "|1⟩", "|+⟩", "a random result"],
            explanation: "H is its own inverse: the amplitudes of |1⟩ cancel out.",
        },
        {
            question: "The sequence H, Z, H is equivalent to which gate?",
            options: ["H", "X", "Y", "Z"],
            explanation: "HZH = X.",
        },
    ],
};

export default portas1Qubit;
