import type { LevelText } from "@/lib/lesson";

const teletransporte: LevelText = {
    title: "Teleportation",
    intro:
        "Alice makes a Bell measurement and sends the bits m₁m₂ to Bob, who applies X if m₂ = 1 and then Z if m₁ = 1.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 6",
    challenges: [
        {
            question: "How many classical bits does Alice send per teleported qubit?",
            options: ["0", "1", "2", "4"],
            explanation: "They are the two results of the Bell measurement.",
        },
        {
            question: "If m₁m₂ = 00, what does Bob do?",
            options: ["Nothing", "Applies X", "Applies Z", "Applies X and Z"],
            explanation: "In this case the state is already right.",
        },
        {
            question: "If m₁m₂ = 11, what does Bob do?",
            options: ["Nothing", "Only X", "Only Z", "X and then Z"],
            explanation: "m₂ = 1 asks for X, and m₁ = 1 asks for Z.",
        },
        {
            question: "What happens to Alice's original state?",
            options: ["It stays intact", "It is destroyed by the measurement", "It becomes a copy of Bob's state", "It stays entangled forever"],
            explanation: "If it survived, there would be two copies, and no-cloning forbids that.",
        },
        {
            question: "Why is teleportation not faster than light?",
            options: ["Because gates take time", "Because Bob needs the classical bits", "Because the pair is fragile", "Because measurement is slow"],
            explanation: "Without the bits, Bob's qubit is completely random.",
        },
    ],
};

export default teletransporte;
