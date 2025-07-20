import { cache } from "react";
import "./server-config";
import db from "./drizzle";
import { cursos } from "./schema";
import { eq } from "drizzle-orm";

// Query para buscar todos os cursos com cache (apenas servidor)
export const getCursosServer = cache(async () => {
    try {
        const allCursos = await db.select().from(cursos);
        console.log("✅ Dados obtidos do banco de dados");
        return allCursos;
    } catch (error) {
        console.log("⚠️ Erro ao conectar com banco, usando dados mock");
        console.error("Erro detalhado:", error);
        return [];
    }
});

// Query para buscar um curso específico por ID (apenas servidor)
export const getCursoByIdServer = cache(async (id: number) => {
    try {
        const curso = await db.select().from(cursos).where(eq(cursos.id, id));
        return curso[0] || null;
    } catch {
        console.log("⚠️ Erro ao conectar com banco, usando dados mock");
        return null;
    }
}); 