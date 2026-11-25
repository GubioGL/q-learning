import type { LevelText } from "@/lib/lesson";

const bits: LevelText = {
    title: "¿Qué es un bit?",
    intro:
        "Un bit es la menor unidad de información: vale 0 o 1. Con varios bits escribimos números en binario, donde cada posición vale una potencia de 2 (…, 4, 2, 1).",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 1",
    challenges: [
        {
            question: "¿Cuántos valores diferentes puede tener un solo bit?",
            options: ["1", "2", "10", "Infinitos"],
            explanation: "Un bit vale 0 o 1: son exactamente 2 valores.",
        },
        {
            question: "¿Cuántas secuencias diferentes podemos formar con 3 bits?",
            options: ["3", "6", "8", "9"],
            explanation: "Cada bit duplica las posibilidades: 2 × 2 × 2 = 2³ = 8 (de 000 a 111).",
        },
        {
            question: "¿Qué número decimal representa el binario 101?",
            options: ["3", "5", "6", "101"],
            explanation: "101 = 1·4 + 0·2 + 1·1 = 5.",
        },
        {
            question: "¿Cómo se escribe el número 6 en binario?",
            options: ["011", "101", "110", "111"],
            explanation: "6 = 4 + 2 = 1·4 + 1·2 + 0·1, así que 110.",
        },
        {
            question: "¿Cuántos bits forman 1 byte?",
            options: ["2", "4", "8", "16"],
            explanation: "Un byte tiene 8 bits, lo que da 2⁸ = 256 valores posibles.",
        },
        {
            question: "¿Cuál es el resultado de 1 AND 0?",
            options: ["0", "1"],
            explanation: "AND solo da 1 cuando las dos entradas son 1.",
        },
        {
            question: "¿Cuál es el resultado de NOT 1?",
            options: ["0", "1"],
            explanation: "NOT invierte el bit: 1 pasa a 0 y 0 pasa a 1.",
        },
    ],
};

export default bits;
