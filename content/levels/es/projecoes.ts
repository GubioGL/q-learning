import type { LevelText } from "@/lib/lesson";

const projecoes: LevelText = {
    title: "Proyecciones y bases",
    intro:
        "La amplitud de |ψ⟩ en la dirección |a⟩ es ⟨a|ψ⟩, y la probabilidad de obtener |a⟩ es |⟨a|ψ⟩|².",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    challenges: [
        {
            question: "¿Cuál es la probabilidad de obtener |+⟩ al medir |1⟩ en la base X?",
            options: ["0", "0,25", "0,5", "1"],
            explanation: "|⟨+|1⟩|² = (1/√2)² = 1/2.",
        },
        {
            question: "¿Cómo medir en la base X con un aparato que solo mide en la base Z?",
            options: ["Aplicar Z antes", "Aplicar H antes", "Aplicar X después", "Medir dos veces"],
            explanation: "H lleva |+⟩ a |0⟩ y |−⟩ a |1⟩.",
        },
        {
            question: "Un qubit está en |−⟩ y se mide en la base X. El resultado es…",
            options: ["siempre |+⟩", "siempre |−⟩", "50% cada uno", "siempre |0⟩"],
            explanation: "Un estado de la propia base tiene un resultado seguro.",
        },
        {
            question: "¿Qué base corresponde al eje y de la esfera de Bloch?",
            options: ["{|0⟩, |1⟩}", "{|+⟩, |−⟩}", "{|i⟩, |−i⟩}", "{|0⟩, |+⟩}"],
            explanation: "|±i⟩ = (|0⟩ ± i|1⟩)/√2.",
        },
        {
            question: "Si |ψ⟩ = α|a⟩ + β|b⟩ en una base ortonormal, ¿cuánto vale ⟨b|ψ⟩?",
            options: ["α", "β", "|β|²", "α + β"],
            explanation: "⟨b|a⟩ = 0 y ⟨b|b⟩ = 1, así que queda β.",
        },
    ],
};

export default projecoes;
