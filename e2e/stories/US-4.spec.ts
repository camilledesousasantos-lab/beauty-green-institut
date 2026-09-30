import { expect, test } from "@playwright/test";
import { ROUTES, rawHtml } from "../helpers";

// US-4 — Voir les soins visage avec la nomenclature de la fondatrice
test(
  "US-4 — les trois soins visage avec « Photothérapie par lumière LED », jamais « Baby Glow »",
  { tag: ["@US-4"] },
  async ({ page }) => {
    await page.goto("/prestations/soins-visage-rouen");
    await expect(page.locator("#tarifs li")).toHaveText([
      /^Microneedling \+ Photothérapie par lumière LED.*90\s€$/,
      /^BBglow \+ Photothérapie par lumière LED.*90\s€$/,
      /^Microneedling \+ BBglow \+ Photothérapie par lumière LED.*160\s€$/,
    ]);

    for (const route of ROUTES) {
      expect(await rawHtml(page.request, route), route).not.toContain(
        "Baby Glow",
      );
    }
  },
);
