"use client";

import { Footer } from "@/app/(marketing)/footer";
import { MainHeader } from "@/app/(main)/header";
import React, { useState, useEffect } from "react";
import { SidebarContent } from "@/components/ui/SidebarContent";
import UserProgress from "@/components/ui/user-progress";
import UserGoals from "@/components/ui/user-goals";
import { GoalsProvider, useGoals } from "@/lib/contexts/GoalsContext";
import { CourseProvider } from "@/lib/contexts/CourseContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

const BREAKPOINT_MOBILE = 600;

const MainLayoutContent = ({ children }: MainLayoutProps) => {
  const [showHeader, setShowHeader] = useState(false);
  const { userGoals } = useGoals();

  useEffect(() => {
    const checkScreenSize = () => {
      setShowHeader(window.innerWidth < BREAKPOINT_MOBILE);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Debug: log das metas quando mudarem
  useEffect(() => {
    console.log('Metas atualizadas no layout:', userGoals);
  }, [userGoals]);

  return (
    <div className="flex h-screen">
      <aside className="sidebar-esquerda">
        <SidebarContent />
      </aside>

      <main className="flex-1 ml-[0px] lg:ml-[260px] mr-[0px] lg:mr-[300px] h-screen overflow-y-auto text-[#6a7282] bg-[#1a1a1a] flex flex-col oculta-scrollbar">
        <div className="flex-1 p-8">
          {showHeader && <MainHeader />}
          {children}
        </div>
        
        <div className="mt-auto">
          <Footer />
        </div>
      </main>

      <aside className="sidebar-direita">
        <UserProgress 
          dayStreak={userGoals.streak}
          Qtokens={userGoals.tokens}
          energy={userGoals.energy }
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

const MainLayout = ({ children }: MainLayoutProps) => (
  <GoalsProvider>
    <CourseProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </CourseProvider>
  </GoalsProvider>
);

export default MainLayout;

