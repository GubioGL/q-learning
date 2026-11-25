import type { LevelText } from "@/lib/lesson";

const superdensa: LevelText = {
    title: "Superdense coding",
    intro:
        "With a shared Φ⁺ pair, Alice sends 2 bits by sending 1 qubit: she applies I, X, Z or ZX on her side.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 6",
    challenges: [
        {
            question: "How many classical bits does each qubit sent carry in this protocol?",
            options: ["1", "2", "3", "4"],
            explanation: "Two bits, because there are 4 distinguishable Bell states.",
        },
        {
            question: "Which gate does Alice use to send 01?",
            options: ["I", "X", "Z", "H"],
            explanation: "01 corresponds to X, which takes Φ⁺ to Ψ⁺.",
        },
        {
            question: "What does Bob do to read the message?",
            options: ["Measures only his qubit", "Makes a Bell measurement", "Applies the Toffoli", "Copies the received qubit"],
            explanation: "CNOT, then H, and measure both.",
        },
        {
            question: "A spy who captures only Alice's qubit learns…",
            options: ["nothing", "1 bit", "2 bits", "the state of the pair"],
            explanation: "Alone, the qubit is 50/50 in any basis.",
        },
        {
            question: "Which resource must be distributed beforehand?",
            options: ["A classical key", "An entangled pair", "Two bits", "A T gate"],
            explanation: "Without the shared pair, a qubit carries at most 1 bit.",
        },
    ],
};

export default superdensa;
