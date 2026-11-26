import { test } from "node:test";
import assert from "node:assert/strict";
import { pathStates } from "./progress";

test("a new item inserted before finished ones does not lock them", () => {
    assert.deepEqual(pathStates(["a", "b", "c", "d"], new Set(["a", "c"])), ["done", "open", "done", "locked"]);
});

test("dev mode unlocks every unfinished item", () => {
    assert.deepEqual(pathStates(["a", "b", "c"], new Set(["b"]), true), ["open", "done", "open"]);
});

test("new visitor: only the first item is open", () => {
    assert.deepEqual(pathStates(["a", "b", "c"], new Set()), ["open", "locked", "locked"]);
});
