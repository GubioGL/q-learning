# Roadmap — Quantum Learning (Duolingo para Computação Quântica)

Guia de execução por etapas. Base: `Duolingo_para_Computação_Quântica.pdf` (plano de 6 meses).
Marque `[x]` ao concluir. Cada etapa termina com algo rodando e um commit.

## Decisões fixadas

- Stack: Next.js 15 + React 19 + Tailwind 4; páginas 100% estáticas em `/pt`, `/en` e `/es`.
- **Sem conta e sem banco:** o progresso fica no `localStorage` (`lib/use-progress.ts`), com exportar/importar na
  página de Metas. É o mais barato e rápido. Limites: não há ranking confiável, e limpar o navegador apaga o progresso
  (o Safari pode apagar após 7 dias sem visita). O código com Clerk + Neon está no git até `13227cf`.
- Hospedagem: só GitHub Pages (grátis), https://gubiogl.github.io/q-learning, publicado a cada push no `main` por
  `.github/workflows/pages.yml`. Sem redirecionamentos: `public/index.html` escolhe o idioma.
- Exercícios em Python: estados, vetores e matrizes são `np.array`; texto (bits, circuitos) continua string.
- Duas áreas: **Cursos** (codebook estilo PennyLane: texto, ilustração e exercícios em Python,
  número ou texto, skills em sequência) e **Desafios** (estilo Duolingo: trilha única de níveis,
  do básico ao avançado; errar tudo recomenda a skill do curso).
- Conteúdo em arquivos no repositório (`content/`, guia em `content/README.md`).
- Loja oculta até haver um meio de doação; Classificação oculta enquanto não houver contas.
- Licenças: MIT (código) e CC BY-SA 4.0 (conteúdo e livro).
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

## Etapa 3 — Gamificação (sem login) ✅ (2026-11-25)

- [x] XP, streak e metas diárias/semanais calculados das conclusões (`lib/stats.ts`; dia e semana no fuso de São Paulo).
- [x] Meta diária salva por visitante (`user_progress.dailyActivities`), sem precisar de login.
- [x] Repetir um item concluído não dá XP; o cabeçalho com menu aparece em toda tela sem barras laterais.
- [x] Removida a API `/api/user-profile` (sem autenticação) e o contexto de metas no cliente.
- Editor de código: o `textarea` fica; CodeMirror só se incomodar.

## Etapas 4–6 — Conteúdo ✅ (2026-11-25)

Formato em `content/README.md`. Cada skill tem um nível na trilha de Desafios e uma seção em `livro/Aprofundamento.tex`.

| Etapa | Módulo | Base no Wong | Skills |
|-------|--------|--------------|--------|
| 4 | Fundamentos Básicos (clássica → qubit) | caps. 1–2 | 8 |
| 5 | Álgebra Linear | cap. 3 | 6 |
| 6 | Computação Quântica e Teoria Quântica | caps. 4 e 6 | 6 + 5 |

- [x] 25 skills com texto, KaTeX, ilustrações e exercícios (25 em Python), todas originais.
- [x] 25 níveis de desafio, na ordem dos cursos.
- [x] `lib/content.test.ts` confere exercícios, fórmulas, imagens e níveis a cada `npm test`.
- [x] Livro: `Aprofundamento.tex`, uma subseção por skill.

## Etapa 7 — Beta ✅ (2026-11-25)

- [x] Site inteiro sem login: progresso no navegador, exportar/importar, dia e semana no fuso do visitante.
- [x] Conquistas (`/conquistas`): primeira atividade, sequências, XP, cursos e trilha.
- [x] i18n: interface, 25 skills, 25 níveis e ilustrações em pt / en / es.
- [x] Acessibilidade (axe, WCAG 2.1 AA, sem violações) e celular (360 px, sem rolagem lateral).
- [x] Licenças e `CONTRIBUTING.md`.
- [x] Publicação da 1ª versão beta.
- [ ] Divulgação.

## Etapa 8 — Conteúdo: esfera de Bloch (2026-11-26, não commitado)

- [x] Skill `esfera-de-bloch` (curso básico, entre `portas-1-qubit` e `circuitos`) em pt/en/es, com 6 desafios.
- [x] 2 figuras novas: `bloch-theta-phi.svg` e `meias-voltas-xzh.svg`.
- [x] test, lint, build, e2e e axe confirmados pelo qa-testador.
- [ ] Commit e publicação (a confirmar com o dono).
- [ ] `medida.md`: seção curta sobre Bloch (unificar com a skill nova; id `medida-bloch` mantido).
- [ ] Tema claro real no site (hoje não existe).
- [ ] Figura `meias-voltas-xzh` pequena em 360 px.
- [ ] Verificar os links de `referencias/links.txt`.

## Etapa 9 — Mini-lições e ilustrações (2026-11-27, não commitado)

- [x] Cada `##` da skill vira uma mini-lição (`lib/mini-lessons.ts`, `components/skill/lesson-stepper.tsx`); "Continuar" só abre após o mini-desafio.
- [x] Mini-desafios resolvidos ficam no navegador (`ql_solved`) e a página retoma de onde parou.
- [x] Todos os marcadores ILUSTRAR viraram SVG (38 figuras: hardware, algoritmos, computacao-quantica).
- [x] As 23 skills só em pt: toda mini-lição tem mini-desafio (53 desafios novos; seções longas divididas).
- [ ] As 30 skills traduzidas: mini-desafios nas seções sem exercício (exige en/es por causa do teste de paridade).
- [x] Revisão de física (fisico-revisor ×3) e pedagógica; correções aplicadas; qa-testador verde.
- [ ] Exportar/importar em /metas não leva `ql_solved`.

## Depois do beta

- [ ] Revisão das traduções por falantes nativos.
- [ ] Loja (doações), quando houver chave Pix ou link.
- [ ] Classificação, só se o projeto voltar a ter contas.

## Ferramentas (economia de tokens)

- Plugins instalados: `context7` (docs atualizadas), `vercel` (deploy/logs), `playwright` (testes no navegador).
- `markitdown` para PDFs → markdown antes de ler.
- Craft Anything (CLI em Rust, servidor MCP): estudar telas de referência (coddy.tech) — opcional.
- Graphify: só se o projeto passar de ~150 arquivos.
