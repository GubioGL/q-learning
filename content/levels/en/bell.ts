import type { LevelText } from "@/lib/lesson";

const bell: LevelText = {
    title: "Bell states",
    intro:
        "The Bell states are Φ± = (|00⟩ ± |11⟩)/√2 and Ψ± = (|01⟩ ± |10⟩)/√2. The H + CNOT circuit prepares them.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 6",
    challenges: [
        {
            question: "In Ψ⁺, the results in the Z basis are…",
            options: ["always equal", "always different", "independent", "always 00"],
            explanation: "Only |01⟩ and |10⟩ appear.",
        },
        {
            question: "Which input of the H + CNOT circuit produces Φ⁻?",
            options: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
            explanation: "H|1⟩ = |−⟩, and the CNOT gives (|00⟩ − |11⟩)/√2.",
        },
        {
            question: "Which gate on the first qubit takes Φ⁺ to Ψ⁺?",
            options: ["X", "Z", "H", "S"],
            explanation: "X flips the first bit: |00⟩+|11⟩ becomes |10⟩+|01⟩.",
        },
        {
            question: "How do we make a Bell measurement?",
            options: ["H, then CNOT", "CNOT, then H, and measure", "Measure each qubit in the Z basis", "Apply Z to both"],
            explanation: "It is the preparation circuit in reverse.",
        },
        {
            question: "Two different Bell states are…",
            options: ["equal up to a phase", "orthogonal", "product states", "indistinguishable"],
            explanation: "The four form an orthonormal basis.",
        },
    ],
};

export default bell;
