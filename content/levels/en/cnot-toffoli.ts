import type { LevelText } from "@/lib/lesson";

const cnotToffoli: LevelText = {
    title: "CNOT and Toffoli",
    intro:
        "CNOT|a⟩|b⟩ = |a⟩|a⊕b⟩, with the control on the left. The Toffoli has two controls.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 4",
    challenges: [
        {
            question: "What is CNOT|10⟩?",
            options: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
            explanation: "The control is 1, so the target is flipped.",
        },
        {
            question: "Which circuit turns |00⟩ into an entangled pair?",
            options: ["X on the first, then CNOT", "H on the first, then CNOT", "H on both", "CNOT, then H"],
            explanation: "H creates the superposition of the control, and the CNOT spreads it.",
        },
        {
            question: "When does the CZ gate change the sign?",
            options: ["Only on |00⟩", "Only on |01⟩", "Only on |10⟩", "Only on |11⟩"],
            explanation: "It applies Z to the target if the control is 1, and Z only changes the sign of |1⟩.",
        },
        {
            question: "What is Toffoli|110⟩?",
            options: ["|110⟩", "|111⟩", "|101⟩", "|011⟩"],
            explanation: "Both controls are 1, so the target flips.",
        },
        {
            question: "Do one-qubit gates, on their own, create entanglement?",
            options: ["Yes, H does", "Yes, Y does", "No", "Only with many gates"],
            explanation: "Local gates take product states to product states.",
        },
    ],
};

export default cnotToffoli;
