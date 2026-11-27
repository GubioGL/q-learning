import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExerciseBlock } from "@/components/skill/exercise";
import { courses, getCourses } from "@/content/courses";
import { levels } from "@/content/levels";
import { exerciseIds } from "@/lib/exercise";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locales";
import { readSkill } from "@/lib/skill-content";
import { asset } from "@/lib/asset";
import { HeroVisual } from "./hero-visual";

// Counted at build time from the content, so the numbers never go stale.
async function countExercises() {
    const all = await Promise.all(courses.flatMap((c) => c.skills.map((s) => readSkill(c.id, s.id, "pt"))));
    return all.reduce((n, skill) => n + (skill ? exerciseIds(skill.markdown).length : 0), 0);
}

const DEMO = { kind: "number", id: "home-demo", answer: 0.64, tolerance: 0.001 } as const;
const STEP_ICONS = ["📖", "✏️", "🏆"];
const LEVEL_STYLE = {
    beginner: "border-green-600 text-green-300",
    intermediate: "border-sky-600 text-sky-300",
    advanced: "border-purple-500 text-purple-300",
} as const;

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const { home: t, courses: ct, news } = getDict(locale);
    const localized = getCourses(locale);
    const stats = [
        { value: courses.length, label: t.stats.courses },
        { value: courses.reduce((n, c) => n + c.skills.length, 0), label: t.stats.skills },
        { value: await countExercises(), label: t.stats.exercises },
        { value: levels.length, label: t.stats.levels },
    ];

    return (
        <div className="w-full overflow-x-hidden">
            {/* Hero */}
            <section className="relative px-4 pt-10 pb-16 sm:pt-16">
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.28),transparent_60%)]" />
                <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
                    <div className="text-center md:text-left">
                        <p className="inline-block rounded-full border-2 border-purple-700 bg-purple-950/40 px-4 py-1 text-sm font-semibold text-purple-200">
                            {t.badge}
                        </p>
                        <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-50 sm:text-5xl">
                            {t.title}{" "}
                            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-sky-300 bg-clip-text text-transparent">{t.titleAccent}</span>
                        </h1>
                        <p className="mt-5 text-lg text-gray-300">{t.intro}</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                            <Button asChild variant="buttonRox" size="lg"><Link href={`/${locale}/cursos`}>{t.start}</Link></Button>
                            <Button asChild variant="buttonGre" size="lg"><Link href={`/${locale}/desafios`}>{t.challenges}</Link></Button>
                        </div>
                        <Link href={`/${locale}/novidades`} className="mt-4 inline-block font-semibold text-purple-300 underline">✨ {news.link} →</Link>
                    </div>
                    <HeroVisual />
                </div>

                <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
                    {stats.map((s) => (
                        <div key={s.label} className="rounded-2xl border-2 border-gray-700 bg-gray-900/60 p-4 text-center">
                            <dt className="sr-only">{s.label}</dt>
                            <dd>
                                <span className="block text-3xl font-extrabold text-purple-300">{s.value}</span>
                                <span className="text-sm text-gray-400">{s.label}</span>
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* How it works */}
            <section aria-labelledby="como" className="border-y-2 border-gray-800 bg-gray-950/60 px-4 py-14">
                <h2 id="como" className="text-center text-3xl font-extrabold text-gray-50">{t.howTitle}</h2>
                <ol className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
                    {t.steps.map((step, i) => (
                        <li key={step.title} className="relative rounded-2xl border-2 border-gray-700 bg-gray-900 p-6 transition-transform motion-safe:hover:-translate-y-1">
                            <span aria-hidden className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">{i + 1}</span>
                            <p aria-hidden className="text-4xl">{STEP_ICONS[i]}</p>
                            <h3 className="mt-3 text-xl font-bold text-gray-100">{step.title}</h3>
                            <p className="mt-2 text-gray-400">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Try a mini-challenge right here */}
            <section aria-labelledby="experimente" className="px-4 py-14">
                <div className="mx-auto max-w-2xl">
                    <h2 id="experimente" className="text-center text-3xl font-extrabold text-gray-50">{t.tryTitle}</h2>
                    <p className="mt-6 text-center text-lg text-gray-300">{t.tryQuestion}</p>
                    <p className="mt-1 text-center text-sm text-gray-400">{t.tryHint}</p>
                    <ExerciseBlock exercise={DEMO} />
                </div>
            </section>

            {/* The trail of courses */}
            <section aria-labelledby="trilha" className="border-t-2 border-gray-800 bg-gray-950/60 px-4 py-14">
                <h2 id="trilha" className="text-center text-3xl font-extrabold text-gray-50">{t.pathTitle}</h2>
                <p className="mx-auto mt-3 max-w-xl text-center text-gray-400">{t.pathIntro}</p>
                <ol className="relative mx-auto mt-10 max-w-3xl space-y-4 before:absolute before:left-7 before:top-4 before:bottom-4 before:w-1 before:rounded before:bg-purple-900">
                    {localized.map((c, i) => (
                        <li key={c.id} className="relative">
                            <Link href={`/${locale}/cursos/${c.id}`}
                                className="group flex items-center gap-4 rounded-2xl border-2 border-gray-700 bg-gray-900 p-3 pr-4 transition-colors hover:border-purple-500 focus-visible:border-purple-400">
                                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-gray-900 bg-purple-600 font-extrabold text-white">{i + 1}</span>
                                <Image src={asset(c.image)} alt="" width={48} height={48} className="hidden h-12 w-12 shrink-0 object-contain sm:block" />
                                <span className="min-w-0 flex-1">
                                    <span className="block font-bold text-gray-100 group-hover:text-purple-300">{c.title}</span>
                                    <span className="block text-sm text-gray-400">{t.skillCount(c.skills.length)}</span>
                                </span>
                                <span className={`shrink-0 rounded-full border-2 px-2 py-0.5 text-xs font-semibold ${LEVEL_STYLE[c.level]}`}>{ct.level[c.level]}</span>
                            </Link>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Final call */}
            <section className="px-4 py-16 text-center">
                <Image src={asset("/cat-400.png")} alt="" width={120} height={120} className="mx-auto motion-safe:animate-bounce" />
                <h2 className="mt-4 text-3xl font-extrabold text-gray-50">{t.finalTitle}</h2>
                <div className="mt-6"><Button asChild variant="buttonRox" size="lg"><Link href={`/${locale}/cursos`}>{t.start}</Link></Button></div>
                <p className="mx-auto mt-10 max-w-xl text-gray-400">{t.quote}</p>
            </section>
        </div>
    );
}
