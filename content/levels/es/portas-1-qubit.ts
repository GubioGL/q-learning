import type { LevelText } from "@/lib/lesson";

const portas1Qubit: LevelText = {
    title: "Puertas de 1 qubit",
    intro:
        "X intercambia |0⟩ y |1⟩. Z cambia el signo de |1⟩. H lleva |0⟩ a |+⟩ y |1⟩ a |−⟩, y viceversa.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 2",
    challenges: [
        {
            question: "¿Qué puerta es el NOT cuántico?",
            options: ["H", "S", "X", "Z"],
            explanation: "X|0⟩ = |1⟩ y X|1⟩ = |0⟩.",
        },
        {
            question: "¿Cuánto es Z|+⟩?",
            options: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
            explanation: "Z cambia el signo de |1⟩, y eso transforma |+⟩ en |−⟩.",
        },
        {
            question: "¿Cuánto es H|1⟩?",
            options: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
            explanation: "H|1⟩ = (|0⟩ − |1⟩)/√2 = |−⟩.",
        },
        {
            question: "Al aplicar H dos veces a |0⟩, obtenemos…",
            options: ["|0⟩", "|1⟩", "|+⟩", "un resultado aleatorio"],
            explanation: "H es su propia inversa: las amplitudes de |1⟩ se cancelan.",
        },
        {
            question: "¿A qué puerta equivale la secuencia H, Z, H?",
            options: ["H", "X", "Y", "Z"],
            explanation: "HZH = X.",
        },
    ],
};

export default portas1Qubit;
