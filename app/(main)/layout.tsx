"use client";

import { Footer } from "@/app/(marketing)/footer";
import { MainHeader } from "@/app/(main)/header";
import React, { useState, useEffect } from "react";

type Props = {
    children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
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
            <aside className="sidebar-left">
                <h2>Configurações</h2>
            </aside>

            {/* Coluna Central - Conteúdo Principal */}
            <main className="main-content">
                {showHeader && <MainHeader />}
                {children}
            </main>

            {/* Coluna da Direita - Progresso do Usuário */}
            <aside className="sidebar-right">
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