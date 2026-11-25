import { test, expect } from "@playwright/test";
const BASE = "/q-learning"; // next.config.ts
const OUT = process.env.OUT ?? "test-results";
const shot = async (page, name) => { await page.waitForTimeout(400); await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true }); };

test("courses -> skill -> challenges flow", async ({ page }) => {
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  // progress lives in the browser: a fresh context starts with none

  await page.goto(BASE + "/pt/cursos");
  await expect(page.getByRole("heading", { name: "Cursos" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Fundamentos Básicos/ })).toContainText("0%");
  const panel = page.locator(".sidebar-direita");
  await expect(panel.getByLabel("Sequência de 0 dia(s)")).toBeVisible();
  await expect(panel.getByLabel("0 XP no total")).toBeVisible();
  await expect(panel.getByText("0/30")).toBeVisible();
  await shot(page, "1-cursos");

  await page.goto(BASE + "/pt/metas");
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

  await page.goto(BASE + "/pt/cursos/basico");
  await expect(page.getByRole("link", { name: /Bits e números binários/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Portas lógicas/ })).toHaveCount(0);
  await shot(page, "2-trilha-skills");
  await page.goto(BASE + "/pt/cursos/basico/portas-logicas");
  await expect(page.getByText("Esta skill ainda está bloqueada")).toBeVisible();

  await page.goto(BASE + "/pt/cursos/basico/bits");
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
  const tests = page.getByRole("region", { name: "Testes" }).getByRole("listitem");
  await expect(page.getByText("Reprovou: 1, 2 e 3")).toBeVisible({ timeout: 90_000 });
  await expect(tests.nth(0)).toContainText('binario_para_decimal("101")');
  await expect(tests.nth(0)).toContainText("Sua saída: 0");
  await expect(tests.nth(1)).toContainText("Oculto");
  await expect(tests.nth(1)).not.toContainText("1101");
  // only the example is right: the hidden tests must catch it
  await page.locator("#bits-para-decimal").fill("def binario_para_decimal(bits):\n    return 5\n");
  await run.click();
  await expect(page.getByText("Passou: 1", { exact: false })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText("Reprovou: 2 e 3")).toBeVisible();
  await expect(page.getByText("Faltam 1 exercício(s)")).toBeVisible();
  await page.locator("#bits-para-decimal").fill("def binario_para_decimal(bits)\n    return 5\n");
  await run.click();
  await expect(page.getByText(/Seu código não rodou: SyntaxError/)).toBeVisible({ timeout: 30_000 });
  await shot(page, "3-python-falhou");
  await page.locator("#bits-para-decimal").fill(
    'def binario_para_decimal(bits):\n    total = 0\n    for k, b in enumerate(reversed(bits)):\n        total += int(b) * 2**k\n    print("ok", total)\n    return total\n');
  await run.click();
  await expect(page.getByText("Passou nos testes 1, 2 e 3.")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText("Tudo certo!")).toBeVisible();
  await shot(page, "4-skill-pronta");
  await concluir.click();
  await expect(page).toHaveURL(/\/cursos\/basico\/?$/, { timeout: 30_000 });
  await expect(page.getByRole("link", { name: /Portas lógicas/ })).toBeVisible();
  await expect(panel.getByLabel("10 XP no total")).toBeVisible(); // without a page reload
  await expect(panel.getByLabel("Sequência de 1 dia(s)")).toBeVisible();
  await page.goto(BASE + "/pt/cursos/basico/portas-logicas");
  await expect(page.getByRole("heading", { name: "Universalidade" })).toBeVisible();
  await expect(page.locator(".katex-error")).toHaveCount(0);

  await page.goto(BASE + "/pt/desafios");
  await expect(page.getByRole("link", { name: /O que é um bit\? \(disponível\)/ })).toBeVisible();
  await expect(page.getByLabel(/Portas lógicas \(bloqueado\)/)).toBeVisible();
  await shot(page, "5-trilha-desafios");
  await page.goto(BASE + "/pt/desafios/portas-logicas");
  await expect(page.getByText("Este nível ainda está bloqueado")).toBeVisible();

  const playBits = async () => {
    await page.goto(BASE + "/pt/desafios/bits");
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
  await expect(page).toHaveURL(/\/desafios\/?$/);
  await expect(page.getByRole("link", { name: /Portas lógicas \(disponível\)/ })).toBeVisible();
  await expect(panel.getByLabel("20 XP no total")).toBeVisible();
  await expect(panel.getByText("2/5", { exact: true })).toBeVisible();
  await shot(page, "5b-painel");

  // repeating a finished level gives no XP
  await playBits();
  await page.waitForTimeout(2000);
  await expect(page.getByText("+10 XP")).toHaveCount(0);

  await page.setViewportSize({ width: 800, height: 900 });
  await page.goto(BASE + "/pt/desafios");
  await expect(page.locator(".status-header").getByLabel("20 XP no total")).toBeVisible();
  await page.getByRole("button", { name: "Abrir menu de navegação" }).click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Metas" })).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 900 });

  await page.goto(BASE + "/pt/desafios/portas-logicas");
  await page.getByRole("button", { name: "Começar" }).click();
  for (const wrong of ["0", "1", "2"]) {
    await page.getByRole("radio", { name: wrong, exact: true }).click();
    await page.getByRole("button", { name: "Verificar" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
  }
  await expect(page.getByText("Sem corações!")).toBeVisible();
  await expect(page.getByRole("link", { name: "Estudar a skill" })).toHaveAttribute("href", new RegExp(`^${BASE}/pt/cursos/basico/portas-logicas/?$`));
  await shot(page, "6-sem-coracoes");

  await page.goto(BASE + "/pt/cursos");
  await expect(page.getByRole("link", { name: /Fundamentos Básicos/ })).toContainText("13%");

  await page.goto(BASE + "/pt/conquistas");
  await expect(page.getByText("1 de 11 conquistas")).toBeVisible();

  // export, start over in an empty browser, import
  await page.goto(BASE + "/pt/metas");
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
  const english = panel.getByRole("link", { name: "English" });
  const box = await english.boundingBox();
  expect(box.y).toBeLessThan(60); // top right corner
  expect(box.x).toBeGreaterThan(1280 - 300);
  await english.click();
  await expect(page).toHaveURL(/\/en\/metas\/?$/);
  await expect(page.getByRole("heading", { name: "Set Your Goals" })).toBeVisible();
  await expect(panel.getByLabel("20 XP in total")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(errors).toEqual([]);
});

test("languages and unknown pages", async ({ browser, baseURL }) => {
  for (const [locale, path] of [["pt-BR", "/pt"], ["en-US", "/en"], ["es-ES", "/es"], ["fr-FR", "/pt"]]) {
    const context = await browser.newContext({ locale, baseURL });
    const page = await context.newPage();
    await page.goto(BASE + "/");
    await expect(page).toHaveURL(new RegExp(`${BASE}${path}/?$`));
    await context.close();
  }
  const home = await browser.newPage({ baseURL });
  await home.goto(BASE + "/pt");
  const icon = await home.locator('link[rel="icon"]').getAttribute("href");
  expect(icon).toContain("/icon.png");
  expect((await home.request.get(icon)).status()).toBe(200);
  expect(await home.locator("body").innerText()).not.toMatch(/@/);
  const { request } = await browser.newContext({ baseURL });
  for (const missing of ["/xx/cursos", "/pt/cursos/nada", "/pt/cursos/basico/nada", "/pt/desafios/nada"]) {
    expect((await request.get(BASE + missing)).status(), missing).toBe(404);
  }
});

test("works when the browser blocks storage", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("denied", "SecurityError"); } });
  });
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(BASE + "/pt/metas");
  await page.getByRole("button", { name: "Salvar Configurações" }).click();
  await expect(page.getByText("O navegador não deixou salvar as metas.")).toBeVisible();
  expect(errors).toEqual([]);
});

