import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, "Introduction to Quantum Algorithms and Quantum Programming" (2025), sec. 7.3.
const qaoa: Lesson = {
    id: "qaoa",
    title: "QAOA",
    intro: "Camadas alternadas de custo e mixer resolvem MaxCut com um laço híbrido, imitando a evolução adiabática.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seção 7.3",
    course: "nisq",
    skill: "qaoa",
    xp: 10,
    challenges: [
        {
            question: "O que o MaxCut procura?",
            options: [
                "Dividir os vértices em dois grupos maximizando as arestas entre grupos diferentes",
                "Dividir os vértices minimizando as arestas entre grupos diferentes",
                "O menor caminho entre dois vértices",
                "O número de vértices do grafo",
            ],
            answer: 0,
            explanation: "O corte conta as arestas cujos extremos ficam em grupos diferentes, e se quer o máximo.",
        },
        {
            question: "Qual é o hamiltoniano de custo do MaxCut?",
            options: ["Soma de X_i sobre os vértices", "Soma de (1 − Z_i Z_j)/2 sobre as arestas", "Soma de (1 + X_i X_j)/2 sobre as arestas", "Soma de Z_i sobre os vértices"],
            answer: 1,
            explanation: "Cada termo vale 1 quando os bits diferem e 0 quando são iguais; é diagonal na base computacional.",
        },
        {
            question: "Para que serve o mixer, com H_B = soma de X_i?",
            options: [
                "Medir cada qubit na base X e descartar as fases",
                "Aplicar as fases e^{-iγC(z)} em cada divisão",
                "Misturar amplitudes, convertendo diferenças de fase em probabilidade",
                "Calcular classicamente o corte de cada divisão",
            ],
            answer: 2,
            explanation: "O operador de custo só dá fases; sem o mixer, elas não alteram as probabilidades de medida.",
        },
        {
            question: "Quantos parâmetros reais tem um QAOA com p camadas?",
            options: ["p, um por camada", "p², um por par de camadas", "n, um por vértice", "2p, um γ e um β por camada"],
            answer: 3,
            explanation: "Cada camada tem um γ (custo) e um β (mixer).",
        },
        {
            question: "Qual é o estado inicial do QAOA?",
            options: ["|0…0⟩", "O estado de maior corte", "|+⟩ em cada qubit, superposição uniforme", "|1…1⟩"],
            answer: 2,
            explanation: "Hadamards em todos os qubits dão todas as divisões com a mesma probabilidade.",
        },
        {
            question: "Qual a relação do QAOA com a evolução adiabática?",
            options: [
                "O QAOA é uma versão trotterizada dela, com ângulos escolhidos pelo otimizador",
                "São idênticos, com os mesmos ângulos e tempo infinito",
                "A adiabática usa medidas a cada passo, o QAOA não",
                "A adiabática usa só o mixer, e o QAOA só o custo",
            ],
            answer: 0,
            explanation: "A trotterização da evolução adiabática alterna custo e mixer; o QAOA mantém essa estrutura e ajusta γ e β livremente.",
        },
    ],
};

export default qaoa;
