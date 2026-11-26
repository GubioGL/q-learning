import type { LevelText } from "@/lib/lesson";

const identidadesDeCircuito: LevelText = {
    title: "Gates in sequence and circuit identities",
    intro:
        "Gates in series multiply in reverse order, and identities like HXH = Z simplify circuits.",
    source: "Based on B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), section 2.3, and T. G. Wong, Introduction to Classical and Quantum Computing (2022), section 3.3.3",
    challenges: [
        {
            question: "A circuit applies A first and then B. What is the circuit's matrix?",
            options: ["AB", "BA", "A + B", "A†B"],
            explanation: "The matrix acts on the ket to its right: the first gate sits furthest right in the product, U = BA.",
        },
        {
            question: "Which identity is true?",
            options: ["HXH = I", "HXH = Z", "HXH = X", "HXH = Y"],
            explanation: "H swaps the x and z axes: HXH = Z (and HZH = X).",
        },
        {
            question: "Why is XX = I?",
            options: ["Because X is Hermitian and unitary, so it is its own inverse", "Because X anticommutes with itself", "Because X has determinant 0", "Because X is the identity"],
            explanation: "Hermitian (X† = X) and unitary (X†X = I) gives X² = I.",
        },
        {
            question: "Can the circuit X, Z, X (in that order) be simplified by cancelling the two X gates?",
            options: ["No: they are not adjacent; the result is XZX = −Z", "Yes, X is left", "Yes, Z is left", "Yes, I is left"],
            explanation: "Only adjacent pairs cancel. Since XZ = −ZX, XZX = −Z, which differs from Z by a global phase.",
        },
        {
            question: "The circuit H, H, X, H, H is equivalent to which single gate?",
            options: ["I", "X", "Z", "H"],
            explanation: "HH = I at both ends, leaving X.",
        },
        {
            question: "The state |0⟩ goes through H, Z, H. What do you measure at the end?",
            options: ["Always 0", "50% each", "Always 1", "It depends on which H is used"],
            explanation: "HZH = X, and X|0⟩ = |1⟩, so you measure 1 with certainty.",
        },
    ],
};

export default identidadesDeCircuito;
