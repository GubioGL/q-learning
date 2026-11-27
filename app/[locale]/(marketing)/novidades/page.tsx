import Link from "next/link";
import { Button } from "@/components/ui/button";
import { updates } from "@/content/novidades";
import { getDict } from "@/lib/i18n";
import { HTML_LANG, type Locale } from "@/lib/i18n/locales";
import { LINKEDIN_URL } from "@/lib/links";
import { HeroVisual } from "../hero-visual";

// "What's new": the hero animation on top and a timeline of updates (content/novidades.ts).
export default async function News({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const { news: t } = getDict(locale);
    const date = new Intl.DateTimeFormat(HTML_LANG[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

    return (
        <div className="w-full px-4 pb-16">
            <section className="relative mx-auto grid max-w-5xl items-center gap-8 pt-10 md:grid-cols-2">
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.25),transparent_60%)]" />
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-extrabold text-gray-50 sm:text-5xl">{t.title}</h1>
                    <p className="mt-4 text-lg text-gray-300">{t.intro}</p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                        <Button asChild variant="buttonRox" size="lg"><Link href={`/${locale}/cursos`}>{t.start}</Link></Button>
                        <Button asChild variant="buttonBlu" size="lg"><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a></Button>
                    </div>
                </div>
                <div className="w-full max-w-xs justify-self-center md:max-w-sm"><HeroVisual /></div>
            </section>

            <ol className="relative mx-auto mt-14 max-w-3xl space-y-6 border-l-4 border-purple-900 pl-6">
                {updates.map((u) => (
                    <li key={u.texts.pt.title} className="relative">
                        <span aria-hidden className="absolute -left-[2.15rem] top-2 h-5 w-5 rounded-full border-4 border-gray-900 bg-purple-500" />
                        <article className="rounded-2xl border-2 border-gray-700 bg-gray-900 p-5">
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <time dateTime={u.date} className="text-gray-400">{date.format(new Date(u.date))}</time>
                                <span className={`rounded-full border-2 px-2 py-0.5 text-xs font-semibold ${u.tag === "novo" ? "border-green-600 text-green-300" : "border-sky-600 text-sky-300"}`}>
                                    {t.tags[u.tag]}
                                </span>
                            </div>
                            <h2 className="mt-2 text-xl font-bold text-gray-100">{u.texts[locale].title}</h2>
                            <p className="mt-1 text-gray-300">{u.texts[locale].text}</p>
                        </article>
                    </li>
                ))}
            </ol>
        </div>
    );
}
