import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 2.
const circuitos: Lesson = {
    id: "circuitos",
    title: "Circuitos quânticos",
    intro:
        "Num circuito, cada linha é um qubit e o tempo corre da esquerda para a direita. Na álgebra, a primeira porta fica mais perto do ket.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 2",
    course: "basico",
    skill: "circuitos",
    xp: 10,
    challenges: [
        {
            question: "O que cada linha horizontal representa?",
            options: ["Um qubit", "Uma porta", "Uma medida", "Um instante de tempo"],
            answer: 0,
            explanation: "As linhas são qubits; as caixas são portas.",
        },
        {
            question: "O desenho mostra X e depois Z. Qual é o operador total?",
            options: ["XZ", "ZX", "X + Z", "HXH"],
            answer: 1,
            explanation: "A primeira porta aplicada fica à direita: ZX.",
        },
        {
            question: "Qual é o resultado de medir X|0⟩?",
            options: ["Sempre 0", "Sempre 1", "50% cada", "Depende da fase"],
            answer: 1,
            explanation: "X|0⟩ = |1⟩.",
        },
        {
            question: "No circuito H, medida, H, qual é a chance de a medida final dar 0?",
            options: ["0", "0,5", "0,75", "1"],
            answer: 1,
            explanation: "A medida do meio destrói a superposição, e o segundo H deixa 50/50.",
        },
        {
            question: "Por que circuitos rasos (de baixa profundidade) são desejáveis?",
            options: ["Usam menos tinta", "Não precisam de medida", "Sofrem menos com o ruído", "São sempre universais"],
            answer: 2,
            explanation: "Qubits perdem coerência com o tempo; menos camadas, menos erro.",
        },
    ],
};

export default circuitos;
