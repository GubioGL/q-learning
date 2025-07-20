import "./server-config";
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
    resumo: "",
    topicos: ""
  },
  {
    title: "Computação quântica",
    imageSrc: "/quantum-computing.png",
    resumo: ".",
    topicos: ""
  },
  {
    title: "Teoria quântica",
    imageSrc: "/quantum.png",
    resumo: "",
    topicos: ""
  }
];

async function seed() {
  try {
    console.log("🌱 Iniciando seed do banco de dados...");
    
    await db.delete(cursos);
    console.log("✅ Tabela limpa");
    
    const insertedCursos = await db.insert(cursos).values(seedData).returning();
    console.log("✅ Dados inseridos:", insertedCursos.length, "cursos");
    
    console.log("🎉 Seed concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante o seed:", error);
  }
}

if (require.main === module) {
  seed();
}

export { seed }; 