"use client";

import type { Case } from "@/lib/exercise";
import { useT } from "@/lib/i18n/context";
import type { TestResult } from "@/lib/python-runner";

const STYLE = {
    pending: { icon: "⏳", box: "border-gray-600", text: "text-gray-300" },
    passed: { icon: "✅", box: "border-green-600 bg-green-900/20", text: "text-green-300" },
    failed: { icon: "❌", box: "border-red-600 bg-red-900/20", text: "text-red-300" },
};

const Line = ({ label, value }: { label: string; value: string }) => (
    <p className="mt-1 text-sm text-gray-300">{label}: <code className="rounded bg-gray-950 px-1.5 py-0.5 font-mono text-purple-200 break-all">{value}</code></p>
);

// The first test shows its call and result; the others only tell whether they passed.
export function TestList({ tests, results }: { tests: Case[][]; results?: TestResult[] }) {
    const { exercise: t } = useT();
    return (
        <section aria-label={t.tests}>
            <p className="mb-2 font-bold text-gray-100"><span aria-hidden>🧪</span> {t.tests}</p>
            <ol className="space-y-2">
                {tests.map((cases, i) => {
                    const result = results?.[i];
                    const state = !result ? "pending" : result.ok ? "passed" : "failed";
                    const isVisible = i === 0;
                    return (
                        <li key={i} className={`rounded-lg border-2 p-3 ${STYLE[state].box}`}>
                            <p className="flex flex-wrap items-center justify-between gap-2">
                                <span className="font-semibold text-gray-100">
                                    {t.test(i + 1)} <span className="text-sm font-normal text-gray-300"><span aria-hidden>{isVisible ? "👀" : "🔒"}</span> {isVisible ? t.exampleTest : t.hidden}</span>
                                </span>
                                <span className={`text-sm font-semibold ${STYLE[state].text}`}><span aria-hidden>{STYLE[state].icon}</span> {t[state]}</span>
                            </p>
                            {isVisible && cases.map((c) => (
                                <div key={c.call}>
                                    <Line label={t.callLabel} value={c.call} />
                                    <Line label={t.expectedLabel} value={c.expected} />
                                </div>
                            ))}
                            {isVisible && state === "failed" && result?.got && <Line label={t.gotLabel} value={result.got} />}
                            {isVisible && result?.error && <Line label={t.errorLabel} value={result.error} />}
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}
