import type { LevelText } from "@/lib/lesson";

const unitarias: LevelText = {
    title: "Matrices unitarias",
    intro:
        "Las puertas son matrices unitarias: U†U = I. Las columnas de la matriz dicen adónde van |0⟩ y |1⟩.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    challenges: [
        {
            question: "¿Qué es la primera columna de la matriz de U?",
            options: ["U|0⟩", "U|1⟩", "⟨0|U", "U†|0⟩"],
            explanation: "Multiplicar la matriz por (1, 0) selecciona la primera columna.",
        },
        {
            question: "¿Cuál es la condición para que U sea unitaria?",
            options: ["U = I", "U† = U", "U†U = I", "U² = U"],
            explanation: "La inversa de una unitaria es su daga.",
        },
        {
            question: "¿A qué producto corresponde aplicar A y luego B?",
            options: ["AB", "BA", "A + B", "A†B"],
            explanation: "La primera puerta queda más cerca del ket.",
        },
        {
            question: "¿Cuál es la relación entre XZ y ZX?",
            options: ["XZ = ZX", "XZ = −ZX", "XZ = I", "XZ = 2ZX"],
            explanation: "X y Z anticonmutan.",
        },
        {
            question: "¿Cuál de estas matrices 2×2 (fila; fila) NO es unitaria?",
            options: ["(0 1; 1 0)", "(1 0; 0 i)", "(1 1; 0 1)", "(0 −i; i 0)"],
            explanation: "Las columnas (1,0) y (1,1) no son ortogonales.",
        },
    ],
};

export default unitarias;
