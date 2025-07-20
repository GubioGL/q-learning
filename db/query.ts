import { cache } from "react";
import "./server-config"; // Carrega configuração do servidor
import db from "./drizzle";
import { cursos } from "./schema";
import { eq } from "drizzle-orm";

// Dados mock para demonstração quando não há conexão com banco
const mockCursos = [
    {
        id: 1,
        title: "Básico",
        imageSrc: "/introduçao.png",
        resumo: "Este curso introdutório explora os fundamentos da computação clássica e dá os primeiros passos na computação quântica. Ideal para quem nunca programou ou não possui formação avançada em matemática.",
        topicos: "Conceito de bits e lógica binária\nPortas lógicas clássicas (AND, OR, NOT, etc.)\nCodificação de informações com ASCII e binário\nPortas reversíveis e máquinas de Turing\nConceito de qubit e superposição\nMedidas quânticas e a esfera de Bloch\nPortas quânticas de 1 qubit (X, Y, Z, H, etc.)\nIntrodução a circuitos quânticos e ferramentas como Quirk"
    },
    {
        id: 2,
        title: "Algebra linear",
        imageSrc: "/introduçao.png",
        resumo: "Aborda a matemática fundamental para entender e manipular sistemas quânticos. Foco em vetores, matrizes e operações que são essenciais em computação quântica.",
        topicos: "Vetores e espaços vetoriais\nMatrizes e operações matriciais\nAutovalores e autovetores\nProduto interno e ortogonalidade\nTransformações lineares\nDecomposição espectral\nAplicações em computação quântica"
    },
    {
        id: 3,
        title: "Computação quântica",
        imageSrc: "/quantum-computing.png",
        resumo: "Explora sistemas com múltiplos qubits, entrelaçamento e portas de múltiplos qubits. Essencial para compreender o potencial da computação quântica.",
        topicos: "Sistemas de múltiplos qubits\nEntrelaçamento quântico\nPortas de múltiplos qubits\nCircuitos quânticos complexos\nAlgoritmos quânticos básicos\nMedidas em sistemas múltiplos\nCorreção de erros quânticos"
    },
    {
        id: 4,
        title: "Teoria quântica",
        imageSrc: "/quantum.png",
        resumo: "Explora as aplicações fundamentais da mecânica quântica para comunicação segura, teleportação e codificação eficiente de informações.",
        topicos: "Criptografia quântica\nTeleportação quântica\nCodificação densa\nEstados de Bell\nMedidas de entrelaçamento\nAplicações em comunicação segura\nProtocolos quânticos avançados"
    }
];

// Query para buscar todos os cursos com cache
export const getCursos = cache(async () => {
    try {
        // Tenta buscar do banco de dados
        const allCursos = await db.select().from(cursos);
        console.log("✅ Dados obtidos do banco de dados");
        return allCursos;
    } catch (error) {
        console.log("⚠️ Erro ao conectar com banco, usando dados mock");
        console.error("Erro detalhado:", error);
        return mockCursos;
    }
});

// Query para buscar um curso específico por ID
export const getCursoById = cache(async (id: number) => {
    try {
        const curso = await db.select().from(cursos).where(eq(cursos.id, id));
        return curso[0] || null;
    } catch {
        console.log("⚠️ Erro ao conectar com banco, usando dados mock");
        return mockCursos.find(curso => curso.id === id) || null;
    }
}); 