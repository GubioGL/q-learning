import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025).
const oraculos: Lesson = {
  id: "oraculos",
  title: "Oráculos e phase kickback",
  intro:
    "Um oráculo esconde a função f; com o qubit extra em |−⟩, o valor f(x) volta como fase.",
  source:
    "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (notas de curso, 2025)",
  course: "algoritmos",
  skill: "oraculos",
  xp: 10,
  challenges: [
    {
      question: "O que faz o oráculo de bit U_f?",
      options: [
        "|x,y⟩ → |f(x),y⟩",
        "|x,y⟩ → |x, y⊕f(x)⟩",
        "|x,y⟩ → |x⊕y, f(x)⟩",
        "|x,y⟩ → |x, f(y)⟩",
      ],
      answer: 1,
      explanation:
        "U_f guarda x e soma f(x) ao segundo registrador (XOR). Assim fica reversível.",
    },
    {
      question: "Com o qubit extra em |−⟩, o que U_f faz em |x⟩|−⟩?",
      options: [
        "Troca |−⟩ por |+⟩ quando f(x)=1",
        "Mede o qubit extra",
        "Multiplica por (−1)^f(x) e deixa |−⟩ intacto",
        "Não muda nada",
      ],
      answer: 2,
      explanation:
        "Os dois ramos do |−⟩ trocam de lugar quando f(x)=1, o que dá um sinal −1: é o phase kickback.",
    },
    {
      question:
        "Quantos qubits são necessários para representar os naturais de 0 a 999?",
      options: ["9", "100", "1000", "10"],
      answer: 3,
      explanation: "2^10 = 1024 ≥ 1000 e 2^9 = 512 < 1000.",
    },
    {
      question: "U_f aplicada duas vezes seguidas dá...",
      options: [
        "A identidade",
        "Zero, pois os dois XOR se cancelam e anulam o estado",
        "Uma porta de Hadamard",
        "O oráculo de fase",
      ],
      answer: 0,
      explanation: "y⊕f(x)⊕f(x) = y: U_f é sua própria inversa.",
    },
    {
      question: "Para f(x)=x (1 bit), a porta U_f é...",
      options: ["A porta SWAP", "A porta CZ", "A identidade", "A porta CNOT"],
      answer: 3,
      explanation:
        "O segundo qubit só é invertido quando x=1, exatamente o CNOT.",
    },
    {
      question: "O que a complexidade de consultas conta?",
      options: [
        "O número de portas do circuito",
        "O número de chamadas ao oráculo",
        "O número de qubits",
        "O tempo de medida",
      ],
      answer: 1,
      explanation:
        "Cada chamada a U_f ou O_f custa 1, não importa o que há dentro do oráculo.",
    },
  ],
};

export default oraculos;
