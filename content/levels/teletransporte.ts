import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 6.
const teletransporte: Lesson = {
    id: "teletransporte",
    title: "Teletransporte",
    intro:
        "Alice faz uma medida de Bell e manda os bits m₁m₂ a Bob, que aplica X se m₂ = 1 e depois Z se m₁ = 1.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 6",
    course: "teoria-quantica",
    skill: "teletransporte",
    xp: 10,
    challenges: [
        {
            question: "Quantos bits clássicos Alice envia por qubit teletransportado?",
            options: ["0", "1", "2", "4"],
            answer: 2,
            explanation: "São os dois resultados da medida de Bell.",
        },
        {
            question: "Se m₁m₂ = 00, o que Bob faz?",
            options: ["Nada", "Aplica X", "Aplica Z", "Aplica X e Z"],
            answer: 0,
            explanation: "Nesse caso o estado já está certo.",
        },
        {
            question: "Se m₁m₂ = 11, o que Bob faz?",
            options: ["Nada", "Só X", "Só Z", "X e depois Z"],
            answer: 3,
            explanation: "m₂ = 1 pede X, e m₁ = 1 pede Z.",
        },
        {
            question: "O que acontece com o estado original de Alice?",
            options: ["Continua intacto", "É destruído pela medida", "Vira cópia do estado de Bob", "Fica emaranhado para sempre"],
            answer: 1,
            explanation: "Se sobrevivesse, haveria duas cópias, e a não-clonagem proíbe isso.",
        },
        {
            question: "Por que o teletransporte não é mais rápido que a luz?",
            options: ["Porque as portas demoram", "Porque Bob precisa dos bits clássicos", "Porque o par é frágil", "Porque a medida é lenta"],
            answer: 1,
            explanation: "Sem os bits, o qubit de Bob é totalmente aleatório.",
        },
    ],
};

export default teletransporte;
