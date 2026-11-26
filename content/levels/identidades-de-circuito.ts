import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seção 2.3, e T. G. Wong, Introduction to Classical and Quantum Computing (2022), seção 3.3.3.
const identidadesDeCircuito: Lesson = {
    id: "identidades-de-circuito",
    title: "Portas em sequência e identidades de circuito",
    intro:
        "Portas em série multiplicam-se na ordem inversa, e identidades como HXH = Z simplificam circuitos.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), seção 2.3, e T. G. Wong, Introduction to Classical and Quantum Computing (2022), seção 3.3.3",
    course: "algebra-linear",
    skill: "identidades-de-circuito",
    xp: 10,
    challenges: [
        {
            question: "Um circuito aplica primeiro A e depois B. Qual é a matriz do circuito?",
            options: ["AB", "BA", "A + B", "A†B"],
            answer: 1,
            explanation: "A matriz age no ket à sua direita: a primeira porta fica mais à direita no produto, U = BA.",
        },
        {
            question: "Qual identidade é verdadeira?",
            options: ["HXH = I", "HXH = Z", "HXH = X", "HXH = Y"],
            answer: 1,
            explanation: "H troca os eixos x e z: HXH = Z (e HZH = X).",
        },
        {
            question: "Por que XX = I?",
            options: ["Porque X é hermitiana e unitária, logo é a própria inversa", "Porque X anticomuta com ela mesma", "Porque X tem determinante 0", "Porque X é a identidade"],
            answer: 0,
            explanation: "Hermitiana (X† = X) e unitária (X†X = I) dá X² = I.",
        },
        {
            question: "O circuito X, Z, X (nessa ordem) pode ser simplificado cancelando os dois X?",
            options: ["Não: eles não são adjacentes; o resultado é XZX = −Z", "Sim, sobra X", "Sim, sobra Z", "Sim, sobra I"],
            answer: 0,
            explanation: "Só se cancelam pares adjacentes. Como XZ = −ZX, tem-se XZX = −Z, que difere de Z por fase global.",
        },
        {
            question: "O circuito H, H, X, H, H equivale a qual única porta?",
            options: ["I", "X", "Z", "H"],
            answer: 1,
            explanation: "HH = I nas duas pontas, sobrando X.",
        },
        {
            question: "O estado |0⟩ passa por H, Z, H. O que se mede no fim?",
            options: ["Sempre 0", "50% de cada", "Sempre 1", "Depende da porta H usada"],
            answer: 2,
            explanation: "HZH = X, e X|0⟩ = |1⟩, então mede-se 1 com certeza.",
        },
    ],
};

export default identidadesDeCircuito;
