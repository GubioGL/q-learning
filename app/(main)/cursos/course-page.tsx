import CourseHeader from "./header";
import { getCursoByIdServer } from "@/db/server-query";

interface CoursePageProps {
    courseId: number;
    courseTitle: string;
}

const CoursePage = async ({ courseId, courseTitle }: CoursePageProps) => {
    // Busca o curso no banco de dados
    const curso = await getCursoByIdServer(courseId);

    // Se não encontrar o curso, usa dados padrão
    const topicos = curso?.topicos 
        ? curso.topicos.split('\n').filter(topic => topic.trim() !== '')
        : [
            "Conteúdo do curso será carregado em breve...",
            "Aguarde enquanto preparamos o material completo."
        ];

    const resumo = curso?.resumo || 
        "Descrição do curso será carregada em breve.";

    return (
        <div className="text-[#6a7282]">
            <CourseHeader 
                subtitle=""
                sectionLabel="Voltar aos Cursos"
                backHref="/cursos"
            />
            
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-100 mb-4">{courseTitle}</h1>
                <p className="text-gray-400 text-lg mb-2">
                    {resumo}
                </p>
                
                <div className="mt-8 p-6 bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-100 mb-4">📚 O que será visto:</h2>
                    <ul className="space-y-3 text-gray-300">
                        {topicos.map((topico, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-blue-400 mr-3 mt-1">•</span>
                                <span className="flex-1">{topico}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CoursePage; 