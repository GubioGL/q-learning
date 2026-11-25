import type { LevelText } from "@/lib/lesson";

const universalidade: LevelText = {
    title: "Puertas universales",
    intro:
        "Un conjunto es universal si aproxima cualquier unitaria. H, S y CNOT (Clifford) no bastan; con la puerta T, sí.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    challenges: [
        {
            question: "¿Qué conjunto es universal para la computación cuántica?",
            options: ["{X, Z}", "{H, S, CNOT}", "{H, T, CNOT}", "{X, CNOT}"],
            explanation: "La T lleva el conjunto más allá del grupo de Clifford.",
        },
        {
            question: "¿Qué dice el teorema de Gottesman–Knill?",
            options: ["Todo circuito se puede simular", "Los circuitos de Clifford se simulan con eficiencia", "La puerta T es innecesaria", "Los qubits no se pueden copiar"],
            explanation: "Con entrada y medición en la base estándar, un ordenador clásico puede con ellos.",
        },
        {
            question: "¿Cuántas puertas T forman una S?",
            options: ["1", "2", "4", "8"],
            explanation: "T² = S.",
        },
        {
            question: "¿Por qué hablamos de aproximar y no de generar exactamente?",
            options: ["Porque las puertas tienen ruido", "Porque hay infinitas unitarias", "Porque la medición colapsa", "Porque H es real"],
            explanation: "Un conjunto finito de puertas no genera todas las unitarias con exactitud.",
        },
        {
            question: "¿Qué le falta al conjunto {X, Z, CNOT}?",
            options: ["Puertas de 2 qubits", "Crear superposición", "Reversibilidad", "Unitariedad"],
            explanation: "X, Z y CNOT llevan estados de la base a estados de la base, salvo el signo.",
        },
    ],
};

export default universalidade;
