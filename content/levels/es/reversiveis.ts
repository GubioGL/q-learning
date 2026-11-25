import type { LevelText } from "@/lib/lesson";

const reversiveis: LevelText = {
    title: "Puertas reversibles",
    intro:
        "Una puerta es reversible cuando la salida determina la entrada. CNOT: (A, B) → (A, A⊕B). Toffoli: (A, B, C) → (A, B, AB⊕C).",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 1",
    challenges: [
        {
            question: "¿Cuál de estas puertas es reversible?",
            options: ["AND", "OR", "NOT", "NAND"],
            explanation: "En NOT, cada salida viene de una única entrada. En las otras, entradas diferentes dan la misma salida.",
        },
        {
            question: "¿Cuál es la salida de la CNOT para control 1 y objetivo 0?",
            options: ["00", "01", "10", "11"],
            explanation: "El control es 1, así que el objetivo se invierte: 10 pasa a 11.",
        },
        {
            question: "¿Qué ocurre al aplicar la CNOT dos veces?",
            options: ["Volvemos a la entrada", "Los bits se intercambian", "Los dos bits pasan a 0", "Los dos bits se invierten"],
            explanation: "A⊕A⊕B = B: la segunda CNOT deshace la primera.",
        },
        {
            question: "¿Con qué valor del objetivo C calcula la Toffoli A AND B?",
            options: ["0", "1"],
            explanation: "La tercera salida es AB⊕C. Con C = 0, vale AB.",
        },
        {
            question: "¿Por qué la Toffoli es universal para la computación clásica?",
            options: ["Porque tiene tres bits", "Porque es más rápida", "Porque con C = 1 hace la NAND", "Porque nunca cambia los controles"],
            explanation: "Con C = 1 la tercera salida es NOT(AB), la NAND, que es universal.",
        },
    ],
};

export default reversiveis;
