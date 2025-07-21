import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const cursos = pgTable("cursos", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
    resumo: text("resumo").notNull(),
    topicos: text("topicos").notNull(),
});

export type Curso = typeof cursos.$inferSelect;
export type InsertCurso = typeof cursos.$inferInsert;

// Definindo as relações do curso
export const cursosRelations = relations(cursos, ({ many }) => ({
    progressos: many(userProgress)
}));

export const userProgress = pgTable("user_progress", {
    user_id: text("user_id").primaryKey(),
    user_namer: text("user_namer").notNull().default("User"), // Corrigido para corresponder ao banco
    cursoativo: integer("cursoativo").references(() => cursos.id, { onDelete: "cascade" }),
    streak: integer("streak").notNull().default(0),
    tokens: integer("tokens").notNull().default(0),
    energy: integer("energy").notNull().default(0),

    // Metas e progresso diário do usuário
    dailyActivities: integer("daily_activities").notNull().default(0), // meta de atividades diárias
    dailyXP: integer("daily_xp").notNull().default(0), // meta de XP diário
    weeklyXP: integer("weekly_xp").notNull().default(0), // meta de XP semanal

    // Progresso diário detalhado
    dailyXPTarget: integer("daily_xp_target").notNull().default(0),
    dailyLessons: integer("daily_lessons").notNull().default(0),
    dailyLessonsTarget: integer("daily_lessons_target").notNull().default(0),

    // Progresso semanal detalhado
    weeklyXPTarget: integer("weekly_xp_target").notNull().default(0),
    weeklyLessons: integer("weekly_lessons").notNull().default(0),
    weeklyLessonsTarget: integer("weekly_lessons_target").notNull().default(0),

    // Número total de lições no curso
    totalLessons: integer("total_lessons").notNull().default(100),
    // Número de lições já feitas pelo usuário no curso
    completedLessons: integer("completed_lessons").notNull().default(0),
});

// Definindo as relações do progresso do usuário
export const userProgressRelations = relations(userProgress, ({ one }) => ({
    curso: one(cursos, {
        fields: [userProgress.cursoativo],
        references: [cursos.id],
    }),
}));