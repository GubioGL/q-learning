import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 6.
const bell: Lesson = {
    id: "bell",
    title: "Estados de Bell",
    intro:
        "Os estados de Bell são Φ± = (|00⟩ ± |11⟩)/√2 e Ψ± = (|01⟩ ± |10⟩)/√2. O circuito H + CNOT os prepara.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 6",
    course: "teoria-quantica",
    skill: "bell",
    xp: 10,
    challenges: [
        {
            question: "Em Ψ⁺, os resultados na base Z são…",
            options: ["sempre iguais", "sempre diferentes", "independentes", "sempre 00"],
            answer: 1,
            explanation: "Só aparecem |01⟩ e |10⟩.",
        },
        {
            question: "Que entrada do circuito H + CNOT produz Φ⁻?",
            options: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
            answer: 2,
            explanation: "H|1⟩ = |−⟩, e a CNOT dá (|00⟩ − |11⟩)/√2.",
        },
        {
            question: "Qual porta no primeiro qubit leva Φ⁺ a Ψ⁺?",
            options: ["X", "Z", "H", "S"],
            answer: 0,
            explanation: "X troca o primeiro bit: |00⟩+|11⟩ vira |10⟩+|01⟩.",
        },
        {
            question: "Como se faz uma medida de Bell?",
            options: ["H, depois CNOT", "CNOT, depois H, e medir", "Medir cada qubit na base Z", "Aplicar Z nos dois"],
            answer: 1,
            explanation: "É o circuito de preparação ao contrário.",
        },
        {
            question: "Dois estados de Bell diferentes são…",
            options: ["iguais a menos de fase", "ortogonais", "estados produto", "indistinguíveis"],
            answer: 1,
            explanation: "Os quatro formam uma base ortonormal.",
        },
    ],
};

export default bell;
