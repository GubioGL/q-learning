import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 6.
const chsh: Lesson = {
    id: "chsh",
    title: "Desigualdade CHSH",
    intro:
        "No jogo CHSH, ganha-se quando a⊕b = xy. Estratégias clássicas chegam a 75%; com emaranhamento, a cerca de 85,4%.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 6",
    course: "teoria-quantica",
    skill: "chsh",
    xp: 10,
    challenges: [
        {
            question: "Qual é a melhor probabilidade clássica de vitória?",
            options: ["50%", "75%", "85,4%", "100%"],
            answer: 1,
            explanation: "Responder sempre 0 ganha em 3 das 4 perguntas, e não dá para fazer melhor.",
        },
        {
            question: "Se x = y = 1, as respostas devem ser…",
            options: ["iguais", "diferentes", "ambas 0", "ambas 1"],
            answer: 1,
            explanation: "xy = 1, então a⊕b = 1.",
        },
        {
            question: "Qual é o valor máximo de S na mecânica quântica?",
            options: ["2", "√2", "2√2", "4"],
            answer: 2,
            explanation: "É o limite de Tsirelson, cerca de 2,83.",
        },
        {
            question: "Qual é o limite de S para variáveis ocultas locais?",
            options: ["1", "√2", "2", "2√2"],
            answer: 2,
            explanation: "|S| ≤ 2 em qualquer teoria local desse tipo.",
        },
        {
            question: "Violar a desigualdade CHSH permite enviar sinais instantâneos?",
            options: ["Sim", "Não"],
            answer: 1,
            explanation: "Cada lado, sozinho, vê apenas bits aleatórios.",
        },
    ],
};

export default chsh;
