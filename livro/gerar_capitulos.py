"""Gera capítulos LaTeX do livro a partir das skills (content/skills/*.md) com pandoc.

Uso: python3 livro/gerar_capitulos.py   (a partir da raiz do repositório)
Exercícios viram só o enunciado (o código Python fica só no capítulo Hands on). Imagens SVG são omitidas.
"""
import re, subprocess, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "livro" / "gerado"
COURSES = (ROOT / "content" / "courses.ts").read_text()

# capítulo do livro -> lista de (curso, skill)
CAPITULOS = {
    "algoritmos": ("Algoritmos quânticos", [("algoritmos", s) for s in
        ["oraculos", "deutsch-jozsa", "bernstein-vazirani", "grover", "qft", "estimacao-de-fase", "shor", "hhl"]]),
    "variacionais": ("Algoritmos variacionais", [("nisq", s) for s in ["trotterizacao", "vqe", "qaoa"]]),
    "plataformas": ("Plataformas e hardware", [("basico", "qubits-fisicos")] + [("hardware", s) for s in
        ["modelo-coprocessador", "complexidade", "portas-nativas", "estados-magicos", "mbqc", "optica-linear"]]),
}


def titulo(skill: str) -> str:
    m = re.search(r'\{ id: "%s", title: "([^"]+)" \}' % re.escape(skill), COURSES)
    assert m, f"skill {skill} não está em courses.ts"
    return m.group(1)


def exercicio(m: re.Match) -> str:
    return ""  # o enunciado já está no parágrafo anterior; código só no capítulo Hands on


def preparar(md: str) -> str:
    md = re.sub(r"```exercise:(\w+)\n(.*?)\n```", exercicio, md, flags=re.S)
    md = re.sub(r"^#+ [^\n]*Python[^\n]*\n.*?(?=^#+ |\Z)", "", md, flags=re.S | re.M)  # seções de exercício em Python
    md = re.sub(r"```python\n.*?\n```", "", md, flags=re.S)  # exemplos de código também ficam de fora
    md = re.sub(r"!\[[^\]]*\]\([^)]*\.svg\)", "", md)  # pdflatex não lê SVG
    md = re.sub(r"\\braket\{([^{}]*)\}", r"\\langle \1\\rangle", md)  # KaTeX usa 1 argumento; o livro, 2
    return md


def sem_longtable(tex: str) -> str:
    """A classe do livro (REVTeX) conflita com longtable e booktabs: troca por tabular simples com \\hline."""
    def tabela(m: re.Match) -> str:
        spec, corpo = m.group(1), m.group(2)
        n = spec.count("\\real{") or len(re.sub(r"@\{\}", "", spec))
        corpo = re.sub(r"\\end(first)?head|\\endlastfoot|\\endfoot|\\noalign\{\}", "", corpo)
        corpo = re.sub(r"\\(top|mid|bottom)rule", r"\\hline", corpo)
        corpo = re.sub(r"\\begin\{minipage\}\[b\]\{[^}]*\}|\\end\{minipage\}|\\raggedright", "", corpo)
        return "\\begin{center}\\begin{tabular}{" + "l" * n + "}\n" + corpo + "\\end{tabular}\\end{center}"
    return re.sub(r"\\begin\{longtable\}\[\]\{(.*?)\}\n(?=\\toprule)(.*?)\\end\{longtable\}", tabela, tex, flags=re.S)


def gerar() -> None:
    OUT.mkdir(exist_ok=True)
    for nome, (cap, itens) in CAPITULOS.items():
        partes = ["\\providecommand{\\tightlist}{\\setlength{\\itemsep}{0pt}\\setlength{\\parskip}{0pt}}\n" + f"\\newpage\n\\section{{{cap}}}\n"]
        for curso, skill in itens:
            md = preparar((ROOT / "content" / "skills" / curso / f"{skill}.md").read_text())
            tex = subprocess.run(["pandoc", "-f", "markdown", "-t", "latex", "--shift-heading-level-by=1", "--wrap=preserve", "--no-highlight"],
                                 input=md, capture_output=True, text=True, check=True).stdout
            tex = sem_longtable(tex)
            partes.append(f"\\subsection{{{titulo(skill)}}}\n{tex}\n")
        (OUT / f"{nome}.tex").write_text("".join(partes))
        print(OUT / f"{nome}.tex")


if __name__ == "__main__":
    gerar()
