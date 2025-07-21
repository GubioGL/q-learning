import React from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";
import UserProgress from "@/components/ui/user-progress";
import { useGoals } from "@/lib/contexts/GoalsContext";

/**
 * Cabeçalho principal da área autenticada.
 * Exibe menu lateral, status do usuário e indicadores de gamificação.
 */
export const MainHeader = () => {
    const { userGoals } = useGoals();

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
                {/* Indicadores de gamificação */}
                {/* Agora os dados vêm do contexto de metas do usuário */}


                <UserProgress 
                    dayStreak={userGoals.streak}
                    Qtokens={userGoals.tokens }
                    energy={userGoals.energy }
                />
            </div>
        </div>
    )
} 