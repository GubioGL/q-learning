"use client";

import Link from "next/link";
import Header from "./header";

// shortcut: lessons that already have content, by course id and lesson index; replace with content/ registry in Etapa 2
const LESSON_HREFS: Record<number, Record<number, string>> = { 1: { 0: "/lesson/bits" } };
import { useCourseContext } from "@/lib/contexts/CourseContext";

// Dados dos cursos para a página de learn
const courseLearnData = {
    1: { // Básico
        title: "Fundamentos Básicos",
        subtitle: "Primeiro passo para aprender!",
        sectionLabel: "Introdução",
        lessons: [
            "Conceito de bits e lógica binária",
            "Portas lógicas clássicas (AND, OR, NOT)",
            "Codificação de informações com ASCII",
            "Portas reversíveis e máquinas de Turing",
            "Conceito de qubit e superposição",
            "Medidas quânticas e a esfera de Bloch",
            "Portas quânticas de 1 qubit (X, Y, Z, H)",
            "Introdução a circuitos quânticos"
        ]
    },
    2: { // Álgebra Linear
        title: "Álgebra Linear",
        subtitle: "Matemática fundamental para computação quântica",
        sectionLabel: "Vetores e Matrizes",
        lessons: [
            "Vetores coluna e linha",
            "Produto interno e ortonormalidade",
            "Projeções e mudança de base",
            "Portas quânticas como matrizes unitárias",
            "Produto externo e relações de completude",
            "Circuitos quânticos e unitariedade"
        ]
    },
    3: { // Computação Quântica
        title: "Computação Quântica",
        subtitle: "Sistemas com múltiplos qubits",
        sectionLabel: "Múltiplos Qubits",
        lessons: [
            "Produto tensorial e produto de Kronecker",
            "Medição de qubits individuais e em sequência",
            "Estados entrelaçados vs. produtos",
            "Portas de 2 qubits (CNOT, Toffoli)",
            "Teorema da não-clonagem",
            "Adição quântica e carry quântico",
            "Conjuntos universais de portas quânticas",
            "Introdução à correção de erros quântica"
        ]
    },
    4: { // Teoria Quântica
        title: "Teoria Quântica",
        subtitle: "Aplicações fundamentais da mecânica quântica",
        sectionLabel: "Protocolos Quânticos",
        lessons: [
            "Medições em estados maximamente entrelaçados",
            "Desigualdades de Bell e experimentos CHSH",
            "Codificação superdensa",
            "Teletransporte quântico",
            "Distribuição de chaves quânticas (BB84)",
            "Monogamia do emaranhamento"
        ]
    }
};

/**
 * Página principal de aprendizado (Learn).
 * Aqui serão exibidas as lições, progresso e desafios do usuário.
 */
const LearnPage = () => {
    const { selectedCourseId } = useCourseContext();
    const courseData = courseLearnData[selectedCourseId as keyof typeof courseLearnData];

    return (
        <div>
            <Header 
                subtitle={courseData.subtitle} 
                sectionLabel={courseData.sectionLabel} 
                backHref="/cursos" 
            />

            <h1 className="text-2xl font-bold mb-4">{courseData.title}</h1>
            
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-100 mb-3">Lições Disponíveis:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseData.lessons.map((lesson, index) => {
                        const href = LESSON_HREFS[selectedCourseId]?.[index];
                        const card = (
                            <div className={`p-4 bg-gray-800 rounded-lg border transition-colors ${href ? "border-green-600 hover:border-green-400 cursor-pointer" : "border-gray-700 opacity-60"}`}>
                                <div className="flex items-center space-x-3">
                                    <div className={`w-8 h-8 ${href ? "bg-green-500" : "bg-blue-500"} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-300">{lesson}</span>
                                </div>
                            </div>
                        );
                        return href ? <Link key={index} href={href}>{card}</Link> : <div key={index}>{card}</div>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default LearnPage;