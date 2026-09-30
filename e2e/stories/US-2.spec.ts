import { expect, test } from "@playwright/test";

// US-2 — Choisir un univers parmi cinq à égalité
test(
  "US-2 — la section Cinq univers montre 5 cartes de même rang et mène à l'électrolyse",
  { tag: ["@US-2"] },
  async ({ page }) => {
    await page.goto("/");
    const section = page.getByRole("region", {
      name: "Cinq univers, un même soin du détail",
    });
    await expect(section).toBeVisible();

    const titles = [
      "Électrolyse",
      "Soins visage",
      "Cils",
      "Sourcils",
      "Blanchiment dentaire",
    ];
    await expect(section.getByRole("heading", { level: 3 })).toHaveText(titles);

    const cards = section.getByRole("link").filter({ hasText: "Découvrir" });
    await expect(cards).toHaveCount(5);
    for (const [i, title] of titles.entries()) {
      const card = cards.nth(i);
      await expect(card).toContainText(title);
      await expect(card.locator("img")).toHaveCount(1);
      await expect(card.locator("p")).not.toBeEmpty();
    }

    await cards.filter({ hasText: "Électrolyse" }).click();
    await expect(page).toHaveURL(/\/prestations\/electrolyse-rouen$/);
  },
);
