import type { LevelText } from "@/lib/lesson";

const medida: LevelText = {
    title: "Medición",
    intro:
        "Medir α|0⟩ + β|1⟩ da 0 con probabilidad |α|² y 1 con probabilidad |β|². Después de la medición, el estado es el del resultado obtenido.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 2",
    challenges: [
        {
            question: "En 0,6|0⟩ + 0,8|1⟩, ¿cuál es la probabilidad de medir 0?",
            options: ["0,36", "0,5", "0,6", "0,64"],
            explanation: "P(0) = |0,6|² = 0,36.",
        },
        {
            question: "Un qubit en |+⟩ se midió y dio 0. ¿Cuál es el estado ahora?",
            options: ["|+⟩", "|0⟩", "|1⟩", "|−⟩"],
            explanation: "La medición colapsa el estado en el resultado obtenido.",
        },
        {
            question: "¿Por qué se repite el mismo circuito muchas veces (shots)?",
            options: ["Para que el qubit aprenda", "Para evitar el colapso", "Para estimar las probabilidades", "Para copiar el estado"],
            explanation: "Cada medición da un solo resultado; las frecuencias estiman las probabilidades.",
        },
        {
            question: "Un qubit en |0⟩ se mide en la base {|+⟩, |−⟩}. ¿Qué probabilidad hay de obtener |+⟩?",
            options: ["0", "0,25", "0,5", "1"],
            explanation: "|0⟩ es una superposición igual de |+⟩ y |−⟩.",
        },
        {
            question: "¿Dónde está |1⟩ en la esfera de Bloch?",
            options: ["En el polo norte", "En el polo sur", "En el ecuador", "En el centro"],
            explanation: "|0⟩ es el polo norte y |1⟩ es el polo sur.",
        },
    ],
};

export default medida;
