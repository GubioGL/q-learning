import type { LevelText } from "@/lib/lesson";

const identidadesDeCircuito: LevelText = {
    title: "Puertas en secuencia e identidades de circuito",
    intro:
        "Las puertas en serie se multiplican en orden inverso, e identidades como HXH = Z simplifican circuitos.",
    source: "Basado en B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), sección 2.3, y T. G. Wong, Introduction to Classical and Quantum Computing (2022), sección 3.3.3",
    challenges: [
        {
            question: "Un circuito aplica primero A y luego B. ¿Cuál es la matriz del circuito?",
            options: ["AB", "BA", "A + B", "A†B"],
            explanation: "La matriz actúa sobre el ket a su derecha: la primera puerta queda más a la derecha en el producto, U = BA.",
        },
        {
            question: "¿Qué identidad es verdadera?",
            options: ["HXH = I", "HXH = Z", "HXH = X", "HXH = Y"],
            explanation: "H intercambia los ejes x y z: HXH = Z (y HZH = X).",
        },
        {
            question: "¿Por qué XX = I?",
            options: ["Porque X es hermítica y unitaria, luego es su propia inversa", "Porque X anticonmuta consigo misma", "Porque X tiene determinante 0", "Porque X es la identidad"],
            explanation: "Hermítica (X† = X) y unitaria (X†X = I) da X² = I.",
        },
        {
            question: "¿Se puede simplificar el circuito X, Z, X (en ese orden) cancelando las dos X?",
            options: ["No: no son adyacentes; el resultado es XZX = −Z", "Sí, queda X", "Sí, queda Z", "Sí, queda I"],
            explanation: "Solo se cancelan pares adyacentes. Como XZ = −ZX, XZX = −Z, que difiere de Z por una fase global.",
        },
        {
            question: "El circuito H, H, X, H, H equivale a qué puerta única?",
            options: ["I", "X", "Z", "H"],
            explanation: "HH = I en ambos extremos, quedando X.",
        },
        {
            question: "El estado |0⟩ pasa por H, Z, H. ¿Qué se mide al final?",
            options: ["Siempre 0", "50% cada uno", "Siempre 1", "Depende de la H usada"],
            explanation: "HZH = X, y X|0⟩ = |1⟩, así que se mide 1 con certeza.",
        },
    ],
};

export default identidadesDeCircuito;
