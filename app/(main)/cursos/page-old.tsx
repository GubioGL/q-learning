"use client";

import { BookOpen, Brain, Atom, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCourseContext } from "@/lib/contexts/CourseContext";
import { useEffect, useState } from "react";
import { getCursosServer } from "@/db/server-query";
import type { Curso } from "@/db/schema";

// Componente para ícone de nível personalizado
const LevelIcon = ({ level }: { level: string }) => {
    const getFilledBars = (level: string) => {
        switch (level.toLowerCase()) {
            case "iniciante":
                return 1;
            case "intermediário":
                return 2;
            case "avançado":
                return 3;
            default:
                return 1;
        }
    };

    const filledBars = getFilledBars(level);

    return (
        <div className="flex space-x-1 mr-2 items-end">
            {[1, 2, 3].map((barIndex) => (
                <div
                    key={barIndex}
                    className={`w-1 rounded-full transition-all duration-200 ${
                        barIndex <= filledBars
                            ? "bg-white" // Barra preenchida
                            : "bg-white/30 border border-white/50" // Barra vazia com borda
                    }`}
                    style={{
                        height: `${barIndex * 4 + 8}px` // Altura crescente: 12px, 16px, 20px
                    }}
                />
            ))}
        </div>
    );
};

// Mapeamento de ícones baseado no título do curso
const getIconForCourse = (title: string) => {
    switch (title.toLowerCase()) {
        case "básico":
            return BookOpen;
        case "algebra linear":
        case "álgebra linear":
            return Brain;
        case "computação quântica":
            return Atom;
        case "teoria quântica":
            return Zap;
        default:
            return BookOpen;
    }
};

// Mapeamento de cores baseado no título do curso
const getColorForCourse = (title: string) => {
    switch (title.toLowerCase()) {
        case "básico":
            return "from-blue-500 to-cyan-500";
        case "algebra linear":
        case "álgebra linear":
            return "from-green-500 to-emerald-500";
        case "computação quântica":
            return "from-purple-500 to-pink-500";
        case "teoria quântica":
            return "from-orange-500 to-red-500";
        default:
            return "from-blue-500 to-cyan-500";
    }
};

// Mapeamento de níveis baseado no título do curso
const getLevelForCourse = (title: string) => {
    switch (title.toLowerCase()) {
        case "básico":
            return "Iniciante";
        case "algebra linear":
        case "álgebra linear":
            return "Intermediário";
        case "computação quântica":
        case "teoria quântica":
            return "Avançado";
        default:
            return "Iniciante";
    }
};

// Mapeamento de href baseado no título do curso
const getHrefForCourse = (title: string) => {
    switch (title.toLowerCase()) {
        case "básico":
            return "/cursos/basico";
        case "algebra linear":
        case "álgebra linear":
            return "/cursos/algebralinear";
        case "computação quântica":
            return "/cursos/computacao-quantica";
        case "teoria quântica":
            return "/cursos/teoriaquantica";
        default:
            return "/cursos/basico";
    }
};

const CursosPage = () => {
    const { selectedCourseId, setSelectedCourseId } = useCourseContext();
    const router = useRouter();
    const [cursosData, setCursosData] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                setLoading(true);
                const cursos = await getCursosServer();
                console.log("Dados obtidos do banco:", cursos);
                setCursosData(cursos);
            } catch (err) {
                console.error("Erro ao buscar cursos:", err);
                setError("Erro ao carregar cursos");
            } finally {
                setLoading(false);
            }
        };

        fetchCursos();
    }, []);

    const handleCourseClick = (courseId: number, href: string) => {
        router.push(href);
    };

    const handleRadioChange = (courseId: number) => {
        setSelectedCourseId(courseId);
    };

    if (loading) {
        return (
            <div className="text-[#6a7282] flex justify-center">
                <div className="max-w-4xl w-full text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-400">Carregando cursos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-[#6a7282] flex justify-center">
                <div className="max-w-4xl w-full text-center">
                    <p className="text-red-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="text-[#6a7282] flex justify-center">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-100 mb-2">
                        Cursos
                    </h1>
                    <p className="text-lg text-gray-400">
                        Escolha seu caminho de aprendizado
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Recomendamos começar pelo <span className="text-blue-400 font-semibold">básico</span>
                    </p>
                </div>

                {/* Debug Info */}
                <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">Debug - Dados do Banco:</h3>
                    <pre className="text-xs text-gray-300 overflow-auto">
                        {JSON.stringify(cursosData, null, 2)}
                    </pre>
                </div>

                {/* Grid de Cursos - Layout em coluna única */}
                <div className="space-y-6 max-w-2xl mx-auto">
                    {cursosData.map((curso) => {
                        const IconComponent = getIconForCourse(curso.title);
                        const isSelected = selectedCourseId === curso.id;
                        
                        return (
                            <div
                                key={curso.id}
                                className="flex items-center gap-8"
                            >
                                {/* Radio Button - Independente */}
                                <div className="flex-shrink-0">
                                    <input
                                        type="radio"
                                        name="curso-selection"
                                        id={`curso-${curso.id}`}
                                        checked={isSelected}
                                        onChange={() => handleRadioChange(curso.id)}
                                        className="sr-only"
                                    />
                                    <label
                                        htmlFor={`curso-${curso.id}`}
                                        className={`
                                            block w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-200
                                            ${isSelected 
                                                ? 'border-blue-400 bg-blue-400' 
                                                : 'border-gray-400 bg-transparent'
                                            }
                                        `}
                                    >
                                        {isSelected && (
                                            <div className="w-2.5 h-2.5 bg-white rounded-full mx-auto mt-1.5"></div>
                                        )}
                                    </label>
                                </div>

                                {/* Card Principal - Animação independente */}
                                <div
                                    className={`
                                        relative group cursor-pointer transition-all duration-300 transform
                                        hover:scale-105 hover:shadow-xl
                                    `}
                                    onClick={() => handleCourseClick(curso.id, getHrefForCourse(curso.title))}
                                >
                                    {/* Card Principal */}
                                    <div className={`
                                        relative overflow-hidden rounded-2xl p-6 h-45
                                        bg-gradient-to-br ${getColorForCourse(curso.title)}
                                        transition-all duration-300
                                    `}>
                                        {/* Badge do Curso */}
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                        </div>

                                        {/* Conteúdo do Card */}
                                        <div className="h-full flex flex-col justify-between">
                                            <div>
                                                <span className="text-xs text-white/70 uppercase tracking-wider font-medium">
                                                    Curso
                                                </span>
                                                <h3 className="text-xl font-bold text-white mt-2 mb-2">
                                                    {curso.title}
                                                </h3>
                                                <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
                                                    {curso.resumo}
                                                </p>
                                            </div>

                                            {/* Nível do Curso */}
                                            <div className="flex items-center mt-3">
                                                <LevelIcon level={getLevelForCourse(curso.title)} />
                                                <span className="text-xs text-white/80 font-medium">
                                                    {getLevelForCourse(curso.title)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Overlay de Hover */}
                                        <div className={`
                                            absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100
                                            transition-opacity duration-300 rounded-2xl
                                            flex items-center justify-center
                                        `}>
                                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                                <BookOpen className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mensagem de Ajuda */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        Clique em qualquer curso para começar sua jornada de aprendizado
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CursosPage; 