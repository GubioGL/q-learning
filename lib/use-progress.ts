"use client";

import { useSyncExternalStore } from "react";
import { EMPTY_PROGRESS, complete, importInto, mergeSolved, parseProgress, parseSolved, type Progress, type Solved } from "./progress-data";

const STORAGE_KEY = "ql_progress";

type Snapshot = { ready: boolean; progress: Progress };
const SERVER_SNAPSHOT: Snapshot = { ready: false, progress: EMPTY_PROGRESS };

let snapshot: Snapshot = SERVER_SNAPSHOT;
let hasUnsaved = false; // the browser refused the last save, so memory is ahead of storage
const listeners = new Set<() => void>();

// null when the browser blocks storage.
function read(): Progress | null {
    try {
        const text = localStorage.getItem(STORAGE_KEY);
        try {
            return parseProgress(JSON.parse(text ?? "null")) ?? EMPTY_PROGRESS;
        } catch {
            return EMPTY_PROGRESS; // corrupted
        }
    } catch {
        return null;
    }
}

function getSnapshot(): Snapshot {
    if (!snapshot.ready) snapshot = { ready: true, progress: read() ?? EMPTY_PROGRESS };
    return snapshot;
}

// Another tab may have saved without this one hearing about it: always build on what is stored.
function latest(): Progress {
    const { progress } = getSnapshot();
    return hasUnsaved ? progress : read() ?? progress;
}

function publish(progress: Progress) {
    snapshot = { ready: true, progress };
    listeners.forEach((l) => l());
}

function onStorage(e: StorageEvent) {
    if (e.key !== STORAGE_KEY && e.key !== null) return; // null: another tab cleared everything
    publish(latest());
}

function subscribe(listener: () => void) {
    if (listeners.size === 0) {
        snapshot = { ready: true, progress: latest() };
        window.addEventListener("storage", onStorage);
    }
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
        if (listeners.size === 0) window.removeEventListener("storage", onStorage);
    };
}

// Returns false when the browser refused to save; the progress still counts until the tab closes.
function save(progress: Progress): boolean {
    publish(progress);
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        hasUnsaved = false;
        void navigator.storage?.persist?.().catch(() => false); // ask the browser not to evict it
        return true;
    } catch {
        hasUnsaved = true;
        return false;
    }
}

export const useProgress = () => useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);

export function markDone(key: string): { isNew: boolean; saved: boolean } {
    const before = latest();
    const after = complete(before, key, new Date());
    if (after !== before) return { isNew: true, saved: save(after) };
    publish(before); // another tab may have finished it
    return { isNew: false, saved: true };
}

export const saveGoal = (goal: number) => save({ ...latest(), goal });

// Solved mini-challenges are a convenience: storage errors only lose the partial progress inside a skill.
const SOLVED_KEY = "ql_solved";

export function readAllSolved(): Solved {
    try {
        return parseSolved(JSON.parse(localStorage.getItem(SOLVED_KEY) ?? "{}"));
    } catch {
        return {};
    }
}

export function saveSolved(skill: string, ids: string[]) {
    try {
        localStorage.setItem(SOLVED_KEY, JSON.stringify({ ...readAllSolved(), [skill]: ids }));
    } catch {
        // storage blocked: progress inside the page still works
    }
}

export const exportProgress = () => JSON.stringify({ ...latest(), solved: readAllSolved() });

export function importProgress(text: string): boolean {
    try {
        const raw = JSON.parse(text);
        const merged = importInto(latest(), raw);
        if (merged === null || !save(merged)) return false;
        const solved = mergeSolved(readAllSolved(), parseSolved((raw as { solved?: unknown }).solved));
        try { localStorage.setItem(SOLVED_KEY, JSON.stringify(solved)); } catch { /* the finished skills were saved */ }
        return true;
    } catch {
        return false; // not JSON
    }
}

export const useDone = () => new Set(Object.keys(useProgress().progress.done));
