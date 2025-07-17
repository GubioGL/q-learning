import { Github, Linkedin, Mail } from "lucide-react";

/**
 * Rodapé da área de marketing, com links sociais e copyright.
 */
export const Footer = () => {
    return (
        <footer className="hidden sm:block h-20 w-full border-t-2 border-slate-200 p-2 flex-col items-center justify-center text-center text-sm gap-1">
            <div className="flex items-center gap-2">
                <a href="https://github.com/GubioGL" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 underline mx-1" aria-label="GitHub de GubioGL">
                    <Github size={16} /> GitHub
                </a>
                <span>|</span>
                <a href="https://linkedin.com/in/gubio-gomes-de-lima-a99973106" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 underline mx-1" aria-label="LinkedIn de GubioGL">
                    <Linkedin size={16} /> LinkedIn
                </a>
                <span>|</span>
                <a href="mailto:gubio@estudante.ufscar.br" className="flex items-center gap-1 underline mx-1" aria-label="Enviar email para GubioGL">
                    <Mail size={16} /> gubio@estudante.ufscar.br
                </a>
            </div>
            <div className="text-sm text-gray-500">
                © 2025 Quantum Learning. All rights reserved. Made by <strong>GubioGL</strong>.
            </div>
        </footer>
    )
}