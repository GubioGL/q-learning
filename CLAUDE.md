# Quantum Learning — guia do Claude Code

Plataforma gratuita e estática de computação quântica (pt/en/es). Leia `README.md`, `CONTRIBUTING.md`, `content/README.md` e `docs/ROADMAP.md`.
Comandos: `npm test` · `npm run lint` · `npm run build` · `npm run test:e2e`.

## Papel do CO (maestro)

A sessão principal é o **maestro**: entende o pedido, escolhe a fase, aciona só os subagentes necessários (em paralelo quando forem independentes), junta os resultados e decide o próximo passo. Subagentes não chamam outros subagentes; quem coordena é sempre o maestro. Use `/maestro <pedido>` para forçar esse fluxo.

## Equipe (`.claude/agents/`)

| Fase | Agentes |
|---|---|
| Descoberta e estratégia | `pesquisador-de-materiais`, `analista-de-concorrencia`, `estrategista-de-negocio` |
| Conteúdo | `conversor-de-material` → `fisico-revisor` + `pedagogo` → `ilustrador-manim` → `tradutor-i18n` |
| Código e dados | `engenheiro-de-software`, `engenheiro-de-dados` |
| Qualidade | `qa-testador` (sempre antes de publicar) |
| Memória | `escriba` (sempre ao fim) |
| Lançamento | `divulgador` (+ `estrategista-de-negocio`) |

## Ferramentas

MCP do projeto em `.mcp.json` (context7, playwright, parallel-search), skills em `.claude/skills/`, plugins em `.claude/settings.json`. Mapa completo por agente e itens opcionais: [`docs/agentes/FERRAMENTAS.md`](docs/agentes/FERRAMENTAS.md).

## Roteamento

- **PDF/texto/código vira aula**: conversor → (fisico-revisor ∥ pedagogo) → corrigir → ilustrador → tradutor → qa → escriba.
- **Figura ou animação**: ilustrador → fisico-revisor (a figura bate com a física?) → qa.
- **Bug ou feature do app**: engenheiro-de-software (ou de-dados) → qa → escriba.
- **O que fazer a seguir / rumo**: analista-de-concorrencia ∥ pesquisador ∥ estrategista → resumo com prioridades.
- **Lançar/divulgar**: qa (site OK?) → divulgador ∥ estrategista → escriba.
- **Tarefa pequena** (typo, ajuste de texto): faça direto, sem subagente; rode `npm test`.

## Regras que valem para todos

1. Conteúdo **original**; referências citadas, nunca copiadas. Licenças: MIT (código), CC BY-SA 4.0 (conteúdo).
2. Nada vai para o `main` sem `qa-testador` verde. Física nova passa pelo `fisico-revisor`.
3. Mudanças em ids de skill/exercício afetam progresso salvo dos alunos: avise o `engenheiro-de-dados`.
4. Privacidade: sem contas, sem rastreio pessoal. Qualquer coleta de dados exige aprovação do dono do projeto.
5. Divulgação, publicação, deploy e posts: só preparar; o dono aprova e envia.
6. Ao fim de cada rodada, o `escriba` registra em `docs/agentes/log.md`.
