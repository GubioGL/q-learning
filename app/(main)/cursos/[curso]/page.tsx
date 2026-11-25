import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Lock } from "lucide-react";
import { findCourse } from "@/content/courses";
import { getDone } from "@/db/progress";
import { pathStates, percentDone, skillKey, type NodeState } from "@/lib/progress";
import { ProgressBar } from "@/components/ui/progress-bar";
import CourseHeader from "../header";

const NODE_STYLE: Record<NodeState, string> = {
    done: "border-green-600 bg-green-900/20 hover:border-green-400",
    open: "border-purple-500 bg-purple-900/30 hover:border-purple-300",
    locked: "border-gray-700 bg-gray-800/40 opacity-60",
};

export default async function CoursePage({ params }: { params: Promise<{ curso: string }> }) {
    const { curso } = await params;
    const course = findCourse(curso);
    if (!course) notFound();

    const done = await getDone();
    const keys = course.skills.map((s) => skillKey(course.id, s.id));
    const states = pathStates(keys, done);

    return (
        <div className="mx-auto max-w-3xl">
            <CourseHeader subtitle={course.title} sectionLabel="Cursos" backHref="/cursos" />
            <p className="mb-4 text-gray-400">{course.summary}</p>
            <ProgressBar value={percentDone(keys, done)} label={`Progresso em ${course.title}`} />

            <ol className="mt-8 space-y-3">
                {course.skills.map((skill, i) => {
                    const state = states[i];
                    const body = (
                        <div className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-colors ${NODE_STYLE[state]}`}>
                            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${state === "done" ? "bg-green-600" : state === "open" ? "bg-purple-600" : "bg-gray-600"}`}>
                                {state === "done" ? <Check aria-hidden /> : state === "locked" ? <Lock size={18} aria-hidden /> : i + 1}
                            </span>
                            <span className="flex-1 text-lg text-gray-100">{skill.title}</span>
                            <span className="text-sm text-gray-400">
                                {state === "done" ? "Concluída" : state === "open" ? "Aprender" : "Bloqueada"}
                            </span>
                        </div>
                    );
                    return (
                        <li key={skill.id}>
                            {state === "locked" ? body : <Link href={`/cursos/${course.id}/${skill.id}`}>{body}</Link>}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
