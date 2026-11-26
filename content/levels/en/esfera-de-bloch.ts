import type { LevelText } from "@/lib/lesson";

const esferaDeBloch: LevelText = {
    title: "The Bloch sphere",
    intro:
        "Every state of a qubit is a point on a sphere: north pole |0⟩, south pole |1⟩ and the phase as longitude.",
    source: "Based on T. G. Wong, Introduction to Classical and Quantum Computing, section 2.4",
    challenges: [
        {
            question: "Where is |+⟩ on the Bloch sphere?",
            options: ["At the north pole", "On the equator, on the −x axis", "On the equator, on the +x axis", "On the equator, on the +y axis"],
            explanation: "|+⟩ has θ = 90° and φ = 0, which gives the point (1, 0, 0).",
        },
        {
            question: "Two states differ only by a global phase, like |ψ⟩ and −|ψ⟩. How do they appear on the sphere?",
            options: ["Opposite points", "Points on the same meridian", "The same point", "One on the equator and the other not"],
            explanation: "The global phase changes no measurement, so it does not change the point.",
        },
        {
            question: "Compare θ = 90°, φ = 0 with θ = 90°, φ = 180°. What changes when measuring in the standard basis?",
            options: ["One always gives 0 and the other always 1", "Nothing: both give 50/50", "One gives 75% for 0", "Only the first one collapses"],
            explanation: "The probabilities depend only on θ. The difference in φ shows up in other bases.",
        },
        {
            question: "Orthogonal states, like |0⟩ and |1⟩, sit on the sphere...",
            options: ["At the same point", "90° apart", "Both on the equator", "At opposite points"],
            explanation: "Each orthogonal basis corresponds to two opposite points on the same axis.",
        },
        {
            question: "What rotation does the X gate perform on the Bloch sphere?",
            options: ["A half-turn about the y axis", "A half-turn about the x axis", "A half-turn about the z axis", "None"],
            explanation: "X rotates 180° about x: it swaps |0⟩ and |1⟩ and leaves |+⟩ and |−⟩ fixed.",
        },
        {
            question: "What is the difference between global phase and relative phase?",
            options: [
                "The global one changes the point; the relative one does not",
                "Both change the point",
                "The global one does not change the point; the relative one (φ) does",
                "Neither changes the point",
            ],
            explanation: "Multiplying everything by e^{iγ} changes nothing; the phase between the amplitudes is φ.",
        },
    ],
};

export default esferaDeBloch;
