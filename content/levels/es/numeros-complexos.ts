import type { LevelText } from "@/lib/lesson";

const numerosComplexos: LevelText = {
    title: "Números complejos",
    intro:
        "Un número complejo es un punto en un plano; multiplicar por e^{iθ} gira ese punto.",
    source: "Basado en B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), sección 2.3, y T. G. Wong, Introduction to Classical and Quantum Computing (2022), sección 3.3.3",
    challenges: [
        {
            question: "¿Cuál es el módulo de 3 + 4i?",
            options: ["7", "√7", "5", "25"],
            explanation: "|z| = √(3² + 4²) = √25 = 5. Sumar 3 y 4, u olvidar la raíz, son los errores típicos.",
        },
        {
            question: "¿Cuál es el conjugado de 2 − 3i?",
            options: ["−2 − 3i", "2 + 3i", "3 − 2i", "−2 + 3i"],
            explanation: "El conjugado solo cambia el signo de la parte imaginaria: 2 + 3i.",
        },
        {
            question: "¿Cuánto vale e^{iπ}?",
            options: ["1", "−1", "i", "−i"],
            explanation: "cos π + i sen π = −1 + 0i.",
        },
        {
            question: "¿Cuál es el módulo de e^{iθ} para cualquier θ real?",
            options: ["θ", "0", "cos θ", "1"],
            explanation: "cos²θ + sen²θ = 1: e^{iθ} siempre está en el círculo de radio 1.",
        },
        {
            question: "¿Qué le pasa al punto z en el plano complejo al multiplicarlo por e^{iπ/2}?",
            options: ["Gira 90° y mantiene la distancia al origen", "Gira 90° y duplica la distancia", "Se refleja respecto al eje horizontal", "Gira 180° y mantiene la distancia"],
            explanation: "Multiplicar por un número de módulo 1 solo suma al ángulo (aquí 90°); el módulo no cambia.",
        },
        {
            question: "En z = r e^{iθ}, ¿qué son r y θ?",
            options: ["r es la parte real y θ la imaginaria", "r es el ángulo y θ la distancia", "r es el módulo y θ el ángulo", "r es el conjugado y θ el módulo"],
            explanation: "Forma polar: r es la distancia al origen y θ el ángulo con el eje horizontal.",
        },
    ],
};

export default numerosComplexos;
