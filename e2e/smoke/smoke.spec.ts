// Delivery kit — @smoke (P8): READ-ONLY checks replayed on production after each deploy
// (E2E_BASE_URL=https://beauty-green-institut.vercel.app pnpm e2e:smoke). The step titles are the
// lines of steps.fr.txt, printed in the PV as « Comment retester de votre côté » — one list, two
// readers. Keep ACTIONS 1:1 with the file.
import fs from "node:fs";
import path from "node:path";
import { expect, type Page, test } from "@playwright/test";

const STEPS = fs
  .readFileSync(path.resolve(process.cwd(), "e2e/smoke/steps.fr.txt"), "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

const ACTIONS: Array<(page: Page) => Promise<void>> = [
  async (page) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Beauty Green",
    );
  },
  async (page) => {
    await expect(
      page
        .getByRole("link", { name: "Prendre rendez-vous", exact: true })
        .filter({ visible: true })
        .first(),
    ).toBeInViewport();
  },
  async (page) => {
    await page.goto("/prestations/electrolyse-rouen");
    await expect(page.locator("#tarifs li").first()).toHaveText(
      /10 min\s*32\s€/,
    );
  },
  async (page) => {
    await page.goto("/mentions-legales");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Mentions légales",
    );
  },
];

test(
  "smoke — parcours de retest client",
  { tag: ["@smoke"] },
  async ({ page }) => {
    expect(
      ACTIONS.length,
      "steps.fr.txt and the smoke actions must stay 1:1",
    ).toBe(STEPS.length);
    for (const [index, action] of ACTIONS.entries()) {
      await test.step(STEPS[index], () => action(page));
    }
  },
);
