import type { LevelText } from "@/lib/lesson";

const unitarias: LevelText = {
    title: "Unitary matrices",
    intro:
        "Gates are unitary matrices: U†U = I. The columns of the matrix say where |0⟩ and |1⟩ go.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, ch. 3",
    challenges: [
        {
            question: "What is the first column of the matrix of U?",
            options: ["U|0⟩", "U|1⟩", "⟨0|U", "U†|0⟩"],
            explanation: "Multiplying the matrix by (1, 0) selects the first column.",
        },
        {
            question: "What is the condition for U to be unitary?",
            options: ["U = I", "U† = U", "U†U = I", "U² = U"],
            explanation: "The inverse of a unitary is its dagger.",
        },
        {
            question: "Applying A and then B corresponds to which product?",
            options: ["AB", "BA", "A + B", "A†B"],
            explanation: "The first gate sits closest to the ket.",
        },
        {
            question: "What is the relation between XZ and ZX?",
            options: ["XZ = ZX", "XZ = −ZX", "XZ = I", "XZ = 2ZX"],
            explanation: "X and Z anticommute.",
        },
        {
            question: "Which of these 2×2 matrices (row; row) is NOT unitary?",
            options: ["(0 1; 1 0)", "(1 0; 0 i)", "(1 1; 0 1)", "(0 −i; i 0)"],
            explanation: "The columns (1,0) and (1,1) are not orthogonal.",
        },
    ],
};

export default unitarias;
