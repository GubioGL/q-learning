import Image from "next/image";
import Link from "next/link";
import { courses } from "@/content/courses";
import { getDone } from "@/db/progress";
import { percentDone, skillKey } from "@/lib/progress";
import { ProgressBar } from "@/components/ui/progress-bar";

export default async function CursosPage() {
    const done = await getDone();
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-100">Cursos</h1>
                <p className="mt-1 text-gray-400">Escolha um curso e siga a trilha de skills: texto, ilustrações e exercícios.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
                {courses.map((course) => {
                    const pct = percentDone(course.skills.map((s) => skillKey(course.id, s.id)), done);
                    return (
                        <Link key={course.id} href={`/cursos/${course.id}`}
                            className="group flex flex-col gap-4 rounded-2xl border-2 border-gray-700 bg-gray-800/60 p-5 transition-colors hover:border-purple-500">
                            <div className="flex items-center gap-4">
                                <Image src={course.image} alt="" width={56} height={56} className="rounded-xl" />
                                <div>
                                    <h2 className="text-xl font-bold text-gray-100 group-hover:text-purple-300">{course.title}</h2>
                                    <span className="text-sm text-purple-300">{course.level} · {course.skills.length} skills</span>
                                </div>
                            </div>
                            <p className="flex-1 text-gray-400">{course.summary}</p>
                            <ProgressBar value={pct} label={`Progresso em ${course.title}`} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
