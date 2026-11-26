import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", sec. 2.5, and Valiron, course notes 2025, sec. 4.8.
const qubitsFisicos: Lesson = {
    id: "qubits-fisicos",
    title: "Qubits físicos",
    intro: "O que pode ser um qubit de verdade, o que ele precisa ter e por que a decoerência é o grande obstáculo.",
    source:
        "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, seção 2.5, e B. Valiron, Introduction to Quantum Algorithms and Quantum Programming, seção 4.8",
    course: "basico",
    skill: "qubits-fisicos",
    xp: 10,
    challenges: [
        {
            question: "O que torna um sistema físico candidato a qubit?",
            options: [
                "Ser muito pequeno",
                "Ter dois estados quânticos bem distintos que possamos controlar e medir",
                "Ser feito de luz",
                "Funcionar em temperatura ambiente",
            ],
            answer: 1,
            explanation: "Qualquer sistema com dois estados distintos pode representar |0⟩ e |1⟩; o resto é engenharia.",
        },
        {
            question: "Em um qubit de fóton, os estados |0⟩ e |1⟩ costumam ser...",
            options: ["Dois níveis de energia", "Duas polarizações da luz", "Spin para cima e para baixo", "Dois valores de tensão"],
            answer: 1,
            explanation: "A polarização (por exemplo, vertical e horizontal) é a escolha clássica para fótons.",
        },
        {
            question: "O que é decoerência?",
            options: [
                "A medida de um qubit",
                "A porta que cria superposição",
                "A perda do estado quântico por interação descontrolada com o ambiente",
                "A troca de |0⟩ por |1⟩",
            ],
            answer: 2,
            explanation: "Interações com o ambiente (calor, campos, vibrações) bagunçam o estado, o que aparece como ruído nos resultados.",
        },
        {
            question: "Coerência de 200 µs e portas de 100 ns. Quantas portas cabem, aproximadamente, antes de perder o estado?",
            options: ["20", "200", "2000", "20 000"],
            answer: 2,
            explanation: "200 µs = 200 000 ns, e 200 000 / 100 = 2000 portas.",
        },
        {
            question: "Cada porta tem 0,1% de chance de errar. Num circuito com 1000 portas, a chance de nenhuma errar é aproximadamente...",
            options: ["99,9%", "90%", "50%", "37%"],
            answer: 3,
            explanation: "(1 − 0,001)^1000 ≈ 0,37. Pequenos erros se acumulam rapidamente.",
        },
        {
            question: "O que o tempo de coerência mede?",
            options: [
                "Quanto tempo uma porta leva para operar",
                "Por quanto tempo o qubit mantém o estado antes de se degradar",
                "O tempo da medida final",
                "O tempo para resfriar o chip",
            ],
            answer: 1,
            explanation: "É a escala de tempo em que o estado decai por interação com o ambiente; compare com a duração de uma porta.",
        },
        {
            question: "O que significa NISQ?",
            options: [
                "Quantum de escala intermediária e ruidoso",
                "Quantum sem erros e de grande escala",
                "Quantum sem superposição",
                "Quantum feito só de íons",
            ],
            answer: 0,
            explanation: "Noisy Intermediate-Scale Quantum: termo de Preskill (2018) para máquinas de dezenas a centenas de qubits ruidosos, sem correção de erros em grande escala.",
        },
    ],
};

export default qubitsFisicos;
