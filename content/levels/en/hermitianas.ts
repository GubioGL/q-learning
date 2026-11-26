import type { LevelText } from "@/lib/lesson";

const hermitianas: LevelText = {
    title: "Hermitian operators and eigenvalues",
    intro:
        "Hermitian matrices have real eigenvalues and represent observables; every 2x2 Hermitian matrix is a combination of Pauli matrices.",
    source: "Based on B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), sections 2.3 and 2.9, and T. G. Wong, Introduction to Classical and Quantum Computing (2022), sections 3.3.3 and 3.3.4",
    challenges: [
        {
            question: "Which statement defines a Hermitian matrix?",
            options: ["A† = A", "A†A = I", "A^2 = A", "A = A^T"],
            explanation: "Hermitian: equal to its adjoint (transpose and conjugate). A†A = I is the unitary condition; A = A^T ignores the conjugation.",
        },
        {
            question: "What is always true about the eigenvalues of a Hermitian matrix?",
            options: ["They are positive", "They are integers", "They are real", "They have modulus 1"],
            explanation: "Eigenvalues of Hermitian matrices are real (measurement results). Modulus 1 holds for unitary matrices.",
        },
        {
            question: "What are the possible eigenvalues of X, Y and Z?",
            options: ["1 and 2", "0 and 1", "+1 and −1", "i and −i"],
            explanation: "Each Pauli satisfies σ² = I and is Hermitian, so λ² = 1 and λ is real: ±1.",
        },
        {
            question: "For a Hermitian observable A, what are the possible results of a measurement?",
            options: ["The eigenvalues of A", "The amplitudes of the state", "Always 0 or 1", "The diagonal entries of A"],
            explanation: "Measuring A gives one of the eigenvalues, and the state is left in the corresponding eigenvector.",
        },
        {
            question: "In the decomposition A = a0 I + a1 X + a2 Y + a3 Z of a Hermitian matrix, the coefficients a_k are...",
            options: ["Always integers", "Always positive", "Any complex numbers", "Real numbers"],
            explanation: "The four coefficients are real, matching the 4 real degrees of freedom of a 2x2 Hermitian matrix.",
        },
        {
            question: "Two eigenvectors of a Hermitian matrix with different eigenvalues are...",
            options: ["Equal", "Parallel", "Orthogonal", "Always complex"],
            explanation: "Different eigenvalues of a Hermitian matrix have orthogonal eigenvectors (spectral theorem: they form an orthonormal basis).",
        },
    ],
};

export default hermitianas;
