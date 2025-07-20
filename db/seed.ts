import "./server-config"; // Carrega configuração do servidor
import db from "./drizzle";
import { cursos } from "./schema";

const seedData = [
    {
        title: "Básico",
        imageSrc: "/introduçao.png",
        resumo: "Este curso introdutório explora os fundamentos da computação clássica e dá os primeiros passos na computação quântica. Ideal para quem nunca programou ou não possui formação avançada em matemática.",
        topicos: "Conceito de bits e lógica binária\nPortas lógicas clássicas (AND, OR, NOT, etc.)\nCodificação de informações com ASCII e binário\nPortas reversíveis e máquinas de Turing\nConceito de qubit e superposição\nMedidas quânticas e a esfera de Bloch\nPortas quânticas de 1 qubit (X, Y, Z, H, etc.)\nIntrodução a circuitos quânticos e ferramentas como Quirk"
    },
    {
        title: "Algebra linear",
        imageSrc: "/introduçao.png",
        resumo: "Aborda a matemática fundamental para entender e manipular sistemas quânticos. Foco em vetores, matrizes e operações que são essenciais em computação quântica.",
        topicos: "Vetores e espaços vetoriais\nMatrizes e operações matriciais\nAutovalores e autovetores\nProduto interno e ortogonalidade\nTransformações lineares\nDecomposição espectral\nAplicações em computação quântica"
    },
    {
        title: "Computação quântica",
        imageSrc: "/quantum-computing.png",
        resumo: "Explora sistemas com múltiplos qubits, entrelaçamento e portas de múltiplos qubits. Essencial para compreender o potencial da computação quântica.",
        topicos: "Sistemas de múltiplos qubits\nEntrelaçamento quântico\nPortas de múltiplos qubits\nCircuitos quânticos complexos\nAlgoritmos quânticos básicos\nMedidas em sistemas múltiplos\nCorreção de erros quânticos"
    },
    {
        title: "Teoria quântica",
        imageSrc: "/quantum.png",
        resumo: "Explora as aplicações fundamentais da mecânica quântica para comunicação segura, teleportação e codificação eficiente de informações.",
        topicos: "Criptografia quântica\nTeleportação quântica\nCodificação densa\nEstados de Bell\nMedidas de entrelaçamento\nAplicações em comunicação segura\nProtocolos quânticos avançados"
    }
];

async function seed() {
    try {
        console.log("🌱 Iniciando seed do banco de dados...");
        
        // Limpa a tabela existente
        await db.delete(cursos);
        console.log("✅ Tabela limpa");
        
        // Insere os dados
        const insertedCursos = await db.insert(cursos).values(seedData).returning();
        console.log("✅ Dados inseridos:", insertedCursos.length, "cursos");
        
        console.log("🎉 Seed concluído com sucesso!");
    } catch (error) {
        console.error("❌ Erro durante o seed:", error);
    }
}

// Executa o seed se o arquivo for executado diretamente
if (require.main === module) {
    seed();
}

export { seed }; 