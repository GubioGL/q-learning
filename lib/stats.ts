// Gamification numbers derived from completions: pure functions, so they can be unit-tested.

export const SKILL_XP = 10;
export const XP_PER_ACTIVITY = 10; // used to turn the daily activity goal into an XP goal
export const DEFAULT_DAILY_GOAL = 3;
export const MAX_DAILY_GOAL = 20;
export const DAYS_PER_WEEK = 7;

const MS_PER_DAY = 86_400_000;

// Days since 1970-01-01 (a Thursday) on the visitor's own calendar.
const dayNumber = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / MS_PER_DAY;
const daysSinceMonday = (day: number) => (day + 3) % DAYS_PER_WEEK;

export type Entry = { xp: number; at: Date };
export type Tally = { xp: number; activities: number };
export type Stats = { xp: number; streak: number; bestStreak: number; today: Tally; week: Tally };

const tally = (entries: Entry[]): Tally => ({ xp: entries.reduce((sum, e) => sum + e.xp, 0), activities: entries.length });

export function computeStats(entries: Entry[], now: Date): Stats {
    const today = dayNumber(now);
    const monday = today - daysSinceMonday(today);
    const days = new Set(entries.map((e) => dayNumber(e.at)));
    // Yesterday's streak is still alive until today ends.
    const last = days.has(today) ? today : today - 1;
    const runEndingAt = (day: number) => {
        let length = 0;
        while (days.has(day - length)) length++;
        return length;
    };
    return {
        xp: tally(entries).xp,
        streak: runEndingAt(last),
        bestStreak: Math.max(0, ...[...days].map(runEndingAt)),
        today: tally(entries.filter((e) => dayNumber(e.at) === today)),
        week: tally(entries.filter((e) => dayNumber(e.at) >= monday)),
    };
}

export const parseDailyGoal = (value: unknown): number | null =>
    typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= MAX_DAILY_GOAL ? value : null;
