import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { INSTAGRAM, ROUTES, rawHtml } from "../helpers";

// US-11 — Suivre l'institut sur Instagram, sans Facebook
test(
  "US-11 — 6 photos choisies par Camille, lien vers son compte, jamais « Facebook »",
  { tag: ["@US-11"] },
  async ({ page }) => {
    await page.goto("/");
    const section = page.getByRole("region", {
      name: "L'univers Beauty Green",
    });
    const images = section.locator("img");
    await expect(images).toHaveCount(6);

    const follow = section.getByRole("link", { name: "Suivre sur Instagram" });
    await expect(follow).toHaveAttribute("href", new RegExp(`^${INSTAGRAM}`));

    // The six images are the ones of content/pages/accueil.json (editable in Pages CMS).
    const accueil = JSON.parse(
      readFileSync(
        join(process.cwd(), "content", "pages", "accueil.json"),
        "utf8",
      ),
    );
    const sources = await images.evaluateAll((els) =>
      els.map((img) => {
        const src = (img as HTMLImageElement).getAttribute("src") ?? "";
        const optimized = new URL(src, window.location.origin).searchParams.get(
          "url",
        );
        return optimized ?? src;
      }),
    );
    expect(sources).toEqual(accueil.instagram.photos);

    for (const route of ROUTES) {
      expect(await rawHtml(page.request, route), route).not.toContain(
        "Facebook",
      );
    }
  },
);
