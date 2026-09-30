import { expect, test } from "@playwright/test";

// US-5 — Lire les contre-indications du blanchiment dentaire avant de réserver
test(
  "US-5 — blanchiment : contre-indications listées, résultat non garanti, 110 € et 60 €",
  { tag: ["@US-5"] },
  async ({ page }) => {
    await page.goto("/prestations/blanchiment-dentaire-rouen");

    const precautions = page.getByRole("region", {
      name: "Précautions et contre-indications",
    });
    await expect(precautions).toBeVisible();
    for (const item of [
      "Grossesse et allaitement",
      "Éléments en résine ou composite sur les dents",
      "Hypersensibilité dentaire ou gingivale",
    ]) {
      await expect(precautions.getByText(item, { exact: true })).toBeVisible();
    }

    const main = page.locator("main");
    await expect(main).toContainText("ne peut pas être garanti");
    await expect(main).not.toContainText("aucun dommage à l'émail");

    await expect(page.locator("#tarifs li")).toHaveText([
      /^Première séance.*110\s€$/,
      /^Deuxième séance éventuelle\s*dans les 4 semaines.*60\s€$/,
    ]);
  },
);
