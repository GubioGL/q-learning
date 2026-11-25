import type { LevelText } from "@/lib/lesson";

const medida: LevelText = {
    title: "Measurement",
    intro:
        "Measuring α|0⟩ + β|1⟩ gives 0 with probability |α|² and 1 with probability |β|². After the measurement, the state is that of the result obtained.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 2",
    challenges: [
        {
            question: "In 0.6|0⟩ + 0.8|1⟩, what is the probability of measuring 0?",
            options: ["0.36", "0.5", "0.6", "0.64"],
            explanation: "P(0) = |0.6|² = 0.36.",
        },
        {
            question: "A qubit in |+⟩ was measured and gave 0. What is its state now?",
            options: ["|+⟩", "|0⟩", "|1⟩", "|−⟩"],
            explanation: "The measurement collapses the state to the result obtained.",
        },
        {
            question: "Why do we repeat the same circuit many times (shots)?",
            options: ["So the qubit learns", "To avoid collapse", "To estimate the probabilities", "To copy the state"],
            explanation: "Each measurement gives a single result; the frequencies estimate the probabilities.",
        },
        {
            question: "A qubit in |0⟩ is measured in the basis {|+⟩, |−⟩}. What is the chance of getting |+⟩?",
            options: ["0", "0.25", "0.5", "1"],
            explanation: "|0⟩ is an equal superposition of |+⟩ and |−⟩.",
        },
        {
            question: "Where is |1⟩ on the Bloch sphere?",
            options: ["At the north pole", "At the south pole", "On the equator", "At the center"],
            explanation: "|0⟩ is the north pole and |1⟩ is the south pole.",
        },
    ],
};

export default medida;
