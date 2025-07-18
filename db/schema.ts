import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const cursos = pgTable("cursos", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

// export type InsertCurso = typeof cursos.$inferInsert;