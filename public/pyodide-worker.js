// Runs learner Python in a Web Worker (Pyodide), so a runaway loop can be killed without freezing the page.
importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.5/full/pyodide.js");

const ready = loadPyodide().then((py) => {
    self.postMessage({ type: "ready" });
    return py;
});

// Runs each top-level test statement on its own so a failure names the exact assert.
const RUN_TESTS = `
import ast
def _run_tests(src, ns):
    for stmt in ast.parse(src).body:
        line = ast.get_source_segment(src, stmt)
        try:
            exec(compile(ast.Module([stmt], []), "<teste>", "exec"), ns)
        except AssertionError:
            raise AssertionError("Teste falhou: " + line) from None
`;

const lastLine = (msg) => msg.trim().split("\n").filter(Boolean).pop() || msg;

self.onmessage = async ({ data }) => {
    const { id, code, test } = data;
    const py = await ready;
    const out = [];
    py.setStdout({ batched: (s) => out.push(s) });
    py.setStderr({ batched: (s) => out.push(s) });
    const ns = py.globals.get("dict")();
    try {
        await py.runPythonAsync(code, { globals: ns });
        py.runPython(RUN_TESTS);
        py.globals.get("_run_tests")(test, ns);
        self.postMessage({ type: "result", id, ok: true, output: out.join("\n") });
    } catch (err) {
        self.postMessage({ type: "result", id, ok: false, output: out.join("\n"), error: lastLine(String(err.message ?? err)) });
    } finally {
        ns.destroy();
    }
};
