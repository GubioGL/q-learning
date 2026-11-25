import type { LevelText } from "@/lib/lesson";

const produtoExterno: LevelText = {
    title: "Outer product",
    intro:
        "Ket times bra is a matrix. In an orthonormal basis, the sum of the projectors |e⟩⟨e| is the identity.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 3",
    challenges: [
        {
            question: "What is |ψ⟩⟨φ|?",
            options: ["A number", "A vector", "A matrix", "A probability"],
            explanation: "A column times a row gives a matrix.",
        },
        {
            question: "What is |0⟩⟨0| + |1⟩⟨1|?",
            options: ["I", "X", "Z", "H"],
            explanation: "It is the completeness relation.",
        },
        {
            question: "Which gate is |0⟩⟨0| − |1⟩⟨1|?",
            options: ["X", "Y", "Z", "H"],
            explanation: "It keeps |0⟩ and changes the sign of |1⟩: it is Z.",
        },
        {
            question: "If Π is a projector, what is Π²?",
            options: ["0", "I", "Π", "2Π"],
            explanation: "Projecting twice is the same as projecting once.",
        },
        {
            question: "What is (|1⟩⟨0|) applied to |0⟩?",
            options: ["|0⟩", "|1⟩", "0", "|+⟩"],
            explanation: "⟨0|0⟩ = 1, and |1⟩ remains.",
        },
    ],
};

export default produtoExterno;
