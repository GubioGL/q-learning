import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Intro. to Quantum Algorithms and Quantum Programming (2025), sec. 4.5.
const estadosMagicos: Lesson = {
    id: "estados-magicos",
    title: "Computação com estados mágicos",
    intro: "Clifford é barato mas não basta. A porta T vem de um estado mágico, uma medida e uma correção.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seção 4.5",
    course: "hardware",
    skill: "estados-magicos",
    xp: 10,
    challenges: [
        {
            question: "Por que um circuito só com H, S e CNOT não dá vantagem quântica?",
            options: [
                "Essas portas não são unitárias",
                "Um computador clássico simula esse tipo de circuito com eficiência",
                "Elas não geram superposição",
                "Elas não geram emaranhamento",
            ],
            answer: 1,
            explanation: "Circuitos de Clifford são simuláveis classicamente. É preciso ao menos uma porta de fora do grupo, como T.",
        },
        {
            question: "Qual é o estado mágico usado para realizar a porta T?",
            options: ["|0⟩", "(|0⟩ + |1⟩)/√2", "(|0⟩ + e^{iπ/4}|1⟩)/√2", "(|0⟩ + i|1⟩)/√2"],
            answer: 2,
            explanation: "É T aplicado em |+⟩: carrega de antemão a fase de 45° que a rotação daria.",
        },
        {
            question: "Na injeção de T, o qubit mágico é medido e dá 1. O dado ficou com fase relativa −45° em vez de +45°. Como corrigir?",
            options: ["Aplicar S ao dado", "Aplicar X ao dado", "Medir de novo", "Descartar o dado"],
            answer: 0,
            explanation: "Faltam 90° de fase (de −45° a +45°), isto é, R_{2θ} = S. E S é Clifford, portanto barata.",
        },
        {
            question: "Com qual probabilidade o resultado da medida do qubit mágico é 0, no gadget de injeção?",
            options: ["1/4", "Depende de α e β", "1", "1/2"],
            answer: 3,
            explanation: "Os dois grupos de termos têm o mesmo peso, 1/2 cada, para qualquer estado do dado.",
        },
        {
            question: "Em que sentido o estado mágico ajuda na correção de erros?",
            options: [
                "Elimina a necessidade de medir",
                "Faz o código corrigir erros sozinho",
                "Desloca a parte não-Clifford para um recurso preparado e purificado à parte",
                "Torna as portas de Clifford caras",
            ],
            answer: 2,
            explanation: "No código só se fazem portas de Clifford e medidas; o estado mágico é verificado fora e descartado se estiver ruim.",
        },
        {
            question: "O que costuma medir o custo de um algoritmo tolerante a falhas?",
            options: ["O número de portas CNOT", "O número de portas T (estados mágicos consumidos)", "O número de portas H", "O número de qubits de dados apenas"],
            answer: 1,
            explanation: "As portas T são as caras; por isso o T-count é a métrica central.",
        },
    ],
};

export default estadosMagicos;
