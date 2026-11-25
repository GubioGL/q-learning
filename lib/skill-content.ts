import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

const SAFE_ID = /^[a-z0-9-]+$/;
const SKILLS_DIR = path.join(process.cwd(), "content", "skills");

async function readIfExists(file: string): Promise<string | null> {
    try {
        return await readFile(file, "utf8");
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
        throw err;
    }
}

// Markdown of a skill in the given language (or Portuguese when not translated); null when not written yet.
export async function readSkill(courseId: string, skillId: string, locale: Locale): Promise<{ markdown: string; lang: Locale } | null> {
    if (!SAFE_ID.test(courseId) || !SAFE_ID.test(skillId)) return null;
    const base = path.join(SKILLS_DIR, courseId, skillId);
    if (locale !== DEFAULT_LOCALE) {
        const translated = await readIfExists(`${base}.${locale}.md`);
        if (translated !== null) return { markdown: translated, lang: locale };
    }
    const original = await readIfExists(`${base}.md`);
    return original === null ? null : { markdown: original, lang: DEFAULT_LOCALE };
}
