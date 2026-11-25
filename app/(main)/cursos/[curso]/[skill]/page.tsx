import "katex/dist/katex.min.css";
import { notFound, redirect } from "next/navigation";
import { findCourse } from "@/content/courses";
import { getDone } from "@/db/progress";
import { exerciseIds } from "@/lib/exercise";
import { pathStates, skillKey } from "@/lib/progress";
import { readSkill } from "@/lib/skill-content";
import { SkillMarkdown } from "@/components/skill/skill-markdown";
import { CompleteSkillButton, SkillProgressProvider } from "@/components/skill/skill-progress";
import CourseHeader from "../../header";

export default async function SkillPage({ params }: { params: Promise<{ curso: string; skill: string }> }) {
    const { curso, skill: skillId } = await params;
    const course = findCourse(curso);
    const index = course?.skills.findIndex((s) => s.id === skillId) ?? -1;
    if (!course || index < 0) notFound();

    const done = await getDone();
    const state = pathStates(course.skills.map((s) => skillKey(course.id, s.id)), done)[index];
    if (state === "locked") redirect(`/cursos/${course.id}`);

    const skill = course.skills[index];
    const markdown = await readSkill(course.id, skill.id);

    return (
        <article className="mx-auto max-w-3xl pb-16">
            <CourseHeader subtitle={skill.title} sectionLabel={course.title} backHref={`/cursos/${course.id}`} />
            {markdown === null ? (
                <p className="mt-8 rounded-xl border-2 border-gray-700 p-6 text-lg text-gray-300">
                    Esta skill ainda está sendo escrita. Volte em breve!
                </p>
            ) : (
                <SkillProgressProvider>
                    <SkillMarkdown markdown={markdown} />
                    <div className="mt-10">
                        <CompleteSkillButton courseId={course.id} skillId={skill.id}
                            exerciseIds={exerciseIds(markdown)} alreadyDone={state === "done"} />
                    </div>
                </SkillProgressProvider>
            )}
        </article>
    );
}
