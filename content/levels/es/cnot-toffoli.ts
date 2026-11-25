import type { LevelText } from "@/lib/lesson";

const cnotToffoli: LevelText = {
    title: "CNOT y Toffoli",
    intro:
        "CNOT|a⟩|b⟩ = |a⟩|a⊕b⟩, con el control a la izquierda. La Toffoli tiene dos controles.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    challenges: [
        {
            question: "¿Cuánto es CNOT|10⟩?",
            options: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
            explanation: "El control es 1, así que el objetivo se invierte.",
        },
        {
            question: "¿Qué circuito transforma |00⟩ en un par entrelazado?",
            options: ["X en el primero, luego CNOT", "H en el primero, luego CNOT", "H en los dos", "CNOT, luego H"],
            explanation: "H crea la superposición del control, y la CNOT la propaga.",
        },
        {
            question: "¿Cuándo cambia el signo la puerta CZ?",
            options: ["Solo en |00⟩", "Solo en |01⟩", "Solo en |10⟩", "Solo en |11⟩"],
            explanation: "Aplica Z al objetivo si el control es 1, y Z solo cambia el signo de |1⟩.",
        },
        {
            question: "¿Cuánto es Toffoli|110⟩?",
            options: ["|110⟩", "|111⟩", "|101⟩", "|011⟩"],
            explanation: "Los dos controles son 1, así que el objetivo se invierte.",
        },
        {
            question: "¿Las puertas de un qubit, por sí solas, crean entrelazamiento?",
            options: ["Sí, la H lo crea", "Sí, la Y lo crea", "No", "Solo con muchas puertas"],
            explanation: "Las puertas locales llevan estados producto a estados producto.",
        },
    ],
};

export default cnotToffoli;
