import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 1.
const bits: Lesson = {
    id: "bits",
    title: "O que é um bit?",
    intro:
        "Um bit é a menor unidade de informação: ele vale 0 ou 1. Com vários bits escrevemos números em binário, onde cada posição vale uma potência de 2 (…, 4, 2, 1).",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 1",
    course: "basico",
    skill: "bits",
    xp: 10,
    challenges: [
        {
            question: "Quantos valores diferentes um único bit pode assumir?",
            options: ["1", "2", "10", "Infinitos"],
            answer: 1,
            explanation: "Um bit vale 0 ou 1: são exatamente 2 valores.",
        },
        {
            question: "Quantas sequências diferentes podemos formar com 3 bits?",
            options: ["3", "6", "8", "9"],
            answer: 2,
            explanation: "Cada bit dobra as possibilidades: 2 × 2 × 2 = 2³ = 8 (de 000 a 111).",
        },
        {
            question: "Qual número decimal o binário 101 representa?",
            options: ["3", "5", "6", "101"],
            answer: 1,
            explanation: "101 = 1·4 + 0·2 + 1·1 = 5.",
        },
        {
            question: "Como se escreve o número 6 em binário?",
            options: ["011", "101", "110", "111"],
            answer: 2,
            explanation: "6 = 4 + 2 = 1·4 + 1·2 + 0·1, então 110.",
        },
        {
            question: "Quantos bits formam 1 byte?",
            options: ["2", "4", "8", "16"],
            answer: 2,
            explanation: "Um byte tem 8 bits, o que dá 2⁸ = 256 valores possíveis.",
        },
        {
            question: "Qual é o resultado de 1 AND 0?",
            options: ["0", "1"],
            answer: 0,
            explanation: "AND só dá 1 quando as duas entradas são 1.",
        },
        {
            question: "Qual é o resultado de NOT 1?",
            options: ["0", "1"],
            answer: 0,
            explanation: "NOT inverte o bit: 1 vira 0 e 0 vira 1.",
        },
    ],
};

export default bits;
