import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 6.
const bb84: Lesson = {
    id: "bb84",
    title: "Criptografia BB84",
    intro:
        "Alice envia bits em bases Z ou X sorteadas, e Bob mede em bases sorteadas. Eles ficam só com as posições em que as bases coincidem.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 6",
    course: "teoria-quantica",
    skill: "bb84",
    xp: 10,
    challenges: [
        {
            question: "No BB84, o bit 1 na base X é qual estado?",
            options: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
            answer: 3,
            explanation: "Na base X: 0 é |+⟩ e 1 é |−⟩.",
        },
        {
            question: "Em média, que fração dos bits sobra após o peneiramento?",
            options: ["25%", "50%", "75%", "100%"],
            answer: 1,
            explanation: "As bases coincidem metade das vezes.",
        },
        {
            question: "O que Alice e Bob comparam em público no peneiramento?",
            options: ["Os bits", "As bases", "Os qubits", "A chave final"],
            answer: 1,
            explanation: "Comparar as bases não revela os bits.",
        },
        {
            question: "Que taxa de erro Eva causa ao interceptar e reenviar todos os qubits?",
            options: ["0%", "25%", "50%", "100%"],
            answer: 1,
            explanation: "Ela erra a base em 1/2 das vezes, e aí Bob erra 1/2: 1/4.",
        },
        {
            question: "Por que Eva não guarda cópias para medir depois?",
            options: ["Falta memória", "As bases nunca são reveladas", "O teorema da não-clonagem proíbe", "O canal é rápido demais"],
            answer: 2,
            explanation: "Copiar um qubit desconhecido é impossível.",
        },
    ],
};

export default bb84;
