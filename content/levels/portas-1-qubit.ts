import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 2.
const portas1Qubit: Lesson = {
    id: "portas-1-qubit",
    title: "Portas de 1 qubit",
    intro:
        "X troca |0⟩ e |1⟩. Z troca o sinal de |1⟩. H leva |0⟩ a |+⟩ e |1⟩ a |−⟩, e vice-versa.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 2",
    course: "basico",
    skill: "portas-1-qubit",
    xp: 10,
    challenges: [
        {
            question: "Qual porta é o NOT quântico?",
            options: ["H", "S", "X", "Z"],
            answer: 2,
            explanation: "X|0⟩ = |1⟩ e X|1⟩ = |0⟩.",
        },
        {
            question: "Quanto é Z|+⟩?",
            options: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
            answer: 3,
            explanation: "Z troca o sinal de |1⟩, e isso transforma |+⟩ em |−⟩.",
        },
        {
            question: "Quanto é H|1⟩?",
            options: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
            answer: 3,
            explanation: "H|1⟩ = (|0⟩ − |1⟩)/√2 = |−⟩.",
        },
        {
            question: "Aplicando H duas vezes em |0⟩, obtemos…",
            options: ["|0⟩", "|1⟩", "|+⟩", "um resultado aleatório"],
            answer: 0,
            explanation: "H é a própria inversa: as amplitudes de |1⟩ se cancelam.",
        },
        {
            question: "A sequência H, Z, H equivale a qual porta?",
            options: ["H", "X", "Y", "Z"],
            answer: 1,
            explanation: "HZH = X.",
        },
    ],
};

export default portas1Qubit;
