"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { completeLevel } from "@/app/actions/progress";
import {
    check, initialState, isFinished, isOutOfHearts, next, progress, select, type Lesson,
} from "@/lib/lesson";

const EXIT_HREF = "/desafios";

type Props = { lesson: Lesson; recommendHref: string; recommendTitle: string };

export default function LessonClient({ lesson, recommendHref, recommendTitle }: Props) {
    const [state, setState] = useState(initialState);
    const [started, setStarted] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [earnedXp, setEarnedXp] = useState(false);
    const finished = isFinished(state, lesson);

    useEffect(() => {
        if (!finished) return;
        completeLevel(lesson.id)
            .then((isNew) => setEarnedXp((earned) => earned || isNew)) // the effect runs twice in dev
            .catch((e) => setSaveError(e instanceof Error ? e.message : "Não foi possível salvar."));
    }, [finished, lesson.id]);

    if (isOutOfHearts(state) && state.status === "idle") {
        return (
            <EndScreen title="Sem corações!" text={`Recomendamos revisar a skill "${recommendTitle}" no curso antes de tentar de novo.`}>
                <Link href={recommendHref}><Button variant="buttonRox" size="lg">Estudar a skill</Button></Link>
                <Button variant="buttonBluO" size="lg" onClick={() => { setState(initialState()); setStarted(false); }}>
                    Tentar de novo
                </Button>
            </EndScreen>
        );
    }

    if (finished) {
        return (
            <EndScreen
                title="Lição concluída! 🎉"
                text={`Você acertou ${state.correct} de ${lesson.challenges.length}.`}
            >
                <p aria-live="polite" className="h-7 text-lg font-bold text-yellow-400">{earnedXp && `+${lesson.xp} XP`}</p>
                <Link href={EXIT_HREF}><Button variant="buttonGre" size="lg">Continuar</Button></Link>
                {saveError && <p role="alert" className="text-red-400">{saveError}</p>}
            </EndScreen>
        );
    }

    const challenge = lesson.challenges[state.index];

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-gray-100 flex flex-col">
            <header className="mx-auto w-full max-w-3xl flex items-center gap-4 px-4 pt-6">
                <Link href={EXIT_HREF} aria-label="Sair da lição" className="text-gray-400 hover:text-white">
                    <X />
                </Link>
                <div
                    className="h-4 flex-1 rounded-full bg-gray-700"
                    role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress(state, lesson)}
                >
                    <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${progress(state, lesson)}%` }} />
                </div>
                <span className="flex items-center gap-1 font-bold text-red-400" aria-label={`${state.hearts} corações`}>
                    <Heart className="fill-red-500 text-red-500" /> {state.hearts}
                </span>
            </header>

            <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
                {!started ? (
                    <section className="space-y-6">
                        <h1 className="text-3xl font-bold">{lesson.title}</h1>
                        <p className="text-lg leading-relaxed text-gray-300">{lesson.intro}</p>
                        <p className="text-sm text-gray-500">{lesson.source}</p>
                    </section>
                ) : (
                    <section className="space-y-6">
                        <h1 className="text-2xl font-bold">{challenge.question}</h1>
                        <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
                            {challenge.options.map((option, i) => (
                                <button
                                    key={option}
                                    role="radio"
                                    aria-checked={state.selected === i}
                                    disabled={state.status !== "idle"}
                                    onClick={() => setState((s) => select(s, i))}
                                    className={optionClass(state.selected === i, state.status, i === challenge.answer)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <footer className={`border-t-2 ${footerClass(state.status)}`}>
                <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-6">
                    <p className="text-base" aria-live="polite">
                        {state.status === "correct" && <><b>Correto!</b> {challenge.explanation}</>}
                        {state.status === "wrong" && <><b>Não foi dessa vez.</b> {challenge.explanation}</>}
                    </p>
                    {!started ? (
                        <Button variant="buttonGre" size="lg" onClick={() => setStarted(true)}>Começar</Button>
                    ) : state.status === "idle" ? (
                        <Button variant="buttonGre" size="lg" disabled={state.selected === null}
                            onClick={() => setState((s) => check(s, lesson))}>
                            Verificar
                        </Button>
                    ) : (
                        <Button variant={state.status === "correct" ? "buttonGre" : "danger"} size="lg"
                            onClick={() => setState(next)}>
                            Continuar
                        </Button>
                    )}
                </div>
            </footer>
        </div>
    );
}

function optionClass(selected: boolean, status: string, isAnswer: boolean) {
    const base = "rounded-xl border-2 border-b-4 px-4 py-4 text-left text-lg font-semibold transition-colors";
    if (status !== "idle" && isAnswer) return `${base} border-green-400 bg-green-600 text-white`;
    if (status === "wrong" && selected) return `${base} border-red-400 bg-red-600 text-white line-through`;
    if (selected) return `${base} border-sky-400 bg-sky-500/15 text-sky-300`;
    return `${base} border-gray-600 hover:bg-gray-800`;
}

function footerClass(status: string) {
    if (status === "correct") return "border-green-700 bg-green-900/40 text-green-200";
    if (status === "wrong") return "border-red-700 bg-red-900/40 text-red-200";
    return "border-gray-700";
}

function EndScreen({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-gray-100 flex flex-col items-center justify-center gap-6 px-4 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg text-gray-300">{text}</p>
            {children}
        </div>
    );
}
