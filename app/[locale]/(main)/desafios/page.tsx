import { getCourses } from "@/content/courses";
import { getLevels } from "@/content/levels";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locales";
import { LevelTrail } from "./level-trail";

export default async function DesafiosPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const { challenges: t } = getDict(locale);
    // Only what the trail shows goes to the browser, not the questions.
    const levels = getLevels(locale).map(({ id, title, course }) => ({ id, title, course }));
    const courses = getCourses(locale).map(({ id, title }) => ({ id, title }));

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-100">{t.title}</h1>
            <p className="mt-1 text-gray-400">{t.intro}</p>
            <LevelTrail courses={courses} levels={levels} />
        </div>
    );
}
