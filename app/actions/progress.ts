"use server";

import { revalidatePath } from "next/cache";
import { findCourse } from "@/content/courses";
import { levels } from "@/content/levels";
import { currentUserId, getDone, markDone, saveDailyGoal } from "@/db/progress";
import { levelKey, pathStates, skillKey } from "@/lib/progress";
import { MAX_DAILY_GOAL, parseDailyGoal } from "@/lib/stats";

// Server-side checks: the item must exist and be unlocked for this user (client state is not trusted).
async function requireUser() {
    const userId = await currentUserId(true);
    if (!userId) throw new Error("Não foi possível identificar o visitante.");
    return userId;
}

export async function completeSkill(courseId: string, skillId: string) {
    const userId = await requireUser();
    const course = findCourse(courseId);
    const index = course?.skills.findIndex((s) => s.id === skillId) ?? -1;
    if (!course || index < 0) throw new Error("Skill não encontrada.");
    const keys = course.skills.map((s) => skillKey(course.id, s.id));
    if (pathStates(keys, await getDone())[index] === "locked") throw new Error("Skill ainda bloqueada.");
    await markDone(userId, keys[index]);
    revalidatePath("/", "layout");
}

export async function completeLevel(levelId: string) {
    const userId = await requireUser();
    const index = levels.findIndex((l) => l.id === levelId);
    if (index < 0) throw new Error("Nível não encontrado.");
    const keys = levels.map((l) => levelKey(l.id));
    if (pathStates(keys, await getDone())[index] === "locked") throw new Error("Nível ainda bloqueado.");
    const isNew = await markDone(userId, keys[index]);
    revalidatePath("/", "layout");
    return isNew;
}

export async function updateDailyGoal(value: number) {
    const goal = parseDailyGoal(value);
    if (goal === null) throw new Error(`A meta deve ser um número inteiro de 1 a ${MAX_DAILY_GOAL}.`);
    await saveDailyGoal(await requireUser(), goal);
    revalidatePath("/", "layout");
}
