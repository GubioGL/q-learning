import type { Progress } from "./progress-data";
import { computeStats, type Stats } from "./stats";

export type SiteStats = Stats & { completed: number; total: number };

// xpByKey lists every item on the site; completions of removed content do not count.
export function siteStats(progress: Progress, xpByKey: Record<string, number>, now: Date): SiteStats {
    const rows = Object.entries(progress.done).filter(([key]) => Object.hasOwn(xpByKey, key));
    return {
        ...computeStats(rows.map(([key, at]) => ({ xp: xpByKey[key], at: new Date(at) })), now),
        completed: rows.length,
        total: Object.keys(xpByKey).length,
    };
}
