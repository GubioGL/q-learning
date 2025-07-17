import React from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";

/**
 * Cabeçalho principal da área autenticada.
 * Exibe menu lateral, status do usuário e indicadores de gamificação.
 */
export const MainHeader = () => {
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
                <div className="status-icon" style={{color: '#cccccc'}} aria-label="Streak atual">
                    <span>0</span>
                    <div role="img" aria-label="Fogo">🔥</div>
                </div>
                <div className="status-icon" style={{color: '#ffc107'}} aria-label="Diamantes">
                    <span>17</span>
                    <div role="img" aria-label="Diamante">💎</div>
                </div>
                <div className="status-icon" style={{color: '#9c27b0'}} aria-label="Energia">
                    <span>5</span>
                    <div role="img" aria-label="Raio">⚡</div>
                </div>
            </div>
        </div>
    )
} 