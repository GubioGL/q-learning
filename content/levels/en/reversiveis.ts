import type { LevelText } from "@/lib/lesson";

const reversiveis: LevelText = {
    title: "Reversible gates",
    intro:
        "A gate is reversible when the output determines the input. CNOT: (A, B) → (A, A⊕B). Toffoli: (A, B, C) → (A, B, AB⊕C).",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 1",
    challenges: [
        {
            question: "Which of these gates is reversible?",
            options: ["AND", "OR", "NOT", "NAND"],
            explanation: "In NOT, each output comes from a single input. In the others, different inputs give the same output.",
        },
        {
            question: "What is the output of the CNOT for control 1 and target 0?",
            options: ["00", "01", "10", "11"],
            explanation: "The control is 1, so the target is flipped: 10 becomes 11.",
        },
        {
            question: "What happens when we apply the CNOT twice?",
            options: ["We are back at the input", "The bits are swapped", "Both bits become 0", "Both bits are flipped"],
            explanation: "A⊕A⊕B = B: the second CNOT undoes the first.",
        },
        {
            question: "With which value of the target C does the Toffoli compute A AND B?",
            options: ["0", "1"],
            explanation: "The third output is AB⊕C. With C = 0, it equals AB.",
        },
        {
            question: "Why is the Toffoli universal for classical computing?",
            options: ["Because it has three bits", "Because it is faster", "Because with C = 1 it does NAND", "Because it never changes the controls"],
            explanation: "With C = 1 the third output is NOT(AB), the NAND, which is universal.",
        },
    ],
};

export default reversiveis;
