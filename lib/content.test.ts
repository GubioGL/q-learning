import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import katex from "katex";
import { courses } from "../content/courses";
import { levels } from "../content/levels";
import { exerciseIds, parseExercise } from "./exercise";

const skills = courses.flatMap((c) => c.skills.map((s) => ({ course: c.id, id: s.id, file: `content/skills/${c.id}/${s.id}.md` })));
const FENCE = /^```([^\n]*)\n([\s\S]*?)^```$/gm;

for (const { course, id, file } of skills) {
    test(`skill ${course}/${id}: exercises, math and images are valid`, () => {
        const md = readFileSync(file, "utf8");
        const exercises = [...md.matchAll(FENCE)].filter((m) => m[1].startsWith("exercise:"));
        assert.ok(exercises.length > 0, "no exercises");
        const parsed = exercises.map((m) => parseExercise(m[1], m[2]).id);
        assert.deepEqual(exerciseIds(md), parsed); // the complete button counts ids with exerciseIds
        assert.equal(new Set(parsed).size, parsed.length, "repeated exercise id");

        const prose = md.replace(FENCE, "");
        const blocks = [...prose.matchAll(/\$\$([\s\S]*?)\$\$/g)].map((m) => m[1]);
        const inline = [...prose.replace(/\$\$[\s\S]*?\$\$/g, "").matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);
        for (const tex of [...blocks, ...inline]) katex.renderToString(tex, { throwOnError: true });

        for (const [, src] of prose.matchAll(/!\[[^\]]+\]\(([^)]+)\)/g)) assert.ok(existsSync(`public${src}`), `missing image ${src}`);
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
