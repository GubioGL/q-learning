import { test } from "node:test";
import assert from "node:assert/strict";
import { earnedAchievements } from "./achievements";

const base = { xp: 0, bestStreak: 0, skillsByCourse: { c1: ["skill:c1/a", "skill:c1/b"] }, levelKeys: ["level:a", "level:b"] };
const ids = (over: object, done: string[]) => earnedAchievements({ ...base, ...over, done: new Set(done) });

test("nothing is earned at the start", () => assert.deepEqual([...ids({}, [])], []));

test("first activity, streaks and XP", () => {
    assert.deepEqual([...ids({ xp: 100, bestStreak: 7 }, ["level:a"])], ["first", "streak3", "streak7", "xp100"]);
});

test("course and trail need every item", () => {
    assert.ok(!ids({}, ["skill:c1/a"]).has("course:c1"));
    assert.ok(ids({}, ["skill:c1/a", "skill:c1/b"]).has("course:c1"));
    assert.ok(ids({}, ["level:a", "level:b"]).has("trail"));
});
