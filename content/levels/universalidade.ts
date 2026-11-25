import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 4.
const universalidade: Lesson = {
    id: "universalidade",
    title: "Portas universais",
    intro:
        "Um conjunto é universal se aproxima qualquer unitária. H, S e CNOT (Clifford) não bastam; com a porta T, bastam.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    course: "computacao-quantica",
    skill: "universalidade",
    xp: 10,
    challenges: [
        {
            question: "Qual conjunto é universal para a computação quântica?",
            options: ["{X, Z}", "{H, S, CNOT}", "{H, T, CNOT}", "{X, CNOT}"],
            answer: 2,
            explanation: "A T leva o conjunto além do grupo de Clifford.",
        },
        {
            question: "O que diz o teorema de Gottesman–Knill?",
            options: ["Todo circuito é simulável", "Circuitos de Clifford são simuláveis com eficiência", "A porta T é desnecessária", "Qubits não podem ser copiados"],
            answer: 1,
            explanation: "Com entrada e medida na base padrão, um computador clássico dá conta deles.",
        },
        {
            question: "Quantas portas T formam uma S?",
            options: ["1", "2", "4", "8"],
            answer: 1,
            explanation: "T² = S.",
        },
        {
            question: "Por que falamos em aproximar, e não em gerar exatamente?",
            options: ["Porque as portas têm ruído", "Porque há infinitas unitárias", "Porque a medida colapsa", "Porque H é real"],
            answer: 1,
            explanation: "Um conjunto finito de portas não gera todas as unitárias com exatidão.",
        },
        {
            question: "O que falta ao conjunto {X, Z, CNOT}?",
            options: ["Portas de 2 qubits", "Criar superposição", "Reversibilidade", "Unitariedade"],
            answer: 1,
            explanation: "X, Z e CNOT levam estados da base a estados da base, a menos de sinal.",
        },
    ],
};

export default universalidade;
