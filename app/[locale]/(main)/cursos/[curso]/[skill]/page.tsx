import "katex/dist/katex.min.css";
import { notFound } from "next/navigation";
import { courses, findCourse } from "@/content/courses";
import { exerciseIds } from "@/lib/exercise";
import { getDict } from "@/lib/i18n";
import { HTML_LANG, type Locale } from "@/lib/i18n/locales";
import { skillKey } from "@/lib/progress";
import { readSkill } from "@/lib/skill-content";
import { SkillMarkdown } from "@/components/skill/skill-markdown";
import { CompleteSkillButton, SkillProgressProvider } from "@/components/skill/skill-progress";
import { UnlockGate } from "@/components/unlock-gate";
import CourseHeader from "../../header";

export const generateStaticParams = () => courses.flatMap((c) => c.skills.map((s) => ({ curso: c.id, skill: s.id })));

export default async function SkillPage({ params }: { params: Promise<{ locale: Locale; curso: string; skill: string }> }) {
    const { locale, curso, skill: skillId } = await params;
    const course = findCourse(curso, locale);
    const skill = course?.skills.find((s) => s.id === skillId);
    if (!course || !skill) notFound();

    const { skill: t } = getDict(locale);
    const content = await readSkill(course.id, skill.id, locale);
    const courseHref = `/${locale}/cursos/${course.id}`;

    return (
        <article className="mx-auto max-w-3xl pb-16">
            <CourseHeader subtitle={skill.title} sectionLabel={course.title} backHref={courseHref} />
            <UnlockGate keys={course.skills.map((s) => skillKey(course.id, s.id))} itemKey={skillKey(course.id, skill.id)}
                text={t.lockedText} backHref={courseHref} backLabel={t.backToCourse}>
                {content === null ? (
                    <p className="mt-8 rounded-xl border-2 border-gray-700 p-6 text-lg text-gray-300">{t.unwritten}</p>
                ) : (
                    <SkillProgressProvider>
                        {content.lang !== locale && <p className="rounded-xl border-2 border-yellow-700 p-4 text-yellow-200">{t.untranslated}</p>}
                        <div lang={HTML_LANG[content.lang]}>
                            <SkillMarkdown markdown={content.markdown} />
                        </div>
                        <div className="mt-10">
                            <CompleteSkillButton courseId={course.id} skillId={skill.id} exerciseIds={exerciseIds(content.markdown)} />
                        </div>
                    </SkillProgressProvider>
                )}
            </UnlockGate>
        </article>
    );
}
