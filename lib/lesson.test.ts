import { test } from "node:test";
import assert from "node:assert/strict";
import { check, initialState, isFinished, isOutOfHearts, next, progress, select, type Lesson } from "./lesson";

const lesson: Lesson = {
    id: "t",
    title: "t",
    intro: "",
    source: "",
    xp: 10,
    challenges: [
        { question: "q1", options: ["a", "b"], answer: 1, explanation: "" },
        { question: "q2", options: ["a", "b"], answer: 0, explanation: "" },
    ],
};

test("correct answer counts and keeps hearts", () => {
    const s = check(select(initialState(), 1), lesson);
    assert.equal(s.status, "correct");
    assert.equal(s.correct, 1);
    assert.equal(s.hearts, 3);
});

test("wrong answer costs a heart", () => {
    const s = check(select(initialState(), 0), lesson);
    assert.equal(s.status, "wrong");
    assert.equal(s.hearts, 2);
});

test("check without selection does nothing", () => {
    const s0 = initialState();
    assert.equal(check(s0, lesson), s0);
});

test("cannot change answer after checking", () => {
    const s = check(select(initialState(), 1), lesson);
    assert.equal(select(s, 0).selected, 1);
});

test("next advances and finishes the lesson", () => {
    let s = next(check(select(initialState(), 1), lesson));
    assert.equal(s.index, 1);
    assert.equal(progress(s, lesson), 50);
    s = next(check(select(s, 0), lesson));
    assert.ok(isFinished(s, lesson));
});

test("next is blocked until the answer is checked", () => {
    const s = select(initialState(), 1);
    assert.equal(next(s), s);
});

test("runs out of hearts after three mistakes", () => {
    let s = initialState();
    for (let i = 0; i < 3; i++) s = { ...check(select(s, 0), lesson), status: "idle", selected: null };
    assert.ok(isOutOfHearts(s));
});
