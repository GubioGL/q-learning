"use client";

import Link from "next/link";
import { Check, Lock } from "lucide-react";
import type { SkillMeta } from "@/content/courses";
import { useLocale, useT } from "@/lib/i18n/context";
import { pathStates, skillKey, type NodeState } from "@/lib/progress";
import { useDone } from "@/lib/use-progress";

const NODE_STYLE: Record<NodeState, string> = {
    done: "border-green-600 bg-green-900/20 hover:border-green-400",
    open: "border-purple-500 bg-purple-900/30 hover:border-purple-300",
    locked: "border-gray-700 bg-gray-800/40",
};

const BADGE_STYLE: Record<NodeState, string> = { done: "bg-green-700", open: "bg-purple-600", locked: "bg-gray-600" };

export function SkillList({ courseId, skills }: { courseId: string; skills: SkillMeta[] }) {
    const locale = useLocale();
    const { courses: t } = useT();
    const states = pathStates(skills.map((s) => skillKey(courseId, s.id)), useDone());

    return (
        <ol className="mt-8 space-y-3">
            {skills.map((skill, i) => {
                const state = states[i];
                const body = (
                    <div className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-colors ${NODE_STYLE[state]}`}>
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${BADGE_STYLE[state]}`}>
                            {state === "done" ? <Check aria-hidden /> : state === "locked" ? <Lock size={18} aria-hidden /> : i + 1}
                        </span>
                        <span className={`flex-1 text-lg ${state === "locked" ? "text-gray-400" : "text-gray-100"}`}>{skill.title}</span>
                        <span className="text-sm text-gray-400">{t.state[state]}</span>
                    </div>
                );
                return (
                    <li key={skill.id}>
                        {state === "locked" ? body : <Link href={`/${locale}/cursos/${courseId}/${skill.id}`}>{body}</Link>}
                    </li>
                );
            })}
        </ol>
    );
}
