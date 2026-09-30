import { expect, test } from "@playwright/test";

// US-10 — Voir la page Formations « Bientôt disponible »
test(
  "US-10 — Formations : bientôt disponible, renseignements par téléphone, aucun formulaire",
  { tag: ["@US-10"] },
  async ({ page }) => {
    await page.goto("/formations");
    const main = page.locator("main");
    await expect(main).toContainText("Formation Rehaussement de cils");
    await expect(main).toContainText("Bientôt disponible");
    await expect(main).toContainText("Renseignements au 07 86 66 87 99");
    await expect(page.locator("form")).toHaveCount(0);
  },
);
