import type { LevelText } from "@/lib/lesson";

const esferaDeBloch: LevelText = {
    title: "La esfera de Bloch",
    intro:
        "Todo estado de un qubit es un punto en una esfera: polo norte |0⟩, polo sur |1⟩ y la fase como longitud.",
    source: "Basado en T. G. Wong, Introduction to Classical and Quantum Computing, sección 2.4",
    challenges: [
        {
            question: "¿Dónde está |+⟩ en la esfera de Bloch?",
            options: ["En el polo norte", "En el ecuador, en el eje −x", "En el ecuador, en el eje +x", "En el ecuador, en el eje +y"],
            explanation: "|+⟩ tiene θ = 90° y φ = 0, lo que da el punto (1, 0, 0).",
        },
        {
            question: "Dos estados difieren solo por una fase global, como |ψ⟩ y −|ψ⟩. ¿Cómo quedan en la esfera?",
            options: ["Puntos opuestos", "Puntos en el mismo meridiano", "El mismo punto", "Uno en el ecuador y el otro no"],
            explanation: "La fase global no cambia ninguna medición, así que no cambia el punto.",
        },
        {
            question: "Compara θ = 90°, φ = 0 con θ = 90°, φ = 180°. ¿Qué cambia al medir en la base estándar?",
            options: ["Uno da siempre 0 y el otro siempre 1", "Nada: ambos dan 50/50", "Uno da 75 % de 0", "Solo el primero colapsa"],
            explanation: "Las probabilidades dependen solo de θ. La diferencia en φ aparece en otras bases.",
        },
        {
            question: "Los estados ortogonales, como |0⟩ y |1⟩, quedan en la esfera...",
            options: ["En el mismo punto", "A 90° uno del otro", "Ambos en el ecuador", "En puntos opuestos"],
            explanation: "Cada base ortogonal corresponde a dos puntos opuestos, en un mismo eje.",
        },
        {
            question: "¿Qué rotación hace la puerta X en la esfera de Bloch?",
            options: ["Media vuelta en torno al eje y", "Media vuelta en torno al eje x", "Media vuelta en torno al eje z", "Ninguna"],
            explanation: "X gira 180° en torno a x: intercambia |0⟩ y |1⟩ y deja quietos |+⟩ y |−⟩.",
        },
        {
            question: "¿Cuál es la diferencia entre fase global y fase relativa?",
            options: [
                "La global cambia el punto; la relativa no",
                "Las dos cambian el punto",
                "La global no cambia el punto; la relativa (φ) sí",
                "Ninguna de las dos cambia el punto",
            ],
            explanation: "Multiplicar todo por e^{iγ} no cambia nada; la fase entre las amplitudes es φ.",
        },
    ],
};

export default esferaDeBloch;
