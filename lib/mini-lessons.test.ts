import { test } from "node:test";
import assert from "node:assert/strict";
import { firstOpenLesson, splitLessons } from "./mini-lessons";

const md = `Intro text.

## One
Text.

\`\`\`exercise:number
id: a
answer: 1
\`\`\`

## Two
No exercise here.

\`\`\`exercise:python
id: b
---
## a comment inside code is not a heading
def f(): return 0
---
>>> f()
0
\`\`\`
`;

test("splits at ## headings, keeps the intro in the first lesson and ignores headings inside fences", () => {
    const lessons = splitLessons(md);
    assert.deepEqual(lessons.map((l) => l.title), ["One", "Two"]);
    assert.ok(lessons[0].markdown.startsWith("Intro text."));
    assert.deepEqual(lessons.map((l) => l.exerciseIds), [["a"], ["b"]]);
});

test("a page without headings is one lesson", () => {
    assert.deepEqual(splitLessons("just text").map((l) => l.title), [null]);
});

test("the first lesson with an unsolved exercise is the open one", () => {
    const lessons = splitLessons(md);
    assert.equal(firstOpenLesson(lessons, new Set()), 0);
    assert.equal(firstOpenLesson(lessons, new Set(["a"])), 1);
    assert.equal(firstOpenLesson(lessons, new Set(["a", "b"])), 1); // all solved: stay on the last
});
