// Gamification numbers derived from completions: pure functions, no database, so they can be unit-tested.

export const SKILL_XP = 10;
export const XP_PER_ACTIVITY = 10; // used to turn the daily activity goal into an XP goal
export const DEFAULT_DAILY_GOAL = 3;
export const MAX_DAILY_GOAL = 20;
export const DAYS_PER_WEEK = 7;

// shortcut: one time zone for everyone, store it per user when the site is translated (Etapa 7)
const TIME_ZONE = "America/Sao_Paulo";
const MS_PER_DAY = 86_400_000;
const localDate = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });

const dayNumber = (date: Date) => Date.parse(localDate.format(date)) / MS_PER_DAY; // days since 1970-01-01, a Thursday
const daysSinceMonday = (day: number) => (day + 3) % DAYS_PER_WEEK;

export type Entry = { xp: number; at: Date };
export type Tally = { xp: number; activities: number };
export type Stats = { xp: number; streak: number; today: Tally; week: Tally };

const tally = (entries: Entry[]): Tally => ({ xp: entries.reduce((sum, e) => sum + e.xp, 0), activities: entries.length });

export function computeStats(entries: Entry[], now: Date): Stats {
    const today = dayNumber(now);
    const monday = today - daysSinceMonday(today);
    const days = new Set(entries.map((e) => dayNumber(e.at)));
    // Yesterday's streak is still alive until today ends.
    const last = days.has(today) ? today : today - 1;
    let streak = 0;
    while (days.has(last - streak)) streak++;
    return {
        xp: tally(entries).xp,
        streak,
        today: tally(entries.filter((e) => dayNumber(e.at) === today)),
        week: tally(entries.filter((e) => dayNumber(e.at) >= monday)),
    };
}

export const parseDailyGoal = (value: unknown): number | null =>
    typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= MAX_DAILY_GOAL ? value : null;
