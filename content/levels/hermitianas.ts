import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seções 2.3 e 2.9, e T. G. Wong, Introduction to Classical and Quantum Computing (2022), seções 3.3.3 e 3.3.4.
const hermitianas: Lesson = {
    id: "hermitianas",
    title: "Operadores hermitianos e autovalores",
    intro:
        "Hermitianas têm autovalores reais e representam observáveis; toda hermitiana 2x2 é combinação das matrizes de Pauli.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seções 2.3 e 2.9, e T. G. Wong, Introduction to Classical and Quantum Computing (2022), seções 3.3.3 e 3.3.4",
    course: "algebra-linear",
    skill: "hermitianas",
    xp: 10,
    challenges: [
        {
            question: "Qual afirmação define uma matriz hermitiana?",
            options: ["A† = A", "A†A = I", "A^2 = A", "A = A^T"],
            answer: 0,
            explanation: "Hermitiana: igual ao adjunto (transposta e conjugada). A†A = I é a condição de unitária; A = A^T ignora a conjugação.",
        },
        {
            question: "O que é sempre verdade sobre os autovalores de uma hermitiana?",
            options: ["São positivos", "São inteiros", "São reais", "Têm módulo 1"],
            answer: 2,
            explanation: "Autovalores de hermitianas são reais (resultados de medida). Módulo 1 vale para unitárias.",
        },
        {
            question: "Quais são os autovalores possíveis de X, Y e Z?",
            options: ["1 e 2", "0 e 1", "+1 e −1", "i e −i"],
            answer: 2,
            explanation: "Cada Pauli satisfaz σ² = I e é hermitiana, então λ² = 1 e λ é real: ±1.",
        },
        {
            question: "Num observável hermitiano A, quais são os resultados possíveis de uma medida?",
            options: ["Os autovalores de A", "As amplitudes do estado", "Sempre 0 ou 1", "Os elementos da diagonal de A"],
            answer: 0,
            explanation: "Medir A dá um dos autovalores, e o estado fica no autovetor correspondente.",
        },
        {
            question: "Na decomposição A = a0 I + a1 X + a2 Y + a3 Z de uma hermitiana, os coeficientes a_k são...",
            options: ["Sempre inteiros", "Sempre positivos", "Números complexos quaisquer", "Números reais"],
            answer: 3,
            explanation: "Os quatro coeficientes são reais, dando os 4 graus de liberdade reais de uma hermitiana 2x2.",
        },
        {
            question: "Dois autovetores de uma hermitiana com autovalores diferentes são...",
            options: ["Iguais", "Paralelos", "Ortogonais", "Sempre complexos"],
            answer: 2,
            explanation: "Autovalores diferentes de uma hermitiana têm autovetores ortogonais (teorema espectral: formam uma base ortonormal).",
        },
    ],
};

export default hermitianas;
