---
name: escrever-skill-de-aula
description: Checklist e molde para transformar material bruto em uma skill de aula da Quantum Learning (markdown, exercícios, nível de desafio). Use ao criar ou revisar qualquer skill.
---
# Molde de skill de aula

Guia completo: `content/README.md`. Resumo operacional:

1. **Posição**: entrada em `content/courses.ts` (id minúsculo com hífens; a ordem da lista é a trilha) e nível em `content/levels/<id>.ts` + `content/levels/index.ts`.
2. **Arquivo**: `content/skills/<curso>/<skill>.md`. Estrutura sugerida:
   - gancho curto (pergunta ou situação), 
   - conceito com exemplo **antes** da fórmula, 
   - `## seções` curtas com KaTeX (`$x$`, `$$...$$`),
   - figura: `![descrição útil](/content/<curso>/arquivo.svg)` ou `<!-- ILUSTRAR: ideia -->`,
   - exercício após cada ideia nova, em dificuldade crescente.
3. **Exercícios**: bloco com `id:` único na primeira linha. `exercise:number` (`answer`, `tolerance`), `exercise:text` (respostas separadas por `|`), `exercise:python` (cabeçalho `input:`/`output:` → código inicial → exatamente 3 testes `>>>`; estados/vetores/matrizes em `np.array`).
4. **Originalidade**: nada copiado ou traduzido de PDF/livro. Reescreva com exemplos próprios e cite a fonte.
5. **Conferir**: `npm test` (valida exercícios, fórmulas, imagens, níveis, traduções).

Ao entregar, liste: arquivos criados, dúvidas de física (para `fisico-revisor`), onde falta figura (para `ilustrador-manim`).
