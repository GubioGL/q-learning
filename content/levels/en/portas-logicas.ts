import type { LevelText } from "@/lib/lesson";

const portasLogicas: LevelText = {
    title: "Logic gates",
    intro:
        "Logic gates turn bits into bits. NOT flips a bit; AND gives 1 only when both inputs are 1; OR gives 1 when at least one input is 1.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 1",
    challenges: [
        {
            question: "What is the result of 1 OR 0?",
            options: ["0", "1"],
            explanation: "OR gives 1 when at least one of the inputs is 1.",
        },
        {
            question: "What is the result of NOT (1 AND 1)?",
            options: ["0", "1"],
            explanation: "1 AND 1 = 1, and NOT 1 = 0. This combination is the NAND gate.",
        },
        {
            question: "How many rows does the truth table of a 2-input gate have?",
            options: ["2", "3", "4", "8"],
            explanation: "Two 1-bit inputs have 2² = 4 combinations: 00, 01, 10, 11.",
        },
        {
            question: "Which gate gives 1 only when the inputs are different?",
            options: ["AND", "OR", "XOR", "NOT"],
            explanation: "XOR (exclusive or) gives 1 for 01 and 10, and 0 for 00 and 11.",
        },
    ],
};

export default portasLogicas;
