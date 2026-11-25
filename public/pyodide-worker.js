// Runs learner Python in a Web Worker (Pyodide), so a runaway loop can be killed without freezing the page.
importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.5/full/pyodide.js");

// NumPy comes with it: states, vectors and matrices in the exercises are arrays.
const ready = loadPyodide({ packages: ["numpy"] }).then((py) => {
    self.postMessage({ type: "ready" });
    return py;
});

// Each test is a list of [call, expected] expressions. Numbers are compared with a small tolerance, and arrays,
// lists and tuples with the same items are equal. Its own namespace: learner code cannot replace it.
const RUN_TESTS = `
import json
import numpy as np

TOLERANCE = 1e-9
NUMERIC_KINDS = "biufc"

def same(a, b):
    if isinstance(a, np.ndarray) or isinstance(b, np.ndarray):
        a, b = np.asarray(a), np.asarray(b)
        if a.shape != b.shape:
            return False
        if a.dtype.kind in NUMERIC_KINDS and b.dtype.kind in NUMERIC_KINDS:
            return bool(np.all(np.abs(a * 1.0 - b) <= TOLERANCE))
        return bool(np.array_equal(a, b))
    a = a.item() if isinstance(a, np.generic) else a
    b = b.item() if isinstance(b, np.generic) else b
    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):
        return len(a) == len(b) and all(same(x, y) for x, y in zip(a, b))
    if isinstance(a, (int, float, complex)) and isinstance(b, (int, float, complex)):
        return abs(a - b) <= TOLERANCE
    return type(a) == type(b) and a == b

def run_test(cases, ns):
    got = ""
    try:
        for call, expected in cases:
            value = eval(call, ns)
            got = repr(value.item() if isinstance(value, np.generic) else value)[:500]
            if not same(value, eval(expected, ns)):
                return {"ok": False, "got": got}
    except BaseException as e:
        return {"ok": False, "error": f"{type(e).__name__}: {e}"[:500]}
    return {"ok": True, "got": got}

def run_tests(tests_json, ns):
    ns.setdefault("np", np)  # the tests use np even if the learner removed the import
    return json.dumps([run_test(cases, ns) for cases in json.loads(tests_json)])
`;

const lastLine = (msg) => msg.trim().split("\n").filter(Boolean).pop() || msg;

self.onmessage = async ({ data }) => {
    const { id, code, tests } = data;
    const py = await ready;
    const out = [];
    py.setStdout({ batched: (s) => out.push(s) });
    py.setStderr({ batched: (s) => out.push(s) });
    const ns = py.globals.get("dict")();
    const checker = py.globals.get("dict")();
    const done = (result) => self.postMessage({ type: "result", id, output: out.join("\n"), ...result });
    try {
        await py.runPythonAsync(code, { globals: ns });
        const output = out.join("\n"); // what the tests print would reveal the hidden ones
        py.runPython(RUN_TESTS, { globals: checker });
        const results = JSON.parse(checker.get("run_tests")(JSON.stringify(tests), ns));
        done({ output, tests: results });
    } catch (err) {
        done({ tests: tests.map(() => ({ ok: false })), error: lastLine(String(err.message ?? err)) });
    } finally {
        ns.destroy();
        checker.destroy();
    }
};
