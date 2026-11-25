import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

const SAFE_ID = /^[a-z0-9-]+$/;
const SKILLS_DIR = path.join(process.cwd(), "content", "skills");

// Markdown of a skill, or null when it has not been written yet.
export async function readSkill(courseId: string, skillId: string): Promise<string | null> {
    if (!SAFE_ID.test(courseId) || !SAFE_ID.test(skillId)) return null;
    try {
        return await readFile(path.join(SKILLS_DIR, courseId, `${skillId}.md`), "utf8");
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
        throw err;
    }
}
