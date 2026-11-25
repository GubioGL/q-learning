import Image from "next/image"
import { LocaleSwitch } from "@/components/ui/locale-switch";

/**
 * Cabeçalho da área de marketing, com logo e idioma.
 */
export const Header = () => {
    return (
        <header className="px-4 h-20 w-full border-b-2 border-slate-200">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="flex items-center gap-3">
                    <Image src="/Logoket.png" alt="" width={40} height={40} />
                    <span className="text-lg sm:text-2xl font-extrabold text-purple-700 tracking-wide">Quantum Learning</span>
                </div>
                <div className="rounded-lg bg-gray-900"><LocaleSwitch /></div>
            </div>
        </header>
    )
}
