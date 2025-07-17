"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SidebarItemProps {
    label: string;
    iconSrc: string;
    href: string;
}

/**
 * Item de navegação lateral com acessibilidade.
 */
export const SidebarItem = ({ label, iconSrc, href }: SidebarItemProps) => {
    return (
        <a href={href} className="flex items-center " aria-label={label} tabIndex={0}>
            <Button variant="sidebar" className="flex items-center gap-6 w-full justify-start">
                <Image src={iconSrc} alt={label} width={40} height={40} />
                <span>{label}</span>
            </Button>
        </a>
    );
}