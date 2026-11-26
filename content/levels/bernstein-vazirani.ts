import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025).
const bernsteinVazirani: Lesson = {
  id: "bernstein-vazirani",
  title: "Algoritmo de Bernstein-Vazirani",
  intro:
    "Descubra a string secreta s de f(x)=s·x mod 2 com uma única consulta.",
  source:
    "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (notas de curso, 2025)",
  course: "algoritmos",
  skill: "bernstein-vazirani",
  xp: 10,
  challenges: [
    {
      question: "Qual é f(111) se s = 101?",
      options: ["1", "0", "101", "2"],
      answer: 1,
      explanation: "s·x mod 2 = (1+0+1) mod 2 = 0.",
    },
    {
      question: "Quantas consultas clássicas para descobrir s com n bits?",
      options: ["1", "2^n", "n/2", "n"],
      answer: 3,
      explanation:
        "Consultar as n posições unitárias dá um bit de s por vez; não dá para ter menos.",
    },
    {
      question: "Qual circuito resolve BV?",
      options: [
        "O mesmo de Deutsch-Jozsa",
        "Um QFT",
        "Um circuito de Grover",
        "Um circuito que consulta cada bit de s separadamente",
      ],
      answer: 0,
      explanation:
        "H^{⊗n}, oráculo com |−⟩ e H^{⊗n} de novo; a diferença está só em como interpretar a medida.",
    },
    {
      question: "Qual é a amplitude do estado |z⟩ no final?",
      options: [
        "1/√N para todo z",
        "2^{-n} · Σ_x (−1)^{(s⊕z)·x}",
        "Zero sempre",
        "(−1)^{s·z}",
      ],
      answer: 1,
      explanation:
        "A soma é 2^n se z=s e 0 se z≠s, então o estado final é |s⟩.",
    },
    {
      question: "Com que probabilidade a medida final devolve s?",
      options: ["1/2^n", "1/2", "1 − 1/2^n", "1"],
      answer: 3,
      explanation:
        "Os termos para z≠s se cancelam por completo: o estado é exatamente |s⟩.",
    },
    {
      question:
        "Para n=3 e f com tabela (0,1,1,0,1,0,0,1) (x de 000 a 111), qual é s?",
      options: ["101", "110", "111", "011"],
      answer: 2,
      explanation:
        "f é a paridade de x1, x2 e x3 (f(001)=1, f(010)=1, f(100)=1), então s = 111. Um erro comum é esquecer o XOR e ler s direto do 1 da tabela.",
    },
  ],
};

export default bernsteinVazirani;
