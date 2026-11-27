"use client";

import { Children, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/context";
import { firstOpenLesson, type MiniLesson } from "@/lib/mini-lessons";
import { useDone } from "@/lib/use-progress";
import { useSkillProgress } from "./skill-progress";

type Lesson = Pick<MiniLesson, "title" | "exerciseIds">;
type Props = { skillKey: string; lessons: Lesson[]; finish: React.ReactNode; children: React.ReactNode };

// One mini-lesson at a time; the next opens once the mini-challenges of the current one are solved.
// Hidden lessons stay mounted so code typed in an exercise survives going back and forth.
export function LessonStepper({ skillKey, lessons, finish, children }: Props) {
    const { steps: t } = useT();
    const ctx = useSkillProgress();
    const solved = ctx?.solved ?? new Set<string>();
    const done = useDone().has(skillKey);
    const open = done ? lessons.length - 1 : firstOpenLesson(lessons, solved);
    const [current, setCurrent] = useState(0);
    const [resumed, setResumed] = useState(false);
    const top = useRef<HTMLElement>(null);
    const pages = Children.toArray(children);

    // Saved progress arrives after the first render: resume once where the learner stopped.
    useEffect(() => {
        if (!ctx?.loaded || resumed) return;
        setResumed(true);
        if (!done) setCurrent(open);
    }, [ctx?.loaded, resumed, done, open]);

    const go = (i: number) => {
        setCurrent(i);
        setResumed(true);
        top.current?.scrollIntoView({ block: "start" });
        top.current?.focus({ preventScroll: true });
    };
    const isSolved = (i: number) => lessons[i].exerciseIds.every((id) => solved.has(id));
    const hasChallenge = (i: number) => lessons[i].exerciseIds.length > 0;
    const last = current === lessons.length - 1;

    return (
        <section ref={top} tabIndex={-1} aria-label={t.label(current + 1, lessons.length)} className="scroll-mt-32 focus:outline-none">
            <nav aria-label={t.nav} className="mt-6">
                <ol className="flex flex-wrap gap-2">
                    {lessons.map((l, i) => {
                        const check = hasChallenge(i) && isSolved(i);
                        return (
                            <li key={i}>
                                <button type="button" onClick={() => go(i)} disabled={i > open}
                                    aria-current={i === current ? "step" : undefined}
                                    aria-label={`${t.label(i + 1, lessons.length)}${l.title ? `: ${l.title}` : ""}${check ? ` (${t.solved})` : ""}`}
                                    title={l.title ?? undefined}
                                    className={`h-9 min-w-9 rounded-full border-2 px-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 ${
                                        i === current ? "border-purple-400 bg-purple-600 text-white"
                                            : check ? "border-green-600 bg-green-900/40 text-green-300" : "border-gray-600 text-gray-300"}`}>
                                    {check && i !== current ? "✓" : i + 1}
                                </button>
                            </li>
                        );
                    })}
                </ol>
                <p className="mt-2 text-sm text-gray-400" aria-live="polite">{t.label(current + 1, lessons.length)}</p>
            </nav>

            {pages.map((page, i) => <div key={i} hidden={i !== current}>{page}</div>)}

            <div className="mt-10 flex flex-col gap-3">
                {!last && !isSolved(current) && !done && <p className="text-gray-300">{t.solveFirst}</p>}
                <div className="flex justify-between gap-3">
                    {current > 0 ? <Button variant="default" onClick={() => go(current - 1)}>{t.prev}</Button> : <span />}
                    {!last && <Button variant="buttonRox" disabled={!isSolved(current) && !done} onClick={() => go(current + 1)}>{t.next}</Button>}
                </div>
                {last && finish}
            </div>
        </section>
    );
}
