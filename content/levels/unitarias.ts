import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 3.
const unitarias: Lesson = {
    id: "unitarias",
    title: "Matrizes unitárias",
    intro:
        "Portas são matrizes unitárias: U†U = I. As colunas da matriz dizem para onde vão |0⟩ e |1⟩.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    course: "algebra-linear",
    skill: "unitarias",
    xp: 10,
    challenges: [
        {
            question: "O que é a primeira coluna da matriz de U?",
            options: ["U|0⟩", "U|1⟩", "⟨0|U", "U†|0⟩"],
            answer: 0,
            explanation: "Multiplicar a matriz por (1, 0) seleciona a primeira coluna.",
        },
        {
            question: "Qual é a condição para U ser unitária?",
            options: ["U = I", "U† = U", "U†U = I", "U² = U"],
            answer: 2,
            explanation: "A inversa de uma unitária é a sua adaga.",
        },
        {
            question: "Aplicar A e depois B corresponde a qual produto?",
            options: ["AB", "BA", "A + B", "A†B"],
            answer: 1,
            explanation: "A primeira porta fica mais perto do ket.",
        },
        {
            question: "Qual é a relação entre XZ e ZX?",
            options: ["XZ = ZX", "XZ = −ZX", "XZ = I", "XZ = 2ZX"],
            answer: 1,
            explanation: "X e Z anticomutam.",
        },
        {
            question: "Qual destas matrizes 2×2 (linha; linha) NÃO é unitária?",
            options: ["(0 1; 1 0)", "(1 0; 0 i)", "(1 1; 0 1)", "(0 −i; i 0)"],
            answer: 2,
            explanation: "As colunas (1,0) e (1,1) não são ortogonais.",
        },
    ],
};

export default unitarias;
