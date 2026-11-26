import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Valiron, "Introduction to Quantum Algorithms and Quantum Programming" (2025), secs. 3.7-3.9 and 4.3, and Wong sec. 4.5.
const registradores: Lesson = {
    id: "registradores",
    title: "Ancillas, medição e descarte",
    intro: "Qubits auxiliares começam em |0⟩, medidas podem ser adiadas, e o lixo emaranhado precisa ser desfeito.",
    source: "Baseado em B. Valiron, Intro to Quantum Algorithms and Quantum Programming (2025), seções 3.7–3.9 e 4.3; T. G. Wong, seção 4.5",
    course: "computacao-quantica",
    skill: "registradores",
    xp: 10,
    challenges: [
        {
            question: "Qual é o estado inicial convencional de uma ancilla?",
            options: ["|0⟩", "|1⟩", "|+⟩", "Um estado aleatório"],
            answer: 0,
            explanation: "|0⟩ é fácil de preparar e o circuito pode contar com ele. Outros estados saem dele com X ou H.",
        },
        {
            question: "O estado é (|00⟩+|01⟩+|10⟩)/√3 e medimos o 2º qubit, obtendo 0. Em que estado fica o 1º qubit?",
            options: ["|0⟩", "|1⟩", "|−⟩", "|+⟩"],
            answer: 3,
            explanation: "Sobram os termos |00⟩ e |10⟩ com a mesma amplitude, que renormalizados dão (|0⟩+|1⟩)/√2 = |+⟩.",
        },
        {
            question: "O que diz o princípio da medição adiada?",
            options: ["Medir sempre muda o estado, então devemos evitar medidas", "Toda medida pode ser removida do circuito", "Uma porta condicionada a um resultado de medida equivale a uma porta controlada, com a medida movida para o fim", "Medidas só valem na base padrão"],
            answer: 2,
            explanation: "As estatísticas finais são as mesmas, por isso circuitos costumam ter todas as medidas no final.",
        },
        {
            question: "Como medir um qubit na base {|+⟩, |−⟩} com hardware que mede só na base padrão?",
            options: ["Aplicar H e medir: 0 quer dizer |+⟩ e 1 quer dizer |−⟩", "Aplicar Z e medir", "Aplicar H e medir: 0 quer dizer |−⟩ e 1 quer dizer |+⟩", "Medir duas vezes e comparar"],
            answer: 0,
            explanation: "H leva |+⟩ a |0⟩ e |−⟩ a |1⟩. Z só trocaria |+⟩ por |−⟩ sem ajudar a distingui-los na base padrão.",
        },
        {
            question: "Por que ignorar uma ancilla emaranhada (descartá-la) pode estragar o cálculo?",
            options: ["Porque a ancilla ocupa memória", "Porque descartar viola a não-clonagem", "Porque as portas ficam não unitárias", "Porque ela guarda qual ramo da superposição era cada um, e os ramos deixam de interferir"],
            answer: 3,
            explanation: "No exemplo do H depois da CNOT, o 1º qubit passa de 100% para 50% de dar 0: a ancilla marca os ramos e a interferência some.",
        },
        {
            question: "Como limpar o lixo sem perder o resultado?",
            options: ["Medir o lixo e ignorar o resultado", "Copiar o resultado para um registrador novo e rodar o cálculo ao contrário", "Aplicar H em cada qubit de lixo", "Reiniciar os qubits de lixo com X"],
            answer: 1,
            explanation: "Portas reversíveis têm inversa: após copiar a resposta com CNOTs, rodar tudo ao contrário devolve as ancillas a |0⟩.",
        },
    ],
};

export default registradores;
