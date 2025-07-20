import { SidebarItem } from "@/components/ui/sidebar-item";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

/**
 * Conteúdo do menu lateral, incluindo navegação e login do usuário.
 */
export const SidebarContent = () => {

  return (
    <>
      <div className="text-purple-700 font-extrabold flex items-center pt-4 pl- mb-6">
        <Image src="/Logoket.png" alt="Quantum Learning" width={40} height={40} />
        <span className="font-extrabold text-purple-700 tracking-tight pl-4 text-lg leading-tight">Quantum Learning</span>
      </div>
      <div className="space-y-2">
        <SidebarItem label="Jornada" iconSrc="/jornada.png" href="/learn" />
        <SidebarItem label="Metas" iconSrc="/metas.png" href="/metas" />
        <SidebarItem label="Classificação" iconSrc="/classificaçao.png" href="/leaderboard" />
        <SidebarItem label="Loja" iconSrc="/loja.png" href="/loja" />
        {/* Botão de Login Personalizado */}
        <Button variant="sidebar" className="flex items-center gap-4 w-full justify-start px-1 py-5 h-16 rounded-lg">
          <div className="w-10 h-10 flex items-center justify-center">
            <UserButton 
              appearance={{
                elements: {
                  userButtonBox: "w-10 h-10",
                  userButtonTrigger: "w-10 h-10 rounded-full"
                }
              }}
            />
          </div>
          <span>Login/Logout</span>
        </Button>
      </div>
    </>
  );
}; 