import type { LevelText } from "@/lib/lesson";

const ascii: LevelText = {
    title: "ASCII: letras en bits",
    intro:
        "Para guardar texto, cada carácter recibe un número, y el número pasa a bits. ASCII usa 7 bits: A es 65, B es 66 y las minúsculas están 32 posiciones más adelante.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 1",
    challenges: [
        {
            question: "¿Cuántos caracteres diferentes representa el ASCII de 7 bits?",
            options: ["64", "128", "256", "1024"],
            explanation: "Son 2⁷ = 128 códigos.",
        },
        {
            question: "Si A es 65, ¿cuál es el código de D?",
            options: ["66", "67", "68", "69"],
            explanation: "Las letras están en orden: A 65, B 66, C 67, D 68.",
        },
        {
            question: "¿Cuál es la diferencia entre los códigos de \"a\" y \"A\"?",
            options: ["1", "16", "26", "32"],
            explanation: "La minúscula está 32 posiciones después: es un único bit, el que vale 2⁵.",
        },
        {
            question: "¿Qué carácter tiene el código binario 01000010?",
            options: ["B", "C", "b", "2"],
            explanation: "64 + 2 = 66, que es la letra B.",
        },
        {
            question: "¿Cuántos bytes ocupa la palabra \"qubit\" en ASCII?",
            options: ["1", "4", "5", "40"],
            explanation: "Un byte por carácter: 5 letras, 5 bytes (40 bits).",
        },
    ],
};

export default ascii;
