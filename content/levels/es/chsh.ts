import type { LevelText } from "@/lib/lesson";

const chsh: LevelText = {
    title: "Desigualdad CHSH",
    intro:
        "En el juego CHSH, se gana cuando a⊕b = xy. Las estrategias clásicas llegan al 75%; con entrelazamiento, a cerca del 85,4%.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 6",
    challenges: [
        {
            question: "¿Cuál es la mejor probabilidad clásica de victoria?",
            options: ["50%", "75%", "85,4%", "100%"],
            explanation: "Responder siempre 0 gana en 3 de las 4 preguntas, y no se puede hacer mejor.",
        },
        {
            question: "Si x = y = 1, las respuestas deben ser…",
            options: ["iguales", "diferentes", "ambas 0", "ambas 1"],
            explanation: "xy = 1, así que a⊕b = 1.",
        },
        {
            question: "¿Cuál es el valor máximo de S en la mecánica cuántica?",
            options: ["2", "√2", "2√2", "4"],
            explanation: "Es el límite de Tsirelson, cerca de 2,83.",
        },
        {
            question: "¿Cuál es el límite de S para variables ocultas locales?",
            options: ["1", "√2", "2", "2√2"],
            explanation: "|S| ≤ 2 en cualquier teoría local de ese tipo.",
        },
        {
            question: "¿Violar la desigualdad CHSH permite enviar señales instantáneas?",
            options: ["Sí", "No"],
            explanation: "Cada lado, por sí solo, ve únicamente bits aleatorios.",
        },
    ],
};

export default chsh;
