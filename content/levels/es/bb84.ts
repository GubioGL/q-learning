import type { LevelText } from "@/lib/lesson";

const bb84: LevelText = {
    title: "Criptografía BB84",
    intro:
        "Alice envía bits en bases Z o X sorteadas, y Bob mide en bases sorteadas. Se quedan solo con las posiciones en que las bases coinciden.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, cap. 6",
    challenges: [
        {
            question: "En BB84, ¿qué estado es el bit 1 en la base X?",
            options: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
            explanation: "En la base X: 0 es |+⟩ y 1 es |−⟩.",
        },
        {
            question: "En promedio, ¿qué fracción de los bits queda después del cribado?",
            options: ["25%", "50%", "75%", "100%"],
            explanation: "Las bases coinciden la mitad de las veces.",
        },
        {
            question: "¿Qué comparan Alice y Bob en público durante el cribado?",
            options: ["Los bits", "Las bases", "Los qubits", "La clave final"],
            explanation: "Comparar las bases no revela los bits.",
        },
        {
            question: "¿Qué tasa de error causa Eva al interceptar y reenviar todos los qubits?",
            options: ["0%", "25%", "50%", "100%"],
            explanation: "Se equivoca de base 1/2 de las veces, y entonces Bob falla 1/2: 1/4.",
        },
        {
            question: "¿Por qué Eva no guarda copias para medirlas después?",
            options: ["Falta memoria", "Las bases nunca se revelan", "El teorema de no clonación lo prohíbe", "El canal es demasiado rápido"],
            explanation: "Copiar un qubit desconocido es imposible.",
        },
    ],
};

export default bb84;
