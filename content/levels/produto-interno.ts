import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 3.
const produtoInterno: Lesson = {
    id: "produto-interno",
    title: "Produto interno",
    intro:
        "O produto interno ⟨φ|ψ⟩ multiplica as componentes conjugadas de φ pelas de ψ e soma. Estados ortogonais têm produto interno zero.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    course: "algebra-linear",
    skill: "produto-interno",
    xp: 10,
    challenges: [
        {
            question: "Quanto vale ⟨0|1⟩?",
            options: ["0", "1", "1/√2", "i"],
            answer: 0,
            explanation: "|0⟩ e |1⟩ são ortogonais.",
        },
        {
            question: "Quanto vale ⟨+|+⟩?",
            options: ["0", "1/2", "1/√2", "1"],
            answer: 3,
            explanation: "|+⟩ é normalizado.",
        },
        {
            question: "Quanto vale ⟨+|1⟩?",
            options: ["0", "1/2", "1/√2", "1"],
            answer: 2,
            explanation: "A amplitude de |1⟩ em |+⟩ é 1/√2.",
        },
        {
            question: "Qual par é ortogonal?",
            options: ["|0⟩ e |+⟩", "|1⟩ e |−⟩", "|+⟩ e |−⟩", "|0⟩ e −|0⟩"],
            answer: 2,
            explanation: "(1·1 + 1·(−1))/2 = 0.",
        },
        {
            question: "Se ⟨φ|ψ⟩ = 2i/3, quanto vale ⟨ψ|φ⟩?",
            options: ["2i/3", "−2i/3", "2/3", "3/(2i)"],
            answer: 1,
            explanation: "Trocar a ordem conjuga o resultado.",
        },
    ],
};

export default produtoInterno;
