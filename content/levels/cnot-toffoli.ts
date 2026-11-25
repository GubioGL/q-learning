import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 4.
const cnotToffoli: Lesson = {
    id: "cnot-toffoli",
    title: "CNOT e Toffoli",
    intro:
        "CNOT|a⟩|b⟩ = |a⟩|a⊕b⟩, com o controle à esquerda. A Toffoli tem dois controles.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    course: "computacao-quantica",
    skill: "cnot-toffoli",
    xp: 10,
    challenges: [
        {
            question: "Quanto é CNOT|10⟩?",
            options: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
            answer: 3,
            explanation: "O controle é 1, então o alvo é invertido.",
        },
        {
            question: "Qual circuito transforma |00⟩ num par emaranhado?",
            options: ["X no primeiro, depois CNOT", "H no primeiro, depois CNOT", "H nos dois", "CNOT, depois H"],
            answer: 1,
            explanation: "H cria a superposição do controle, e a CNOT a espalha.",
        },
        {
            question: "Quando a porta CZ muda o sinal?",
            options: ["Só em |00⟩", "Só em |01⟩", "Só em |10⟩", "Só em |11⟩"],
            answer: 3,
            explanation: "Ela aplica Z no alvo se o controle for 1, e Z só muda o sinal de |1⟩.",
        },
        {
            question: "Quanto é Toffoli|110⟩?",
            options: ["|110⟩", "|111⟩", "|101⟩", "|011⟩"],
            answer: 1,
            explanation: "Os dois controles são 1, então o alvo inverte.",
        },
        {
            question: "Portas de um qubit, sozinhas, criam emaranhamento?",
            options: ["Sim, a H cria", "Sim, a Y cria", "Não", "Só com muitas portas"],
            answer: 2,
            explanation: "Portas locais levam estado produto a estado produto.",
        },
    ],
};

export default cnotToffoli;
