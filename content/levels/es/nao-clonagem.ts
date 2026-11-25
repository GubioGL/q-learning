import type { LevelText } from "@/lib/lesson";

const naoClonagem: LevelText = {
    title: "No clonación",
    intro:
        "Ninguna unitaria copia un estado cuántico desconocido cualquiera. Una misma máquina solo puede copiar estados iguales u ortogonales.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    challenges: [
        {
            question: "La CNOT con objetivo en |0⟩ copia correctamente…",
            options: ["|0⟩ y |1⟩", "|+⟩ y |−⟩", "cualquier estado", "ningún estado"],
            explanation: "Copia la base estándar, pero entrelaza las superposiciones.",
        },
        {
            question: "¿Qué hace la CNOT con |+⟩|0⟩?",
            options: ["|+⟩|+⟩", "|0⟩|0⟩", "(|00⟩ + |11⟩)/√2", "|−⟩|+⟩"],
            explanation: "El resultado está entrelazado, no es una copia.",
        },
        {
            question: "¿Qué propiedad de las unitarias se usa en la demostración?",
            options: ["Son reales", "Son diagonales", "Conservan el producto interno", "Son iguales a su daga"],
            explanation: "De ahí sale x = x², con soluciones 0 y 1.",
        },
        {
            question: "¿Puede una misma máquina copiar |+⟩ y |−⟩?",
            options: ["Sí, porque son ortogonales", "No, nunca", "Solo uno cada vez", "Solo con tres qubits"],
            explanation: "Los estados ortogonales se pueden copiar: basta con usar la base X.",
        },
        {
            question: "¿Qué aplicación depende directamente de la no clonación?",
            options: ["La puerta NAND", "El ASCII", "La criptografía cuántica", "El sumador binario"],
            explanation: "Un espía no puede copiar los qubits y medirlos después.",
        },
    ],
};

export default naoClonagem;
