// Which achievements the learner has earned; titles live in lib/i18n.

export const STREAK_GOALS = [3, 7, 30];
export const XP_GOALS = [100, 250];

type Input = {
    done: Set<string>;
    xp: number;
    bestStreak: number;
    skillsByCourse: Record<string, string[]>;
    levelKeys: string[];
};

export function earnedAchievements({ done, xp, bestStreak, skillsByCourse, levelKeys }: Input): Set<string> {
    const all = (keys: string[]) => keys.every((k) => done.has(k));
    return new Set([
        ...(done.size > 0 ? ["first"] : []),
        ...STREAK_GOALS.filter((n) => bestStreak >= n).map((n) => `streak${n}`),
        ...XP_GOALS.filter((n) => xp >= n).map((n) => `xp${n}`),
        ...Object.keys(skillsByCourse).filter((c) => all(skillsByCourse[c])).map((c) => `course:${c}`),
        ...(all(levelKeys) ? ["trail"] : []),
    ]);
}
