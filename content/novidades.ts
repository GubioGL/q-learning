import type { Locale } from "@/lib/i18n/locales";

// "What's new" timeline, newest first. Shown at /<locale>/novidades and used in the promo texts (divulgacao/).
type Text = { title: string; text: string };
export type Update = { date: string; tag: "novo" | "melhoria"; texts: Record<Locale, Text> };

export const updates: Update[] = [
    {
        date: "2026-11-27", tag: "novo",
        texts: {
            pt: { title: "Nova página inicial", text: "Um visual novo, com o mascote dentro de uma esfera de Bloch, os números do curso e um mini-desafio para testar na hora." },
            en: { title: "New home page", text: "A fresh look, with the mascot inside a Bloch sphere, the course numbers and a mini-challenge to try right away." },
            es: { title: "Nueva página de inicio", text: "Un diseño nuevo, con la mascota dentro de una esfera de Bloch, los números del curso y un minidesafío para probar al instante." },
        },
    },
    {
        date: "2026-11-27", tag: "novo",
        texts: {
            pt: { title: "Tema claro", text: "Escolha entre claro e escuro no botão de sol e lua. O site segue o tema do seu sistema." },
            en: { title: "Light theme", text: "Pick light or dark with the sun and moon button. The site follows your system theme." },
            es: { title: "Tema claro", text: "Elige claro u oscuro con el botón de sol y luna. El sitio sigue el tema de tu sistema." },
        },
    },
    {
        date: "2026-11-27", tag: "novo",
        texts: {
            pt: { title: "Mini-lições e mini-desafios", text: "Cada skill agora é uma sequência de mini-lições curtas, e cada uma termina com um mini-desafio. Seu avanço fica salvo no navegador." },
            en: { title: "Mini-lessons and mini-challenges", text: "Each skill is now a sequence of short mini-lessons, each ending with a mini-challenge. Your progress is saved in the browser." },
            es: { title: "Minilecciones y minidesafíos", text: "Cada skill es ahora una secuencia de minilecciones cortas, y cada una termina con un minidesafío. Tu avance queda guardado en el navegador." },
        },
    },
    {
        date: "2026-11-27", tag: "melhoria",
        texts: {
            pt: { title: "38 ilustrações novas", text: "Circuitos, esferas de Bloch e diagramas para algoritmos, hardware e computação quântica, revisados por física." },
            en: { title: "38 new illustrations", text: "Circuits, Bloch spheres and diagrams for algorithms, hardware and quantum computing, checked for physics." },
            es: { title: "38 ilustraciones nuevas", text: "Circuitos, esferas de Bloch y diagramas para algoritmos, hardware y computación cuántica, revisados por física." },
        },
    },
    {
        date: "2026-11-26", tag: "novo",
        texts: {
            pt: { title: "Três cursos novos", text: "Algoritmos Quânticos (de Deutsch a Shor e HHL), Hardware e Compilação, e Algoritmos Variacionais (NISQ)." },
            en: { title: "Three new courses", text: "Quantum Algorithms (from Deutsch to Shor and HHL), Hardware and Compilation, and Variational Algorithms (NISQ)." },
            es: { title: "Tres cursos nuevos", text: "Algoritmos Cuánticos (de Deutsch a Shor y HHL), Hardware y Compilación, y Algoritmos Variacionales (NISQ)." },
        },
    },
    {
        date: "2026-11-25", tag: "novo",
        texts: {
            pt: { title: "Versão beta no ar", text: "Grátis, sem cadastro e em português, inglês e espanhol. O progresso fica no seu navegador." },
            en: { title: "Beta is live", text: "Free, no sign-up, in Portuguese, English and Spanish. Your progress stays in your browser." },
            es: { title: "Versión beta en línea", text: "Gratis, sin registro y en portugués, inglés y español. El progreso queda en tu navegador." },
        },
    },
];
