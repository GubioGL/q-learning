import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 2.
const qubit: Lesson = {
    id: "qubit",
    title: "O qubit",
    intro:
        "O estado de um qubit é α|0⟩ + β|1⟩, com |α|² + |β|² = 1. Quando as duas amplitudes são diferentes de zero, ele está em superposição.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 2",
    course: "basico",
    skill: "qubit",
    xp: 10,
    challenges: [
        {
            question: "Qual é a condição de normalização?",
            options: ["α + β = 1", "|α|² + |β|² = 1", "|α| + |β| = 1", "α² = β²"],
            answer: 1,
            explanation: "A soma dos módulos ao quadrado é 1, porque eles são probabilidades.",
        },
        {
            question: "Qual destes estados está normalizado?",
            options: ["|0⟩ + |1⟩", "0,5|0⟩ + 0,5|1⟩", "0,6|0⟩ + 0,8|1⟩", "0,3|0⟩ + 0,7|1⟩"],
            answer: 2,
            explanation: "0,36 + 0,64 = 1.",
        },
        {
            question: "O que diferencia |+⟩ de |−⟩?",
            options: ["A probabilidade de medir 0", "A fase relativa", "A fase global", "Nada"],
            answer: 1,
            explanation: "O sinal de |1⟩ é diferente: é a fase relativa. As probabilidades de 0 e 1 são iguais nos dois.",
        },
        {
            question: "Os estados |0⟩ e −|0⟩ são fisicamente…",
            options: ["iguais", "ortogonais", "emaranhados", "opostos"],
            answer: 0,
            explanation: "Diferem só por uma fase global, que não é observável.",
        },
        {
            question: "As amplitudes de um qubit podem ser…",
            options: ["só 0 ou 1", "só reais positivas", "só reais", "números complexos"],
            answer: 3,
            explanation: "Amplitudes são complexas, e por isso podem interferir.",
        },
    ],
};

export default qubit;
