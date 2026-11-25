import { Footer } from "@/app/(marketing)/footer";
import { MainHeader } from "@/app/(main)/header";
import { SidebarContent } from "@/components/ui/SidebarContent";
import UserProgress from "@/components/ui/user-progress";
import UserGoals from "@/components/ui/user-goals";
import { getDailyGoal, getStats } from "@/db/progress";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const [stats, dailyGoal] = await Promise.all([getStats(), getDailyGoal()]);

  return (
    <div className="flex h-screen">
      <aside className="sidebar-esquerda">
        <SidebarContent />
      </aside>

      <main className="flex-1 ml-[0px] lg:ml-[260px] mr-[0px] lg:mr-[300px] h-screen overflow-y-auto text-[#6a7282] bg-[#1a1a1a] flex flex-col oculta-scrollbar">
        <div className="flex-1 p-8">
          {/* The sidebars only show from lg up, so the header covers every smaller screen. */}
          <div className="lg:hidden">
            <MainHeader dayStreak={stats.streak} xp={stats.xp} />
          </div>
          {children}
        </div>
        
        <div className="mt-auto">
          <Footer />
        </div>
      </main>

      <aside className="sidebar-direita">
        <UserProgress dayStreak={stats.streak} xp={stats.xp} />
        <UserGoals stats={stats} dailyGoal={dailyGoal} />
      </aside>
    </div>
  );
}
