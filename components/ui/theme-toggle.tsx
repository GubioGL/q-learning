"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n/context";

type Theme = "light" | "dark";

// The inline script in the root layout already set data-theme before paint; this only flips and remembers it.
export function ThemeToggle() {
    const { theme: t } = useT();
    const [theme, setTheme] = useState<Theme>("dark");
    // Switching language swaps the root layout on the client, which drops the attribute the inline script set: re-apply it.
    useEffect(() => {
        let saved: string | null = null;
        try { saved = localStorage.getItem("ql_theme"); } catch { /* storage blocked: follow the system */ }
        const next: Theme = saved === "light" || saved === "dark" ? saved
            : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        setTheme(next);
    }, []);
    const toggle = () => {
        const next: Theme = theme === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        setTheme(next);
        try { localStorage.setItem("ql_theme", next); } catch { /* storage blocked: the choice lasts until reload */ }
    };
    const Icon = theme === "light" ? Moon : Sun;
    return (
        <button type="button" onClick={toggle} title={theme === "light" ? t.toDark : t.toLight} aria-label={theme === "light" ? t.toDark : t.toLight}
            className="rounded-md p-2 text-gray-400 hover:text-gray-50">
            <Icon size={18} aria-hidden />
        </button>
    );
}
