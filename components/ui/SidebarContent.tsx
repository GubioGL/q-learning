import { SidebarItem } from "@/components/ui/sidebar-item";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export const SidebarContent = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <>
      <div className="text-purple-700 font-extrabold flex items-center pt-4 pl-4 mb-6">
        <Image src="/Logoket.png" alt="Quantum Learning" width={40} height={40} />
        <span className="font-extrabold text-purple-700 tracking-wide pl-4">Quantum Learning</span>
      </div>
      <div className="pl-4 pr-4 space-y-4">
        <SidebarItem label="Jornada" iconSrc="/jornada.png" href="/jornada" />
        <SidebarItem label="Metas" iconSrc="/metas.png" href="/metas" />
        <SidebarItem label="Classificação" iconSrc="/classificaçao.png" href="/leaderboard" />
        <SidebarItem label="Loja" iconSrc="/loja.png" href="/loja" />
        {/* Perfil com Dropdown */}
        <div className="relative">
          <Button
            variant="sidebar"
            className="flex items-center gap-6 w-full justify-start"
            onClick={() => setOpenDropdown((open) => !open)}
          >
            <Image src="/perfil.png" alt="Perfil" width={40} height={40} />
            <span>Perfil</span>
          </Button>
          {openDropdown && (
            <div className="absolute left-full top-0 mt-2 w-56 bg-[#232323] rounded-lg shadow-lg p-2 z-50 border border-gray-700">
              <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
                <span>💡</span> Personalização
              </a>

              <hr className="my-2 border-gray-700" />

              <div className="block p-2 flex items-center gap-2">
                {/* Caso esteja logado */}
                <SignedIn>
                  {/* Fazer logout */}
                  <UserButton />
                </SignedIn>
                <span className="text-gray-300">Configurações</span>
              </div>


            </div>
          )}
        </div>
      </div>
    </>
  );
}; 