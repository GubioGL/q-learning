import Link from "next/link";
import { Check, Lock, Star } from "lucide-react";
import { courses } from "@/content/courses";
import { levels } from "@/content/levels";
import { getDone } from "@/db/progress";
import { levelKey, pathStates, type NodeState } from "@/lib/progress";

// Horizontal offsets (px) that make the trail zig-zag like a path.
const ZIGZAG = [0, 48, 72, 48, 0, -48, -72, -48];

const NODE_STYLE: Record<NodeState, string> = {
    done: "bg-green-500 border-green-700 text-white",
    open: "bg-purple-500 border-purple-800 text-white ring-4 ring-purple-400/40 animate-pulse",
    locked: "bg-gray-700 border-gray-800 text-gray-400",
};

export default async function DesafiosPage() {
    const states = pathStates(levels.map((l) => levelKey(l.id)), await getDone());
    const sections = courses
        .map((course) => ({ course, items: levels.map((level, i) => ({ level, i })).filter(({ level }) => level.course === course.id) }))
        .filter((s) => s.items.length > 0);

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-100">Desafios</h1>
            <p className="mt-1 text-gray-400">
                Uma trilha única, do básico ao avançado. Acerte um nível para liberar o próximo.
                Se travar, a recomendação é estudar a skill correspondente nos Cursos.
            </p>

            <nav aria-label="Ir para o curso" className="mt-4 flex flex-wrap gap-2">
                {sections.map(({ course }) => (
                    <a key={course.id} href={`#${course.id}`}
                        className="rounded-full border-2 border-gray-600 px-3 py-1 text-sm text-gray-300 hover:border-purple-400">
                        {course.title}
                    </a>
                ))}
            </nav>

            {sections.map(({ course, items }) => (
                <section key={course.id} id={course.id} className="mt-10">
                    <h2 className="rounded-xl bg-purple-700 px-4 py-3 text-lg font-bold text-white">{course.title}</h2>
                    <ol className="mt-8 flex flex-col items-center gap-6">
                        {items.map(({ level, i }) => {
                            const state = states[i];
                            const node = (
                                <span className={`flex h-20 w-20 items-center justify-center rounded-full border-b-8 ${NODE_STYLE[state]}`}>
                                    {state === "done" ? <Check size={36} aria-hidden /> : state === "locked" ? <Lock size={30} aria-hidden /> : <Star size={36} aria-hidden />}
                                </span>
                            );
                            const label = `${level.title} (${state === "done" ? "concluído" : state === "open" ? "disponível" : "bloqueado"})`;
                            return (
                                <li key={level.id} style={{ transform: `translateX(${ZIGZAG[i % ZIGZAG.length]}px)` }}
                                    className="flex flex-col items-center gap-2">
                                    {state === "locked"
                                        ? <span aria-label={label}>{node}</span>
                                        : <Link href={`/desafios/${level.id}`} aria-label={label}>{node}</Link>}
                                    <span className="text-sm font-semibold text-gray-300">{level.title}</span>
                                </li>
                            );
                        })}
                    </ol>
                </section>
            ))}
        </div>
    );
}
