import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Intro. to Quantum Algorithms and Quantum Programming (2025), sec. 4.9.
const opticaLinear: Lesson = {
    id: "optica-linear",
    title: "Computação quântica com óptica linear",
    intro: "Qubits em fótons: portas de 1 qubit são fáceis; as de 2 qubits pedem medição e fusão.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seções 4.6 e 4.9; fusão: Browne e Rudolph, PRL 95, 010501 (2005)",
    course: "hardware",
    skill: "optica-linear",
    xp: 10,
    challenges: [
        {
            question: "Quais duas propriedades de um fóton servem para codificar qubits?",
            options: ["Massa e carga", "Polarização e modo (caminho)", "Cor e velocidade", "Spin nuclear e energia"],
            answer: 1,
            explanation: "Polarização (H/V) e modo (caminho A/B) são fáceis de controlar e medir; juntas dão 2 qubits.",
        },
        {
            question: "O que faz um divisor de feixe polarizador (PBS)?",
            options: [
                "Muda a cor do fóton",
                "Mede o fóton e o destrói",
                "Gira só a polarização",
                "Troca o caminho dos fótons V e mantém os H",
            ],
            answer: 3,
            explanation: "H segue no mesmo modo e V troca de modo: converte polarização em caminho.",
        },
        {
            question: "Por que uma porta de 2 qubits é difícil em óptica linear?",
            options: [
                "Fótons não se influenciam diretamente",
                "Fótons não têm polarização",
                "Divisores de feixe não são unitários",
                "Detectores não existem",
            ],
            answer: 0,
            explanation: "Componentes lineares não fazem um fóton condicionar o outro; só há interferência entre indistinguíveis.",
        },
        {
            question: "Um fóton entra no modo A de um divisor com θ = π/2. O que sai?",
            options: ["Sempre em A", "Sempre em B", "Superposição igual de A e B", "Nada"],
            answer: 2,
            explanation: "A rotação de 45° no espaço dos modos dá cos(π/4) e sin(π/4): metade para cada.",
        },
        {
            question: "Na codificação de um fóton por modo, com um modo por estado de base, quantos modos precisam 4 qubits?",
            options: ["4", "8", "12", "16"],
            answer: 3,
            explanation: "São 2^4 = 16 estados de base, um modo cada, o que mostra por que o esquema não escala.",
        },
        {
            question: "Qual é o papel da medição na ideia de fusão?",
            options: [
                "Substituir a fonte de fótons",
                "Permitir juntar estados pequenos em um maior, de forma probabilística",
                "Eliminar a interferência",
                "Medir a polarização para apagá-la",
            ],
            answer: 1,
            explanation: "Detectar fótons após o divisor/PBS junta os pedaços em um grafo maior quando dá certo (os fótons medidos saem do grafo); é o recurso para as portas de 2 qubits.",
        },
    ],
};

export default opticaLinear;
