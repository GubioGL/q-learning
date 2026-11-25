import { notFound } from "next/navigation";
import { UnlockGate } from "@/components/unlock-gate";
import { levelKeys } from "@/content/catalog";
import { findCourse } from "@/content/courses";
import { findLevel, levels } from "@/content/levels";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locales";
import { levelKey } from "@/lib/progress";
import LessonClient from "./lesson-client";

export const generateStaticParams = () => levels.map((l) => ({ id: l.id }));

export default async function LevelPage({ params }: { params: Promise<{ locale: Locale; id: string }> }) {
    const { locale, id } = await params;
    const level = findLevel(id, locale);
    if (!level) notFound();

    const { challenges: t } = getDict(locale);
    const skill = findCourse(level.course, locale)?.skills.find((s) => s.id === level.skill);
    return (
        <UnlockGate keys={levelKeys} itemKey={levelKey(level.id)} text={t.lockedText} backHref={`/${locale}/desafios`} backLabel={t.back}>
            <LessonClient
                lesson={level}
                recommendHref={`/${locale}/cursos/${level.course}/${level.skill}`}
                recommendTitle={skill?.title ?? level.title}
            />
        </UnlockGate>
    );
}
