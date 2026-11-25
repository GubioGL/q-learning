import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 3.
const produtoExterno: Lesson = {
    id: "produto-externo",
    title: "Produto externo",
    intro:
        "Ket vezes bra é uma matriz. Numa base ortonormal, a soma dos projetores |e⟩⟨e| é a identidade.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    course: "algebra-linear",
    skill: "produto-externo",
    xp: 10,
    challenges: [
        {
            question: "O que é |ψ⟩⟨φ|?",
            options: ["Um número", "Um vetor", "Uma matriz", "Uma probabilidade"],
            answer: 2,
            explanation: "Coluna vezes linha dá uma matriz.",
        },
        {
            question: "Quanto é |0⟩⟨0| + |1⟩⟨1|?",
            options: ["I", "X", "Z", "H"],
            answer: 0,
            explanation: "É a relação de completude.",
        },
        {
            question: "Qual porta é |0⟩⟨0| − |1⟩⟨1|?",
            options: ["X", "Y", "Z", "H"],
            answer: 2,
            explanation: "Mantém |0⟩ e troca o sinal de |1⟩: é a Z.",
        },
        {
            question: "Se Π é um projetor, quanto é Π²?",
            options: ["0", "I", "Π", "2Π"],
            answer: 2,
            explanation: "Projetar duas vezes é igual a projetar uma.",
        },
        {
            question: "Quanto é (|1⟩⟨0|) aplicado em |0⟩?",
            options: ["|0⟩", "|1⟩", "0", "|+⟩"],
            answer: 1,
            explanation: "⟨0|0⟩ = 1, e sobra |1⟩.",
        },
    ],
};

export default produtoExterno;
