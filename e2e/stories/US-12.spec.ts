import { expect, test } from "@playwright/test";
import { LEGAL_EMAIL, ROUTES, visibleText } from "../helpers";

// US-12 — Trouver les informations légales (v1: two pages, no CGV, no cookie page)
test(
  "US-12 — mentions légales complètes, email là seulement, confidentialité, deux liens au pied de page",
  { tag: ["@US-12"] },
  async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await footer.getByRole("link", { name: "Mentions légales" }).click();
    await expect(page).toHaveURL(/\/mentions-legales$/);
    const main = page.locator("main");
    for (const text of [
      "EI",
      "877 642 355 00029",
      "8 rue Anatole France",
      "07 86 66 87 99",
      LEGAL_EMAIL,
      "Vercel Inc.",
      "440 N Barranca Avenue #4133",
    ]) {
      await expect(main).toContainText(text);
    }

    for (const route of ROUTES.filter((r) => r !== "/mentions-legales")) {
      const text = await visibleText(page.request, route);
      expect(text, route).not.toContain(LEGAL_EMAIL);
      expect(text, route).not.toContain("Onglartiste");
    }

    await page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Politique de confidentialité" })
      .click();
    await expect(page).toHaveURL(/\/confidentialite$/);
    await expect(page.locator("main")).toContainText("Vercel Web Analytics");
    await expect(page.locator("main")).toContainText("sans cookie");

    const footerText = await page.getByRole("contentinfo").innerText();
    expect(footerText).not.toContain("CGV");
    expect(footerText.toLowerCase()).not.toContain("cookies");
  },
);
