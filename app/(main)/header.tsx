"use client";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";
import UserProgress from "@/components/ui/user-progress";

/**
 * Cabeçalho principal da área autenticada.
 * Exibe menu lateral, status do usuário e indicadores de gamificação.
 */
export const MainHeader = ({ dayStreak, xp }: { dayStreak: number; xp: number }) => {
    return (
        <div className="status-header">
            <div className="status-container">
                {/* Menu Hambúrguer com Sidebar */}
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="menu-icon" aria-label="Abrir menu de navegação" type="button">
                            <Menu size={24} color="#ffffff" />
                        </button>
                    </SheetTrigger>
                    <Sidebar />
                </Sheet>
                <UserProgress dayStreak={dayStreak} xp={xp} />
            </div>
        </div>
    )
} 