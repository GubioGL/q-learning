import type { LevelText } from "@/lib/lesson";

const numerosComplexos: LevelText = {
    title: "Complex numbers",
    intro:
        "A complex number is a point in a plane; multiplying by e^{iθ} rotates that point.",
    source: "Based on B. Valiron, Introduction to Quantum Algorithms and Quantum Programming (2025), section 2.3, and T. G. Wong, Introduction to Classical and Quantum Computing (2022), section 3.3.3",
    challenges: [
        {
            question: "What is the modulus of 3 + 4i?",
            options: ["7", "√7", "5", "25"],
            explanation: "|z| = √(3² + 4²) = √25 = 5. Adding 3 and 4, or forgetting the root, are the typical mistakes.",
        },
        {
            question: "What is the conjugate of 2 − 3i?",
            options: ["−2 − 3i", "2 + 3i", "3 − 2i", "−2 + 3i"],
            explanation: "The conjugate only flips the sign of the imaginary part: 2 + 3i.",
        },
        {
            question: "How much is e^{iπ}?",
            options: ["1", "−1", "i", "−i"],
            explanation: "cos π + i sin π = −1 + 0i.",
        },
        {
            question: "What is the modulus of e^{iθ} for any real θ?",
            options: ["θ", "0", "cos θ", "1"],
            explanation: "cos²θ + sin²θ = 1: e^{iθ} is always on the circle of radius 1.",
        },
        {
            question: "What happens to a point z in the complex plane when multiplied by e^{iπ/2}?",
            options: ["It rotates 90° and keeps its distance to the origin", "It rotates 90° and doubles its distance", "It is reflected across the horizontal axis", "It rotates 180° and keeps its distance"],
            explanation: "Multiplying by a number of modulus 1 only adds to the angle (here 90°); the modulus does not change.",
        },
        {
            question: "In z = r e^{iθ}, what are r and θ?",
            options: ["r is the real part and θ the imaginary part", "r is the angle and θ the distance", "r is the modulus and θ the angle", "r is the conjugate and θ the modulus"],
            explanation: "Polar form: r is the distance to the origin and θ the angle with the horizontal axis.",
        },
    ],
};

export default numerosComplexos;
