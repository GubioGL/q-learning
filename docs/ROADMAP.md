# Roadmap — Quantum Learning (Duolingo para Computação Quântica)

Guia de execução por etapas. Base: `Duolingo_para_Computação_Quântica.pdf` (plano de 6 meses).
Marque `[x]` ao concluir. Cada etapa termina com algo rodando e um commit.

## Decisões fixadas

- Stack: Next.js 15 + React 19 + Tailwind 4 + Clerk (login) + Drizzle + Neon (Postgres).
- Hospedagem: Vercel (Hobby, grátis, uso não comercial) + Neon (grátis).
- Duas áreas: **Cursos** (codebook estilo PennyLane: texto, ilustração e exercícios em Python,
  número ou texto, skills em sequência) e **Desafios** (estilo Duolingo: trilha única de níveis,
  do básico ao avançado; errar tudo recomenda a skill do curso).
- Conteúdo em arquivos no repositório (`content/`, guia em `content/README.md`); o banco guarda só
  o progresso (tabela `completions`).
- Login opcional por enquanto: progresso anônimo por cookie; o Clerk volta na Etapa 3.
- Loja e Classificação ocultas até a Etapa 7.
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

## Etapa 1 — Site online com 1 lição de demonstração ✅ (2026-11-25)

- [x] Neon + Clerk do projeto Vercel existente; `vercel env pull` gera o `.env.local`.
- [x] Tabelas criadas (`drizzle-kit push`) e seed dos cursos nos bancos de dev e produção.
- [x] Página `/lesson/[id]`: múltipla escolha, corações, barra de progresso, tela final.
- [x] Lição real: "O que é um bit?" (`content/lessons/bits.ts`, Wong cap. 1).
- [x] Deploy na Vercel ligado ao GitHub (cada push no `main` publica).
- [x] Segurança: Next 15.5.29, Clerk 6.39.9, drizzle-orm 0.45.4.

## Etapa 2 — Reestruturação: Cursos + Desafios ✅ (2026-11-25)

- [x] Menu: Cursos, Desafios, Metas (Loja e Classificação ocultas; Qtokens fora da tela).
- [x] `/cursos`: cursos com progresso 0–100%.
- [x] `/cursos/[curso]`: trilha de skills; cada skill libera a próxima.
- [x] `/cursos/[curso]/[skill]`: Markdown + KaTeX + ilustrações + exercícios (número, texto, Python via Pyodide em Web Worker).
- [x] `/desafios`: trilha única por curso, níveis travados em sequência; perder os corações recomenda a skill.
- [x] Progresso no banco (`completions`), validado no servidor; anônimo por cookie enquanto o login está desligado.
- [x] Primeira skill escrita: "Bits e números binários"; 2 níveis de desafio.
- [x] Testes: unitários (`npm test`) e E2E do fluxo completo (`npm run test:e2e`).

## Etapa 3 — Conta e gamificação

- [ ] Religar o login (Clerk) nas áreas de estudo e migrar o progresso anônimo para a conta.
- [ ] XP, streak e metas calculados a partir das conclusões (painel da direita hoje é estático).
- [ ] Editor de código melhor (CodeMirror) se o `textarea` incomodar.

## Etapas 4–6 — Conteúdo (por módulo: ~10 skills de curso + níveis de desafio)

Formato em `content/README.md`. Cada skill nova ganha pelo menos um nível na trilha de Desafios.

| Etapa | Módulo | Base no Wong | Apoio |
|-------|--------|--------------|-------|
| 4 | Fundamentos Básicos (clássica → qubit) | cap. 1 (e início do 2) | — |
| 5 | Álgebra Linear | cap. 3 (e partes do cap. 2) | PennyLane Codebook I.1–I.3 |
| 6 | Computação Quântica / Teoria Quântica | caps. 2–4 | PennyLane Codebook "Introduction" |

O livro (`livro/`) cresce em paralelo: cada skill ganha uma seção de aprofundamento.

## Etapa 7 — Beta

- [ ] Reativar Classificação (ranking) e Loja (doações); conquistas.
- [ ] i18n: en / pt / es.
- [ ] Revisão de acessibilidade e mobile; documentação de contribuição.
- [ ] Publicação da 1ª versão beta e divulgação.

## Ferramentas (economia de tokens)

- Plugins instalados: `context7` (docs atualizadas), `vercel` (deploy/logs), `playwright` (testes no navegador).
- `markitdown` para PDFs → markdown antes de ler.
- Craft Anything (CLI em Rust, servidor MCP): estudar telas de referência (coddy.tech) — opcional.
- Graphify: só se o projeto passar de ~150 arquivos.
