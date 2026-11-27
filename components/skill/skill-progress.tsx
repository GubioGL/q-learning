"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale, useT } from "@/lib/i18n/context";
import { skillKey } from "@/lib/progress";
import { markDone, readAllSolved, saveSolved, useDone } from "@/lib/use-progress";

type Ctx = { solved: Set<string>; loaded: boolean; markSolved: (id: string) => void };
const SkillCtx = createContext<Ctx | null>(null);

export const useSkillProgress = () => useContext(SkillCtx);

export function SkillProgressProvider({ storageKey, children }: { storageKey: string; children: React.ReactNode }) {
    const [solved, setSolved] = useState<Set<string>>(new Set());
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setSolved((s) => new Set([...(readAllSolved()[storageKey] ?? []), ...s]));
        setLoaded(true);
    }, [storageKey]);
    const markSolved = useCallback((id: string) => setSolved((s) => {
        if (s.has(id)) return s;
        const next = new Set(s).add(id);
        saveSolved(storageKey, [...next]); // remembered so the learner can stop between mini-lessons
        return next;
    }), [storageKey]);
    return <SkillCtx.Provider value={{ solved, loaded, markSolved }}>{children}</SkillCtx.Provider>;
}

type Props = { courseId: string; skillId: string; exerciseIds: string[] };

export function CompleteSkillButton({ courseId, skillId, exerciseIds }: Props) {
    const ctx = useSkillProgress();
    const router = useRouter();
    const locale = useLocale();
    const { skill: t } = useT();
    const [error, setError] = useState<string | null>(null);
    const key = skillKey(courseId, skillId);
    const alreadyDone = useDone().has(key);
    const remaining = exerciseIds.filter((id) => !ctx?.solved.has(id)).length;
    const back = `/${locale}/cursos/${courseId}`;

    if (alreadyDone) {
        return (
            <div className="flex flex-col gap-3 rounded-xl border-2 border-green-700 bg-green-900/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-green-300">✓ {t.done}</span>
                {error && <p role="alert" className="text-red-400">{error}</p>}
                <Button asChild variant="buttonGre"><Link href={back}>{t.backToCourse}</Link></Button>
            </div>
        );
    }

    const finish = () => {
        if (markDone(key).saved) router.push(back);
        else setError(t.saveError);
    };

    return (
        <div className="flex flex-col gap-2 rounded-xl border-2 border-gray-700 p-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-gray-300" aria-live="polite">
                {remaining > 0 ? t.remaining(remaining) : t.ready}
            </span>
            <Button variant="buttonGre" disabled={remaining > 0} onClick={finish}>
                {t.finish}
            </Button>
            {error && <p role="alert" className="text-red-400">{error}</p>}
        </div>
    );
}
