import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 4.
const naoClonagem: Lesson = {
    id: "nao-clonagem",
    title: "Não-clonagem",
    intro:
        "Nenhuma unitária copia um estado quântico desconhecido qualquer. Só estados iguais ou ortogonais podem ser copiados pela mesma máquina.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 4",
    course: "computacao-quantica",
    skill: "nao-clonagem",
    xp: 10,
    challenges: [
        {
            question: "A CNOT com alvo em |0⟩ copia corretamente…",
            options: ["|0⟩ e |1⟩", "|+⟩ e |−⟩", "qualquer estado", "nenhum estado"],
            answer: 0,
            explanation: "Ela copia a base padrão, mas emaranha superposições.",
        },
        {
            question: "O que a CNOT faz com |+⟩|0⟩?",
            options: ["|+⟩|+⟩", "|0⟩|0⟩", "(|00⟩ + |11⟩)/√2", "|−⟩|+⟩"],
            answer: 2,
            explanation: "O resultado é emaranhado, e não uma cópia.",
        },
        {
            question: "Que propriedade das unitárias é usada na prova?",
            options: ["São reais", "São diagonais", "Preservam o produto interno", "São iguais à sua adaga"],
            answer: 2,
            explanation: "Daí vem x = x², com soluções 0 e 1.",
        },
        {
            question: "Uma mesma máquina pode copiar |+⟩ e |−⟩?",
            options: ["Sim, pois são ortogonais", "Não, nunca", "Só um de cada vez", "Só com três qubits"],
            answer: 0,
            explanation: "Estados ortogonais podem ser copiados: basta usar a base X.",
        },
        {
            question: "Qual aplicação depende diretamente da não-clonagem?",
            options: ["A porta NAND", "O ASCII", "A criptografia quântica", "O somador binário"],
            answer: 2,
            explanation: "Um espião não consegue copiar os qubits e medi-los depois.",
        },
    ],
};

export default naoClonagem;
