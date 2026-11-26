import type { Lesson } from "@/lib/lesson";

// Original text; topic follows Wong, "Introduction to Classical and Quantum Computing", sec. 2.4.
const esferaDeBloch: Lesson = {
    id: "esfera-de-bloch",
    title: "A esfera de Bloch",
    intro:
        "Todo estado de um qubit é um ponto numa esfera: polo norte |0⟩, polo sul |1⟩ e a fase como longitude.",
    source: "Baseado em T. G. Wong, Introduction to Classical and Quantum Computing, seção 2.4",
    course: "basico",
    skill: "esfera-de-bloch",
    xp: 10,
    challenges: [
        {
            question: "Onde fica |+⟩ na esfera de Bloch?",
            options: ["No polo norte", "No equador, no eixo −x", "No equador, no eixo +x", "No equador, no eixo +y"],
            answer: 2,
            explanation: "|+⟩ tem θ = 90° e φ = 0, o que dá o ponto (1, 0, 0).",
        },
        {
            question: "Dois estados diferem só por uma fase global, como |ψ⟩ e −|ψ⟩. Como ficam na esfera?",
            options: ["Pontos opostos", "Pontos no mesmo meridiano", "O mesmo ponto", "Um no equador e outro não"],
            answer: 2,
            explanation: "A fase global não muda nenhuma medida, então não muda o ponto.",
        },
        {
            question: "Compare θ = 90°, φ = 0 com θ = 90°, φ = 180°. O que muda ao medir na base padrão?",
            options: ["Um dá sempre 0 e o outro sempre 1", "Nada: ambos dão 50/50", "Um dá 75% de 0", "Só o primeiro colapsa"],
            answer: 1,
            explanation: "As probabilidades dependem só de θ. A diferença em φ aparece em outras bases.",
        },
        {
            question: "Estados ortogonais, como |0⟩ e |1⟩, ficam na esfera...",
            options: ["No mesmo ponto", "A 90° um do outro", "Ambos no equador", "Em pontos opostos"],
            answer: 3,
            explanation: "Cada base ortogonal corresponde a dois pontos opostos, num mesmo eixo.",
        },
        {
            question: "Que rotação a porta X faz na esfera de Bloch?",
            options: ["Meia-volta em torno do eixo y", "Meia-volta em torno do eixo x", "Meia-volta em torno do eixo z", "Nenhuma"],
            answer: 1,
            explanation: "X gira 180° em torno de x: troca |0⟩ e |1⟩ e deixa |+⟩ e |−⟩ parados.",
        },
        {
            question: "Qual diferença entre fase global e fase relativa?",
            options: [
                "A global muda o ponto; a relativa não",
                "As duas mudam o ponto",
                "A global não muda o ponto; a relativa (φ) muda",
                "Nenhuma das duas muda o ponto",
            ],
            answer: 2,
            explanation: "Multiplicar tudo por e^{iγ} não muda nada; a fase entre as amplitudes é o φ.",
        },
    ],
};

export default esferaDeBloch;
