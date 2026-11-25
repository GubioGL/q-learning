"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
    label: string;
    iconSrc: string;
    href: string;
}

/**
 * Item de navegação lateral com acessibilidade.
 */
export const SidebarItem = ({ label, iconSrc, href }: SidebarItemProps) => {
    const isCurrent = usePathname().startsWith(href);
    return (
        <Button asChild variant="sidebar" className="flex items-center gap-4 w-full justify-start px-1 py-5 h-16 rounded-lg text-gray-300 aria-[current]:text-purple-300">
            <Link href={href} aria-current={isCurrent ? "page" : undefined}>
                <Image src={iconSrc} alt="" width={40} height={40} />
                <span>{label}</span>
            </Link>
        </Button>
    );
}
