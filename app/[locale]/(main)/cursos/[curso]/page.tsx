import { notFound } from "next/navigation";
import { CourseProgress } from "@/components/course-progress";
import { courses, findCourse } from "@/content/courses";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locales";
import { skillKey } from "@/lib/progress";
import CourseHeader from "../header";
import { SkillList } from "./skill-list";

export const generateStaticParams = () => courses.map((c) => ({ curso: c.id }));

export default async function CoursePage({ params }: { params: Promise<{ locale: Locale; curso: string }> }) {
    const { locale, curso } = await params;
    const course = findCourse(curso, locale);
    if (!course) notFound();

    const { courses: t } = getDict(locale);
    return (
        <div className="mx-auto max-w-3xl">
            <CourseHeader subtitle={course.title} sectionLabel={t.title} backHref={`/${locale}/cursos`} />
            <p className="mb-4 text-gray-400">{course.summary}</p>
            <CourseProgress keys={course.skills.map((s) => skillKey(course.id, s.id))} label={t.progressIn(course.title)} />
            <SkillList courseId={course.id} skills={course.skills} />
        </div>
    );
}
