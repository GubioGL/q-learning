// Exercises live inside skill Markdown as fenced blocks (format: content/README.md).

export type Exercise =
    | { kind: "number"; id: string; answer: number; tolerance: number }
    | { kind: "text"; id: string; answers: string[] }
    | { kind: "python"; id: string; starter: string; test: string };

const FENCE_PREFIX = "exercise:";
const DEFAULT_TOLERANCE = 1e-6;

export const isExerciseFence = (lang: string | undefined) => !!lang?.startsWith(FENCE_PREFIX);

const parseMeta = (head: string) =>
    Object.fromEntries(
        head
            .split("\n")
            .map((line) => line.match(/^(\w+):\s*(.*)$/))
            .filter((m): m is RegExpMatchArray => m !== null)
            .map((m) => [m[1], m[2].trim()]),
    );

export function parseExercise(lang: string, body: string): Exercise {
    const kind = lang.slice(FENCE_PREFIX.length);
    const [head, starter = "", test = ""] = body.split(/^---\s*$/m);
    const meta = parseMeta(head);
    if (!meta.id) throw new Error(`exercise without id: ${body.slice(0, 40)}`);

    if (kind === "number") {
        const answer = Number(meta.answer);
        if (Number.isNaN(answer)) throw new Error(`exercise ${meta.id}: answer is not a number`);
        return { kind, id: meta.id, answer, tolerance: Number(meta.tolerance ?? DEFAULT_TOLERANCE) };
    }
    if (kind === "text") {
        if (!meta.answer) throw new Error(`exercise ${meta.id}: missing answer`);
        return { kind, id: meta.id, answers: meta.answer.split("|").map(normalize) };
    }
    if (kind === "python") {
        if (!test.trim()) throw new Error(`exercise ${meta.id}: missing test block`);
        return { kind, id: meta.id, starter: starter.replace(/^\n/, "").trimEnd() + "\n", test };
    }
    throw new Error(`unknown exercise kind: ${kind}`);
}

export const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export function checkAnswer(ex: Exercise, input: string): boolean {
    if (ex.kind === "number") {
        const value = Number(input.trim().replace(",", "."));
        return input.trim() !== "" && !Number.isNaN(value) && Math.abs(value - ex.answer) <= ex.tolerance;
    }
    if (ex.kind === "text") return ex.answers.includes(normalize(input));
    throw new Error("python exercises are checked by running the test code");
}

// Ids of every exercise fence in a Markdown document, in order (id must be the fence's first line).
export const exerciseIds = (markdown: string) =>
    [...markdown.matchAll(/^```exercise:\w+\r?\nid:\s*(\S+)/gm)].map((m) => m[1]);
