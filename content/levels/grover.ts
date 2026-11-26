import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025).
const grover: Lesson = {
  id: "grover",
  title: "Busca de Grover e amplificação de amplitude",
  intro:
    "Ache um item marcado entre N com ~√N consultas: duas reflexões formam uma rotação rumo ao alvo.",
  source:
    "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (notas de curso, 2025)",
  course: "algoritmos",
  skill: "grover",
  xp: 10,
  challenges: [
    {
      question:
        "Com N itens e 1 marcado, quantas consultas clássicas em média?",
      options: ["log N", "N/2", "√N", "N²"],
      answer: 1,
      explanation: "Sem estrutura, é preciso olhar metade da lista em média.",
    },
    {
      question: "Qual é o ângulo θ do estado uniforme em relação a |w⊥⟩?",
      options: ["sin θ = 1/N", "θ = π/2", "sin θ = 1/√N", "sin θ = 1/2^N"],
      answer: 2,
      explanation: "A amplitude de |w⟩ em |ψ⟩ é 1/√N, e ela vale sin θ.",
    },
    {
      question:
        "O que o oráculo de fase faz, geometricamente, no plano de |w⟩ e |w⊥⟩?",
      options: [
        "Reflete em torno de |ψ⟩",
        "Reflete em torno de |w⊥⟩",
        "Gira de 90°",
        "Projeta em |w⟩",
      ],
      answer: 1,
      explanation:
        "O oráculo troca o sinal de |w⟩ e deixa |w⊥⟩ igual: reflexão em torno do eixo de |w⊥⟩.",
    },
    {
      question: "Quanto gira cada iteração G = D·O_f?",
      options: ["2θ", "θ", "π/2", "θ/2"],
      answer: 0,
      explanation:
        "Duas reflexões, cujos eixos estão a θ de distância, compõem uma rotação de 2θ.",
    },
    {
      question:
        "Para N = 1024, qual é aproximadamente o número ótimo de iterações?",
      options: ["1024", "512", "32", "25"],
      answer: 3,
      explanation: "π/4 · √1024 ≈ 25,1.",
    },
    {
      question:
        "Com N=4 (1 item marcado), qual é a probabilidade de sucesso depois de k=2 iterações?",
      options: ["1", "0,25", "0,5", "0"],
      answer: 1,
      explanation:
        "θ = 30° e (2k+1)θ = 150°: sin² 150° = 0,25. Com k=1 dava 1; a rotação não para e passa do alvo (overshoot).",
    },
  ],
};

export default grover;
