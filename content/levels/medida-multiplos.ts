import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 4.
const medidaMultiplos: Lesson = {
    id: "medida-multiplos",
    title: "Medindo vários qubits",
    intro:
        "Para medir só um qubit, some as probabilidades dos termos compatíveis. O estado que sobra é renormalizado.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    course: "computacao-quantica",
    skill: "medida-multiplos",
    xp: 10,
    challenges: [
        {
            question: "Em (|00⟩ + |01⟩ + |10⟩ + |11⟩)/2, qual é a chance de medir 11?",
            options: ["1/4", "1/2", "1", "0"],
            answer: 0,
            explanation: "|1/2|² = 1/4.",
        },
        {
            question: "Em (|00⟩ + |11⟩)/√2, qual é a chance de o primeiro qubit dar 0?",
            options: ["0", "1/4", "1/2", "1"],
            answer: 2,
            explanation: "Só |00⟩ é compatível, com probabilidade 1/2.",
        },
        {
            question: "No mesmo estado, o primeiro deu 0. O estado agora é…",
            options: ["|01⟩", "|00⟩", "|11⟩", "(|00⟩ + |11⟩)/√2"],
            answer: 1,
            explanation: "Só sobra o termo |00⟩.",
        },
        {
            question: "Por que renormalizar depois da medida?",
            options: ["Para apagar a fase", "Para as probabilidades somarem 1", "Para desfazer o colapso", "Para emaranhar os qubits"],
            answer: 1,
            explanation: "Os termos que sobraram têm soma menor que 1.",
        },
        {
            question: "Em 0,6|00⟩ + 0,8|10⟩, qual é a chance de o segundo qubit dar 0?",
            options: ["0,36", "0,64", "0,8", "1"],
            answer: 3,
            explanation: "Os dois termos têm o segundo qubit em 0.",
        },
    ],
};

export default medidaMultiplos;
