"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { testSummary, type PythonExercise as Exercise } from "@/lib/exercise";
import { useLocale, useT } from "@/lib/i18n/context";
import { TIMEOUT_ERROR, preloadPython, runPython, type RunResult } from "@/lib/python-runner";
import { TestList } from "./test-list";
import { useSkillProgress } from "./skill-progress";
import { ValueList } from "./value-list";

const INDENT = "    ";

export function PythonExercise({ exercise }: { exercise: Exercise }) {
    const ctx = useSkillProgress();
    const locale = useLocale();
    const { exercise: t } = useT();
    const [code, setCode] = useState(exercise.starter);
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState<RunResult | null>(null);

    const run = async () => {
        setRunning(true);
        setResult(null);
        const r = await runPython(code, exercise.tests);
        setResult(r);
        setRunning(false);
        if (r.tests.every((test) => test.ok)) ctx?.markSolved(exercise.id);
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

    const list = (numbers: number[]) => new Intl.ListFormat(locale).format(numbers.map(String));
    const summary = result && testSummary(result.tests.map((test) => test.ok));

    return (
        <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
                <ValueList icon="📥" title={t.inputs} values={exercise.inputs} />
                <ValueList icon="📤" title={t.outputs} values={exercise.outputs} />
            </div>

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
            <div className="flex flex-wrap gap-3">
                <Button variant="buttonRox" onClick={run} disabled={running}><span aria-hidden className="mr-2">▶</span>{running ? t.running : t.run}</Button>
                <Button variant="ghost" className="text-gray-200 hover:text-gray-900" onClick={() => { setCode(exercise.starter); setResult(null); }}><span aria-hidden className="mr-2">↺</span>{t.reset}</Button>
            </div>
            {running && <p className="text-sm text-gray-400"><span aria-hidden>⏳</span> {t.firstRun}</p>}
            {result?.output && <pre className="overflow-x-auto rounded-lg bg-gray-950 p-3 text-sm text-gray-200">{result.output}</pre>}

            <TestList tests={exercise.tests} results={result?.tests} />

            <div role="status" className="font-semibold">
                {result?.error && (
                    <p className="text-red-400"><span aria-hidden>⚠️</span> {result.error === TIMEOUT_ERROR ? t.timeout : `${t.codeError} ${result.error}`}</p>
                )}
                {summary && summary.failed.length === 0 && <p className="text-green-400"><span aria-hidden>🎉</span> {t.allPassed}</p>}
                {summary && summary.failed.length > 0 && (
                    <>
                        {summary.passed.length > 0 && <p className="text-green-400"><span aria-hidden>✅</span> {t.passedIn(list(summary.passed))}</p>}
                        <p className="text-red-400"><span aria-hidden>❌</span> {t.failedIn(list(summary.failed))}</p>
                        <p className="text-gray-300"><span aria-hidden>💡</span> {t.needAll}</p>
                    </>
                )}
            </div>
        </div>
    );
}
