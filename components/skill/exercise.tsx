"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { checkAnswer, type Exercise } from "@/lib/exercise";
import { useT } from "@/lib/i18n/context";
import { TIMEOUT_ERROR, preloadPython, runPython, type RunResult } from "@/lib/python-runner";
import { useSkillProgress } from "./skill-progress";

const INDENT = "    ";
const WORKER_TEST_FAILED = "Teste falhou:"; // written by public/pyodide-worker.js

export function ExerciseBlock({ exercise }: { exercise: Exercise }) {
    const { exercise: t } = useT();
    return (
        <div className="my-6 rounded-xl border-2 border-purple-700 bg-purple-950/30 p-4">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-purple-300">
                {t.title} {exercise.kind === "python" ? "· Python" : ""}
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

function PythonExercise({ exercise }: { exercise: Extract<Exercise, { kind: "python" }> }) {
    const ctx = useSkillProgress();
    const { exercise: t } = useT();
    const [code, setCode] = useState(exercise.starter);
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState<RunResult | null>(null);

    const errorText = (error = "") => (error === TIMEOUT_ERROR ? t.timeout : error.replace(WORKER_TEST_FAILED, t.testFailed));

    const run = async () => {
        setRunning(true);
        const r = await runPython(code, exercise.test);
        setResult(r);
        setRunning(false);
        if (r.ok) ctx?.markSolved(exercise.id);
    };

    // Tab inserts spaces instead of leaving the editor; Esc then Tab still moves focus.
    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== "Tab" || e.shiftKey) return;
        e.preventDefault();
        const el = e.currentTarget;
        const { selectionStart: s, selectionEnd: end } = el;
        setCode(code.slice(0, s) + INDENT + code.slice(end));
        requestAnimationFrame(() => el.setSelectionRange(s + INDENT.length, s + INDENT.length));
    };

    return (
        <div>
            <label className="sr-only" htmlFor={exercise.id}>{t.code}</label>
            <textarea
                id={exercise.id}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={onKeyDown}
                onFocus={preloadPython}
                spellCheck={false}
                rows={Math.max(6, code.split("\n").length + 1)}
                className="w-full rounded-lg border-2 border-gray-600 bg-gray-950 p-3 font-mono text-sm text-gray-100 focus:border-purple-400 focus:outline-none"
            />
            <div className="mt-3 flex gap-3">
                <Button variant="buttonRox" onClick={run} disabled={running}>{running ? t.running : t.run}</Button>
                <Button variant="ghost" onClick={() => { setCode(exercise.starter); setResult(null); }}>{t.reset}</Button>
            </div>
            {running && !result && <p className="mt-2 text-sm text-gray-400">{t.firstRun}</p>}
            {result?.output && <pre className="mt-3 overflow-x-auto rounded-lg bg-black/60 p-3 text-sm text-gray-200">{result.output}</pre>}
            {result && <Feedback ok={result.ok}>{result.ok ? t.allPassed : errorText(result.error)}</Feedback>}
        </div>
    );
}
