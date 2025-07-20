"use client";


import { useRouter } from "next/navigation";
import { useCourseContext } from "@/lib/contexts/CourseContext";
import type { Curso } from "@/db/schema";

// Estilos CSS para animação
const animationStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out;
  }
`;

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

interface CursosClientProps {
    initialCursos: Curso[];
}

const CursosClient = ({ initialCursos }: CursosClientProps) => {
    const { selectedCourseId, setSelectedCourseId } = useCourseContext();
    const router = useRouter();



    const handleCourseClick = (courseId: number, href: string) => {
        router.push(href);
    };

    const handleRadioChange = (courseId: number) => {
        setSelectedCourseId(courseId);
    };

    return (
        <div className="text-[#6a7282] flex justify-center">
            <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
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

                {/* Grid de Cursos - Layout em coluna única */}
                <div className="space-y-6 max-w-2xl mx-auto">
                    {initialCursos
                        .sort((a, b) => {
                            // Coloca "Básico" primeiro
                            if (a.title.toLowerCase() === "básico") return -1;
                            if (b.title.toLowerCase() === "básico") return 1;
                            // Depois ordena por ID
                            return a.id - b.id;
                        })
                        .map((curso) => {
                        const isSelected = selectedCourseId === curso.id;
                        
                        return (
                            <div
                                key={curso.id}
                                className="flex items-center gap-8 animate-fade-in"
                                style={{
                                    animationDelay: `${(curso.id - 1) * 100}ms`,
                                    animationFillMode: 'both'
                                }}
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
                                        {/* Imagem de Fundo do Curso */}
                                        {curso.imageSrc && (
                                            <div className="absolute inset-0 opacity-20">
                                                <img 
                                                    src={curso.imageSrc} 
                                                    alt={curso.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}



                                        {/* Conteúdo do Card */}
                                        <div className="h-full flex flex-col justify-between relative z-10">
                                            <div>
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

export default CursosClient; 