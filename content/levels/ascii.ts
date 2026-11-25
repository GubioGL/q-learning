import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 1.
const ascii: Lesson = {
    id: "ascii",
    title: "ASCII: letras em bits",
    intro:
        "Para guardar texto, cada caractere ganha um número, e o número vira bits. O ASCII usa 7 bits: A é 65, B é 66 e as minúsculas ficam 32 posições adiante.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 1",
    course: "basico",
    skill: "ascii",
    xp: 10,
    challenges: [
        {
            question: "Quantos caracteres diferentes o ASCII de 7 bits representa?",
            options: ["64", "128", "256", "1024"],
            answer: 1,
            explanation: "São 2⁷ = 128 códigos.",
        },
        {
            question: "Se A é 65, qual é o código de D?",
            options: ["66", "67", "68", "69"],
            answer: 2,
            explanation: "As letras estão em ordem: A 65, B 66, C 67, D 68.",
        },
        {
            question: "Qual é a diferença entre os códigos de \"a\" e \"A\"?",
            options: ["1", "16", "26", "32"],
            answer: 3,
            explanation: "A minúscula fica 32 posições depois: é um único bit, o de valor 2⁵.",
        },
        {
            question: "Qual caractere tem o código binário 01000010?",
            options: ["B", "C", "b", "2"],
            answer: 0,
            explanation: "64 + 2 = 66, que é a letra B.",
        },
        {
            question: "Quantos bytes ocupa a palavra \"qubit\" em ASCII?",
            options: ["1", "4", "5", "40"],
            answer: 2,
            explanation: "Um byte por caractere: 5 letras, 5 bytes (40 bits).",
        },
    ],
};

export default ascii;
