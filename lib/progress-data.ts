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

// Adds an exported file to the current progress; null when it is not a progress file.
export function importInto(mine: Progress, raw: unknown): Progress | null {
    const imported = parseProgress(raw);
    if (!imported) return null;
    const done = { ...mine.done };
    for (const [key, at] of Object.entries(imported.done)) {
        if (!done[key] || Date.parse(at) < Date.parse(done[key])) done[key] = at;
    }
    return { done, goal: parseDailyGoal((raw as { goal?: unknown }).goal) ?? mine.goal };
}

// Mini-challenges solved inside skills not yet finished: skill key -> exercise ids. Also untrusted when imported.
export type Solved = Record<string, string[]>;

const SKILL_KEY = /^skill:[a-z0-9-]+\/[a-z0-9-]+$/;
const EXERCISE_ID = /^[a-z0-9-]+$/;

export function parseSolved(raw: unknown): Solved {
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return {};
    const entries = Object.entries(raw)
        .filter((e): e is [string, unknown[]] => SKILL_KEY.test(e[0]) && Array.isArray(e[1]))
        .map(([key, ids]) => [key, ids.filter((id): id is string => typeof id === "string" && EXERCISE_ID.test(id))]);
    return Object.fromEntries(entries);
}

export function mergeSolved(mine: Solved, other: Solved): Solved {
    const out = { ...mine };
    for (const [key, ids] of Object.entries(other)) out[key] = [...new Set([...(out[key] ?? []), ...ids])];
    return out;
}
