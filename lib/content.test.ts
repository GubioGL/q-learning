import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import katex from "katex";
import { courses } from "../content/courses";
import { levels } from "../content/levels";
import en from "../content/levels/en";
import es from "../content/levels/es";
import { exerciseIds, parseExercise } from "./exercise";
import { DEFAULT_LOCALE, LOCALES } from "./i18n/locales";

const skills = courses.flatMap((c) => c.skills.map((s) => ({ course: c.id, id: s.id, file: `content/skills/${c.id}/${s.id}.md` })));
const FENCE = /^```([^\n]*)\n([\s\S]*?)^```$/gm;

const TRANSLATIONS = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

function checkSkill(file: string) {
    const md = readFileSync(file, "utf8");
    const exercises = [...md.matchAll(FENCE)].filter((m) => m[1].startsWith("exercise:")).map((m) => parseExercise(m[1], m[2]));
    const ids = exercises.map((e) => e.id);
    assert.ok(ids.length > 0, "no exercises");
    assert.deepEqual(exerciseIds(md), ids); // the complete button counts ids with exerciseIds
    assert.equal(new Set(ids).size, ids.length, "repeated exercise id");

    const prose = md.replace(FENCE, "");
    const blocks = [...prose.matchAll(/\$\$([\s\S]*?)\$\$/g)].map((m) => m[1]);
    const inline = [...prose.replace(/\$\$[\s\S]*?\$\$/g, "").matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);
    for (const tex of [...blocks, ...inline]) katex.renderToString(tex, { throwOnError: true });

    for (const [, src] of prose.matchAll(/!\[[^\]]+\]\(([^)]+)\)/g)) assert.ok(existsSync(`public${src}`), `missing image ${src}`);
    return { exercises, equations: blocks.length, images: [...prose.matchAll(/!\[/g)].length };
}

// Same exercises, in the same order; only words may change.
const shape = ({ exercises, ...rest }: ReturnType<typeof checkSkill>) => ({
    ...rest,
    exercises: exercises.map((e) => (e.kind === "number" ? e : { id: e.id, kind: e.kind })),
});

for (const { course, id, file } of skills) {
    test(`skill ${course}/${id}: exercises, math and images are valid`, () => void checkSkill(file));
    for (const locale of TRANSLATIONS) {
        const translated = file.replace(/md$/, `${locale}.md`);
        test(`skill ${course}/${id}: ${locale} matches the original`, { skip: !existsSync(translated) && "not translated yet" }, () => {
            assert.deepEqual(shape(checkSkill(translated)), shape(checkSkill(file)));
        });
    }
}

for (const locale of TRANSLATIONS) {
    test(`levels in ${locale} keep the challenges and options of the original`, () => {
        const texts = { en, es }[locale as "en" | "es"];
        for (const [id, text] of Object.entries(texts)) {
            const level = levels.find((l) => l.id === id);
            assert.ok(level, `level ${id} does not exist`);
            assert.deepEqual(text.challenges.map((c) => c.options.length), level.challenges.map((c) => c.options.length), id);
            for (const c of text.challenges) assert.equal(new Set(c.options).size, c.options.length, c.question);
        }
    });
}

test("every skill has a level and the trail follows the order of the courses", () => {
    assert.deepEqual(levels.map((l) => `${l.course}/${l.skill}`), skills.map((s) => `${s.course}/${s.id}`));
    assert.equal(new Set(levels.map((l) => l.id)).size, levels.length);
});

for (const level of levels) {
    test(`level ${level.id}: options are distinct and the answer exists`, () => {
        assert.ok(level.challenges.length > 0);
        for (const c of level.challenges) {
            assert.equal(new Set(c.options).size, c.options.length, c.question);
            assert.ok(c.options[c.answer] !== undefined, c.question);
        }
    });
}
