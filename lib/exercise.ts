// Exercises live inside skill Markdown as fenced blocks (format: content/README.md).

export type Exercise =
    | { kind: "number"; id: string; answer: number; tolerance: number }
    | { kind: "text"; id: string; answers: string[] }
    | PythonExercise;

// One value the function receives or returns: its Python type and exact format.
export type Value = { name: string; type: string; format: string; example?: string };
// Expressions in Python; a test passes when every call gives its expected result.
export type Case = { call: string; expected: string };
export type PythonExercise = { kind: "python"; id: string; inputs: Value[]; outputs: Value[]; starter: string; tests: Case[][] };

export const TEST_COUNT = 3; // the first one is shown to the learner, the others stay hidden

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
    const [head, ...sections] = body.split(/^---\s*$/m);
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
    if (kind === "python") return parsePython(meta.id, head, sections);
    throw new Error(`unknown exercise kind: ${kind}`);
}

function parseValues(id: string, head: string, key: "input" | "output"): Value[] {
    const lines = head.split("\n").filter((line) => line.startsWith(`${key}:`));
    if (lines.length === 0) throw new Error(`exercise ${id}: missing ${key}`);
    return lines.map((line) => {
        const [name, type, format, example] = line.slice(key.length + 1).split(" | ").map((part) => part.trim());
        if (!name || !type || !format) throw new Error(`exercise ${id}: ${key} needs "name | type | format"`);
        return { name, type, format, example };
    });
}

function parseCases(id: string, section: string): Case[] {
    const lines = section.split("\n").filter((line) => line.trim() !== "");
    const cases = [];
    for (let i = 0; i < lines.length; i += 2) {
        const expected = lines[i + 1];
        if (!lines[i].startsWith(">>> ") || !expected || expected.startsWith(">>> ")) {
            throw new Error(`exercise ${id}: each test is ">>> call" followed by its result`);
        }
        cases.push({ call: lines[i].slice(4).trim(), expected: expected.trim() });
    }
    if (cases.length === 0) throw new Error(`exercise ${id}: empty test`);
    return cases;
}

function parsePython(id: string, head: string, [starter = "", ...tests]: string[]): PythonExercise {
    const inputs = parseValues(id, head, "input");
    const outputs = parseValues(id, head, "output");
    if (tests.length !== TEST_COUNT) throw new Error(`exercise ${id}: needs exactly ${TEST_COUNT} tests`);
    return {
        kind: "python", id, inputs, outputs,
        starter: starter.replace(/^\n/, "").trimEnd() + "\n",
        tests: tests.map((section) => parseCases(id, section)),
    };
}

export function testSummary(results: boolean[]) {
    const numbers = results.map((ok, i) => ({ ok, n: i + 1 }));
    const pick = (wanted: boolean) => numbers.filter(({ ok }) => ok === wanted).map(({ n }) => n);
    return { passed: pick(true), failed: pick(false) };
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
