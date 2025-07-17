"use client"
// Adiciona um botão usando o componente Button
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
    label: string;
    iconSrc: string;
    href: string;
}

export const SidebarItem = ({ label, iconSrc, href }: Props) => {
    return (

        <a href={href} className="flex items-center ">
            <Button variant="sidebar" className="flex items-center gap-6 w-full justify-start">
                <Image src={iconSrc} alt={label} width={40} height={40} />
                <span>{label}</span>
            </Button>
        </a>
    );
}