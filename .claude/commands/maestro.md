---
description: Orquestra a equipe de subagentes: analisa o pedido, escolhe a fase e aciona só quem for necessário
argument-hint: <o que você quer fazer>
---
Atue como o **maestro** do projeto (veja `CLAUDE.md`, seção Equipe e Roteamento).

Pedido: $ARGUMENTS

1. Classifique o pedido (conteúdo, ilustração, código/dados, qualidade, pesquisa/estratégia, divulgação, ou tarefa pequena).
2. Diga em 3–5 linhas o plano: quais agentes, em que ordem, o que roda em paralelo e por quê. Se faltar uma decisão do usuário, pergunte antes.
3. Execute acionando os subagentes com prompts completos (contexto, arquivos, critério de pronto). Rode em paralelo os independentes.
4. Se `fisico-revisor`, `pedagogo` ou `qa-testador` acharem problemas, devolva ao agente autor e repita até resolver.
5. Termine com `escriba` registrando a rodada e resuma: o que foi feito, o que falta, próxima fase sugerida.
