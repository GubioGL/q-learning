"use client";

import type { Value } from "@/lib/exercise";
import { useT } from "@/lib/i18n/context";

const CODE = "rounded bg-gray-950 px-1.5 py-0.5 font-mono text-sm text-purple-200 break-words";

// What an exercise receives or returns: name, Python type, exact format and an example.
export function ValueList({ icon, title, values }: { icon: string; title: string; values: Value[] }) {
    const { exercise: t } = useT();
    return (
        <section className="min-w-0 rounded-lg border border-purple-800 bg-gray-900/60 p-3">
            <p className="mb-2 font-bold text-gray-100"><span aria-hidden>{icon}</span> {title}</p>
            <ul className="space-y-3">
                {values.map((v) => (
                    <li key={v.name} className="text-sm text-gray-300">
                        <p><code className={CODE}>{v.name}</code> <span className="font-mono text-sky-300">{v.type}</span></p>
                        <p className="mt-1">{t.format}: {v.format}</p>
                        {v.example && <p className="mt-1">{t.example}: <code className={CODE}>{v.example}</code></p>}
                    </li>
                ))}
            </ul>
        </section>
    );
}
