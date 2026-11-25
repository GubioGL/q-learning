import type { LevelText } from "@/lib/lesson";

const qubit: LevelText = {
    title: "El qubit",
    intro:
        "El estado de un qubit es α|0⟩ + β|1⟩, con |α|² + |β|² = 1. Cuando las dos amplitudes son distintas de cero, está en superposición.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 2",
    challenges: [
        {
            question: "¿Cuál es la condición de normalización?",
            options: ["α + β = 1", "|α|² + |β|² = 1", "|α| + |β| = 1", "α² = β²"],
            explanation: "La suma de los módulos al cuadrado es 1, porque son probabilidades.",
        },
        {
            question: "¿Cuál de estos estados está normalizado?",
            options: ["|0⟩ + |1⟩", "0,5|0⟩ + 0,5|1⟩", "0,6|0⟩ + 0,8|1⟩", "0,3|0⟩ + 0,7|1⟩"],
            explanation: "0,36 + 0,64 = 1.",
        },
        {
            question: "¿Qué diferencia a |+⟩ de |−⟩?",
            options: ["La probabilidad de medir 0", "La fase relativa", "La fase global", "Nada"],
            explanation: "El signo de |1⟩ es diferente: es la fase relativa. Las probabilidades de 0 y 1 son iguales en los dos.",
        },
        {
            question: "Los estados |0⟩ y −|0⟩ son físicamente…",
            options: ["iguales", "ortogonales", "entrelazados", "opuestos"],
            explanation: "Difieren solo en una fase global, que no es observable.",
        },
        {
            question: "Las amplitudes de un qubit pueden ser…",
            options: ["solo 0 o 1", "solo reales positivas", "solo reales", "números complejos"],
            explanation: "Las amplitudes son complejas, y por eso pueden interferir.",
        },
    ],
};

export default qubit;
