// What the learner has done. Lives only in the browser (lib/use-progress.ts); pure functions here.
import { DEFAULT_DAILY_GOAL, parseDailyGoal } from "./stats";

export type Progress = { done: Record<string, string>; goal: number }; // item key -> ISO date of first completion

export const EMPTY_PROGRESS: Progress = { done: {}, goal: DEFAULT_DAILY_GOAL };

const ITEM_KEY = /^(skill:[a-z0-9-]+\/[a-z0-9-]+|level:[a-z0-9-]+)$/;

export const complete = (p: Progress, key: string, now: Date): Progress =>
    p.done[key] ? p : { ...p, done: { ...p.done, [key]: now.toISOString() } };

// Saved data and imported files are untrusted: null when it is not a progress object, bad entries are dropped.
export function parseProgress(raw: unknown): Progress | null {
    const data = raw as { done?: unknown; goal?: unknown } | null;
    if (typeof data !== "object" || typeof data?.done !== "object" || data.done === null || Array.isArray(data.done)) return null;
    const entries = Object.entries(data.done).filter(
        (e): e is [string, string] => ITEM_KEY.test(e[0]) && typeof e[1] === "string" && !Number.isNaN(Date.parse(e[1])),
    );
    return { done: Object.fromEntries(entries), goal: parseDailyGoal(data.goal) ?? DEFAULT_DAILY_GOAL };
}

export function mergeProgress(mine: Progress, imported: Progress): Progress {
    const done = { ...mine.done };
    for (const [key, at] of Object.entries(imported.done)) {
        if (!done[key] || Date.parse(at) < Date.parse(done[key])) done[key] = at;
    }
    return { done, goal: imported.goal };
}
