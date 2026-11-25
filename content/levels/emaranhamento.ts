import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 4.
const emaranhamento: Lesson = {
    id: "emaranhamento",
    title: "Emaranhamento",
    intro:
        "Um estado é produto se puder ser escrito como |a⟩⊗|b⟩; senão, é emaranhado. Teste: c₀₀c₁₁ = c₀₁c₁₀ só vale para estados produto.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    course: "computacao-quantica",
    skill: "emaranhamento",
    xp: 10,
    challenges: [
        {
            question: "Qual destes estados é emaranhado?",
            options: ["|00⟩", "|+⟩|0⟩", "(|00⟩ + |01⟩)/√2", "(|00⟩ + |11⟩)/√2"],
            answer: 3,
            explanation: "c₀₀c₁₁ = 1/2 e c₀₁c₁₀ = 0: são diferentes.",
        },
        {
            question: "Como (|00⟩ + |01⟩)/√2 se escreve como produto?",
            options: ["|0⟩|+⟩", "|+⟩|0⟩", "|+⟩|+⟩", "Não se escreve"],
            answer: 0,
            explanation: "O primeiro é sempre 0, e o segundo é |+⟩.",
        },
        {
            question: "Qual é a concorrência de um estado produto?",
            options: ["0", "1/2", "1", "2"],
            answer: 0,
            explanation: "Ela mede o emaranhamento: zero para estados produto.",
        },
        {
            question: "Em (|00⟩ + |11⟩)/√2, o primeiro qubit deu 1. O segundo dará…",
            options: ["0", "1", "0 ou 1, com 50% cada", "impossível saber"],
            answer: 1,
            explanation: "Os resultados são sempre iguais nesse estado.",
        },
        {
            question: "O emaranhamento permite enviar mensagens mais rápido que a luz?",
            options: ["Sim, sempre", "Sim, com muitos pares", "Não", "Só na base X"],
            answer: 2,
            explanation: "Cada lado vê bits aleatórios; comparar exige um canal comum.",
        },
    ],
};

export default emaranhamento;
