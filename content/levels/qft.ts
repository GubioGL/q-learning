import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), sec. 5.5.
const qft: Lesson = {
    id: "qft",
    title: "Transformada de Fourier quântica",
    intro: "A QFT troca \"número na base\" por \"onda nas fases\" com cerca de n² portas, e é a peça final de vários algoritmos.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (notas de curso, 2025), seção 5.5",
    course: "algoritmos",
    skill: "qft",
    xp: 15,
    challenges: [
        {
            question: "Para n = 1 (N = 2), qual matriz é a QFT?",
            options: ["A porta X", "A porta de Hadamard", "A porta S", "A porta Z"],
            answer: 1,
            explanation: "Com N = 2, ω = −1 e F = (1/√2)[[1, 1], [1, −1]], que é H.",
        },
        {
            question: "Na QFT de 2 qubits, qual é a fase (ângulo) da amplitude de |11⟩ em QFT|10⟩?",
            options: ["90°", "0°", "270°", "180°"],
            answer: 3,
            explanation: "QFT|10⟩ é a coluna j = 2 de F₄: (1, −1, 1, −1)/2. A amplitude de |11⟩ é −1/2, ângulo de 180°.",
        },
        {
            question: "Quantas portas de fase controladas tem o circuito da QFT em 4 qubits?",
            options: ["4", "8", "6", "16"],
            answer: 2,
            explanation: "Soma (n−1)+(n−2)+…+1 = n(n−1)/2 = 6: da ordem de n² portas, contra 2ⁿ·n passos da FFT.",
        },
        {
            question: "Por que o circuito da QFT termina com SWAPs?",
            options: ["Para corrigir erros de fase", "Para emaranhar os qubits", "Para medir mais rápido", "Porque sem eles os qubits ficam com as fases na ordem invertida"],
            answer: 3,
            explanation: "Sem o SWAP, o qubit 1 teria a fase 0.j₁j₂… e a fórmula manda a fase 0.jₙ para ele.",
        },
        {
            question: "Como se obtém o circuito da QFT inversa?",
            options: ["Aplicando a QFT duas vezes", "Percorrendo as portas de trás para frente e trocando cada R_m por R_m† (fase negativa)", "Trocando H por X", "Trocando cada R_m por R_{m+1}"],
            answer: 1,
            explanation: "A inversa de um circuito é o circuito reverso com cada porta adjunta; R_m† tem fase e^{−2πi/2^m}.",
        },
        {
            question: "Qual propriedade de QFT|j⟩ permite um circuito tão pequeno?",
            options: ["Tem uma só amplitude não nula", "É sempre emaranhado ao máximo", "É um produto de qubits independentes, um fator de fase por qubit", "É igual a |j⟩ a menos de uma fase global"],
            answer: 2,
            explanation: "A fórmula do produto mostra um fator (|0⟩ + e^{2πi 0.j…}|1⟩) por qubit, sem emaranhamento.",
        },
    ],
};

export default qft;
