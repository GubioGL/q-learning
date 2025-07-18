"use client";

import { Footer } from "@/app/(marketing)/footer";
import { MainHeader } from "@/app/(main)/header";
import React, { useState, useEffect } from "react";
import { SidebarContent } from "@/components/ui/SidebarContent";
import UserProgress from "@/components/ui/user-progress";
import UserGoals from "@/components/ui/user-goals";
import { GoalsProvider, useGoals } from "@/lib/contexts/GoalsContext";

interface MainLayoutProps {
    children: React.ReactNode;
}

/**
 * Layout principal da área autenticada, com sidebar, header e footer.
 */
const MainLayoutContent = ({ children }: MainLayoutProps) => {
    const [showHeader, setShowHeader] = useState(false);
    const { userGoals } = useGoals();

    useEffect(() => {
        const checkScreenSize = () => {
            setShowHeader(window.innerWidth < 600);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <div className="flex h-screen">
            {/* Sidebar Esquerda */}
            <aside className="sidebar-esquerda">
                <SidebarContent />
            </aside>

            {/* Conteúdo Central com rolagem */}
            <main className="flex-1 ml-[0px] lg:ml-[260px] mr-[0px] lg:mr-[300px] h-screen overflow-y-auto text-[#6a7282] bg-[#1a1a1a] flex flex-col oculta-scrollbar">
                {/* Conteúdo principal que rola */}
                <div className="flex-1 p-8">
                    {showHeader && <MainHeader />}
                    {children}
                </div>
                
                {/* Footer fixo no final */}
                <div className="mt-auto">
                    <Footer />
                </div>
            </main>

            {/* Sidebar Direita */}
            <aside className="sidebar-direita">
                <UserProgress 
                dayStreak={1}
                Qtokens={20}
                energy={3}
                />

                <UserGoals 
                    dailyActivities={userGoals.dailyActivities}
                    dailyXP={userGoals.dailyXP}
                    dailyXPTarget={userGoals.dailyXPTarget}
                    dailyLessons={userGoals.dailyLessons}
                    dailyLessonsTarget={userGoals.dailyLessonsTarget}
                    weeklyXP={userGoals.weeklyXP}
                    weeklyXPTarget={userGoals.weeklyXPTarget}
                    weeklyLessons={userGoals.weeklyLessons}
                    weeklyLessonsTarget={userGoals.weeklyLessonsTarget}
                    showGeneralProgress={true}
                    completedActivities={userGoals.completedActivities}
                    totalActivities={userGoals.totalActivities}
                />
            </aside>
        </div>
    );
};

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <GoalsProvider>
            <MainLayoutContent>{children}</MainLayoutContent>
        </GoalsProvider>
    );
};

export default MainLayout;

