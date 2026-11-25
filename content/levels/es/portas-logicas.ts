import type { LevelText } from "@/lib/lesson";

const portasLogicas: LevelText = {
    title: "Puertas lógicas",
    intro:
        "Las puertas lógicas transforman bits en bits. NOT invierte un bit; AND da 1 solo cuando las dos entradas son 1; OR da 1 cuando al menos una entrada es 1.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 1",
    challenges: [
        {
            question: "¿Cuál es el resultado de 1 OR 0?",
            options: ["0", "1"],
            explanation: "OR da 1 cuando al menos una de las entradas es 1.",
        },
        {
            question: "¿Cuál es el resultado de NOT (1 AND 1)?",
            options: ["0", "1"],
            explanation: "1 AND 1 = 1, y NOT 1 = 0. Esta combinación es la puerta NAND.",
        },
        {
            question: "¿Cuántas filas tiene la tabla de verdad de una puerta con 2 entradas?",
            options: ["2", "3", "4", "8"],
            explanation: "Dos entradas de 1 bit tienen 2² = 4 combinaciones: 00, 01, 10, 11.",
        },
        {
            question: "¿Qué puerta da 1 solo cuando las entradas son diferentes?",
            options: ["AND", "OR", "XOR", "NOT"],
            explanation: "XOR (o exclusivo) da 1 para 01 y 10, y 0 para 00 y 11.",
        },
    ],
};

export default portasLogicas;
