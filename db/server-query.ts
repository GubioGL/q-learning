import { cache } from "react";
import "./server-config";
import db from "./drizzle";
import { cursos, userProgress } from "./schema";
import { eq } from "drizzle-orm";

export const getCursosServer = cache(async () => {
  try {
    const allCursos = await db.select().from(cursos);
    console.log("✅ Dados obtidos do banco de dados");
    return allCursos;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return [];
  }
});

export const getCursoByIdServer = cache(async (id: number) => {
  try {
    const curso = await db.select().from(cursos).where(eq(cursos.id, id));
    return curso[0] || null;
  } catch (error) {
    console.error("Erro ao buscar curso por ID:", error);
    return null;
  }
});

// Queries para gerenciar perfil do usuário
export const getUserProfile = cache(async (userId: string) => {
  try {
    console.log("🔍 Buscando perfil do usuário:", userId);
    const user = await db.select().from(userProgress).where(eq(userProgress.user_id, userId));
    console.log("✅ Perfil encontrado:", user[0] || "Nenhum perfil encontrado");
    return user[0] || null;
  } catch (error) {
    console.error("❌ Erro ao buscar perfil do usuário:", error);
    throw new Error(`Erro ao buscar perfil: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
});

export const updateUserProfile = async (userId: string, userData: {
  user_namer?: string;
  dailyActivities?: number;
  dailyXPTarget?: number;
  weeklyXPTarget?: number;
  dailyLessonsTarget?: number;
  weeklyLessonsTarget?: number;
}) => {
  try {
    console.log("🔄 Atualizando perfil do usuário:", { userId, userData });
    
    // Primeiro, verificar se o usuário existe
    const existingUser = await db.select().from(userProgress).where(eq(userProgress.user_id, userId));
    
    if (existingUser.length === 0) {
      throw new Error(`Usuário com ID ${userId} não encontrado. Use POST para criar um novo perfil.`);
    }
    
    const updatedUser = await db
      .update(userProgress)
      .set(userData)
      .where(eq(userProgress.user_id, userId))
      .returning();
    
    console.log("✅ Perfil do usuário atualizado:", updatedUser[0]);
    return updatedUser[0];
  } catch (error) {
    console.error("❌ Erro ao atualizar perfil do usuário:", error);
    throw new Error(`Erro ao atualizar perfil: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};

export const createUserProfile = async (userId: string, userName: string) => {
  try {
    console.log("➕ Criando novo perfil do usuário:", { userId, userName });
    
    // Verificar se o usuário já existe
    const existingUser = await db.select().from(userProgress).where(eq(userProgress.user_id, userId));
    
    if (existingUser.length > 0) {
      throw new Error(`Usuário com ID ${userId} já existe. Use PUT para atualizar o perfil.`);
    }
    
    const newUser = await db
      .insert(userProgress)
      .values({
        user_id: userId,
        user_namer: userName, // Corrigido para user_namer
        dailyActivities: 3,
        dailyXPTarget: 30,
        weeklyXPTarget: 210,
        dailyLessonsTarget: 3,
        weeklyLessonsTarget: 21,
      })
      .returning();
    
    console.log("✅ Novo perfil de usuário criado:", newUser[0]);
    return newUser[0];
  } catch (error) {
    console.error("❌ Erro ao criar perfil do usuário:", error);
    throw new Error(`Erro ao criar perfil: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
}; 