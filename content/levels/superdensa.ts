import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 6.
const superdensa: Lesson = {
    id: "superdensa",
    title: "Codificação superdensa",
    intro:
        "Com um par Φ⁺ compartilhado, Alice envia 2 bits mandando 1 qubit: aplica I, X, Z ou ZX no seu lado.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 6",
    course: "teoria-quantica",
    skill: "superdensa",
    xp: 10,
    challenges: [
        {
            question: "Quantos bits clássicos cada qubit enviado transmite nesse protocolo?",
            options: ["1", "2", "3", "4"],
            answer: 1,
            explanation: "São 2 bits, porque há 4 estados de Bell distinguíveis.",
        },
        {
            question: "Qual porta Alice usa para enviar 01?",
            options: ["I", "X", "Z", "H"],
            answer: 1,
            explanation: "01 corresponde a X, que leva Φ⁺ a Ψ⁺.",
        },
        {
            question: "O que Bob faz para ler a mensagem?",
            options: ["Mede só o seu qubit", "Faz uma medida de Bell", "Aplica a Toffoli", "Copia o qubit recebido"],
            answer: 1,
            explanation: "CNOT, depois H, e mede os dois.",
        },
        {
            question: "Um espião que captura só o qubit de Alice descobre…",
            options: ["nada", "1 bit", "2 bits", "o estado do par"],
            answer: 0,
            explanation: "Sozinho, o qubit é 50/50 em qualquer base.",
        },
        {
            question: "Qual recurso precisa ser distribuído antes?",
            options: ["Uma chave clássica", "Um par emaranhado", "Dois bits", "Uma porta T"],
            answer: 1,
            explanation: "Sem o par compartilhado, um qubit carrega no máximo 1 bit.",
        },
    ],
};

export default superdensa;
