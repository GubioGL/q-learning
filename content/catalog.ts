import { levelKey, skillKey } from "@/lib/progress";
import { SKILL_XP } from "@/lib/stats";
import { courses } from "./courses";
import { levels } from "./levels";

// Every item a learner can complete, with its XP. Server only: client components get it as a prop.
export const xpByKey: Record<string, number> = Object.fromEntries([
    ...courses.flatMap((c) => c.skills.map((s) => [skillKey(c.id, s.id), SKILL_XP] as const)),
    ...levels.map((l) => [levelKey(l.id), l.xp] as const),
]);

export const levelKeys = levels.map((l) => levelKey(l.id));
