import { test } from "node:test";
import assert from "node:assert/strict";
import { computeStats, parseDailyGoal } from "./stats";

// 2026-11-25 is a Wednesday. Times without Z are local, whatever the machine's time zone.
const NOW = new Date("2026-11-25T12:00:00");
const at = (iso: string, xp = 10) => ({ xp, at: new Date(iso) });

test("new visitor has zero everything", () => {
    assert.deepEqual(computeStats([], NOW), { xp: 0, streak: 0, bestStreak: 0, today: { xp: 0, activities: 0 }, week: { xp: 0, activities: 0 } });
});

test("sums total, today and current week (Monday to Sunday)", () => {
    const s = computeStats([at("2026-11-25T13:00:00", 15), at("2026-11-23T13:00:00"), at("2026-11-22T13:00:00")], NOW);
    assert.equal(s.xp, 35);
    assert.deepEqual(s.today, { xp: 15, activities: 1 });
    assert.deepEqual(s.week, { xp: 25, activities: 2 }); // Sunday 22nd belongs to last week
});

test("on Sunday the week still starts on the previous Monday", () => {
    const s = computeStats([at("2026-11-23T13:00:00")], new Date("2026-11-29T15:00:00"));
    assert.equal(s.week.activities, 1);
});

test("streak counts consecutive days, several activities in one day count once", () => {
    const s = computeStats([at("2026-11-25T13:00:00"), at("2026-11-25T14:00:00"), at("2026-11-24T13:00:00"), at("2026-11-22T13:00:00")], NOW);
    assert.equal(s.streak, 2);
});

test("streak survives until the end of the next day, then resets", () => {
    assert.equal(computeStats([at("2026-11-24T13:00:00"), at("2026-11-23T13:00:00")], NOW).streak, 2);
    assert.equal(computeStats([at("2026-11-23T13:00:00")], NOW).streak, 0);
});

test("best streak survives a broken streak", () => {
    const s = computeStats([at("2026-11-01T13:00:00"), at("2026-11-02T13:00:00"), at("2026-11-03T13:00:00"), at("2026-11-25T10:00:00")], NOW);
    assert.equal(s.streak, 1);
    assert.equal(s.bestStreak, 3);
});

test("days change at local midnight", () => {
    const s = computeStats([at("2026-11-24T23:59:00")], new Date("2026-11-25T00:01:00"));
    assert.equal(s.today.activities, 0);
    assert.equal(s.streak, 1);
});

test("parseDailyGoal accepts only whole numbers from 1 to 20", () => {
    assert.equal(parseDailyGoal(1), 1);
    assert.equal(parseDailyGoal(20), 20);
    for (const bad of [0, 21, 2.5, NaN, "3", null, undefined]) assert.equal(parseDailyGoal(bad), null);
});
