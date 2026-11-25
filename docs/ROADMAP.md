# Roadmap — Quantum Learning (Duolingo para Computação Quântica)

Guia de execução por etapas. Base: `Duolingo_para_Computação_Quântica.pdf` (plano de 6 meses).
Marque `[x]` ao concluir. Cada etapa termina com algo rodando e um commit.

## Decisões fixadas

- Stack: Next.js 15 + React 19 + Tailwind 4 + Clerk (login) + Drizzle + Neon (Postgres).
- Hospedagem: Vercel (Hobby, grátis, uso não comercial) + Neon (grátis).
- Conteúdo das lições em arquivos no repositório (`content/`), versionado e fácil de traduzir;
  o banco guarda só usuários e progresso.
- Referência principal de conteúdo: Thomas G. Wong, *Introduction to Classical and Quantum
  Computing* (caps. 1–3). O livro é "All rights reserved": **escrevemos texto e exercícios
  próprios** e citamos o capítulo/seção; nada de copiar trechos.
- O repo do Code With Antonio não tem licença: usamos como referência de arquitetura, sem copiar código.

## Etapa 0 — Base e ferramentas ✅ (2026-11-25)

- [x] `package.json` ressincronizado com o lockfile (Next 15/React 19/Clerk); build volta a compilar.
- [x] Variantes do `Button` restauradas; erros de tipo corrigidos.
- [x] Livro LaTeX em `livro/` (fonte do Overleaf).
- [x] `.env.example` com as variáveis necessárias.
- [x] README com referências e créditos.

## Etapa 1 — Site online com 1 lição de demonstração

- [ ] Criar projeto no Neon e app no Clerk; preencher `.env.local`.
- [ ] `npm run db:push` + seed dos cursos.
- [ ] Página `/lesson/[id]`: desafios de múltipla escolha, corações, barra de progresso, tela final.
- [ ] Uma lição real: "O que é um bit?" (Wong cap. 1).
- [ ] Deploy na Vercel conectado ao GitHub (deploy a cada push) + variáveis de ambiente.

## Etapa 2 — Motor de lições

- [ ] Tipos de desafio: múltipla escolha, completar lacuna, verdadeiro/falso, resposta numérica,
      montar circuito simples / escolher matriz.
- [ ] Matemática com KaTeX (kets, matrizes).
- [ ] XP, streak, energia e metas gravados no banco ao terminar a lição.
- [ ] Testes: unitários do motor + E2E (Playwright) do fluxo "abrir lição → terminar".

## Etapa 3 — Página de teoria (estilo coddy.tech/docs)

- [ ] `/docs/[modulo]/[lição]` em MDX: explicação curta + exemplos + link para o capítulo do livro.
- [ ] Cada lição prática aponta para sua página de teoria.

## Etapas 4–6 — Conteúdo (10 microlições por módulo; meta estendida 30–60)

| Etapa | Módulo | Base no Wong | Apoio |
|-------|--------|--------------|-------|
| 4 | Fundamentos de Computação Clássica | cap. 1 | — |
| 5 | Álgebra Linear Básica | cap. 3 (e partes do cap. 2) | PennyLane Codebook I.1–I.3 |
| 6 | Introdução à Computação Quântica (1 qubit) | cap. 2 | PennyLane Codebook "Introduction" |

O livro (`livro/`) cresce em paralelo: cada lição ganha uma seção de aprofundamento.

## Etapa 7 — Beta

- [ ] Gamificação: ranking, loja (doações), conquistas.
- [ ] i18n: en / pt / es.
- [ ] Revisão de acessibilidade e mobile; documentação de contribuição.
- [ ] Publicação da 1ª versão beta e divulgação.

## Ferramentas (economia de tokens)

- Plugins instalados: `context7` (docs atualizadas), `vercel` (deploy/logs), `playwright` (testes no navegador).
- `markitdown` para PDFs → markdown antes de ler.
- Craft Anything (CLI em Rust, servidor MCP): estudar telas de referência (coddy.tech) — opcional.
- Graphify: só se o projeto passar de ~150 arquivos.
