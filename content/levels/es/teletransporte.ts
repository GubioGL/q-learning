import type { LevelText } from "@/lib/lesson";

const teletransporte: LevelText = {
    title: "Teletransporte",
    intro:
        "Alice hace una medición de Bell y manda los bits m₁m₂ a Bob, que aplica X si m₂ = 1 y luego Z si m₁ = 1.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 6",
    challenges: [
        {
            question: "¿Cuántos bits clásicos envía Alice por qubit teletransportado?",
            options: ["0", "1", "2", "4"],
            explanation: "Son los dos resultados de la medición de Bell.",
        },
        {
            question: "Si m₁m₂ = 00, ¿qué hace Bob?",
            options: ["Nada", "Aplica X", "Aplica Z", "Aplica X y Z"],
            explanation: "En ese caso el estado ya es correcto.",
        },
        {
            question: "Si m₁m₂ = 11, ¿qué hace Bob?",
            options: ["Nada", "Solo X", "Solo Z", "X y luego Z"],
            explanation: "m₂ = 1 pide X, y m₁ = 1 pide Z.",
        },
        {
            question: "¿Qué pasa con el estado original de Alice?",
            options: ["Sigue intacto", "La medición lo destruye", "Se vuelve copia del estado de Bob", "Queda entrelazado para siempre"],
            explanation: "Si sobreviviera, habría dos copias, y la no clonación lo prohíbe.",
        },
        {
            question: "¿Por qué el teletransporte no es más rápido que la luz?",
            options: ["Porque las puertas tardan", "Porque Bob necesita los bits clásicos", "Porque el par es frágil", "Porque la medición es lenta"],
            explanation: "Sin los bits, el qubit de Bob es totalmente aleatorio.",
        },
    ],
};

export default teletransporte;
