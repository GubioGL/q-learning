import { cache } from "react";
import "./server-config";
import db from "./drizzle";
import { cursos } from "./schema";
import { eq } from "drizzle-orm";

export const getCursos = cache(async () => {
  try {
    const allCursos = await db.select().from(cursos);
    console.log("✅ Dados obtidos do banco de dados");
    return allCursos;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return [];
  }
});

export const getCursoById = cache(async (id: number) => {
  try {
    const curso = await db.select().from(cursos).where(eq(cursos.id, id));
    return curso[0] || null;
  } catch (error) {
    console.error("Erro ao buscar curso por ID:", error);
    return null;
  }
}); 