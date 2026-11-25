"use client";

import { Lock, Trophy } from "lucide-react";
import { STREAK_GOALS, XP_GOALS, earnedAchievements } from "@/lib/achievements";
import { useT } from "@/lib/i18n/context";
import { siteStats } from "@/lib/site-stats";
import { useDone, useProgress } from "@/lib/use-progress";

type Props = { courses: { id: string; title: string; keys: string[] }[]; levelKeys: string[]; xpByKey: Record<string, number> };

export function AchievementList({ courses, levelKeys, xpByKey }: Props) {
    const { achievements: t } = useT();
    const { progress } = useProgress();
    const { xp, bestStreak } = siteStats(progress, xpByKey, new Date());
    const skillsByCourse = Object.fromEntries(courses.map((c) => [c.id, c.keys]));
    const earned = earnedAchievements({ done: useDone(), xp, bestStreak, skillsByCourse, levelKeys });

    const items: { id: string; text: string[] }[] = [
        { id: "first", text: t.first },
        ...STREAK_GOALS.map((n) => ({ id: `streak${n}`, text: t.streak(n) })),
        ...XP_GOALS.map((n) => ({ id: `xp${n}`, text: t.xp(n) })),
        ...courses.map((c) => ({ id: `course:${c.id}`, text: t.course(c.title) })),
        { id: "trail", text: t.trail },
    ];

    return (
        <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-100">{t.title}</h1>
            <p className="mt-1 text-gray-400">{t.count(earned.size, items.length)}</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {items.map(({ id, text: [title, description] }) => {
                    const isEarned = earned.has(id);
                    return (
                        <li key={id} className={`flex items-center gap-4 rounded-xl border-2 p-4 ${isEarned ? "border-yellow-500 bg-yellow-900/20" : "border-gray-700 bg-gray-800/40"}`}>
                            {isEarned ? <Trophy aria-hidden className="shrink-0 text-yellow-400" /> : <Lock aria-hidden className="shrink-0 text-gray-400" />}
                            <div>
                                <h2 className="font-bold text-gray-100">{title}</h2>
                                <p className="text-sm text-gray-400">{description}</p>
                                <p className={`text-sm font-semibold ${isEarned ? "text-yellow-300" : "text-gray-400"}`}>{isEarned ? t.earned : t.locked}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
