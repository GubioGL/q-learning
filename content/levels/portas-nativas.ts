import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), sec. 4.2-4.4.
const portasNativas: Lesson = {
    id: "portas-nativas",
    title: "Portas nativas e compilação",
    intro: "Cada hardware tem poucas portas nativas; o compilador traduz o resto e o custo muda.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (notas de curso, 2025), seções 4.2 a 4.4",
    course: "hardware",
    skill: "portas-nativas",
    xp: 10,
    challenges: [
        {
            question: "Por que o conjunto Clifford (H, S, CNOT) sozinho não basta para computação quântica universal?",
            options: [
                "Não produz emaranhamento algum",
                "Só gera estados reais, sem fase",
                "Exige mais qubits do que o hardware tem",
                "Um computador clássico o simula com eficiência",
            ],
            answer: 3,
            explanation: "Clifford é simulável de forma eficiente por máquinas clássicas; falta uma porta não-Clifford, como a T.",
        },
        {
            question: "Qual par de portas é um conjunto universal típico em chips supercondutores?",
            options: ["CNOT e rotações de 1 qubit", "Hadamard, S e CNOT, nada mais", "SWAP e Pauli X, Y, Z", "Só Hadamard e Toffoli reais, sem T"],
            answer: 0,
            explanation: "CNOT mais rotações de ângulo livre gera qualquer unitária; os outros conjuntos são Clifford (simuláveis) ou limitados.",
        },
        {
            question: "Quais são os números de portas de uma Toffoli decomposta em H, CNOT, T e T†?",
            options: ["6 CNOT, 7 T/T†, 2 H", "7 CNOT, 6 T/T†, 2 H", "3 CNOT, 3 T/T†, 1 H", "6 CNOT, 2 T/T†, 7 H"],
            answer: 0,
            explanation: "A decomposição clássica usa 6 CNOTs, 7 portas do tipo T (T ou T†) e 2 Hadamards.",
        },
        {
            question: "Um chip tem qubits em linha 0 - 1 - 2. Para um CNOT entre 0 e 2 com SWAPs, trocando e voltando, quantos CNOTs há no total?",
            options: ["4", "3", "9", "7"],
            answer: 3,
            explanation: "Cada SWAP custa 3 CNOTs: 3 + 1 + 3 = 7.",
        },
        {
            question: "O que acontece com a C^n-Rθ sem ancillas, usando a construção recursiva do CC-U?",
            options: [
                "O número de portas cresce linearmente com n",
                "O número de portas cresce exponencialmente com n (3ⁿ rotações)",
                "O circuito fica com profundidade constante",
                "O número de portas fica fixo em 2",
            ],
            answer: 1,
            explanation: "Cada nível triplica as rotações: N_R = 3ⁿ, e não há como paralelizá-las no mesmo alvo.",
        },
        {
            question: "Qual é a troca feita ao usar ancillas na C^n-Rθ?",
            options: [
                "Gasta mais portas para economizar qubits",
                "Não muda nada, só renomeia qubits",
                "Troca qubits extras por um circuito de tamanho polinomial",
                "Troca correção de erro por mais profundidade",
            ],
            answer: 2,
            explanation: "As n−1 ancillas guardam o produto dos controles; o custo passa de exponencial a polinomial em n.",
        },
    ],
};

export default portasNativas;
