import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Valiron, "Introduction to Quantum Algorithms and Quantum Programming" (2025), sec. 3.5.
const rotacoes: Lesson = {
    id: "rotacoes",
    title: "Rotações Rx, Ry, Rz e portas S e T",
    intro: "Cada porta de 1 qubit é um giro da esfera de Bloch: Rx, Ry e Rz giram em torno dos eixos, e S e T são giros curtos em torno de z.",
    source: "Baseado em B. Valiron, Intro to Quantum Algorithms and Quantum Programming (2025), seção 3.5",
    course: "computacao-quantica",
    skill: "rotacoes",
    xp: 10,
    challenges: [
        {
            question: "Quanto a porta S gira o estado na esfera de Bloch, em torno do eixo z?",
            options: ["45°", "90°", "180°", "360°"],
            answer: 1,
            explanation: "S multiplica |1⟩ por i = e^{iπ/2}, o que soma 90° à longitude. T soma 45° e Z soma 180°.",
        },
        {
            question: "Qual é Ry(θ)|0⟩, com θ o ângulo polar (quanto desce do polo norte)?",
            options: ["cos(θ)|0⟩ + sin(θ)|1⟩", "e^{iθ}|0⟩", "sin(θ/2)|0⟩ + cos(θ/2)|1⟩", "cos(θ/2)|0⟩ + sin(θ/2)|1⟩"],
            answer: 3,
            explanation: "A primeira coluna de Ry é (cos θ/2, sin θ/2). O meio-ângulo existe porque o ângulo da esfera é o dobro do das amplitudes.",
        },
        {
            question: "Rz(θ) e a porta de fase P(θ) = diag(1, e^{iθ}) diferem em quê?",
            options: ["Numa fase global e^{-iθ/2}, que não pode ser medida (sem controle)", "Em nada: são matrizes iguais", "Rz muda as probabilidades na base padrão e P não", "P gira em torno de x"],
            answer: 0,
            explanation: "Rz(θ) = e^{-iθ/2} P(θ). Numa porta controlada, essa fase vira relativa e passa a importar.",
        },
        {
            question: "Quantos parâmetros reais, além da fase global, tem a decomposição ZYZ de uma porta de 1 qubit?",
            options: ["1", "2", "3", "4"],
            answer: 2,
            explanation: "Rz(β) Ry(γ) Rz(δ): três ângulos, como os ângulos de Euler de uma orientação no espaço.",
        },
        {
            question: "Rz(2π) é igual a qual matriz?",
            options: ["−I", "I", "Z", "iI"],
            answer: 0,
            explanation: "Rz(2π) = diag(e^{-iπ}, e^{iπ}) = −I. É uma fase global, mas só um giro de 4π devolve a matriz identidade.",
        },
        {
            question: "O que a CNOT acrescenta às rotações de 1 qubit para gerar qualquer unitária de n qubits?",
            options: ["Nada: rotações bastam", "Rotações em torno de um quarto eixo", "Portas T extras", "A capacidade de criar emaranhamento entre qubits"],
            answer: 3,
            explanation: "Portas de 1 qubit nunca emaranham. Com a CNOT, o conjunto passa a gerar exatamente, a menos de fase global, qualquer unitária.",
        },
    ],
};

export default rotacoes;
