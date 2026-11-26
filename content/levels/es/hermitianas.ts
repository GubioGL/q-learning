import type { LevelText } from "@/lib/lesson";

const hermitianas: LevelText = {
    title: "Operadores hermíticos y autovalores",
    intro:
        "Las matrices hermíticas tienen autovalores reales y representan observables; toda hermítica 2x2 es combinación de matrices de Pauli.",
    source: "Basado en B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), secciones 2.3 y 2.9, y T. G. Wong, Introduction to Classical and Quantum Computing (2022), secciones 3.3.3 y 3.3.4",
    challenges: [
        {
            question: "¿Qué afirmación define una matriz hermítica?",
            options: ["A† = A", "A†A = I", "A^2 = A", "A = A^T"],
            explanation: "Hermítica: igual a su adjunto (transpuesta y conjugada). A†A = I es la condición de unitaria; A = A^T ignora la conjugación.",
        },
        {
            question: "¿Qué es siempre verdad sobre los autovalores de una hermítica?",
            options: ["Son positivos", "Son enteros", "Son reales", "Tienen módulo 1"],
            explanation: "Los autovalores de las hermíticas son reales (resultados de medida). El módulo 1 vale para las unitarias.",
        },
        {
            question: "¿Cuáles son los autovalores posibles de X, Y y Z?",
            options: ["1 y 2", "0 y 1", "+1 y −1", "i y −i"],
            explanation: "Cada Pauli cumple σ² = I y es hermítica, así que λ² = 1 y λ es real: ±1.",
        },
        {
            question: "En un observable hermítico A, ¿cuáles son los resultados posibles de una medida?",
            options: ["Los autovalores de A", "Las amplitudes del estado", "Siempre 0 o 1", "Los elementos de la diagonal de A"],
            explanation: "Medir A da uno de los autovalores, y el estado queda en el autovector correspondiente.",
        },
        {
            question: "En la descomposición A = a0 I + a1 X + a2 Y + a3 Z de una hermítica, los coeficientes a_k son...",
            options: ["Siempre enteros", "Siempre positivos", "Números complejos cualesquiera", "Números reales"],
            explanation: "Los cuatro coeficientes son reales, los 4 grados de libertad reales de una hermítica 2x2.",
        },
        {
            question: "Dos autovectores de una hermítica con autovalores distintos son...",
            options: ["Iguales", "Paralelos", "Ortogonales", "Siempre complejos"],
            explanation: "Autovalores distintos de una hermítica tienen autovectores ortogonales (teorema espectral: forman una base ortonormal).",
        },
    ],
};

export default hermitianas;
