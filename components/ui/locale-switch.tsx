"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useT } from "@/lib/i18n/context";
import { HTML_LANG, LOCALES, LOCALE_NAMES } from "@/lib/i18n/locales";

// Links to the same page in the other languages.
export function LocaleSwitch() {
    const pathname = usePathname();
    const current = useLocale();
    const t = useT();
    const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
    return (
        <nav aria-label={t.language} className="flex items-center gap-1 text-sm">
            <Globe size={18} aria-hidden className="hidden text-gray-400 sm:block" />
            {LOCALES.map((locale) => (
                <Link key={locale} href={`/${locale}${rest}`} lang={HTML_LANG[locale]} hrefLang={HTML_LANG[locale]}
                    title={LOCALE_NAMES[locale]} aria-label={LOCALE_NAMES[locale]}
                    aria-current={locale === current ? "true" : undefined}
                    className="rounded-md px-2 py-2 sm:px-3 font-bold uppercase text-gray-400 hover:text-white aria-[current]:bg-purple-700 aria-[current]:text-white">
                    {locale}
                </Link>
            ))}
        </nav>
    );
}
