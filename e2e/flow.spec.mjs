import { test, expect } from "@playwright/test";
const OUT = process.env.OUT ?? "test-results";
const shot = async (page, name) => { await page.waitForTimeout(400); await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true }); };

test("courses -> skill -> challenges flow", async ({ page }) => {
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  // progress lives in the browser: a fresh context starts with none

  await page.goto("/pt/cursos");
  await expect(page.getByRole("heading", { name: "Cursos" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Fundamentos Básicos/ })).toContainText("0%");
  const panel = page.locator(".sidebar-direita");
  await expect(panel.getByLabel("Sequência de 0 dia(s)")).toBeVisible();
  await expect(panel.getByLabel("0 XP no total")).toBeVisible();
  await expect(panel.getByText("0/30")).toBeVisible();
  await shot(page, "1-cursos");

  await page.goto("/pt/metas");
  const goal = page.getByLabel("Quantas atividades diárias você quer fazer?");
  await goal.fill("21");
  await page.getByRole("button", { name: "Salvar Configurações" }).click();
  await expect(page.getByText("Digite um número inteiro de 1 a 20.")).toBeVisible();
  await expect(panel.getByText("0/30")).toBeVisible();
  await goal.fill("5");
  await page.getByRole("button", { name: "Salvar Configurações" }).click();
  await expect(page.getByText("Metas salvas com sucesso!")).toBeVisible({ timeout: 30_000 });
  await expect(panel.getByText("0/350", { exact: true })).toBeVisible();
  await page.reload();
  await expect(goal).toHaveValue("5");
  await shot(page, "1b-metas");

  await page.goto("/pt/cursos/basico");
  await expect(page.getByRole("link", { name: /Bits e números binários/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Portas lógicas/ })).toHaveCount(0);
  await shot(page, "2-trilha-skills");
  await page.goto("/pt/cursos/basico/portas-logicas");
  await expect(page.getByText("Esta skill ainda está bloqueada")).toBeVisible();

  await page.goto("/pt/cursos/basico/bits");
  await expect(page.locator(".katex").first()).toBeVisible();
  const concluir = page.getByRole("button", { name: "Concluir skill" });
  await expect(concluir).toBeDisabled();
  await page.locator("#bits-combinacoes").fill("8");
  await page.locator("#bits-combinacoes").press("Enter");
  await expect(page.getByText("Ainda não. Tente de novo.")).toBeVisible();
  await page.locator("#bits-combinacoes").fill("16"); await page.locator("#bits-combinacoes").press("Enter");
  await page.locator("#bits-1101").fill("13"); await page.locator("#bits-1101").press("Enter");
  await page.locator("#bits-nove").fill("1001"); await page.locator("#bits-nove").press("Enter");
  const run = page.getByRole("button", { name: /Executar e testar/ });
  await run.click();
  await expect(page.getByText(/Teste falhou: assert binario_para_decimal\("101"\) == 5/)).toBeVisible({ timeout: 90_000 });
  await shot(page, "3-python-falhou");
  await page.locator("#bits-para-decimal").fill(
    'def binario_para_decimal(bits):\n    total = 0\n    for k, b in enumerate(reversed(bits)):\n        total += int(b) * 2**k\n    print("ok", total)\n    return total\n');
  await run.click();
  await expect(page.getByText("Todos os testes passaram!")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText("Tudo certo!")).toBeVisible();
  await shot(page, "4-skill-pronta");
  await concluir.click();
  await expect(page).toHaveURL(/\/cursos\/basico$/, { timeout: 30_000 });
  await expect(page.getByRole("link", { name: /Portas lógicas/ })).toBeVisible();
  await expect(panel.getByLabel("10 XP no total")).toBeVisible(); // without a page reload
  await expect(panel.getByLabel("Sequência de 1 dia(s)")).toBeVisible();
  await page.goto("/pt/cursos/basico/portas-logicas");
  await expect(page.getByRole("heading", { name: "Universalidade" })).toBeVisible();
  await expect(page.locator(".katex-error")).toHaveCount(0);

  await page.goto("/pt/desafios");
  await expect(page.getByRole("link", { name: /O que é um bit\? \(disponível\)/ })).toBeVisible();
  await expect(page.getByLabel(/Portas lógicas \(bloqueado\)/)).toBeVisible();
  await shot(page, "5-trilha-desafios");
  await page.goto("/pt/desafios/portas-logicas");
  await expect(page.getByText("Este nível ainda está bloqueado")).toBeVisible();

  const playBits = async () => {
    await page.goto("/pt/desafios/bits");
    await page.getByRole("button", { name: "Começar" }).click();
    for (const a of ["2", "8", "5", "110", "8", "0", "0"]) {
      await page.getByRole("radio", { name: a, exact: true }).click();
      await page.getByRole("button", { name: "Verificar" }).click();
      await page.getByRole("button", { name: "Continuar" }).click();
    }
    await expect(page.getByText("Lição concluída!")).toBeVisible();
  };
  await playBits();
  await expect(page.getByText("+10 XP")).toBeVisible({ timeout: 30_000 });
  await page.getByRole("link", { name: "Continuar" }).click();
  await expect(page).toHaveURL(/\/desafios$/);
  await expect(page.getByRole("link", { name: /Portas lógicas \(disponível\)/ })).toBeVisible();
  await expect(panel.getByLabel("20 XP no total")).toBeVisible();
  await expect(panel.getByText("2/5", { exact: true })).toBeVisible();
  await shot(page, "5b-painel");

  // repeating a finished level gives no XP
  await playBits();
  await page.waitForTimeout(2000);
  await expect(page.getByText("+10 XP")).toHaveCount(0);

  await page.setViewportSize({ width: 800, height: 900 });
  await page.goto("/pt/desafios");
  await expect(page.locator(".status-header").getByLabel("20 XP no total")).toBeVisible();
  await page.getByRole("button", { name: "Abrir menu de navegação" }).click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Metas" })).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 900 });

  await page.goto("/pt/desafios/portas-logicas");
  await page.getByRole("button", { name: "Começar" }).click();
  for (const wrong of ["0", "1", "2"]) {
    await page.getByRole("radio", { name: wrong, exact: true }).click();
    await page.getByRole("button", { name: "Verificar" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
  }
  await expect(page.getByText("Sem corações!")).toBeVisible();
  await expect(page.getByRole("link", { name: "Estudar a skill" })).toHaveAttribute("href", "/pt/cursos/basico/portas-logicas");
  await shot(page, "6-sem-coracoes");

  await page.goto("/pt/cursos");
  await expect(page.getByRole("link", { name: /Fundamentos Básicos/ })).toContainText("13%");

  await page.goto("/pt/conquistas");
  await expect(page.getByText("1 de 11 conquistas")).toBeVisible();

  // export, start over in an empty browser, import
  await page.goto("/pt/metas");
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: "Exportar progresso" }).click()]);
  const file = await download.path();
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(panel.getByLabel("0 XP no total")).toBeVisible();
  const upload = page.getByLabel("Importar progresso", { exact: true }).and(page.locator("input"));
  await upload.setInputFiles({ name: "x.json", mimeType: "application/json", buffer: Buffer.from("[1]") });
  await expect(page.getByText("Não foi possível importar")).toBeVisible();
  await upload.setInputFiles(file);
  await expect(page.getByText("Progresso importado.")).toBeVisible();
  await expect(panel.getByLabel("20 XP no total")).toBeVisible();
  await expect(goal).toHaveValue("5");

  // same progress in the other languages
  await page.getByRole("link", { name: "English" }).first().click();
  await expect(page).toHaveURL(/\/en\/metas$/);
  await expect(page.getByRole("heading", { name: "Set Your Goals" })).toBeVisible();
  await expect(panel.getByLabel("20 XP in total")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(errors).toEqual([]);
});

test("old links, languages and unknown pages", async ({ browser, baseURL }) => {
  for (const [locale, path] of [["pt-BR", "/pt"], ["en-US", "/en"], ["es-ES", "/es"], ["fr-FR", "/pt"]]) {
    const context = await browser.newContext({ locale, baseURL });
    const page = await context.newPage();
    await page.goto("/");
    expect(new URL(page.url()).pathname).toBe(path);
    await context.close();
  }
  const { request } = await browser.newContext({ baseURL });
  expect(new URL((await request.get("/cursos/basico")).url()).pathname).toBe("/pt/cursos/basico");
  for (const missing of ["/xx/cursos", "/pt/cursos/nada", "/pt/cursos/basico/nada", "/pt/desafios/nada"]) {
    expect((await request.get(missing)).status(), missing).toBe(404);
  }
});

test("works when the browser blocks storage", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("denied", "SecurityError"); } });
  });
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/pt/metas");
  await page.getByRole("button", { name: "Salvar Configurações" }).click();
  await expect(page.getByText("O navegador não deixou salvar as metas.")).toBeVisible();
  expect(errors).toEqual([]);
});
