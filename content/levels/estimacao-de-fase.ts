import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), sec. 5.6.
const estimacaoDeFase: Lesson = {
    id: "estimacao-de-fase",
    title: "Estimação de fase",
    intro: "Dado U e um autovetor, a estimação de fase lê a fase do autovalor com t bits usando U controladas e a QFT inversa.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (notas de curso, 2025), seção 5.6",
    course: "algoritmos",
    skill: "estimacao-de-fase",
    xp: 15,
    challenges: [
        {
            question: "Se U|u⟩ = −|u⟩, qual é a fase φ em e^{2πiφ}?",
            options: ["1/4", "1", "0", "1/2"],
            answer: 3,
            explanation: "−1 = e^{2πi·1/2}, então φ = 1/2 (meia volta).",
        },
        {
            question: "Que potência de U o qubit de registro de peso 2^k controla?",
            options: ["U^k", "U^{2^k}", "U^{2k}", "U^{k²}"],
            answer: 1,
            explanation: "O termo |x⟩ deve ganhar e^{2πiφx}; com x = Σ x_k 2^k, cada qubit k aplica U^{2^k}.",
        },
        {
            question: "Com φ = 1/8 e t = 3 qubits, o que se mede?",
            options: ["y = 1 com certeza", "y = 3 com certeza", "y = 8", "Um valor aleatório entre 0 e 7"],
            answer: 0,
            explanation: "φ = 1/8 = 0.001 em binário cabe em 3 bits: y = 2³φ = 1 e o registro é QFT|1⟩.",
        },
        {
            question: "Qual é a função da QFT inversa no fim do circuito?",
            options: ["Medir o autovetor", "Aplicar U uma última vez", "Descomputar o autovetor", "Converter a fase guardada nas amplitudes em um número binário medível"],
            answer: 3,
            explanation: "O registro tem a forma QFT|y⟩ com y = 2^t φ; a QFT inversa o leva a |y⟩.",
        },
        {
            question: "Se φ não cabe em t bits (por exemplo φ = 1/3), o que acontece?",
            options: ["Mede-se, com boa probabilidade, uma fração de t bits próxima de φ", "O algoritmo falha sempre", "Mede-se sempre o menor y", "A fase vira global e some"],
            answer: 0,
            explanation: "A distribuição se concentra perto de 2^t φ; mais qubits aumentam a precisão e a probabilidade.",
        },
        {
            question: "O estado de entrada é (√3/2)|u₁⟩ + (1/2)|u₂⟩ (autofases φ₁ ≠ φ₂, exatas). Qual a probabilidade de medir φ₁?",
            options: ["0,25", "0,5", "0,866", "0,75"],
            answer: 3,
            explanation: "Mede-se φ_j com probabilidade |c_j|²: (√3/2)² = 3/4, e o alvo colapsa em |u₁⟩.",
        },
    ],
};

export default estimacaoDeFase;
