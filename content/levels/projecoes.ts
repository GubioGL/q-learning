import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 3.
const projecoes: Lesson = {
    id: "projecoes",
    title: "Projeções e bases",
    intro:
        "A amplitude de |ψ⟩ na direção |a⟩ é ⟨a|ψ⟩, e a probabilidade de obter |a⟩ é |⟨a|ψ⟩|².",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    course: "algebra-linear",
    skill: "projecoes",
    xp: 10,
    challenges: [
        {
            question: "Qual é a probabilidade de obter |+⟩ medindo |1⟩ na base X?",
            options: ["0", "0,25", "0,5", "1"],
            answer: 2,
            explanation: "|⟨+|1⟩|² = (1/√2)² = 1/2.",
        },
        {
            question: "Como medir na base X num aparelho que só mede na base Z?",
            options: ["Aplicar Z antes", "Aplicar H antes", "Aplicar X depois", "Medir duas vezes"],
            answer: 1,
            explanation: "H leva |+⟩ a |0⟩ e |−⟩ a |1⟩.",
        },
        {
            question: "Um qubit está em |−⟩ e é medido na base X. O resultado é…",
            options: ["sempre |+⟩", "sempre |−⟩", "50% cada", "sempre |0⟩"],
            answer: 1,
            explanation: "Um estado da própria base tem resultado certo.",
        },
        {
            question: "Qual base corresponde ao eixo y da esfera de Bloch?",
            options: ["{|0⟩, |1⟩}", "{|+⟩, |−⟩}", "{|i⟩, |−i⟩}", "{|0⟩, |+⟩}"],
            answer: 2,
            explanation: "|±i⟩ = (|0⟩ ± i|1⟩)/√2.",
        },
        {
            question: "Se |ψ⟩ = α|a⟩ + β|b⟩ numa base ortonormal, quanto vale ⟨b|ψ⟩?",
            options: ["α", "β", "|β|²", "α + β"],
            answer: 1,
            explanation: "⟨b|a⟩ = 0 e ⟨b|b⟩ = 1, então sobra β.",
        },
    ],
};

export default projecoes;
