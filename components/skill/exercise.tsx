"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { checkAnswer, type Exercise } from "@/lib/exercise";
import { useT } from "@/lib/i18n/context";
import { PythonExercise } from "./python-exercise";
import { useSkillProgress } from "./skill-progress";

export function ExerciseBlock({ exercise }: { exercise: Exercise }) {
    const { exercise: t } = useT();
    return (
        <div className="my-6 rounded-xl border-2 border-purple-700 bg-purple-950/30 p-4">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-purple-300">
                <span aria-hidden>{exercise.kind === "python" ? "🐍" : "✏️"}</span> {t.title} {exercise.kind === "python" ? "· Python" : ""}
            </p>
            {exercise.kind === "python" ? <PythonExercise exercise={exercise} /> : <AnswerExercise exercise={exercise} />}
        </div>
    );
}

function Feedback({ ok, children }: { ok: boolean; children: React.ReactNode }) {
    return (
        <p role="status" className={`mt-3 font-semibold ${ok ? "text-green-400" : "text-red-400"}`}>
            {children}
        </p>
    );
}

function AnswerExercise({ exercise }: { exercise: Exercise }) {
    const ctx = useSkillProgress();
    const { exercise: t } = useT();
    const [value, setValue] = useState("");
    const [result, setResult] = useState<boolean | null>(null);
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const ok = checkAnswer(exercise, value);
        setResult(ok);
        if (ok) ctx?.markSolved(exercise.id);
    };
    return (
        <form onSubmit={submit} className="flex flex-wrap items-center gap-3">
            <label className="sr-only" htmlFor={exercise.id}>{t.answer}</label>
            <input
                id={exercise.id}
                inputMode={exercise.kind === "number" ? "decimal" : "text"}
                value={value}
                onChange={(e) => { setValue(e.target.value); setResult(null); }}
                placeholder={exercise.kind === "number" ? t.numberHint : t.textHint}
                className="min-w-0 flex-1 rounded-lg border-2 border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 focus:border-purple-400 focus:outline-none"
            />
            <Button type="submit" variant="buttonRox" disabled={!value.trim()}>{t.check}</Button>
            {result !== null && <div className="w-full"><Feedback ok={result}>{result ? t.correct : t.wrong}</Feedback></div>}
        </form>
    );
}
