import { test } from "node:test";
import assert from "node:assert/strict";
import { computeStats, parseDailyGoal } from "./stats";

// 2026-11-25 is a Wednesday; 15:00Z is noon in São Paulo (UTC-3).
const NOW = new Date("2026-11-25T15:00:00Z");
const at = (iso: string, xp = 10) => ({ xp, at: new Date(iso) });

test("new visitor has zero everything", () => {
    assert.deepEqual(computeStats([], NOW), { xp: 0, streak: 0, today: { xp: 0, activities: 0 }, week: { xp: 0, activities: 0 } });
});

test("sums total, today and current week (Monday to Sunday)", () => {
    const s = computeStats([at("2026-11-25T13:00:00Z", 15), at("2026-11-23T13:00:00Z"), at("2026-11-22T13:00:00Z")], NOW);
    assert.equal(s.xp, 35);
    assert.deepEqual(s.today, { xp: 15, activities: 1 });
    assert.deepEqual(s.week, { xp: 25, activities: 2 }); // Sunday 22nd belongs to last week
});

test("on Sunday the week still starts on the previous Monday", () => {
    const s = computeStats([at("2026-11-23T13:00:00Z")], new Date("2026-11-29T15:00:00Z"));
    assert.equal(s.week.activities, 1);
});

test("streak counts consecutive days, several activities in one day count once", () => {
    const s = computeStats([at("2026-11-25T13:00:00Z"), at("2026-11-25T14:00:00Z"), at("2026-11-24T13:00:00Z"), at("2026-11-22T13:00:00Z")], NOW);
    assert.equal(s.streak, 2);
});

test("streak survives until the end of the next day, then resets", () => {
    assert.equal(computeStats([at("2026-11-24T13:00:00Z"), at("2026-11-23T13:00:00Z")], NOW).streak, 2);
    assert.equal(computeStats([at("2026-11-23T13:00:00Z")], NOW).streak, 0);
});

test("days follow São Paulo time, not UTC", () => {
    const s = computeStats([at("2026-11-25T02:30:00Z")], NOW); // 23:30 on the 24th
    assert.equal(s.today.activities, 0);
    assert.equal(s.streak, 1);
});

test("parseDailyGoal accepts only whole numbers from 1 to 20", () => {
    assert.equal(parseDailyGoal(1), 1);
    assert.equal(parseDailyGoal(20), 20);
    for (const bad of [0, 21, 2.5, NaN, "3", null, undefined]) assert.equal(parseDailyGoal(bad), null);
});
