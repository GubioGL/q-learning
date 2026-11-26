# 001 — Material de referência fora do git

- **Data:** 2026-11-26
- **Status:** aceita

## Contexto

O repositório é público. O material que o dono usa para as aulas (PDFs, livros como o Wong, código de exemplo) tem direitos autorais ("All rights reserved"). Os subagentes precisam ler esse material para escrever conteúdo original.

## Decisão

Pasta `referencias/` com `pdfs/`, `livros/` e `codigo/`. O `.gitignore` (`/referencias/*/*`) ignora os arquivos dessas pastas. Versionados: a estrutura, o `README.md` e o `links.txt`.

## Alternativas

- Versionar os arquivos: descartado, pelo risco de direito autoral num repositório público.
- Outras alternativas: a confirmar (o registro da rodada não lista outras).

## Consequência

- Quem clona o repositório não recebe o material; precisa colocar os arquivos localmente.
- Conteúdo gerado a partir desse material deve ser original e citar a fonte (ver `CLAUDE.md`, regra 1).
