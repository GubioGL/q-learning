import "server-only";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { courses } from "@/content/courses";
import { levels } from "@/content/levels";
import { levelKey, skillKey } from "@/lib/progress";
import { computeStats, DEFAULT_DAILY_GOAL, SKILL_XP } from "@/lib/stats";
import db from "./drizzle";
import { completions, userProgress } from "./schema";

// While sign-in is optional, visitors get an anonymous id cookie so their progress is still saved.
const ANON_COOKIE = "ql_anon";
const ANON_MAX_AGE_S = 60 * 60 * 24 * 365;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// create=true only from Server Actions (cookies can't be set while rendering a page).
export async function currentUserId(create = false): Promise<string | null> {
    const { userId } = await auth();
    if (userId) return userId;
    const jar = await cookies();
    const anon = jar.get(ANON_COOKIE)?.value;
    if (anon && UUID.test(anon)) return `anon:${anon}`;
    if (!create) return null;
    const id = crypto.randomUUID();
    jar.set(ANON_COOKIE, id, {
        httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: ANON_MAX_AGE_S, path: "/",
    });
    return `anon:${id}`;
}

// cache(): the layout and the page read this in the same request.
const getCompletions = cache(async () => {
    const userId = await currentUserId();
    if (!userId) return [];
    return db.select({ key: completions.key, at: completions.completedAt }).from(completions).where(eq(completions.userId, userId));
});

// Keys the current visitor has completed; empty set for a new visitor.
export async function getDone(): Promise<Set<string>> {
    return new Set((await getCompletions()).map((r) => r.key));
}

const XP_BY_KEY = new Map([
    ...courses.flatMap((c) => c.skills.map((s) => [skillKey(c.id, s.id), SKILL_XP] as const)),
    ...levels.map((l) => [levelKey(l.id), l.xp] as const),
]);

export async function getStats() {
    // Completions of content that was removed from the site no longer count.
    const rows = (await getCompletions()).filter((r) => XP_BY_KEY.has(r.key));
    return {
        ...computeStats(rows.map((r) => ({ xp: XP_BY_KEY.get(r.key)!, at: r.at })), new Date()),
        completed: rows.length,
        total: XP_BY_KEY.size,
    };
}

export const getDailyGoal = cache(async (): Promise<number> => {
    const userId = await currentUserId();
    if (!userId) return DEFAULT_DAILY_GOAL;
    const [row] = await db.select({ goal: userProgress.dailyActivities }).from(userProgress).where(eq(userProgress.user_id, userId));
    return row?.goal || DEFAULT_DAILY_GOAL; // 0 is the column default: never chosen
});

export async function saveDailyGoal(userId: string, goal: number) {
    await db.insert(userProgress).values({ user_id: userId, dailyActivities: goal })
        .onConflictDoUpdate({ target: userProgress.user_id, set: { dailyActivities: goal } });
}

// Returns false when it was already done: repeating an item gives no XP.
export async function markDone(userId: string, key: string): Promise<boolean> {
    const inserted = await db.insert(completions).values({ userId, key }).onConflictDoNothing().returning({ key: completions.key });
    return inserted.length > 0;
}
