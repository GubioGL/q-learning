import type { Locale } from "@/lib/i18n/locales";

// Translated titles and summaries of content/courses.ts. What is missing here is shown in Portuguese.
type CourseText = { title: string; summary: string; skills: Record<string, string> };

export const courseTexts: Partial<Record<Locale, Record<string, CourseText>>> = {
    en: {
        basico: {
            title: "Basic Foundations",
            summary: "Bits, binary logic and the first steps toward the qubit. For those just starting out.",
            skills: {
                bits: "Bits and binary numbers", "portas-logicas": "Classical logic gates (AND, OR, NOT)", ascii: "Encoding information with ASCII",
                reversiveis: "Reversible gates", qubit: "The qubit and superposition", medida: "Quantum measurement",
                "portas-1-qubit": "One-qubit gates (X, Y, Z, H)", "esfera-de-bloch": "The Bloch sphere", circuitos: "Introduction to quantum circuits",
            },
        },
        "algebra-linear": {
            title: "Linear Algebra",
            summary: "The mathematics of quantum computing: vectors, matrices, inner products and unitaries.",
            skills: {
                vetores: "Column and row vectors", "produto-interno": "Inner product and orthonormality", projecoes: "Projections and change of basis",
                unitarias: "Quantum gates as unitary matrices", "produto-externo": "Outer product and completeness", unitariedade: "Quantum circuits and unitarity",
                "numeros-complexos": "Complex numbers", "identidades-de-circuito": "Gates in sequence and circuit identities", hermitianas: "Hermitian operators and eigenvalues",
            },
        },
        "computacao-quantica": {
            title: "Quantum Computing",
            summary: "Systems of several qubits, entanglement and two-qubit gates.",
            skills: {
                "produto-tensorial": "Tensor product", "medida-multiplos": "Measuring several qubits", emaranhamento: "Entangled vs. product states",
                "cnot-toffoli": "Two-qubit gates (CNOT, Toffoli)", "nao-clonagem": "No-cloning theorem", universalidade: "Universal gate sets",
            },
        },
        "teoria-quantica": {
            title: "Quantum Theory",
            summary: "Fundamental protocols: Bell, superdense coding, teleportation and BB84.",
            skills: { bell: "Bell states", chsh: "CHSH inequality", superdensa: "Superdense coding", teletransporte: "Quantum teleportation", bb84: "Key distribution (BB84)" },
        },
    },
    es: {
        basico: {
            title: "Fundamentos Básicos",
            summary: "Bits, lógica binaria y los primeros pasos hacia el qubit. Para quienes están empezando.",
            skills: {
                bits: "Bits y números binarios", "portas-logicas": "Puertas lógicas clásicas (AND, OR, NOT)", ascii: "Codificar información con ASCII",
                reversiveis: "Puertas reversibles", qubit: "El qubit y la superposición", medida: "Medición cuántica",
                "portas-1-qubit": "Puertas de 1 qubit (X, Y, Z, H)", "esfera-de-bloch": "La esfera de Bloch", circuitos: "Introducción a los circuitos cuánticos",
            },
        },
        "algebra-linear": {
            title: "Álgebra Lineal",
            summary: "Las matemáticas de la computación cuántica: vectores, matrices, producto interno y unitarias.",
            skills: {
                vetores: "Vectores columna y fila", "produto-interno": "Producto interno y ortonormalidad", projecoes: "Proyecciones y cambio de base",
                unitarias: "Puertas cuánticas como matrices unitarias", "produto-externo": "Producto externo y completitud", unitariedade: "Circuitos cuánticos y unitariedad",
                "numeros-complexos": "Números complejos", "identidades-de-circuito": "Puertas en secuencia e identidades de circuito", hermitianas: "Operadores hermíticos y autovalores",
            },
        },
        "computacao-quantica": {
            title: "Computación Cuántica",
            summary: "Sistemas de varios qubits, entrelazamiento y puertas de dos qubits.",
            skills: {
                "produto-tensorial": "Producto tensorial", "medida-multiplos": "Medir varios qubits", emaranhamento: "Estados entrelazados y estados producto",
                "cnot-toffoli": "Puertas de 2 qubits (CNOT, Toffoli)", "nao-clonagem": "Teorema de no clonación", universalidade: "Conjuntos universales de puertas",
            },
        },
        "teoria-quantica": {
            title: "Teoría Cuántica",
            summary: "Protocolos fundamentales: Bell, codificación superdensa, teletransporte y BB84.",
            skills: { bell: "Estados de Bell", chsh: "Desigualdad CHSH", superdensa: "Codificación superdensa", teletransporte: "Teletransporte cuántico", bb84: "Distribución de claves (BB84)" },
        },
    },
};
