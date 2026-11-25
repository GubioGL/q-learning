import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 2.
const medida: Lesson = {
    id: "medida",
    title: "Medida",
    intro:
        "Medir α|0⟩ + β|1⟩ dá 0 com probabilidade |α|² e 1 com probabilidade |β|². Depois da medida, o estado é o do resultado obtido.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 2",
    course: "basico",
    skill: "medida",
    xp: 10,
    challenges: [
        {
            question: "Em 0,6|0⟩ + 0,8|1⟩, qual é a probabilidade de medir 0?",
            options: ["0,36", "0,5", "0,6", "0,64"],
            answer: 0,
            explanation: "P(0) = |0,6|² = 0,36.",
        },
        {
            question: "Um qubit em |+⟩ foi medido e deu 0. Qual é o estado agora?",
            options: ["|+⟩", "|0⟩", "|1⟩", "|−⟩"],
            answer: 1,
            explanation: "A medida colapsa o estado no resultado obtido.",
        },
        {
            question: "Por que se repete o mesmo circuito muitas vezes (shots)?",
            options: ["Para o qubit aprender", "Para evitar o colapso", "Para estimar as probabilidades", "Para copiar o estado"],
            answer: 2,
            explanation: "Cada medida dá um só resultado; as frequências estimam as probabilidades.",
        },
        {
            question: "Um qubit em |0⟩ é medido na base {|+⟩, |−⟩}. Qual é a chance de dar |+⟩?",
            options: ["0", "0,25", "0,5", "1"],
            answer: 2,
            explanation: "|0⟩ é uma superposição igual de |+⟩ e |−⟩.",
        },
        {
            question: "Onde fica |1⟩ na esfera de Bloch?",
            options: ["No polo norte", "No polo sul", "No equador", "No centro"],
            answer: 1,
            explanation: "|0⟩ é o polo norte e |1⟩ é o polo sul.",
        },
    ],
};

export default medida;
