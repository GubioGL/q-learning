import { test } from "node:test";
import assert from "node:assert/strict";
import { checkAnswer, exerciseIds, parseExercise } from "./exercise";
import { pathStates, percentDone } from "./progress";

test("parses a number exercise and accepts comma decimals", () => {
    const ex = parseExercise("exercise:number", "id: half\nanswer: 0.5\ntolerance: 0.01");
    assert.equal(ex.kind, "number");
    assert.ok(checkAnswer(ex, "0,5"));
    assert.ok(checkAnswer(ex, "0.505"));
    assert.ok(!checkAnswer(ex, "0.6"));
    assert.ok(!checkAnswer(ex, ""));
});

test("text exercise accepts any listed answer, ignoring case and spaces", () => {
    const ex = parseExercise("exercise:text", "id: six\nanswer: 110 | 0b110");
    assert.ok(checkAnswer(ex, " 0B110 "));
    assert.ok(checkAnswer(ex, "110"));
    assert.ok(!checkAnswer(ex, "011"));
});

test("python exercise splits starter and test", () => {
    const ex = parseExercise("exercise:python", "id: f\n---\ndef f():\n    pass\n---\nassert f() == 1\n");
    assert.equal(ex.kind, "python");
    if (ex.kind !== "python") return;
    assert.equal(ex.starter, "def f():\n    pass\n");
    assert.match(ex.test, /assert f\(\) == 1/);
});

test("invalid exercises fail loudly", () => {
    assert.throws(() => parseExercise("exercise:number", "answer: 1"), /without id/);
    assert.throws(() => parseExercise("exercise:number", "id: x\nanswer: abc"), /not a number/);
    assert.throws(() => parseExercise("exercise:python", "id: x\n---\npass\n"), /missing test/);
    assert.throws(() => parseExercise("exercise:video", "id: x"), /unknown/);
});

test("finds exercise ids in markdown", () => {
    const md = "text\n```exercise:number\nid: a\nanswer: 1\n```\n```python\nprint(1)\n```\n```exercise:python\nid: b\n---\nx=1\n---\nassert x\n```";
    assert.deepEqual(exerciseIds(md), ["a", "b"]);
});

test("path unlocks one item at a time", () => {
    assert.deepEqual(pathStates(["a", "b", "c"], new Set()), ["open", "locked", "locked"]);
    assert.deepEqual(pathStates(["a", "b", "c"], new Set(["a"])), ["done", "open", "locked"]);
    assert.deepEqual(pathStates(["a", "b"], new Set(["a", "b"])), ["done", "done"]);
    assert.equal(percentDone(["a", "b", "c", "d"], new Set(["a"])), 25);
    assert.equal(percentDone([], new Set()), 0);
});
