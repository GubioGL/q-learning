"use client";

import UserGoals from "@/components/ui/user-goals";
import UserProgress from "@/components/ui/user-progress";
import { useT } from "@/lib/i18n/context";
import { siteStats } from "@/lib/site-stats";
import { useProgress } from "@/lib/use-progress";

export function ProgressPanel({ xpByKey }: { xpByKey: Record<string, number> }) {
    const { progress } = useProgress();
    const { panel } = useT();
    const stats = siteStats(progress, xpByKey, new Date());
    return (
        <aside className="sidebar-direita" aria-label={panel.label}>
            <UserProgress dayStreak={stats.streak} xp={stats.xp} />
            <UserGoals stats={stats} dailyGoal={progress.goal} />
        </aside>
    );
}
