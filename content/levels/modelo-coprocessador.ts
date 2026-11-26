import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), sec. 3.1.
const modeloCoprocessador: Lesson = {
    id: "modelo-coprocessador",
    title: "O computador quântico como coprocessador",
    intro: "A CPU clássica manda portas e medidas para a QPU e recebe só bits de volta.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (notas de curso, 2025), seção 3.1",
    course: "hardware",
    skill: "modelo-coprocessador",
    xp: 10,
    challenges: [
        {
            question: "No modelo de coprocessador, quem controla o fluxo do programa?",
            options: ["A QPU, sozinha", "A CPU clássica", "Os próprios qubits, por emaranhamento", "O compilador do fabricante, sem CPU"],
            answer: 1,
            explanation: "A CPU hospedeira envia as instruções e decide o próximo passo com base nos bits medidos.",
        },
        {
            question: "Qual é a ordem típica de uma execução?",
            options: [
                "Medir, aplicar portas, preparar, ler",
                "Preparar, medir, aplicar portas, ler",
                "Aplicar portas, preparar, ler, medir",
                "Preparar, aplicar portas, medir, ler os bits",
            ],
            answer: 3,
            explanation: "Inicializa-se a memória, aplicam-se as portas, mede-se e a CPU lê os bits clássicos.",
        },
        {
            question: "O que a CPU recebe de volta da QPU?",
            options: ["As amplitudes α e β de cada qubit", "Bits clássicos resultantes das medidas", "Uma cópia do estado quântico", "O circuito já compilado"],
            answer: 1,
            explanation: "Só o resultado das medidas sai da memória quântica; as amplitudes ficam inacessíveis.",
        },
        {
            question: "Por que não se pode simplesmente copiar um estado quântico desconhecido para olhar à vontade?",
            options: [
                "Falta memória nas QPUs atuais, e isso vai melhorar",
                "A cópia gastaria tempo demais de coerência",
                "O teorema da não-clonagem proíbe",
                "A cópia mudaria o número de qubits",
            ],
            answer: 2,
            explanation: "Não existe operação unitária que copie um estado arbitrário; é uma lei, não limitação de engenharia.",
        },
        {
            question: "Num circuito rodado em 1000 shots, o que a CPU junta ao final?",
            options: ["Uma lista de 1000 amplitudes", "Um único bit, o resultado médio", "A contagem dos resultados medidos", "O estado final do qubit"],
            answer: 2,
            explanation: "Cada shot dá bits; a distribuição dos resultados aproxima as probabilidades de Born.",
        },
        {
            question: "Em que sentido um circuito quântico é um programa?",
            options: [
                "É uma lista de instruções (portas e medidas) enviada à QPU",
                "É um desenho, sem relação com execução",
                "É o estado guardado na memória",
                "É só o resultado da medida",
            ],
            answer: 0,
            explanation: "Cada porta é uma instrução; a CPU pode gerar, escolher e repetir circuitos por código.",
        },
    ],
};

export default modeloCoprocessador;
