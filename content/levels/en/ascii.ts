import type { LevelText } from "@/lib/lesson";

const ascii: LevelText = {
    title: "ASCII: letters in bits",
    intro:
        "To store text, each character gets a number, and the number becomes bits. ASCII uses 7 bits: A is 65, B is 66, and lower-case letters sit 32 positions ahead.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 1",
    challenges: [
        {
            question: "How many different characters does 7-bit ASCII represent?",
            options: ["64", "128", "256", "1024"],
            explanation: "There are 2⁷ = 128 codes.",
        },
        {
            question: "If A is 65, what is the code of D?",
            options: ["66", "67", "68", "69"],
            explanation: "The letters are in order: A 65, B 66, C 67, D 68.",
        },
        {
            question: "What is the difference between the codes of \"a\" and \"A\"?",
            options: ["1", "16", "26", "32"],
            explanation: "Lower case is 32 positions later: a single bit, the one worth 2⁵.",
        },
        {
            question: "Which character has the binary code 01000010?",
            options: ["B", "C", "b", "2"],
            explanation: "64 + 2 = 66, which is the letter B.",
        },
        {
            question: "How many bytes does the word \"qubit\" take in ASCII?",
            options: ["1", "4", "5", "40"],
            explanation: "One byte per character: 5 letters, 5 bytes (40 bits).",
        },
    ],
};

export default ascii;
