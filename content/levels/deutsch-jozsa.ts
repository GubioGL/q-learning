import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025).
const deutschJozsa: Lesson = {
  id: "deutsch-jozsa",
  title: "Algoritmo de Deutsch-Jozsa",
  intro: "Decida se f é constante ou balanceada com uma só consulta quântica.",
  source:
    "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (notas de curso, 2025)",
  course: "algoritmos",
  skill: "deutsch-jozsa",
  xp: 10,
  challenges: [
    {
      question: "Qual é a promessa do problema de Deutsch-Jozsa?",
      options: [
        "f é injetora",
        "f é constante ou balanceada",
        "f tem exatamente um 1",
        "f é linear",
      ],
      answer: 1,
      explanation:
        "Ou f dá o mesmo valor em todas as entradas, ou dá 0 em metade e 1 na outra metade.",
    },
    {
      question:
        "Quantas consultas clássicas, no pior caso, para decidir com certeza (n=3)?",
      options: ["2", "8", "5", "4"],
      answer: 2,
      explanation:
        "2^{n-1}+1 = 5: só depois de 5 respostas iguais se garante que é constante.",
    },
    {
      question:
        "No circuito de DJ, qual é a amplitude de |0…0⟩ depois do último H^{⊗n}?",
      options: [
        "2^{-n} · Σ_x (−1)^{f(x)}",
        "Σ_x f(x)",
        "2^{-n} · Σ_x f(x)",
        "sempre 1",
      ],
      answer: 0,
      explanation:
        "Todos os termos (−1)^{f(x)+x·0} = (−1)^{f(x)}: soma ±2^n para constante, 0 para balanceada.",
    },
    {
      question:
        "Mediu-se 101 no primeiro registrador de um DJ com n=3. O que se conclui?",
      options: [
        "f é constante",
        "f é constante, pois 0…0 indica função balanceada",
        "f é balanceada",
        "Não dá para concluir com uma só medida",
      ],
      answer: 2,
      explanation:
        "Resultado diferente de 0…0 tem probabilidade 0 para f constante; logo f é balanceada.",
    },
    {
      question:
        "No caso n=1 (Deutsch), o primeiro qubit depois do oráculo é...",
      options: [
        "|0⟩ sempre",
        "±|+⟩ se f(0)=f(1), ±|−⟩ se f(0)≠f(1)",
        "|1⟩ sempre",
        "Sempre |+⟩",
      ],
      answer: 1,
      explanation:
        "É (−1)^f(0)|0⟩ + (−1)^f(1)|1⟩, normalizado; o H final leva |+⟩ a |0⟩ e |−⟩ a |1⟩.",
    },
    {
      question: "Qual é a vantagem do algoritmo quântico de DJ?",
      options: [
        "1 consulta em vez de 2^{n-1}+1 de um algoritmo clássico exato",
        "n consultas em vez de 2^n",
        "Resolve qualquer função sem promessa",
        "Nenhuma vantagem",
      ],
      answer: 0,
      explanation:
        "A separação é em consultas, contra algoritmos clássicos determinísticos.",
    },
  ],
};

export default deutschJozsa;
