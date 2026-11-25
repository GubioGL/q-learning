import { notFound, redirect } from "next/navigation";
import { findCourse } from "@/content/courses";
import { findLevel, levels } from "@/content/levels";
import { getDone } from "@/db/progress";
import { levelKey, pathStates } from "@/lib/progress";
import LessonClient from "./lesson-client";

export default async function LevelPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const level = findLevel(id);
    if (!level) notFound();

    const states = pathStates(levels.map((l) => levelKey(l.id)), await getDone());
    if (states[levels.indexOf(level)] === "locked") redirect("/desafios");

    const skill = findCourse(level.course)?.skills.find((s) => s.id === level.skill);
    return (
        <LessonClient
            lesson={level}
            recommendHref={`/cursos/${level.course}/${level.skill}`}
            recommendTitle={skill?.title ?? level.title}
        />
    );
}
