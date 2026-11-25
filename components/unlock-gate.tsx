"use client";

import Link from "next/link";
import { pathStates } from "@/lib/progress";
import { useDone, useProgress } from "@/lib/use-progress";

type Props = { keys: string[]; itemKey: string; text: string; backHref: string; backLabel: string; children: React.ReactNode };

// Progress lives in the browser, so the page is static and this only guides the learner along the path.
export function UnlockGate({ keys, itemKey, text, backHref, backLabel, children }: Props) {
    const { ready } = useProgress();
    const state = pathStates(keys, useDone())[keys.indexOf(itemKey)];
    if (!ready || state !== "locked") return children;
    return (
        <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 rounded-xl border-2 border-gray-700 p-6 text-center text-lg text-gray-300">
            <p>{text}</p>
            <Link href={backHref} className="rounded-lg bg-purple-700 px-4 py-2 font-bold text-white hover:bg-purple-600">{backLabel}</Link>
        </div>
    );
}
