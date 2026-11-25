import type { LevelText } from "@/lib/lesson";

const produtoExterno: LevelText = {
    title: "Producto externo",
    intro:
        "Ket por bra es una matriz. En una base ortonormal, la suma de los proyectores |e⟩⟨e| es la identidad.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    challenges: [
        {
            question: "¿Qué es |ψ⟩⟨φ|?",
            options: ["Un número", "Un vector", "Una matriz", "Una probabilidad"],
            explanation: "Columna por fila da una matriz.",
        },
        {
            question: "¿Cuánto es |0⟩⟨0| + |1⟩⟨1|?",
            options: ["I", "X", "Z", "H"],
            explanation: "Es la relación de completitud.",
        },
        {
            question: "¿Qué puerta es |0⟩⟨0| − |1⟩⟨1|?",
            options: ["X", "Y", "Z", "H"],
            explanation: "Mantiene |0⟩ y cambia el signo de |1⟩: es la Z.",
        },
        {
            question: "Si Π es un proyector, ¿cuánto es Π²?",
            options: ["0", "I", "Π", "2Π"],
            explanation: "Proyectar dos veces es igual que proyectar una.",
        },
        {
            question: "¿Cuánto es (|1⟩⟨0|) aplicado a |0⟩?",
            options: ["|0⟩", "|1⟩", "0", "|+⟩"],
            explanation: "⟨0|0⟩ = 1, y queda |1⟩.",
        },
    ],
};

export default produtoExterno;
