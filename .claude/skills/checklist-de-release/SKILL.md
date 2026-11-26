---
name: checklist-de-release
description: Checklist de verificação antes de publicar no main (GitHub Pages) da Quantum Learning: testes, build, e2e, acessibilidade, traduções, links e licenças.
---
# Checklist de release

Rode e marque; relate ❌ com saída do erro. Nunca marque ✅ sem ter executado.

- [ ] `npm ci` (se necessário) e `npm test`
- [ ] `npm run lint`
- [ ] `npm run build` (gera `dist/q-learning`)
- [ ] `npm start` em background; `CHROME_PATH=<chromium> npm run test:e2e`
- [ ] Páginas tocadas no navegador (pt, en, es): KaTeX, imagens, exercício certo e errado, Python no Pyodide
- [ ] 360 px sem rolagem lateral; teclado navega; contraste AA; imagens com alt
- [ ] Skill nova: nível na trilha, tradução en/es, figura nas 3 línguas se tiver texto
- [ ] Links externos do README e das aulas respondem
- [ ] Créditos/referências e licença (MIT código, CC BY-SA conteúdo) corretos
- [ ] `docs/CHANGELOG.md` e `docs/agentes/log.md` atualizados (escriba)
