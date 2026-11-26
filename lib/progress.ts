// Sequential unlocking: an item opens only after every item before it is done.

export type NodeState = "done" | "open" | "locked";

export const skillKey = (courseId: string, skillId: string) => `skill:${courseId}/${skillId}`;
export const levelKey = (levelId: string) => `level:${levelId}`;

// Dev mode: `npm run dev:tudo` unlocks everything for the owner; needs the dev server, so production builds never unlock.
const UNLOCK_ALL = process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_UNLOCK_ALL === "1";

export function pathStates(keys: string[], done: Set<string>, unlockAll = UNLOCK_ALL): NodeState[] {
    let blocked = false;
    return keys.map((key) => {
        // done first: an item added later before finished ones must not lock them
        if (done.has(key)) return "done";
        if (blocked && !unlockAll) return "locked";
        blocked = true;
        return "open";
    });
}

export const percentDone = (keys: string[], done: Set<string>) =>
    keys.length === 0 ? 0 : Math.round((keys.filter((k) => done.has(k)).length / keys.length) * 100);
