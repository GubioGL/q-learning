import type { LevelText } from "@/lib/lesson";

const unitariedade: LevelText = {
    title: "Unitariedad",
    intro:
        "Un circuito sin mediciones es una única unitaria. Las unitarias conservan los productos internos y son reversibles.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    challenges: [
        {
            question: "El producto de dos unitarias es…",
            options: ["siempre unitario", "siempre hermítico", "siempre la identidad", "a veces no invertible"],
            explanation: "(VU)†(VU) = U†V†VU = I.",
        },
        {
            question: "¿Cuál es la inversa de VU?",
            options: ["V†U†", "U†V†", "UV", "V†U"],
            explanation: "El orden se invierte al deshacer.",
        },
        {
            question: "Si ⟨φ|ψ⟩ = 0,5, ¿cuánto vale después de aplicar la misma U a los dos?",
            options: ["0", "0,25", "0,5", "1"],
            explanation: "Las unitarias conservan los productos internos.",
        },
        {
            question: "Todo autovalor de una unitaria…",
            options: ["es real", "es positivo", "tiene módulo 1", "es cero"],
            explanation: "La norma se conserva, así que |λ| = 1.",
        },
        {
            question: "¿Cuál de estas puertas NO es su propia inversa?",
            options: ["X", "H", "Z", "S"],
            explanation: "S² = Z, que no es la identidad.",
        },
    ],
};

export default unitariedade;
