import { test, expect } from "@playwright/test";
const OUT = process.env.OUT ?? "test-results";
const shot = async (page, name) => { await page.waitForTimeout(400); await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true }); };

test("courses -> skill -> challenges flow", async ({ page }) => {
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  // anonymous visitor: a fresh browser context starts with no progress

  await page.goto("/cursos");
  await expect(page.getByRole("heading", { name: "Cursos" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Fundamentos Básicos/ })).toContainText("0%");
  await shot(page, "1-cursos");

  await page.goto("/cursos/basico");
  await expect(page.getByRole("link", { name: /Bits e números binários/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Portas lógicas/ })).toHaveCount(0);
  await shot(page, "2-trilha-skills");
  await page.goto("/cursos/basico/portas-logicas");
  await expect(page).toHaveURL(/\/cursos\/basico$/);

  await page.goto("/cursos/basico/bits");
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
  await page.goto("/cursos/basico/portas-logicas");
  await expect(page.getByText("Esta skill ainda está sendo escrita")).toBeVisible();

  await page.goto("/desafios");
  await expect(page.getByRole("link", { name: /O que é um bit\? \(disponível\)/ })).toBeVisible();
  await expect(page.getByLabel(/Portas lógicas \(bloqueado\)/)).toBeVisible();
  await shot(page, "5-trilha-desafios");
  await page.goto("/desafios/portas-logicas");
  await expect(page).toHaveURL(/\/desafios$/);

  await page.goto("/desafios/bits");
  await page.getByRole("button", { name: "Começar" }).click();
  for (const a of ["2", "8", "5", "110", "8", "0", "0"]) {
    await page.getByRole("radio", { name: a, exact: true }).click();
    await page.getByRole("button", { name: "Verificar" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
  }
  await expect(page.getByText("Lição concluída!")).toBeVisible();
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page).toHaveURL(/\/desafios$/);
  await expect(page.getByRole("link", { name: /Portas lógicas \(disponível\)/ })).toBeVisible();

  await page.goto("/desafios/portas-logicas");
  await page.getByRole("button", { name: "Começar" }).click();
  for (const wrong of ["0", "1", "2"]) {
    await page.getByRole("radio", { name: wrong, exact: true }).click();
    await page.getByRole("button", { name: "Verificar" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
  }
  await expect(page.getByText("Sem corações!")).toBeVisible();
  await expect(page.getByRole("link", { name: "Estudar a skill" })).toHaveAttribute("href", "/cursos/basico/portas-logicas");
  await shot(page, "6-sem-coracoes");

  await page.goto("/cursos");
  await expect(page.getByRole("link", { name: /Fundamentos Básicos/ })).toContainText("13%");
  expect(errors).toEqual([]);
});
