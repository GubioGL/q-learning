import Image from "next/image";
import Link from "next/link";
import { CourseProgress } from "@/components/course-progress";
import { getCourses } from "@/content/courses";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locales";
import { skillKey } from "@/lib/progress";

export default async function CursosPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const { courses: t } = getDict(locale);
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-100">{t.title}</h1>
                <p className="mt-1 text-gray-400">{t.intro}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
                {getCourses(locale).map((course) => (
                    <Link key={course.id} href={`/${locale}/cursos/${course.id}`}
                        className="group flex flex-col gap-4 rounded-2xl border-2 border-gray-700 bg-gray-800/60 p-5 transition-colors hover:border-purple-500">
                        <div className="flex items-center gap-4">
                            <Image src={course.image} alt="" width={56} height={56} className="rounded-xl" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-100 group-hover:text-purple-300">{course.title}</h2>
                                <span className="text-sm text-purple-300">{t.level[course.level]} · {course.skills.length} skills</span>
                            </div>
                        </div>
                        <p className="flex-1 text-gray-400">{course.summary}</p>
                        <CourseProgress keys={course.skills.map((s) => skillKey(course.id, s.id))} label={t.progressIn(course.title)} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
