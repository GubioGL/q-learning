import { test } from "node:test";
import assert from "node:assert/strict";
import { EMPTY_PROGRESS, complete, importInto, parseProgress } from "./progress-data";

const A = "2026-11-20T10:00:00.000Z";
const B = "2026-11-25T10:00:00.000Z";

test("completing an item is immutable and keeps the first date", () => {
    const one = complete(EMPTY_PROGRESS, "level:bits", new Date(A));
    assert.deepEqual(EMPTY_PROGRESS.done, {});
    assert.deepEqual(one.done, { "level:bits": A });
    assert.equal(complete(one, "level:bits", new Date(B)), one);
});

test("parse keeps valid data and drops bad entries", () => {
    const raw = { done: { "skill:basico/bits": A, "level:bits": "not a date", "__proto__x": A, "<script>": A, "level:x": 3 }, goal: 5 };
    assert.deepEqual(parseProgress(raw), { done: { "skill:basico/bits": A }, goal: 5 });
    assert.deepEqual(parseProgress({ done: {}, goal: 999 }), EMPTY_PROGRESS);
});

test("parse rejects what is not a progress file", () => {
    for (const bad of [null, 3, "x", [], {}, { done: null }, { done: [] }]) assert.equal(parseProgress(bad), null);
});

test("a hostile __proto__ key does not pollute objects", () => {
    parseProgress(JSON.parse(`{"done":{"__proto__":"${A}","constructor":"${A}"},"goal":3}`));
    assert.equal(({} as Record<string, unknown>)["level:bits"], undefined);
    assert.deepEqual(parseProgress(JSON.parse(`{"done":{"__proto__":"${A}"}}`)), EMPTY_PROGRESS);
});

test("import keeps everything from both, with the earliest date, and the imported goal", () => {
    const merged = importInto({ done: { "level:a": B, "level:b": A }, goal: 3 }, { done: { "level:a": A, "level:c": B }, goal: 7 });
    assert.deepEqual(merged, { done: { "level:a": A, "level:b": A, "level:c": B }, goal: 7 });
});

test("import without a valid goal keeps the current goal", () => {
    for (const goal of [undefined, 0, "5"]) assert.equal(importInto({ done: {}, goal: 10 }, { done: {}, goal })?.goal, 10);
});

test("import rejects what is not a progress file", () => assert.equal(importInto(EMPTY_PROGRESS, [1]), null));
