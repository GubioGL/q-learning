"use client";

import { useT } from "@/lib/i18n/context";
import { Github, Linkedin } from "lucide-react";

/**
 * Rodapé da área de marketing, com links sociais e copyright.
 */
export const Footer = () => {
    const { footer } = useT();
    return (
        <footer className="hidden sm:block h-20 w-full border-t-2 border-slate-200 p-2 flex-col items-center justify-center text-center text-sm gap-1">
            <div className="flex items-center justify-center gap-2">
                <a href="https://github.com/GubioGL" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 underline mx-1" aria-label="GitHub: GubioGL">
                    <Github size={16} /> GitHub
                </a>
                <span>|</span>
                <a href="https://linkedin.com/in/gubio-gomes-de-lima-a99973106" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 underline mx-1" aria-label="LinkedIn: GubioGL">
                    <Linkedin size={16} /> LinkedIn
                </a>
            </div>
            <div className="text-sm">
                {footer} <strong>GubioGL</strong>.
            </div>
        </footer>
    )
}