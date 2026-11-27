import { exerciseIds } from "./exercise";

// A skill page is split into mini-lessons at its "## " headings; text before the first heading joins the first one.
export type MiniLesson = { title: string | null; markdown: string; exerciseIds: string[] };

export function splitLessons(markdown: string): MiniLesson[] {
    const parts: string[][] = [[]];
    let inFence = false;
    let seenHeading = false;
    for (const line of markdown.split("\n")) {
        if (line.startsWith("```")) inFence = !inFence;
        const heading = !inFence && line.startsWith("## ");
        if (heading && seenHeading) parts.push([]);
        if (heading) seenHeading = true;
        parts[parts.length - 1].push(line);
    }
    return parts.map((lines) => {
        const md = lines.join("\n");
        const title = lines.find((l) => l.startsWith("## "))?.slice(3).trim() ?? null;
        return { title, markdown: md, exerciseIds: exerciseIds(md) };
    });
}

// Index of the first lesson with an unsolved exercise: everything after it stays locked.
export const firstOpenLesson = (lessons: Pick<MiniLesson, "exerciseIds">[], solved: Set<string>) => {
    const i = lessons.findIndex((l) => l.exerciseIds.some((id) => !solved.has(id)));
    return i === -1 ? lessons.length - 1 : i;
};
