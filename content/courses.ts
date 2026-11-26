import type { Locale } from "@/lib/i18n/locales";
import { courseTexts } from "./courses-text";

// Course catalogue. Each skill's text lives in content/skills/<course>/<skill>.md (see content/README.md).

export type SkillMeta = { id: string; title: string };

export type Course = {
    id: string;
    title: string;
    summary: string;
    image: string;
    level: "beginner" | "intermediate" | "advanced";
    skills: SkillMeta[];
};

export const courses: Course[] = [
    {
        id: "basico",
        title: "Fundamentos Básicos",
        summary: "Bits, lógica binária e os primeiros passos até o qubit. Para quem está começando.",
        image: "/introduçao.png",
        level: "beginner",
        skills: [
            { id: "bits", title: "Bits e números binários" },
            { id: "portas-logicas", title: "Portas lógicas clássicas (AND, OR, NOT)" },
            { id: "algebra-booleana", title: "Álgebra booleana e simplificação" },
            { id: "somadores", title: "Somadores binários" },
            { id: "ascii", title: "Codificando informação com ASCII" },
            { id: "reversiveis", title: "Portas reversíveis" },
            { id: "qubit", title: "O qubit e a superposição" },
            { id: "medida", title: "Medida quântica" },
            { id: "portas-1-qubit", title: "Portas de 1 qubit (X, Y, Z, H)" },
            { id: "esfera-de-bloch", title: "A esfera de Bloch" },
            { id: "qubits-fisicos", title: "Qubits físicos" },
            { id: "circuitos", title: "Introdução a circuitos quânticos" },
        ],
    },
    {
        id: "algebra-linear",
        title: "Álgebra Linear",
        summary: "A matemática da computação quântica: vetores, matrizes, produto interno e unitárias.",
        image: "/introduçao.png",
        level: "intermediate",
        skills: [
            { id: "numeros-complexos", title: "Números complexos" },
            { id: "vetores", title: "Vetores coluna e linha" },
            { id: "produto-interno", title: "Produto interno e ortonormalidade" },
            { id: "projecoes", title: "Projeções e mudança de base" },
            { id: "unitarias", title: "Portas quânticas como matrizes unitárias" },
            { id: "identidades-de-circuito", title: "Portas em sequência e identidades de circuito" },
            { id: "produto-externo", title: "Produto externo e completude" },
            { id: "unitariedade", title: "Circuitos quânticos e unitariedade" },
            { id: "hermitianas", title: "Operadores hermitianos e autovalores" },
        ],
    },
    {
        id: "computacao-quantica",
        title: "Computação Quântica",
        summary: "Sistemas de vários qubits, emaranhamento e portas de dois qubits.",
        image: "/quantum-computing.png",
        level: "advanced",
        skills: [
            { id: "produto-tensorial", title: "Produto tensorial" },
            { id: "medida-multiplos", title: "Medindo vários qubits" },
            { id: "emaranhamento", title: "Estados emaranhados vs. produto" },
            { id: "cnot-toffoli", title: "Portas de 2 qubits (CNOT, Toffoli)" },
            { id: "somador-quantico", title: "Somador quântico" },
            { id: "registradores", title: "Ancillas, medição e descarte de qubits" },
            { id: "nao-clonagem", title: "Teorema da não-clonagem" },
            { id: "rotacoes", title: "Rotações Rx, Ry, Rz e as portas S e T" },
            { id: "universalidade", title: "Conjuntos universais de portas" },
        ],
    },
    {
        id: "teoria-quantica",
        title: "Teoria Quântica",
        summary: "Protocolos fundamentais: Bell, codificação superdensa, teletransporte e BB84.",
        image: "/quantum.png",
        level: "advanced",
        skills: [
            { id: "bell", title: "Estados de Bell" },
            { id: "chsh", title: "Desigualdade CHSH" },
            { id: "superdensa", title: "Codificação superdensa" },
            { id: "teletransporte", title: "Teletransporte quântico" },
            { id: "bb84", title: "Distribuição de chaves (BB84)" },
        ],
    },
    {
        id: "algoritmos",
        title: "Algoritmos Quânticos",
        summary: "Oráculos, Deutsch-Jozsa, Bernstein-Vazirani, Grover, QFT, estimação de fase, Shor e HHL.",
        image: "/quantumcomputing.png",
        level: "advanced",
        skills: [
            { id: "oraculos", title: "Oráculos e phase kickback" },
            { id: "deutsch-jozsa", title: "Algoritmo de Deutsch-Jozsa" },
            { id: "bernstein-vazirani", title: "Algoritmo de Bernstein-Vazirani" },
            { id: "grover", title: "Busca de Grover e amplificação de amplitude" },
            { id: "qft", title: "Transformada de Fourier quântica" },
            { id: "estimacao-de-fase", title: "Estimação de fase" },
            { id: "shor", title: "Algoritmo de Shor" },
            { id: "hhl", title: "Algoritmo HHL" },
        ],
    },
    {
        id: "hardware",
        title: "Hardware e Compilação",
        summary: "Coprocessador quântico, complexidade, portas nativas, estados mágicos, computação por medidas e óptica linear.",
        image: "/quantum-bit.png",
        level: "advanced",
        skills: [
            { id: "modelo-coprocessador", title: "O computador quântico como coprocessador" },
            { id: "complexidade", title: "Um pouco de complexidade" },
            { id: "portas-nativas", title: "Portas nativas e compilação" },
            { id: "estados-magicos", title: "Computação com estados mágicos" },
            { id: "mbqc", title: "Computação baseada em medidas" },
            { id: "optica-linear", title: "Computação quântica com óptica linear" },
        ],
    },
    {
        id: "nisq",
        title: "Algoritmos Variacionais (NISQ)",
        summary: "Simulação hamiltoniana, VQE e QAOA: algoritmos híbridos para os computadores quânticos de hoje.",
        image: "/jornada.png",
        level: "advanced",
        skills: [
            { id: "trotterizacao", title: "Simulação hamiltoniana e trotterização" },
            { id: "vqe", title: "Algoritmos variacionais e VQE" },
            { id: "qaoa", title: "QAOA" },
        ],
    },
];

export function getCourses(locale: Locale): Course[] {
    return courses.map((course) => {
        const text = courseTexts[locale]?.[course.id];
        if (!text) return course;
        const skills = course.skills.map((s) => ({ ...s, title: text.skills[s.id] ?? s.title }));
        return { ...course, title: text.title, summary: text.summary, skills };
    });
}

export const findCourse = (id: string, locale: Locale) => getCourses(locale).find((c) => c.id === id);
