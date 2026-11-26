import type { Lesson } from "@/lib/lesson";

// Original text; topic follows B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), sec. 4.1.
const complexidade: Lesson = {
    id: "complexidade",
    title: "Um pouco de complexidade",
    intro: "Tamanho, profundidade e crescimento: como contar o custo de um circuito e por que polinomial importa.",
    source: "Baseado em B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (notas de curso, 2025), seção 4.1",
    course: "hardware",
    skill: "complexidade",
    xp: 10,
    challenges: [
        {
            question: "Qual é a diferença entre tamanho e profundidade de um circuito?",
            options: [
                "São sinônimos",
                "Tamanho conta portas; profundidade conta camadas que podem rodar em paralelo",
                "Tamanho conta qubits; profundidade conta portas",
                "Profundidade conta medidas; tamanho conta portas",
            ],
            answer: 1,
            explanation: "Duas portas em qubits diferentes podem cair na mesma camada: contam 2 no tamanho e 1 na profundidade.",
        },
        {
            question: "Qual destas é verdadeira para f(x) = 5x + 100?",
            options: ["f(x) = O(log x)", "f(x) = O(1)", "f(x) = O(x²) e f(x) = O(x)", "f(x) = O(2⁻ˣ)"],
            answer: 2,
            explanation: "O(·) ignora constantes e aceita superestimar; f cresce linearmente, então O(x) e também O(x²).",
        },
        {
            question: "Dobrar o tamanho da entrada de um algoritmo que gasta n³ operações multiplica o custo por...",
            options: ["2", "6", "16", "8"],
            answer: 3,
            explanation: "(2n)³ = 8n³. Num custo exponencial, dobrar n elevaria o custo ao quadrado.",
        },
        {
            question: "Qual descreve melhor BQP?",
            options: [
                "Problemas de decisão resolvidos em tempo polinomial por circuitos quânticos, com acerto de pelo menos 2/3",
                "Todos os problemas que computadores quânticos resolvem rápido, sem erro",
                "Problemas que um computador clássico não resolve nunca",
                "Problemas resolvidos com um único qubit",
            ],
            answer: 0,
            explanation: "BQP é o análogo quântico de BPP: tempo polinomial, erro limitado, e a medida torna o resultado probabilístico.",
        },
        {
            question: "Um algoritmo acerta com probabilidade 2/3 e você pode verificar a resposta. Repetindo 2 vezes, qual a chance de acertar ao menos uma vez?",
            options: ["4/9", "5/9", "8/9", "2/3"],
            answer: 2,
            explanation: "1 − (1/3)² = 8/9. Sem verificação, usa-se o voto da maioria, que funciona com p > 1/2; por isso 2/3 é arbitrário.",
        },
        {
            question: "Um algoritmo faz 10⁴⁰ + log x operações. Por que ele é um mau candidato apesar de ser O(log x)?",
            options: [
                "Porque O(log x) é uma classe exponencial",
                "Porque a constante escondida torna o custo real enorme",
                "Porque log x não é crescente",
                "Porque não é probabilístico",
            ],
            answer: 1,
            explanation: "O(·) esconde constantes. Por isso a estimativa concreta de recursos importa, em especial depois da compilação.",
        },
    ],
};

export default complexidade;
