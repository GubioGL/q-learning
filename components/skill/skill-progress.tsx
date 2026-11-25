"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { completeSkill } from "@/app/actions/progress";

type Ctx = { solved: Set<string>; markSolved: (id: string) => void };
const SkillCtx = createContext<Ctx | null>(null);

export const useSkillProgress = () => useContext(SkillCtx);

export function SkillProgressProvider({ children }: { children: React.ReactNode }) {
    const [solved, setSolved] = useState<Set<string>>(new Set());
    const markSolved = useCallback((id: string) => setSolved((s) => (s.has(id) ? s : new Set(s).add(id))), []);
    return <SkillCtx.Provider value={{ solved, markSolved }}>{children}</SkillCtx.Provider>;
}

type Props = { courseId: string; skillId: string; exerciseIds: string[]; alreadyDone: boolean };

export function CompleteSkillButton({ courseId, skillId, exerciseIds, alreadyDone }: Props) {
    const ctx = useSkillProgress();
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const remaining = exerciseIds.filter((id) => !ctx?.solved.has(id)).length;
    const back = `/cursos/${courseId}`;

    if (alreadyDone) {
        return (
            <div className="flex items-center justify-between rounded-xl border-2 border-green-700 bg-green-900/30 p-4">
                <span className="font-semibold text-green-300">✓ Skill concluída</span>
                <Link href={back}><Button variant="buttonGre">Voltar ao curso</Button></Link>
            </div>
        );
    }

    const finish = () => startTransition(async () => {
        try {
            await completeSkill(courseId, skillId);
            router.push(back);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Não foi possível salvar.");
        }
    });

    return (
        <div className="flex flex-col gap-2 rounded-xl border-2 border-gray-700 p-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-gray-300" aria-live="polite">
                {remaining > 0 ? `Faltam ${remaining} exercício(s) para concluir.` : "Tudo certo! Conclua para liberar a próxima skill."}
            </span>
            <Button variant="buttonGre" disabled={remaining > 0 || pending} onClick={finish}>
                {pending ? "Salvando…" : "Concluir skill"}
            </Button>
            {error && <p role="alert" className="text-red-400">{error}</p>}
        </div>
    );
}
