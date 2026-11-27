"use client";

import Image from "next/image"
import Link from "next/link";
import { useLocale, useT } from "@/lib/i18n/context";
import { LocaleSwitch } from "@/components/ui/locale-switch";
import { asset } from "@/lib/asset";

/**
 * Cabeçalho da área de marketing, com logo e idioma.
 */
export const Header = () => {
    const locale = useLocale();
    const { news } = useT();
    return (
        <header className="px-4 h-20 w-full border-b-2 border-gray-700">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <Link href={`/${locale}`} className="flex items-center gap-3">
                    <Image src={asset("/Logoket.png")} alt="" width={40} height={40} />
                    <span className="text-lg sm:text-2xl font-extrabold text-purple-300 tracking-wide">Quantum Learning</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Link href={`/${locale}/novidades`} className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-gray-300 hover:text-purple-300 sm:block">{news.link}</Link>
                    <div className="rounded-lg bg-gray-900"><LocaleSwitch /></div>
                </div>
            </div>
        </header>
    )
}
