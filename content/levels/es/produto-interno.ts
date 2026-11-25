import type { LevelText } from "@/lib/lesson";

const produtoInterno: LevelText = {
    title: "Producto interno",
    intro:
        "El producto interno ⟨φ|ψ⟩ multiplica las componentes conjugadas de φ por las de ψ y las suma. Los estados ortogonales tienen producto interno cero.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    challenges: [
        {
            question: "¿Cuánto vale ⟨0|1⟩?",
            options: ["0", "1", "1/√2", "i"],
            explanation: "|0⟩ y |1⟩ son ortogonales.",
        },
        {
            question: "¿Cuánto vale ⟨+|+⟩?",
            options: ["0", "1/2", "1/√2", "1"],
            explanation: "|+⟩ está normalizado.",
        },
        {
            question: "¿Cuánto vale ⟨+|1⟩?",
            options: ["0", "1/2", "1/√2", "1"],
            explanation: "La amplitud de |1⟩ en |+⟩ es 1/√2.",
        },
        {
            question: "¿Qué par es ortogonal?",
            options: ["|0⟩ y |+⟩", "|1⟩ y |−⟩", "|+⟩ y |−⟩", "|0⟩ y −|0⟩"],
            explanation: "(1·1 + 1·(−1))/2 = 0.",
        },
        {
            question: "Si ⟨φ|ψ⟩ = 2i/3, ¿cuánto vale ⟨ψ|φ⟩?",
            options: ["2i/3", "−2i/3", "2/3", "3/(2i)"],
            explanation: "Cambiar el orden conjuga el resultado.",
        },
    ],
};

export default produtoInterno;
