import type { LevelText } from "@/lib/lesson";

const circuitos: LevelText = {
    title: "Circuitos cuánticos",
    intro:
        "En un circuito, cada línea es un qubit y el tiempo corre de izquierda a derecha. En el álgebra, la primera puerta queda más cerca del ket.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 2",
    challenges: [
        {
            question: "¿Qué representa cada línea horizontal?",
            options: ["Un qubit", "Una puerta", "Una medición", "Un instante de tiempo"],
            explanation: "Las líneas son qubits; las cajas son puertas.",
        },
        {
            question: "El dibujo muestra X y luego Z. ¿Cuál es el operador total?",
            options: ["XZ", "ZX", "X + Z", "HXH"],
            explanation: "La primera puerta aplicada queda a la derecha: ZX.",
        },
        {
            question: "¿Cuál es el resultado de medir X|0⟩?",
            options: ["Siempre 0", "Siempre 1", "50% cada uno", "Depende de la fase"],
            explanation: "X|0⟩ = |1⟩.",
        },
        {
            question: "En el circuito H, medición, H, ¿qué probabilidad hay de que la medición final dé 0?",
            options: ["0", "0,5", "0,75", "1"],
            explanation: "La medición del medio destruye la superposición, y el segundo H deja 50/50.",
        },
        {
            question: "¿Por qué son deseables los circuitos poco profundos?",
            options: ["Usan menos tinta", "No necesitan medición", "Sufren menos el ruido", "Siempre son universales"],
            explanation: "Los qubits pierden coherencia con el tiempo; menos capas, menos error.",
        },
    ],
};

export default circuitos;
