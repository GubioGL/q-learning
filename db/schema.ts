import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const cursos = pgTable("cursos", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
    resumo: text("resumo").notNull(),
    topicos: text("topicos").notNull(),
});

export type Curso = typeof cursos.$inferSelect;
export type InsertCurso = typeof cursos.$inferInsert;