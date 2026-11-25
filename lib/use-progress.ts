"use client";

import { useSyncExternalStore } from "react";
import { EMPTY_PROGRESS, complete, mergeProgress, parseProgress, type Progress } from "./progress-data";

const STORAGE_KEY = "ql_progress";

type Snapshot = { ready: boolean; progress: Progress };
const SERVER_SNAPSHOT: Snapshot = { ready: false, progress: EMPTY_PROGRESS };

let snapshot: Snapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

function read(): Progress {
    try {
        return parseProgress(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null")) ?? EMPTY_PROGRESS;
    } catch {
        return EMPTY_PROGRESS; // storage blocked or corrupted
    }
}

function getSnapshot(): Snapshot {
    if (!snapshot.ready) snapshot = { ready: true, progress: read() };
    return snapshot;
}

const emit = () => listeners.forEach((l) => l());

function onStorage(e: StorageEvent) {
    if (e.key !== STORAGE_KEY && e.key !== null) return; // null: another tab cleared everything
    snapshot = { ready: true, progress: read() };
    emit();
}

function subscribe(listener: () => void) {
    if (listeners.size === 0) window.addEventListener("storage", onStorage);
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
        if (listeners.size === 0) window.removeEventListener("storage", onStorage);
    };
}

// Returns false when the browser refused to save; the progress still counts until the tab closes.
function save(progress: Progress): boolean {
    snapshot = { ready: true, progress };
    emit();
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        void navigator.storage?.persist?.().catch(() => false); // ask the browser not to evict it
        return true;
    } catch {
        return false;
    }
}

export const useProgress = () => useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);

export function markDone(key: string): { isNew: boolean; saved: boolean } {
    const before = getSnapshot().progress;
    const after = complete(before, key, new Date());
    return after === before ? { isNew: false, saved: true } : { isNew: true, saved: save(after) };
}

export const saveGoal = (goal: number) => save({ ...getSnapshot().progress, goal });

export const exportProgress = () => JSON.stringify(getSnapshot().progress);

export function importProgress(text: string): boolean {
    let imported: Progress | null = null;
    try {
        imported = parseProgress(JSON.parse(text));
    } catch {
        return false;
    }
    return imported !== null && save(mergeProgress(getSnapshot().progress, imported));
}

export const useDone = () => new Set(Object.keys(useProgress().progress.done));
