# Conteúdo — como escrever cursos e desafios

O site tem duas partes, e todo o conteúdo fica nesta pasta (o banco guarda só o progresso).

| Parte | O que é | Onde fica |
|-------|---------|-----------|
| **Cursos** (codebook) | Texto, ilustrações e exercícios curtos, uma skill por página | `courses.ts` + `skills/<curso>/<skill>.md` |
| **Desafios** (estilo Duolingo) | Trilha única de níveis de múltipla escolha | `levels/*.ts` + ordem em `levels/index.ts` |

Texto e exercícios são **originais**. O livro do Wong é a referência de estrutura e deve ser citado, nunca copiado.

## Cursos

1. Liste a skill no curso em `courses.ts` (`id` em minúsculas com hífens). A ordem da lista é a ordem da trilha.
2. Crie `skills/<id-do-curso>/<id-da-skill>.md`. Enquanto o arquivo não existir, a página mostra "em breve".

### Markdown da skill

- Markdown normal: `## títulos`, **negrito**, listas, `> citações`, imagens `![descrição](/content/<curso>/arquivo.svg)` (arquivos em `public/content/`).
- Matemática com KaTeX: `$x^2$` no texto, `$$ ... $$` em bloco.
- Exercícios são blocos de código especiais. **A primeira linha é sempre `id:`**, único na skill.
  Escreva o enunciado num parágrafo logo antes do bloco.

Resposta numérica (aceita vírgula ou ponto; `tolerance` é opcional):

````md
```exercise:number
id: bits-1101
answer: 13
tolerance: 0.001
```
````

Resposta em texto (várias respostas aceitas separadas por `|`; ignora maiúsculas e espaços extras):

````md
```exercise:text
id: bits-nove
answer: 1001 | 0b1001
```
````

Python (roda no navegador com Pyodide). Três partes separadas por `---`: id, código inicial, testes.
Cada linha de teste roda separada, e a que falhar aparece para o aluno:

````md
```exercise:python
id: bits-para-decimal
---
def binario_para_decimal(bits):
    return 0
---
assert binario_para_decimal("101") == 5
```
````

A skill é concluída quando todos os exercícios estão resolvidos. Isso libera a próxima skill do curso.

## Desafios

1. Crie `levels/<id>.ts` seguindo `levels/bits.ts`: `course` e `skill` indicam a skill recomendada quando o aluno perde todos os corações.
2. Adicione o nível em `levels/index.ts` na posição certa da trilha (do mais básico ao mais avançado).
   Cada nível só abre depois que o anterior foi concluído.

## Conferir

```bash
npm test                 # formato dos exercícios e regras de desbloqueio
npm run build && npm start
CHROME_PATH=/usr/bin/google-chrome npm run test:e2e   # fluxo completo no navegador
```
