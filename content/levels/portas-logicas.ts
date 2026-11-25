import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 1.
const portasLogicas: Lesson = {
    id: "portas-logicas",
    title: "Portas lógicas",
    intro:
        "Portas lógicas transformam bits em bits. NOT inverte um bit; AND dá 1 só quando as duas entradas são 1; OR dá 1 quando pelo menos uma entrada é 1.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 1",
    course: "basico",
    skill: "portas-logicas",
    xp: 10,
    challenges: [
        {
            question: "Qual é o resultado de 1 OR 0?",
            options: ["0", "1"],
            answer: 1,
            explanation: "OR dá 1 quando pelo menos uma das entradas é 1.",
        },
        {
            question: "Qual é o resultado de NOT (1 AND 1)?",
            options: ["0", "1"],
            answer: 0,
            explanation: "1 AND 1 = 1, e NOT 1 = 0. Essa combinação é a porta NAND.",
        },
        {
            question: "Quantas linhas tem a tabela-verdade de uma porta com 2 entradas?",
            options: ["2", "3", "4", "8"],
            answer: 2,
            explanation: "Duas entradas de 1 bit têm 2² = 4 combinações: 00, 01, 10, 11.",
        },
        {
            question: "Qual porta dá 1 apenas quando as entradas são diferentes?",
            options: ["AND", "OR", "XOR", "NOT"],
            answer: 2,
            explanation: "XOR (ou exclusivo) dá 1 para 01 e 10, e 0 para 00 e 11.",
        },
    ],
};

export default portasLogicas;
