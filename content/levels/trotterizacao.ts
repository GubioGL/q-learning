import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, "Introduction to Quantum Algorithms and Quantum Programming" (2025), secs. 5.7 and 7.1.
const trotterizacao: Lesson = {
    id: "trotterizacao",
    title: "Simulação hamiltoniana e trotterização",
    intro: "Como transformar e^{-iHt} em portas: dividir o tempo em passos e aplicar os termos de Pauli um a um.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seções 5.7 e 7.1",
    course: "nisq",
    skill: "trotterizacao",
    xp: 10,
    challenges: [
        {
            question: "Por que e^{-i(A+B)t} costuma ser diferente de e^{-iAt}e^{-iBt}?",
            options: [
                "Porque A e B costumam não comutar, então a ordem importa",
                "Porque e^{-iAt} deixa de ser unitária quando A é hermitiano",
                "Porque a exponencial de uma soma é sempre a soma das exponenciais",
                "Porque o tempo t precisa ser dividido em passos inteiros",
            ],
            answer: 0,
            explanation: "A igualdade exige AB = BA. Quando os termos não comutam, aparece um erro ligado ao comutador [A, B].",
        },
        {
            question: "Na fórmula de Trotter de 1ª ordem, o que acontece com o erro ao dobrar o número de passos n (mesmo t)?",
            options: ["Fica 4 vezes menor, como 1/n²", "Não muda, pois só t importa", "Dobra, pois há mais portas", "Cai pela metade, como 1/n"],
            answer: 3,
            explanation: "O erro é da ordem de t²/n: é inversamente proporcional a n.",
        },
        {
            question: "Quais portas formam o circuito de e^{-iθ Z⊗Z}?",
            options: ["H, T, H nos dois qubits", "CNOT, Rz(2θ) no alvo, CNOT", "SWAP, Rx(2θ), SWAP", "Rz(θ) em cada qubit, sem CNOT"],
            answer: 1,
            explanation: "A primeira CNOT guarda a paridade no qubit alvo, o Rz aplica a fase e a segunda CNOT desfaz.",
        },
        {
            question: "Para H = 0,5 Z₁Z₂ + 0,3 X₁ + 0,3 X₂, como se simula um passo de Trotter?",
            options: [
                "Aplica-se só o termo de maior coeficiente, Z₁Z₂, em n passos",
                "Aplica-se e^{-iHt/n} como uma única porta, sem decompor em termos",
                "Mede-se cada termo e soma-se o resultado classicamente",
                "Aplica-se e^{-i0,5Z₁Z₂ t/n}, depois as rotações em X de cada qubit",
            ],
            answer: 3,
            explanation: "Cada termo de Pauli é exponenciado separadamente, em sequência, dentro de cada passo.",
        },
        {
            question: "Quanto vale e^{-iθZ} para θ = π/2?",
            options: ["Z", "-iZ", "I", "-I"],
            answer: 1,
            explanation: "e^{-iθZ} = cosθ I − i senθ Z. Em θ = π/2 resta −iZ.",
        },
        {
            question: "Qual é o custo de reduzir o erro de trotterização em hardware ruidoso?",
            options: [
                "Nenhum, pois o ruído do hardware independe do número de portas",
                "Mais passos significam circuitos mais profundos, e mais ruído acumulado",
                "O erro cai sem custo adicional, pois cada passo fica mais simples",
                "Menos portas por passo, e por isso menos ruído no total",
            ],
            answer: 1,
            explanation: "Mais precisão pede n maior; a profundidade cresce com n e o ruído acumula.",
        },
    ],
};

export default trotterizacao;
