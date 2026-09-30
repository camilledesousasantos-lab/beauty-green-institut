import { expect, test } from "@playwright/test";

// US-7 — Savoir comment obtenir un chèque cadeau (v1, hors ligne)
test(
  "US-7 — chèques cadeaux : montants, validité, comment l'obtenir, aucun achat ni PayPal",
  { tag: ["@US-7"] },
  async ({ page }) => {
    await page.goto("/cheques-cadeaux");
    const main = page.locator("main");
    for (const text of [
      "50 €",
      "75 €",
      "100 €",
      "150 €",
      "Montant libre",
      "valable un an",
      "contactez l'institut au 07 86 66 87 99 ou passez nous voir",
    ]) {
      await expect(main).toContainText(text);
    }
    await expect(page.locator("body")).not.toContainText("PayPal");
    await expect(page.getByRole("button", { name: /Acheter/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /Acheter/i })).toHaveCount(0);
  },
);
