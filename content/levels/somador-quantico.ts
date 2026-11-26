import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing" (2022), sec. 4.5.
const somadorQuantico: Lesson = {
    id: "somador-quantico",
    title: "Somador quântico",
    intro: "O somador completo vira circuito reversível com Toffoli e CNOT, e soma todas as parcelas de uma superposição de uma vez.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, seção 4.5",
    course: "computacao-quantica",
    skill: "somador-quantico",
    xp: 10,
    challenges: [
        {
            question: "Por que o somador completo clássico (3 bits entram, 2 saem) não pode ser uma porta quântica como está?",
            options: ["Ele usa bits e não qubits", "Precisa de mais de duas portas", "Não é reversível: entradas diferentes dão a mesma saída", "Ele não é linear"],
            answer: 2,
            explanation: "Com 8 entradas e só 4 saídas possíveis, não dá para recuperar a entrada. Mantemos as entradas e usamos um qubit extra para o vai-um.",
        },
        {
            question: "No bloco somador de 4 portas, o que a primeira Toffoli (controles a e b, alvo c_out) calcula?",
            options: ["O produto ab, somado ao vai-um", "a ⊕ b", "A soma s completa", "c_in · a"],
            answer: 0,
            explanation: "Ela deixa ab em c_out. Depois, a segunda Toffoli soma c_in·(a ⊕ b) e dá o vai-um correto.",
        },
        {
            question: "Quantos qubits usa um somador ripple-carry para dois números de 5 bits (sem contar nada além de a, b e vai-um)?",
            options: ["10", "11", "15", "16"],
            answer: 3,
            explanation: "São 3n + 1 = 16: 5 de a, 5 de b e 6 de vai-um (o último é o bit mais alto da soma).",
        },
        {
            question: "Com 2 Toffoli e 2 CNOT por coluna, quantas portas tem o somador de 6 bits?",
            options: ["12", "24", "36", "8"],
            answer: 1,
            explanation: "São 4 portas por coluna, e 6 colunas dão 24.",
        },
        {
            question: "O registrador a está em (|0⟩+|1⟩+|2⟩+|3⟩)/2 e b = 2. Qual a chance de a soma medida ser 5?",
            options: ["1/4", "0", "1/2", "1"],
            answer: 0,
            explanation: "As somas possíveis são 2, 3, 4 e 5, todas com probabilidade 1/4. Uma execução calcula todas, mas a medida mostra uma só.",
        },
        {
            question: "O que sobra nos qubits de vai-um depois do somador ripple-carry?",
            options: ["Zeros, pois o vai-um é consumido", "A cópia da soma", "Lixo que depende das entradas, e que precisa ser desfeito se quisermos interferência limpa", "Nada: eles são medidos pela própria porta"],
            answer: 2,
            explanation: "Os vai-um intermediários dependem de a e b. Em superposição, esse lixo se emaranha com o resto, e a próxima skill mostra como descomputá-lo.",
        },
    ],
};

export default somadorQuantico;
