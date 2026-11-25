import type { LevelText } from "@/lib/lesson";

const emaranhamento: LevelText = {
    title: "Entanglement",
    intro:
        "A state is a product if it can be written as |a⟩⊗|b⟩; otherwise it is entangled. Test: c₀₀c₁₁ = c₀₁c₁₀ holds only for product states.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 4",
    challenges: [
        {
            question: "Which of these states is entangled?",
            options: ["|00⟩", "|+⟩|0⟩", "(|00⟩ + |01⟩)/√2", "(|00⟩ + |11⟩)/√2"],
            explanation: "c₀₀c₁₁ = 1/2 and c₀₁c₁₀ = 0: they differ.",
        },
        {
            question: "How do we write (|00⟩ + |01⟩)/√2 as a product?",
            options: ["|0⟩|+⟩", "|+⟩|0⟩", "|+⟩|+⟩", "It cannot be done"],
            explanation: "The first is always 0, and the second is |+⟩.",
        },
        {
            question: "What is the concurrence of a product state?",
            options: ["0", "1/2", "1", "2"],
            explanation: "It measures entanglement: zero for product states.",
        },
        {
            question: "In (|00⟩ + |11⟩)/√2, the first qubit gave 1. The second will give…",
            options: ["0", "1", "0 or 1, with 50% each", "impossible to know"],
            explanation: "The results are always equal in this state.",
        },
        {
            question: "Does entanglement let us send messages faster than light?",
            options: ["Yes, always", "Yes, with many pairs", "No", "Only in the X basis"],
            explanation: "Each side sees random bits; comparing them requires an ordinary channel.",
        },
    ],
};

export default emaranhamento;
