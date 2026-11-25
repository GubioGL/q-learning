import type { LevelText } from "@/lib/lesson";

const superdensa: LevelText = {
    title: "Codificación superdensa",
    intro:
        "Con un par Φ⁺ compartido, Alice envía 2 bits mandando 1 qubit: aplica I, X, Z o ZX en su lado.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 6",
    challenges: [
        {
            question: "¿Cuántos bits clásicos transmite cada qubit enviado en este protocolo?",
            options: ["1", "2", "3", "4"],
            explanation: "Son 2 bits, porque hay 4 estados de Bell distinguibles.",
        },
        {
            question: "¿Qué puerta usa Alice para enviar 01?",
            options: ["I", "X", "Z", "H"],
            explanation: "01 corresponde a X, que lleva Φ⁺ a Ψ⁺.",
        },
        {
            question: "¿Qué hace Bob para leer el mensaje?",
            options: ["Mide solo su qubit", "Hace una medición de Bell", "Aplica la Toffoli", "Copia el qubit recibido"],
            explanation: "CNOT, luego H, y mide los dos.",
        },
        {
            question: "Un espía que captura solo el qubit de Alice descubre…",
            options: ["nada", "1 bit", "2 bits", "el estado del par"],
            explanation: "Por sí solo, el qubit es 50/50 en cualquier base.",
        },
        {
            question: "¿Qué recurso hay que distribuir antes?",
            options: ["Una clave clásica", "Un par entrelazado", "Dos bits", "Una puerta T"],
            explanation: "Sin el par compartido, un qubit lleva como máximo 1 bit.",
        },
    ],
};

export default superdensa;
