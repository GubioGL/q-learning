"use client";

import Image from "next/image";
import { SidebarItem } from "@/components/ui/sidebar-item";
import { useLocale, useT } from "@/lib/i18n/context";
import { asset } from "@/lib/asset";

/**
 * Conteúdo do menu lateral: navegação.
 */
export const SidebarContent = () => {
  const locale = useLocale();
  const { nav } = useT();

  return (
    <>
      <div className="text-purple-400 font-extrabold flex items-center pt-4 mb-6">
        <Image src={asset("/Logoket.png")} alt="" width={40} height={40} />
        <span className="font-extrabold tracking-tight pl-4 text-lg leading-tight">Quantum Learning</span>
      </div>
      <nav aria-label={nav.label} className="space-y-2">
        <SidebarItem label={nav.courses} iconSrc="/jornada.png" href={`/${locale}/cursos`} />
        <SidebarItem label={nav.challenges} iconSrc="/quantum-bit.png" href={`/${locale}/desafios`} />
        <SidebarItem label={nav.goals} iconSrc="/metas.png" href={`/${locale}/metas`} />
        <SidebarItem label={nav.achievements} iconSrc="/classificaçao.png" href={`/${locale}/conquistas`} />
        {/* Classificação e Loja ficam ocultas por enquanto (ver docs/ROADMAP.md) */}
      </nav>
    </>
  );
};
