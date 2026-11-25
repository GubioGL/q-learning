import type { LevelText } from "@/lib/lesson";

const emaranhamento: LevelText = {
    title: "Entrelazamiento",
    intro:
        "Un estado es producto si se puede escribir como |a⟩⊗|b⟩; si no, está entrelazado. Prueba: c₀₀c₁₁ = c₀₁c₁₀ solo se cumple en los estados producto.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    challenges: [
        {
            question: "¿Cuál de estos estados está entrelazado?",
            options: ["|00⟩", "|+⟩|0⟩", "(|00⟩ + |01⟩)/√2", "(|00⟩ + |11⟩)/√2"],
            explanation: "c₀₀c₁₁ = 1/2 y c₀₁c₁₀ = 0: son diferentes.",
        },
        {
            question: "¿Cómo se escribe (|00⟩ + |01⟩)/√2 como producto?",
            options: ["|0⟩|+⟩", "|+⟩|0⟩", "|+⟩|+⟩", "No se puede"],
            explanation: "El primero siempre es 0, y el segundo es |+⟩.",
        },
        {
            question: "¿Cuál es la concurrencia de un estado producto?",
            options: ["0", "1/2", "1", "2"],
            explanation: "Mide el entrelazamiento: cero para los estados producto.",
        },
        {
            question: "En (|00⟩ + |11⟩)/√2, el primer qubit dio 1. El segundo dará…",
            options: ["0", "1", "0 o 1, con 50% cada uno", "imposible saberlo"],
            explanation: "Los resultados siempre son iguales en ese estado.",
        },
        {
            question: "¿El entrelazamiento permite enviar mensajes más rápido que la luz?",
            options: ["Sí, siempre", "Sí, con muchos pares", "No", "Solo en la base X"],
            explanation: "Cada lado ve bits aleatorios; compararlos exige un canal común.",
        },
    ],
};

export default emaranhamento;
