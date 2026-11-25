import type { LevelText } from "@/lib/lesson";

const bits: LevelText = {
    title: "What is a bit?",
    intro:
        "A bit is the smallest unit of information: it is 0 or 1. With several bits we write numbers in binary, where each position is worth a power of 2 (…, 4, 2, 1).",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 1",
    challenges: [
        {
            question: "How many different values can a single bit have?",
            options: ["1", "2", "10", "Infinitely many"],
            explanation: "A bit is 0 or 1: exactly 2 values.",
        },
        {
            question: "How many different sequences can we form with 3 bits?",
            options: ["3", "6", "8", "9"],
            explanation: "Each bit doubles the possibilities: 2 × 2 × 2 = 2³ = 8 (from 000 to 111).",
        },
        {
            question: "Which decimal number does the binary 101 represent?",
            options: ["3", "5", "6", "101"],
            explanation: "101 = 1·4 + 0·2 + 1·1 = 5.",
        },
        {
            question: "How do we write the number 6 in binary?",
            options: ["011", "101", "110", "111"],
            explanation: "6 = 4 + 2 = 1·4 + 1·2 + 0·1, so 110.",
        },
        {
            question: "How many bits make 1 byte?",
            options: ["2", "4", "8", "16"],
            explanation: "A byte has 8 bits, which gives 2⁸ = 256 possible values.",
        },
        {
            question: "What is the result of 1 AND 0?",
            options: ["0", "1"],
            explanation: "AND only gives 1 when both inputs are 1.",
        },
        {
            question: "What is the result of NOT 1?",
            options: ["0", "1"],
            explanation: "NOT flips the bit: 1 becomes 0 and 0 becomes 1.",
        },
    ],
};

export default bits;
