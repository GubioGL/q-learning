import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, "Introduction to Quantum Algorithms and Quantum Programming" (2025), sec. 7.2.
const vqe: Lesson = {
    id: "vqe",
    title: "Algoritmos variacionais e VQE",
    intro: "Na era NISQ, um circuito raso com parâmetros e um otimizador clássico procuram a menor energia.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seção 7.2",
    course: "nisq",
    skill: "vqe",
    xp: 10,
    challenges: [
        {
            question: "Por que ⟨ψ|H|ψ⟩ nunca fica abaixo do menor autovalor E0?",
            options: [
                "Porque H só tem autovalores positivos",
                "Porque ψ sempre é um autoestado",
                "Porque é uma média ponderada dos autovalores, e uma média não passa do mínimo",
                "Porque a medida sempre soma 1",
            ],
            answer: 2,
            explanation: "Escrevendo ψ nos autovetores de H, E = Σ|c_j|² E_j com pesos que somam 1.",
        },
        {
            question: "Qual é o papel do computador clássico no VQE?",
            options: [
                "Executar o circuito parametrizado",
                "Otimizar os parâmetros θ com base nas energias medidas",
                "Substituir as medidas",
                "Corrigir os erros de cada porta",
            ],
            answer: 1,
            explanation: "O quântico prepara e mede; o otimizador clássico propõe novos θ.",
        },
        {
            question: "Para estimar ⟨X⟩ medindo na base padrão, o que se faz antes da medida?",
            options: ["Aplica-se Z", "Aplica-se uma CNOT", "Nada, mede-se direto", "Aplica-se uma Hadamard"],
            answer: 3,
            explanation: "A Hadamard troca as bases X e Z, então medir em Z depois dela equivale a medir X.",
        },
        {
            question: "Com ansatz Ry(θ)|0⟩ e H = Z + X, qual é a energia mínima?",
            options: ["−1, o autovalor de Z", "−√2, o menor autovalor de Z + X", "0, a média dos autovalores", "−2, a soma dos mínimos de Z e X"],
            answer: 1,
            explanation: "E(θ) = cosθ + senθ, com mínimo −√2 em θ = 225°, igual ao menor autovalor de H.",
        },
        {
            question: "Por que a era NISQ favorece algoritmos variacionais?",
            options: [
                "Porque o ruído some quando o circuito é raso, e o otimizador não precisa lidar com ele",
                "Porque eles usam circuitos com milhões de qubits sem correção de erros",
                "Porque a otimização clássica elimina o ruído de cada porta",
                "Porque usam circuitos rasos, que acumulam menos ruído que os profundos",
            ],
            answer: 3,
            explanation: "Sem correção de erros, circuitos profundos falham; os variacionais mantêm o circuito curto.",
        },
        {
            question: "Para H = 0,5Z + 0,3X com ⟨Z⟩ = 0,6 e ⟨X⟩ = 0,8, qual é ⟨H⟩?",
            options: ["1,4", "0,54", "0,24", "0,3"],
            answer: 1,
            explanation: "Linearidade: 0,5·0,6 + 0,3·0,8 = 0,30 + 0,24 = 0,54.",
        },
    ],
};

export default vqe;
