import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), sec. 6.3.
const hhl: Lesson = {
    id: "hhl",
    title: "Algoritmo HHL",
    intro: "O HHL entrega um estado proporcional à solução de Ax = b: ótimo para propriedades globais, ruim para ler cada componente.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (notas de curso, 2025), seção 6.3",
    course: "algoritmos",
    skill: "hhl",
    xp: 20,
    challenges: [
        {
            question: "O que o HHL devolve?",
            options: ["Um estado quântico com amplitudes proporcionais a x", "Os N números x₁, …, x_N", "A matriz A⁻¹", "O maior autovalor de A"],
            answer: 0,
            explanation: "A saída é |x⟩ ∝ A⁻¹|b⟩; para ler as componentes seriam necessárias muitas repetições.",
        },
        {
            question: "Qual subrotina leva os autovalores de A para um registro?",
            options: ["Busca de Grover", "Estimação de fase de e^{iAτ}", "QFT sobre A", "Medida de Bell"],
            answer: 1,
            explanation: "e^{iAτ} tem autovalores e^{iλτ}; a estimação de fase põe uma estimativa de λ no registro de relógio.",
        },
        {
            question: "Qual é a rotação controlada correta da ancila para o autovalor λ?",
            options: ["|0⟩ → (λ/C)|1⟩ + …|0⟩", "|0⟩ → λ|1⟩", "|0⟩ → |1⟩ se λ > C", "|0⟩ → √(1−C²/λ²)|0⟩ + (C/λ)|1⟩"],
            answer: 3,
            explanation: "A amplitude C/λ no ramo |1⟩ dá a cada |u_j⟩ o peso β_j C/λ_j, a inversão procurada.",
        },
        {
            question: "Por que se descomputa a estimação de fase antes de medir a ancila?",
            options: ["Para trocar A por A⁻¹", "Para aumentar λ", "Para o relógio não ficar emaranhado com os dados", "Porque a ancila só funciona assim"],
            answer: 2,
            explanation: "Sem isso, o relógio guardaria λ_j emaranhado e as componentes não interfeririam em |x⟩.",
        },
        {
            question: "Para A = diag(1, 10), b = |0⟩ + |1⟩ normalizado e C = 1, qual é P(ancila = 1)?",
            options: ["0,505", "0,5", "0,01", "1"],
            answer: 0,
            explanation: "P₁ = ½·1 + ½·(1/100) = 0,505.",
        },
        {
            question: "Qual afirmação sobre o HHL é verdadeira?",
            options: ["Dá todas as componentes de x em uma única medida", "Funciona sem nenhuma hipótese sobre A", "Seu custo cresce com o número de condição κ de A", "Precisa de A diagonal"],
            answer: 2,
            explanation: "O custo depende de κ (e da esparsidade de A); a leitura de x inteiro continua cara e A não precisa ser diagonal.",
        },
    ],
};

export default hhl;
