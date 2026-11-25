import type { LevelText } from "@/lib/lesson";

const chsh: LevelText = {
    title: "CHSH inequality",
    intro:
        "In the CHSH game, you win when a⊕b = xy. Classical strategies reach 75%; with entanglement, about 85.4%.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 6",
    challenges: [
        {
            question: "What is the best classical winning probability?",
            options: ["50%", "75%", "85.4%", "100%"],
            explanation: "Always answering 0 wins in 3 of the 4 questions, and nothing does better.",
        },
        {
            question: "If x = y = 1, the answers must be…",
            options: ["equal", "different", "both 0", "both 1"],
            explanation: "xy = 1, so a⊕b = 1.",
        },
        {
            question: "What is the maximum value of S in quantum mechanics?",
            options: ["2", "√2", "2√2", "4"],
            explanation: "It is the Tsirelson bound, about 2.83.",
        },
        {
            question: "What is the limit of S for local hidden variables?",
            options: ["1", "√2", "2", "2√2"],
            explanation: "|S| ≤ 2 in any local theory of this kind.",
        },
        {
            question: "Does violating the CHSH inequality allow instant signals?",
            options: ["Yes", "No"],
            explanation: "Each side, alone, sees only random bits.",
        },
    ],
};

export default chsh;
