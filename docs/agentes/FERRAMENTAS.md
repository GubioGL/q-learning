# Ferramentas de cada agente

Pesquisa feita em 2026-11-26. Tudo marcado **já configurado** vem com o repositório; o resto é opcional e precisa de uma ação sua.

## Já configurado no repositório

| Item | Onde | Usado por |
|---|---|---|
| MCP `context7` (docs atuais de bibliotecas) | `.mcp.json` | ilustrador, físico, eng. software, eng. dados |
| MCP `playwright` (navegador real) | `.mcp.json` | qa, ilustrador, eng. software, concorrência |
| MCP `parallel-search` (busca e leitura web, grátis, sem chave) | `.mcp.json` | físico, pesquisador, divulgador, estrategista, concorrência |
| Skill `escrever-skill-de-aula` | `.claude/skills/` | conversor |
| Skill `ilustrar-com-manim` | `.claude/skills/` | ilustrador |
| Skill `checklist-de-release` | `.claude/skills/` | qa |
| Plugins `engineering` e `design` (marketplace `knowledge-work-plugins`) | `.claude/settings.json` | código review/debug/ADR/documentação, acessibilidade, crítica de design, UX copy |

Na primeira vez, o Claude Code pergunta se você confia nos servidores de `.mcp.json` e nos plugins: aceite. O `playwright` usa `npx` e pode pedir `npx playwright install`.

## Por agente

| Agente | MCP | Skills / plugins úteis |
|---|---|---|
| conversor-de-material | (usa `markitdown`/`pdftotext` no terminal) | `escrever-skill-de-aula`; Education Skills Library |
| ilustrador-manim | context7, playwright | `ilustrar-com-manim`; `animation-studio`; `design:design-critique` |
| fisico-revisor | context7, parallel-search | alphaXiv (arXiv); `math-olympiad` |
| pedagogo | — | **Education Skills Library** (cognitive-load, dual-coding, hint ladder, UDL…); `design:accessibility-review` |
| tradutor-i18n | — | `writing-skills:plain-language`, `microsoft-style` |
| qa-testador | playwright | `checklist-de-release`; `design:accessibility-review`; `engineering:testing-strategy` |
| engenheiro-de-software | context7, playwright | `engineering:code-review`, `debug`, `system-design`, `tech-debt` |
| engenheiro-de-dados | context7 | `engineering:architecture`; Google Sheets; Supabase só se houver backend |
| escriba | — | `engineering:documentation`, `architecture`, `standup` |
| pesquisador-de-materiais | parallel-search | alphaXiv, Google Drive, `deep-research` |
| divulgador | parallel-search | `animation-studio` (vídeo 9:16); OpenSEO e Metricool (opcionais) |
| estrategista-de-negocio | parallel-search | `writing-skills:prfaq-amazon`, `design:research-synthesis`; Google Sheets |
| analista-de-concorrencia | parallel-search, playwright | `design:design-critique`, `design:user-research` |

## Opcionais que precisam de ação sua

- **Claude Education Skills Library** (165 skills de pedagogia, comunidade) e **animation-studio**: instale pelo diretório de plugins do claude.ai ou `/plugin`.
- **alphaXiv** (papers do arXiv): conector do claude.ai, precisa concluir a autenticação.
- **OpenSEO**, **Metricool**: conectores de conta; só quando for divulgar de verdade.
- Plugins e conectores pagos ou com conta nunca são ativados sem sua decisão.

## Observações
- `parallel-search` usa a URL anônima `https://search.parallel.ai/mcp`. A Parallel anunciou um servidor novo com login; se o anônimo parar, troque a URL em `.mcp.json`.
- Nomes de skills de plugin só funcionam se o plugin estiver instalado; sem ele, o agente segue o prompt normalmente.
- Agentes só enxergam MCP listado em `tools` (`mcp__servidor__*`) e em `mcpServers`.
