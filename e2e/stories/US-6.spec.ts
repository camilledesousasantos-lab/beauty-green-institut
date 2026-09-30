import { expect, test } from "@playwright/test";

// US-6 — Découvrir l'institut et sa fondatrice
test(
  "US-6 — L'Institut : texte signé Camille, portrait en petit, bloc pratique",
  { tag: ["@US-6"] },
  async ({ page }) => {
    await page.goto("/institut");
    const main = page.locator("main");
    await expect(main).toContainText(
      "J'ai ouvert Beauty Green Institut il y a six ans",
    );
    await expect(main).toContainText("Camille, fondatrice");

    // Her wish: her photo, never large.
    const portrait = page.getByRole("img", { name: "Camille, fondatrice" });
    await expect(portrait).toBeVisible();
    const box = await portrait.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(160);

    await expect(main).toContainText("8 rue Anatole France");
    await expect(main).toContainText("10h45");
    await expect(main).toContainText("07 86 66 87 99");
  },
);
