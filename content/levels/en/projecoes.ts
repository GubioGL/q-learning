import type { LevelText } from "@/lib/lesson";

const projecoes: LevelText = {
    title: "Projections and bases",
    intro:
        "The amplitude of |ψ⟩ along |a⟩ is ⟨a|ψ⟩, and the probability of getting |a⟩ is |⟨a|ψ⟩|².",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 3",
    challenges: [
        {
            question: "What is the probability of getting |+⟩ when measuring |1⟩ in the X basis?",
            options: ["0", "0.25", "0.5", "1"],
            explanation: "|⟨+|1⟩|² = (1/√2)² = 1/2.",
        },
        {
            question: "How do we measure in the X basis on a device that only measures in the Z basis?",
            options: ["Apply Z before", "Apply H before", "Apply X after", "Measure twice"],
            explanation: "H takes |+⟩ to |0⟩ and |−⟩ to |1⟩.",
        },
        {
            question: "A qubit is in |−⟩ and is measured in the X basis. The result is…",
            options: ["always |+⟩", "always |−⟩", "50% each", "always |0⟩"],
            explanation: "A state of the basis itself has a certain result.",
        },
        {
            question: "Which basis corresponds to the y axis of the Bloch sphere?",
            options: ["{|0⟩, |1⟩}", "{|+⟩, |−⟩}", "{|i⟩, |−i⟩}", "{|0⟩, |+⟩}"],
            explanation: "|±i⟩ = (|0⟩ ± i|1⟩)/√2.",
        },
        {
            question: "If |ψ⟩ = α|a⟩ + β|b⟩ in an orthonormal basis, what is ⟨b|ψ⟩?",
            options: ["α", "β", "|β|²", "α + β"],
            explanation: "⟨b|a⟩ = 0 and ⟨b|b⟩ = 1, so β remains.",
        },
    ],
};

export default projecoes;
