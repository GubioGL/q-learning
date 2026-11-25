// Sequential unlocking: an item opens only after every item before it is done.

export type NodeState = "done" | "open" | "locked";

export const skillKey = (courseId: string, skillId: string) => `skill:${courseId}/${skillId}`;
export const levelKey = (levelId: string) => `level:${levelId}`;

export function pathStates(keys: string[], done: Set<string>): NodeState[] {
    let blocked = false;
    return keys.map((key) => {
        if (blocked) return "locked";
        if (done.has(key)) return "done";
        blocked = true;
        return "open";
    });
}

export const percentDone = (keys: string[], done: Set<string>) =>
    keys.length === 0 ? 0 : Math.round((keys.filter((k) => done.has(k)).length / keys.length) * 100);
