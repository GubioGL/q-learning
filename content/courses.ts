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
            { id: "ascii", title: "Codificando informação com ASCII" },
            { id: "reversiveis", title: "Portas reversíveis" },
            { id: "qubit", title: "O qubit e a superposição" },
            { id: "medida", title: "Medida quântica" },
            { id: "portas-1-qubit", title: "Portas de 1 qubit (X, Y, Z, H)" },
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
            { id: "vetores", title: "Vetores coluna e linha" },
            { id: "produto-interno", title: "Produto interno e ortonormalidade" },
            { id: "projecoes", title: "Projeções e mudança de base" },
            { id: "unitarias", title: "Portas quânticas como matrizes unitárias" },
            { id: "produto-externo", title: "Produto externo e completude" },
            { id: "unitariedade", title: "Circuitos quânticos e unitariedade" },
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
            { id: "nao-clonagem", title: "Teorema da não-clonagem" },
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
