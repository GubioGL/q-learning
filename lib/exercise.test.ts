import { test } from "node:test";
import assert from "node:assert/strict";
import { checkAnswer, exerciseIds, parseExercise, testSummary } from "./exercise";
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

const PYTHON = [
    "id: f", "input: n | int | número de 0 a 9 | 3", "input: s | str | texto", "output: f | int | o dobro | 6",
    "---", "def f(n, s):", "    pass", "---", ">>> f(3, \"a\")", "6", "---", ">>> f(0, \"\")", "0", ">>> f(1, \"\")", "2", "---", ">>> f(9, \"z\")", "18", "",
].join("\n");

test("python exercise has described inputs and outputs, starter and three tests", () => {
    const ex = parseExercise("exercise:python", PYTHON);
    assert.equal(ex.kind, "python");
    if (ex.kind !== "python") return;
    assert.deepEqual(ex.inputs, [
        { name: "n", type: "int", format: "número de 0 a 9", example: "3" },
        { name: "s", type: "str", format: "texto", example: undefined },
    ]);
    assert.deepEqual(ex.outputs, [{ name: "f", type: "int", format: "o dobro", example: "6" }]);
    assert.equal(ex.starter, "def f(n, s):\n    pass\n");
    assert.deepEqual(ex.tests.map((t) => t.length), [1, 2, 1]);
    assert.deepEqual(ex.tests[0][0], { call: 'f(3, "a")', expected: "6" });
});

test("python exercise without inputs, outputs or exactly three tests fails loudly", () => {
    const broken = (from: string | RegExp, to: string) => () => parseExercise("exercise:python", PYTHON.replace(from, to));
    assert.throws(broken(/input:.*\n/g, ""), /input/);
    assert.throws(broken(/output:.*\n/, ""), /output/);
    assert.throws(broken("input: s | str | texto", "input: s | str"), /input/);
    assert.throws(broken(/---\n>>> f\(9[\s\S]*/, ""), /3 tests/);
    assert.throws(broken("18", ""), /result/);
});

test("summary says which tests passed and which failed", () => {
    assert.deepEqual(testSummary([true, false, false]), { passed: [1], failed: [2, 3] });
    assert.deepEqual(testSummary([true, true, true]), { passed: [1, 2, 3], failed: [] });
});

test("invalid exercises fail loudly", () => {
    assert.throws(() => parseExercise("exercise:number", "answer: 1"), /without id/);
    assert.throws(() => parseExercise("exercise:number", "id: x\nanswer: abc"), /not a number/);
    assert.throws(() => parseExercise("exercise:python", "id: x\n---\npass\n"), /input/);
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
