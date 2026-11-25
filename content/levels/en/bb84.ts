import type { LevelText } from "@/lib/lesson";

const bb84: LevelText = {
    title: "BB84 cryptography",
    intro:
        "Alice sends bits in random Z or X bases, and Bob measures in random bases. They keep only the positions where the bases match.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 6",
    challenges: [
        {
            question: "In BB84, the bit 1 in the X basis is which state?",
            options: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
            explanation: "In the X basis: 0 is |+⟩ and 1 is |−⟩.",
        },
        {
            question: "On average, what fraction of the bits remains after sifting?",
            options: ["25%", "50%", "75%", "100%"],
            explanation: "The bases match half of the time.",
        },
        {
            question: "What do Alice and Bob compare in public during sifting?",
            options: ["The bits", "The bases", "The qubits", "The final key"],
            explanation: "Comparing the bases does not reveal the bits.",
        },
        {
            question: "What error rate does Eve cause by intercepting and resending every qubit?",
            options: ["0%", "25%", "50%", "100%"],
            explanation: "She picks the wrong basis 1/2 of the time, and then Bob is wrong 1/2: 1/4.",
        },
        {
            question: "Why does Eve not keep copies to measure later?",
            options: ["Not enough memory", "The bases are never revealed", "The no-cloning theorem forbids it", "The channel is too fast"],
            explanation: "Copying an unknown qubit is impossible.",
        },
    ],
};

export default bb84;
