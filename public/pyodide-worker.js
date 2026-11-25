// Runs learner Python in a Web Worker (Pyodide), so a runaway loop can be killed without freezing the page.
importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.5/full/pyodide.js");

const ready = loadPyodide().then((py) => {
    self.postMessage({ type: "ready" });
    return py;
});

// Each test is a list of [call, expected] expressions. Numbers are compared with a small tolerance,
// and lists and tuples with the same items are equal. Its own namespace: learner code cannot replace it.
const RUN_TESTS = `
import json

def same(a, b):
    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):
        return len(a) == len(b) and all(same(x, y) for x, y in zip(a, b))
    if isinstance(a, (int, float, complex)) and isinstance(b, (int, float, complex)):
        return abs(a - b) <= 1e-9
    return type(a) == type(b) and a == b

def run_test(cases, ns):
    got = ""
    try:
        for call, expected in cases:
            value = eval(call, ns)
            got = repr(value)[:500]
            if not same(value, eval(expected, ns)):
                return {"ok": False, "got": got}
    except BaseException as e:
        return {"ok": False, "error": f"{type(e).__name__}: {e}"[:500]}
    return {"ok": True, "got": got}

def run_tests(tests_json, ns):
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
