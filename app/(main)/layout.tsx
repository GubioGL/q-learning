"use client";

import { Footer } from "@/app/(marketing)/footer";
import { MainHeader } from "@/app/(main)/header";
import React, { useState, useEffect } from "react";
import { SidebarContent } from "@/components/ui/SidebarContent";

interface MainLayoutProps {
    children: React.ReactNode;
}

/**
 * Layout principal da área autenticada, com sidebar, header e footer.
 */
const MainLayout = ({ children }: MainLayoutProps) => {
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setShowHeader(window.innerWidth < 600);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>
        <div className="main-layout">
            {/* Coluna da Esquerda - Configurações (apenas em desktop) */}
            <aside className="sidebar-left hidden md:block" style={{ width: "280px" }}>
                <SidebarContent />
            </aside>

            {/* Coluna Central - Conteúdo Principal */}
            <main className="main-content w-full max-w-4xl mx-auto">
                {showHeader && <MainHeader />}
                {children}
            </main>

            {/* Coluna da Direita - Progresso do Usuário */}
            <aside className="sidebar-right hidden lg:block">
                <h2>Progresso</h2>
                <div style={{ margin: '24px 0' }}>
                </div>
            </aside>
        </div>
        <Footer />
        </>
    );
};

export default MainLayout;