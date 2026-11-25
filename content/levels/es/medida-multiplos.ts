import type { LevelText } from "@/lib/lesson";

const medidaMultiplos: LevelText = {
    title: "Medir varios qubits",
    intro:
        "Para medir solo un qubit, suma las probabilidades de los términos compatibles. El estado que queda se renormaliza.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    challenges: [
        {
            question: "En (|00⟩ + |01⟩ + |10⟩ + |11⟩)/2, ¿qué probabilidad hay de medir 11?",
            options: ["1/4", "1/2", "1", "0"],
            explanation: "|1/2|² = 1/4.",
        },
        {
            question: "En (|00⟩ + |11⟩)/√2, ¿qué probabilidad hay de que el primer qubit dé 0?",
            options: ["0", "1/4", "1/2", "1"],
            explanation: "Solo |00⟩ es compatible, con probabilidad 1/2.",
        },
        {
            question: "En el mismo estado, el primero dio 0. El estado ahora es…",
            options: ["|01⟩", "|00⟩", "|11⟩", "(|00⟩ + |11⟩)/√2"],
            explanation: "Solo queda el término |00⟩.",
        },
        {
            question: "¿Por qué renormalizar después de la medición?",
            options: ["Para borrar la fase", "Para que las probabilidades sumen 1", "Para deshacer el colapso", "Para entrelazar los qubits"],
            explanation: "Los términos que quedaron suman menos de 1.",
        },
        {
            question: "En 0,6|00⟩ + 0,8|10⟩, ¿qué probabilidad hay de que el segundo qubit dé 0?",
            options: ["0,36", "0,64", "0,8", "1"],
            explanation: "Los dos términos tienen el segundo qubit en 0.",
        },
    ],
};

export default medidaMultiplos;
