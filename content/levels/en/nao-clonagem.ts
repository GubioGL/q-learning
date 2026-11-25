import type { LevelText } from "@/lib/lesson";

const naoClonagem: LevelText = {
    title: "No-cloning",
    intro:
        "No unitary copies an arbitrary unknown quantum state. Only equal or orthogonal states can be copied by the same machine.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 4",
    challenges: [
        {
            question: "The CNOT with target in |0⟩ correctly copies…",
            options: ["|0⟩ and |1⟩", "|+⟩ and |−⟩", "any state", "no state"],
            explanation: "It copies the standard basis, but entangles superpositions.",
        },
        {
            question: "What does the CNOT do to |+⟩|0⟩?",
            options: ["|+⟩|+⟩", "|0⟩|0⟩", "(|00⟩ + |11⟩)/√2", "|−⟩|+⟩"],
            explanation: "The result is entangled, not a copy.",
        },
        {
            question: "Which property of unitaries is used in the proof?",
            options: ["They are real", "They are diagonal", "They preserve the inner product", "They equal their dagger"],
            explanation: "That gives x = x², with solutions 0 and 1.",
        },
        {
            question: "Can the same machine copy |+⟩ and |−⟩?",
            options: ["Yes, because they are orthogonal", "No, never", "Only one at a time", "Only with three qubits"],
            explanation: "Orthogonal states can be copied: just use the X basis.",
        },
        {
            question: "Which application depends directly on no-cloning?",
            options: ["The NAND gate", "ASCII", "Quantum cryptography", "The binary adder"],
            explanation: "A spy cannot copy the qubits and measure them later.",
        },
    ],
};

export default naoClonagem;
