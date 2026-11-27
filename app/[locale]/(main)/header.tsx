"use client";

import { Menu } from "lucide-react";
import { LocaleSwitch } from "@/components/ui/locale-switch";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/ui/sidebar";
import UserProgress from "@/components/ui/user-progress";
import { useT } from "@/lib/i18n/context";
import { siteStats } from "@/lib/site-stats";
import { useProgress } from "@/lib/use-progress";

/**
 * Cabeçalho das telas sem barras laterais: menu e indicadores de gamificação.
 */
export const MainHeader = ({ xpByKey }: { xpByKey: Record<string, number> }) => {
    const { progress } = useProgress();
    const { nav } = useT();
    const stats = siteStats(progress, xpByKey, new Date());
    return (
        <header className="status-header">
            <div className="status-container">
                {/* Menu Hambúrguer com Sidebar */}
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="menu-icon" aria-label={nav.openMenu} type="button">
                            <Menu size={24} />
                        </button>
                    </SheetTrigger>
                    <Sidebar />
                </Sheet>
                <UserProgress dayStreak={stats.streak} xp={stats.xp} />
                <LocaleSwitch />
            </div>
        </header>
    )
}
