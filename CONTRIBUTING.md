# Como contribuir

Toda ajuda é bem-vinda: corrigir um texto, melhorar uma tradução, escrever uma skill ou mexer no código.
(English or Spanish issues and pull requests are welcome too.)

## Rodar o projeto

```bash
npm install
npm run dev        # http://localhost:3000/q-learning/pt
```

Não é preciso banco de dados, conta nem variável de ambiente: o progresso fica no navegador de quem usa.

## Antes de abrir um pull request

```bash
npm test           # lógica e conteúdo (exercícios, fórmulas, imagens, traduções)
npm run lint
npm run build && npm start
CHROME_PATH=/usr/bin/google-chrome npm run test:e2e   # em outro terminal, com o site rodando
```

Arquivos de `public/` usados no código passam por `asset()` (`lib/asset.ts`), porque o site fica em `/q-learning`.

## O que mexer onde

| Quero… | Onde |
|--------|------|
| Escrever ou corrigir aulas e desafios | `content/` (guia em [`content/README.md`](content/README.md)) |
| Traduzir uma aula | `content/skills/<curso>/<skill>.<idioma>.md` e `content/levels/<idioma>/` |
| Traduzir a interface | `lib/i18n/` |
| Mudar regras (XP, streak, conquistas) | `lib/` (funções puras, com testes ao lado) |
| Mudar telas | `app/[locale]/` e `components/` |
| Ver o plano | [`docs/ROADMAP.md`](docs/ROADMAP.md) |

## Regras

- **Conteúdo original.** O livro do Wong e os demais da lista de referências servem de guia e devem ser citados, nunca copiados ou traduzidos.
- Toda skill precisa de ao menos um exercício e de um nível na trilha de Desafios.
- Uma tradução mantém os mesmos exercícios, fórmulas e imagens, na mesma ordem (o teste confere).
- Acessibilidade: imagens com descrição, botões e links com nome, contraste WCAG AA.

## Licença

Ao contribuir, você concorda que o código entra sob [MIT](LICENSE) e o conteúdo sob [CC BY-SA 4.0](LICENSE-CONTENT.md).
