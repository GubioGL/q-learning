import type { LevelText } from "@/lib/lesson";

const medidaMultiplos: LevelText = {
    title: "Measuring several qubits",
    intro:
        "To measure only one qubit, add the probabilities of the compatible terms. The remaining state is renormalized.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 4",
    challenges: [
        {
            question: "In (|00⟩ + |01⟩ + |10⟩ + |11⟩)/2, what is the chance of measuring 11?",
            options: ["1/4", "1/2", "1", "0"],
            explanation: "|1/2|² = 1/4.",
        },
        {
            question: "In (|00⟩ + |11⟩)/√2, what is the chance that the first qubit gives 0?",
            options: ["0", "1/4", "1/2", "1"],
            explanation: "Only |00⟩ is compatible, with probability 1/2.",
        },
        {
            question: "In the same state, the first gave 0. The state is now…",
            options: ["|01⟩", "|00⟩", "|11⟩", "(|00⟩ + |11⟩)/√2"],
            explanation: "Only the term |00⟩ remains.",
        },
        {
            question: "Why renormalize after the measurement?",
            options: ["To erase the phase", "So the probabilities add up to 1", "To undo the collapse", "To entangle the qubits"],
            explanation: "The remaining terms add up to less than 1.",
        },
        {
            question: "In 0.6|00⟩ + 0.8|10⟩, what is the chance that the second qubit gives 0?",
            options: ["0.36", "0.64", "0.8", "1"],
            explanation: "Both terms have the second qubit in 0.",
        },
    ],
};

export default medidaMultiplos;
