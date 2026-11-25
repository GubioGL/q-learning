import { levelKeys, xpByKey } from "@/content/catalog";
import { getCourses } from "@/content/courses";
import type { Locale } from "@/lib/i18n/locales";
import { skillKey } from "@/lib/progress";
import { AchievementList } from "./achievement-list";

export default async function ConquistasPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const courses = getCourses(locale).map((c) => ({ id: c.id, title: c.title, keys: c.skills.map((s) => skillKey(c.id, s.id)) }));
    return <AchievementList courses={courses} levelKeys={levelKeys} xpByKey={xpByKey} />;
}
