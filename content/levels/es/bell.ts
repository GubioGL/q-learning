import type { LevelText } from "@/lib/lesson";

const bell: LevelText = {
    title: "Estados de Bell",
    intro:
        "Los estados de Bell son Φ± = (|00⟩ ± |11⟩)/√2 y Ψ± = (|01⟩ ± |10⟩)/√2. El circuito H + CNOT los prepara.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 6",
    challenges: [
        {
            question: "En Ψ⁺, los resultados en la base Z son…",
            options: ["siempre iguales", "siempre diferentes", "independientes", "siempre 00"],
            explanation: "Solo aparecen |01⟩ y |10⟩.",
        },
        {
            question: "¿Qué entrada del circuito H + CNOT produce Φ⁻?",
            options: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
            explanation: "H|1⟩ = |−⟩, y la CNOT da (|00⟩ − |11⟩)/√2.",
        },
        {
            question: "¿Qué puerta en el primer qubit lleva Φ⁺ a Ψ⁺?",
            options: ["X", "Z", "H", "S"],
            explanation: "X invierte el primer bit: |00⟩+|11⟩ pasa a |10⟩+|01⟩.",
        },
        {
            question: "¿Cómo se hace una medición de Bell?",
            options: ["H, luego CNOT", "CNOT, luego H, y medir", "Medir cada qubit en la base Z", "Aplicar Z a los dos"],
            explanation: "Es el circuito de preparación al revés.",
        },
        {
            question: "Dos estados de Bell diferentes son…",
            options: ["iguales salvo una fase", "ortogonales", "estados producto", "indistinguibles"],
            explanation: "Los cuatro forman una base ortonormal.",
        },
    ],
};

export default bell;
