import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", sec. 1.4.
const algebraBooleana: Lesson = {
    id: "algebra-booleana",
    title: "Álgebra booleana e simplificação de circuitos",
    intro: "Regras para trocar um circuito por outro equivalente e menor: precedência, De Morgan e identidades com 0 e 1.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, seção 1.4",
    course: "basico",
    skill: "algebra-booleana",
    xp: 10,
    challenges: [
        {
            question: "Qual é a ordem de precedência das operações booleanas, da mais forte para a mais fraca?",
            options: ["OR, AND, NOT", "NOT, AND, OR", "AND, NOT, OR", "NOT, OR, AND"],
            answer: 1,
            explanation: "NOT vem primeiro, depois AND e por último OR. Assim, A + BC significa A + (BC).",
        },
        {
            question: "Qual é a forma correta da lei de De Morgan para NOT(AB)?",
            options: ["NOT(A) · NOT(B)", "NOT(A) + NOT(B)", "NOT(A + B)", "A + B"],
            answer: 1,
            explanation: "Ao quebrar a barra, troca-se o operador: NOT(AB) = NOT(A) + NOT(B). Testando A = 1, B = 0, ambos dão 1.",
        },
        {
            question: "Quanto vale A + 1, para qualquer bit A?",
            options: ["A", "0", "NOT(A)", "1"],
            answer: 3,
            explanation: "OR com 1 sempre dá 1, seja qual for A.",
        },
        {
            question: "Simplificando AB + A·NOT(B), obtém-se...",
            options: ["B", "A", "AB", "1"],
            answer: 1,
            explanation: "Fatorando, A(B + NOT B) = A · 1 = A.",
        },
        {
            question: "A + NOT(A)·B é equivalente a...",
            options: ["A + B", "AB", "A", "NOT(A) + B"],
            answer: 0,
            explanation: "Distribuindo: (A + NOT A)(A + B) = 1 · (A + B) = A + B. Testando A = 0, B = 1: ambos dão 1.",
        },
        {
            question: "Quanto vale NOT(A) + B·C para A = 0, B = 1 e C = 0, e por quê?",
            options: [
                "0, porque o OR vem primeiro: (NOT A + B)·C = 0",
                "0, porque C = 0 zera a expressão toda",
                "1, porque NOT(A) = 1 e B·C = 0, e 1 + 0 = 1",
                "2, somando os valores como na aritmética",
            ],
            answer: 2,
            explanation: "O AND vem antes do OR: B·C = 0 e NOT(A) = 1, então 1 + 0 = 1. O resultado de um OR é sempre 0 ou 1, nunca 2.",
        },
    ],
};

export default algebraBooleana;
