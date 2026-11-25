// Browser-side client for public/pyodide-worker.js.

export type RunResult = { ok: boolean; output: string; error?: string };

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

export function runPython(code: string, test: string): Promise<RunResult> {
    const w = getWorker();
    const id = nextId++;
    return new Promise((resolve) => {
        const timer = setTimeout(() => {
            w.terminate(); // kills infinite loops; a fresh worker is created on the next run
            worker = null;
            isReady = false;
            w.removeEventListener("message", onMessage);
            resolve({ ok: false, output: "", error: "Tempo esgotado: seu código demorou demais (laço infinito?)." });
        }, isReady ? RUN_TIMEOUT_MS : FIRST_RUN_TIMEOUT_MS);
        function onMessage(e: MessageEvent) {
            if (e.data.type !== "result" || e.data.id !== id) return;
            clearTimeout(timer);
            w.removeEventListener("message", onMessage);
            resolve({ ok: e.data.ok, output: e.data.output, error: e.data.error });
        }
        w.addEventListener("message", onMessage);
        w.postMessage({ id, code, test });
    });
}
