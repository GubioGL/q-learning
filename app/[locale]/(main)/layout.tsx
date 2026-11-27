import { Footer } from "@/app/[locale]/(marketing)/footer";
import { MainHeader } from "@/app/[locale]/(main)/header";
import { SidebarContent } from "@/components/ui/SidebarContent";
import { ProgressPanel } from "@/components/progress-panel";
import { xpByKey } from "@/content/catalog";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <header className="sidebar-esquerda">
        <SidebarContent />
      </header>

      {/* relative: hidden absolute elements (KaTeX, sr-only) must stay inside this scroll area */}
      <div className="relative flex-1 min-w-0 ml-[0px] lg:ml-[260px] mr-[0px] lg:mr-[300px] h-dvh overflow-y-auto text-gray-400 bg-(--ql-bg) flex flex-col oculta-scrollbar">
        <div className="flex-1 p-4 sm:p-8">
          {/* The sidebars only show from lg up, so the header covers every smaller screen. */}
          <div className="lg:hidden">
            <MainHeader xpByKey={xpByKey} />
          </div>
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>

      <ProgressPanel xpByKey={xpByKey} />
    </div>
  );
}