test("saving does not overwrite what another tab stored", async ({ page }) => {
  await page.goto(BASE + "/pt/metas");
  const save = page.getByRole("button", { name: "Salvar Configurações" });
  await save.click(); // the page has loaded its own copy of the progress
  await expect(page.getByText("Metas salvas com sucesso!")).toBeVisible();
  // same-tab writes fire no storage event, like an event missed from another tab
  await page.evaluate(() => localStorage.setItem("ql_progress", JSON.stringify({ done: { "level:bits": new Date().toISOString() }, goal: 4 })));
  await page.getByLabel("Quantas atividades diárias você quer fazer?").fill("7");
  await save.click();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("ql_progress")).goal)).toBe(7);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("ql_progress")));
  expect(Object.keys(saved.done)).toEqual(["level:bits"]);
  await expect(page.locator(".sidebar-direita").getByLabel("10 XP no total")).toBeVisible();
});

test("a skill page scrolls inside its own area, down to the last button", async ({ page }) => {
  for (const viewport of [{ width: 1280, height: 800 }, { width: 390, height: 740 }]) {
    await page.setViewportSize(viewport);
    await page.goto(BASE + "/pt/cursos/basico/bits");
    await expect(page.locator(".katex").first()).toBeVisible();
    // the document itself must not scroll: below the first screen it would be blank
    expect(await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)).toBeLessThanOrEqual(0);
    await page.mouse.move(viewport.width / 2, 400);
    await page.mouse.wheel(0, 20_000);
    await expect(page.getByRole("button", { name: "Concluir skill" })).toBeInViewport();
  }
});

test("states are NumPy arrays: conj() works on the bra exercise", async ({ page }) => {
  await page.goto(BASE + "/pt/cursos/algebra-linear/vetores");
  const editor = page.locator("#vetores-bra-codigo");
  await expect(editor).toHaveValue(/import numpy as np/);
  await editor.fill("def bra(ket):\n    return ket.conj()\n"); // np is there even without the import line
  await page.getByRole("button", { name: /Executar e testar/ }).click();
  await expect(page.getByText("Passou nos testes 1, 2 e 3.")).toBeVisible({ timeout: 90_000 });
  await editor.fill("def bra(ket):\n    return ket\n");
  await page.getByRole("button", { name: /Executar e testar/ }).click();
  await expect(page.getByText(/Reprovou: 1/)).toBeVisible({ timeout: 30_000 });
});
