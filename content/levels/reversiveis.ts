import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 1.
const reversiveis: Lesson = {
    id: "reversiveis",
    title: "Portas reversíveis",
    intro:
        "Uma porta é reversível quando a saída determina a entrada. CNOT: (A, B) → (A, A⊕B). Toffoli: (A, B, C) → (A, B, AB⊕C).",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 1",
    course: "basico",
    skill: "reversiveis",
    xp: 10,
    challenges: [
        {
            question: "Qual destas portas é reversível?",
            options: ["AND", "OR", "NOT", "NAND"],
            answer: 2,
            explanation: "Em NOT, cada saída vem de uma única entrada. Nas outras, entradas diferentes dão a mesma saída.",
        },
        {
            question: "Qual é a saída da CNOT para controle 1 e alvo 0?",
            options: ["00", "01", "10", "11"],
            answer: 3,
            explanation: "O controle é 1, então o alvo é invertido: 10 vira 11.",
        },
        {
            question: "O que acontece ao aplicar a CNOT duas vezes?",
            options: ["Voltamos à entrada", "Os bits são trocados", "Os dois bits viram 0", "Os dois bits são invertidos"],
            answer: 0,
            explanation: "A⊕A⊕B = B: a segunda CNOT desfaz a primeira.",
        },
        {
            question: "Com qual valor do alvo C a Toffoli calcula A AND B?",
            options: ["0", "1"],
            answer: 0,
            explanation: "A terceira saída é AB⊕C. Com C = 0, ela vale AB.",
        },
        {
            question: "Por que a Toffoli é universal para a computação clássica?",
            options: ["Porque tem três bits", "Porque é mais rápida", "Porque com C = 1 ela faz a NAND", "Porque nunca muda os controles"],
            answer: 2,
            explanation: "Com C = 1 a terceira saída é NOT(AB), a NAND, que é universal.",
        },
    ],
};

export default reversiveis;
