import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Intro. to Quantum Algorithms and Quantum Programming (2025), sec. 4.6-4.7.
const mbqc: Lesson = {
    id: "mbqc",
    title: "Computação baseada em medidas",
    intro: "Comece com um estado de grafo emaranhado e compute só medindo, com correções clássicas.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seções 4.6 e 4.7",
    course: "hardware",
    skill: "mbqc",
    xp: 10,
    challenges: [
        {
            question: "Como se constrói um estado de grafo?",
            options: [
                "Um |+⟩ por nó e uma C-Z por aresta",
                "Um |0⟩ por nó e um CNOT por nó",
                "Um |1⟩ por aresta e uma H por nó",
                "Um estado de Bell por nó",
            ],
            answer: 0,
            explanation: "Cada nó começa em |+⟩ e cada aresta é uma porta C-Z entre os dois qubits.",
        },
        {
            question: "No MBQC, onde fica a 'computação' em si?",
            options: [
                "Nas portas CNOT aplicadas durante o algoritmo",
                "Na preparação do estado inicial apenas",
                "Na escolha das bases de medida (e nas correções)",
                "No resultado final, sempre aleatório",
            ],
            answer: 2,
            explanation: "O estado de grafo é fixo; o que programa a computação são os ângulos de medida e as correções.",
        },
        {
            question: "No padrão de 2 nós, a medida deu o resultado b = 1. O que fazer?",
            options: ["Nada, o resultado é igual", "Aplicar Z no qubit de saída", "Refazer a medida", "Aplicar X no qubit de saída"],
            answer: 3,
            explanation: "Com b = 1, a saída é a desejada com |0⟩ e |1⟩ trocados, e X desfaz isso.",
        },
        {
            question: "Que porta o padrão de 2 nós calcula quando θ = 0?",
            options: ["Identidade", "Hadamard", "CNOT", "S"],
            answer: 1,
            explanation: "A saída é H R_{−θ}|ψ⟩; com θ = 0, apenas H|ψ⟩.",
        },
        {
            question: "Por que o ângulo de medida pode depender de resultados anteriores?",
            options: [
                "Para tornar o resultado mais aleatório",
                "Para aumentar o número de qubits",
                "Porque as bases são escolhidas ao acaso",
                "Para compensar correções que ainda não foram aplicadas",
            ],
            answer: 3,
            explanation: "Em vez de corrigir o dado de imediato, pode-se ajustar a medida seguinte com base no sinal anterior.",
        },
        {
            question: "Dentro do coprocessador, uma computação clássica feita sobre qubits (em superposição) precisa ser...",
            options: ["Irreversível, para apagar bits", "Reversível, porque é unitária", "Feita só no computador hospedeiro", "Aleatória"],
            answer: 1,
            explanation: "Operações sobre qubits são unitárias, portanto reversíveis; o que se faz livremente é computar sobre bits já medidos.",
        },
    ],
};

export default mbqc;
