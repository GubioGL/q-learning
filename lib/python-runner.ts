// Browser-side client for public/pyodide-worker.js.

import type { Case } from "./exercise";

export type TestResult = { ok: boolean; got?: string; error?: string };
// error: the code itself did not run; then every test failed.
export type RunResult = { output: string; tests: TestResult[]; error?: string };

export const TIMEOUT_ERROR = "timeout";

const FIRST_RUN_TIMEOUT_MS = 60_000; // includes downloading Pyodide (~10 MB)
const RUN_TIMEOUT_MS = 10_000;

let worker: Worker | null = null;
let isReady = false;
let nextId = 0;

function getWorker() {
    if (!worker) {
        worker = new Worker("/pyodide-worker.js");
        worker.addEventListener("message", (e) => { if (e.data.type === "ready") isReady = true; });
    }
    return worker;
}

export const preloadPython = () => void getWorker();

export function runPython(code: string, tests: Case[][]): Promise<RunResult> {
    const w = getWorker();
    const id = nextId++;
    return new Promise((resolve) => {
        const timer = setTimeout(() => {
            w.terminate(); // kills infinite loops; a fresh worker is created on the next run
            worker = null;
            isReady = false;
            w.removeEventListener("message", onMessage);
            resolve({ output: "", tests: tests.map(() => ({ ok: false })), error: TIMEOUT_ERROR });
        }, isReady ? RUN_TIMEOUT_MS : FIRST_RUN_TIMEOUT_MS);
        function onMessage(e: MessageEvent) {
            if (e.data.type !== "result" || e.data.id !== id) return;
            clearTimeout(timer);
            w.removeEventListener("message", onMessage);
            resolve({ output: e.data.output, tests: e.data.tests, error: e.data.error });
        }
        w.addEventListener("message", onMessage);
        w.postMessage({ id, code, tests: tests.map((cases) => cases.map((c) => [c.call, c.expected])) });
    });
}
