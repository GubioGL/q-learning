import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", ch. 3.
const unitariedade: Lesson = {
    id: "unitariedade",
    title: "Unitariedade",
    intro:
        "Um circuito sem medidas é uma única unitária. Unitárias preservam produtos internos e são reversíveis.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, cap. 3",
    course: "algebra-linear",
    skill: "unitariedade",
    xp: 10,
    challenges: [
        {
            question: "O produto de duas unitárias é…",
            options: ["sempre unitário", "sempre hermitiano", "sempre a identidade", "às vezes não inversível"],
            answer: 0,
            explanation: "(VU)†(VU) = U†V†VU = I.",
        },
        {
            question: "Qual é a inversa de VU?",
            options: ["V†U†", "U†V†", "UV", "V†U"],
            answer: 1,
            explanation: "A ordem se inverte ao desfazer.",
        },
        {
            question: "Se ⟨φ|ψ⟩ = 0,5, quanto vale depois de aplicar a mesma U nos dois?",
            options: ["0", "0,25", "0,5", "1"],
            answer: 2,
            explanation: "Unitárias preservam produtos internos.",
        },
        {
            question: "Todo autovalor de uma unitária…",
            options: ["é real", "é positivo", "tem módulo 1", "é zero"],
            answer: 2,
            explanation: "A norma é preservada, então |λ| = 1.",
        },
        {
            question: "Qual destas portas NÃO é a própria inversa?",
            options: ["X", "H", "Z", "S"],
            answer: 3,
            explanation: "S² = Z, que não é a identidade.",
        },
    ],
};

export default unitariedade;
