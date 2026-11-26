import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", sec. 1.3.
const somadores: Lesson = {
    id: "somadores",
    title: "Somadores: meio-somador, somador completo e ripple-carry",
    intro: "Como portas lógicas somam números binários, coluna por coluna, e quanto isso custa em portas.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, seção 1.3",
    course: "basico",
    skill: "somadores",
    xp: 10,
    challenges: [
        {
            question: "Quais portas formam o meio-somador (soma S e vai-um C)?",
            options: ["S = AND, C = XOR", "S = XOR, C = AND", "S = OR, C = AND", "S = XOR, C = OR"],
            answer: 1,
            explanation: "S é 1 quando as entradas diferem (XOR) e C é 1 só quando as duas são 1 (AND).",
        },
        {
            question: "Por que o somador completo é necessário a partir da segunda coluna?",
            options: [
                "Porque o meio-somador só funciona com números de 1 bit",
                "Porque precisa somar também o vai-um que chega da coluna anterior",
                "Porque o XOR não funciona nas colunas seguintes",
                "Porque a primeira coluna não tem soma",
            ],
            answer: 1,
            explanation: "Cada coluna a partir da segunda soma três bits: A, B e o vai-um de entrada.",
        },
        {
            question: "Num somador completo, A = 1, B = 0 e Cin = 1. Quais são (S, Cout)?",
            options: ["(1, 1)", "(1, 0)", "(0, 0)", "(0, 1)"],
            answer: 3,
            explanation: "1 + 0 + 1 = 2 = 10 em binário: soma 0 e vai-um 1.",
        },
        {
            question: "Quanto dá 1011 + 0111 em binário?",
            options: ["10010", "11000", "10001", "01110"],
            answer: 0,
            explanation: "11 + 7 = 18, que é 10010 em binário (5 bits, com o vai-um final).",
        },
        {
            question: "Quantas portas tem um somador completo feito de dois meio-somadores e um OR?",
            options: ["3", "5", "7", "2"],
            answer: 1,
            explanation: "Cada meio-somador tem 2 portas (XOR e AND), e o OR junta os vai-um: 2 + 2 + 1 = 5.",
        },
        {
            question: "Por que o somador ripple-carry é chamado assim?",
            options: [
                "O vai-um passa de coluna em coluna, como uma onda",
                "Ele soma todos os bits ao mesmo tempo",
                "Ele repete a soma várias vezes",
                "Ele usa só um somador reaproveitado",
            ],
            answer: 0,
            explanation: "A saída C_out de cada coluna é a entrada C_in da seguinte, então o vai-um escorre da direita para a esquerda.",
        },
        {
            question: "Um somador ripple-carry de n bits, com meio-somador na primeira coluna, usa quantas portas?",
            options: ["5n", "5n − 3", "2n", "n²"],
            answer: 1,
            explanation: "(n − 1) somadores completos de 5 portas mais um meio-somador de 2: 5(n − 1) + 2 = 5n − 3. Cresce linearmente.",
        },
    ],
};

export default somadores;
