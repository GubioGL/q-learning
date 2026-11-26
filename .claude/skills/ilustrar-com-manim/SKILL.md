---
name: ilustrar-com-manim
description: Padrões visuais e comandos para criar ilustrações e animações didáticas (Manim e SVG) da Quantum Learning, com acessibilidade e versões em pt/en/es.
---
# Ilustrar com Manim e SVG

**Identidade visual**: fundo transparente ou claro/escuro seguro; roxo (cor do mascote) como destaque; um significado por cor, sempre o mesmo (|0⟩, |1⟩, fase, medida). Contraste WCAG AA, fonte legível a 360 px, no máximo ~10 palavras por figura.

**Escolha do formato**
- Ideia estática → SVG em `public/content/<curso>/<nome>.svg` (modelo: `bloch.svg`). Pode ser gerado por script Python (matplotlib `savefig(..., format="svg")`) ou desenhado à mão.
- Passo a passo ou movimento → Manim Community: código em `illustrations/manim/<curso>/<cena>.py`.
  - Instalar: `pip install manim` (precisa de ffmpeg, cairo, pango).
  - Renderizar: `manim -qm -t arquivo.py Cena` (`-t` fundo transparente; saída em `media/`, que não vai para o git).
  - Converter para web leve: `ffmpeg -i in.mov -c:v libvpx-vp9 -b:v 0 -crf 40 -an out.webm` (meta <1 MB, sem áudio).
  - Quadro-chave estático: `manim -s` gera PNG; para SVG vetorial do objeto, o plugin `manim-mobject-svg` (`obj.to_svg()`) — confirme a versão antes de usar.
- Conceito que o aluno manipula → proponha componente interativo ao `engenheiro-de-software`.

**Mapas de ideias**: qubit → esfera de Bloch; portas → rotações na esfera; medida → barras de probabilidade Born; emaranhamento → duas moedas ligadas; produto interno → projeção de vetores; circuitos → fios e caixas.

**Entrega**: caminho exato do arquivo, texto alternativo sugerido, variantes `.en.svg`/`.es.svg` quando houver texto. Renderize para PNG e **olhe** o resultado antes de entregar. No markdown da skill, `![descrição](/content/...)`.
