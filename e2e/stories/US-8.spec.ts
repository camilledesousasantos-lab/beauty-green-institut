import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

// US-8 — Lire le Journal et un article.
// The suite builds with E2E_DRAFTS=1 (playwright.config.ts): the draft shipped with the site is
// rendered so the article template is exercised. The production build of the same content lists
// no article — asserted here on the content itself (no article is published), and on the served
// production build by the go-live check (`scripts/beauty-green-go-live.py check`, hub).
const JOURNAL = join(process.cwd(), "content", "journal");

test(
  "US-8 — au lancement aucun article n'est publié : le Journal de production est vide",
  { tag: ["@US-8"] },
  async ({ page }) => {
    const files = readdirSync(JOURNAL).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const frontmatter =
        readFileSync(join(JOURNAL, file), "utf8").split("---")[1] ?? "";
      expect(frontmatter, file).not.toMatch(/^published:\s*true\s*$/m);
    }
    // In this build the only cards are drafts: the production build therefore renders none.
    await page.goto("/journal");
    await expect(page.getByRole("heading", { level: 3 })).toHaveCount(
      files.length,
    );
  },
);

test(
  "US-8 — une carte d'article mène à sa page (titre, chapô, image, texte, encadré)",
  { tag: ["@US-8"] },
  async ({ page }) => {
    await page.goto("/journal");
    const card = page.getByRole("link", {
      name: /Électrolyse : tout comprendre/,
    });
    await expect(card).toBeVisible();
    await expect(card).toContainText("Électrolyse");

    await card.click();
    await expect(page).toHaveURL(/\/journal\/electrolyse-tout-comprendre$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Électrolyse : tout comprendre",
    );
    const main = page.locator("main");
    await expect(main).toContainText("Ce que l'électrolyse traite");
    await expect(main.locator("img").first()).toBeVisible();
    await expect(main).toContainText("À rédiger par Camille");
    await expect(main.locator("aside")).toContainText("Prendre rendez-vous");
  },
);
