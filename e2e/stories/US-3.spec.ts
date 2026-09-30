import { expect, test } from "@playwright/test";

// US-3 — Lire une prestation avec ses tarifs et ses précautions [chemin-critique]
test(
  "US-3 — électrolyse : bilan 45 €, les 8 tarifs de la charte, les précautions, la FAQ",
  { tag: ["@US-3"] },
  async ({ page }) => {
    await page.goto("/prestations/electrolyse-rouen");

    const bilan = page.locator("section").filter({
      has: page.getByRole("heading", { name: "Le premier rendez-vous" }),
    });
    await expect(bilan).toContainText("45 €");
    await expect(bilan).toContainText(
      "Consultation + première séance de 15 minutes offerte",
    );

    await expect(page.locator("#tarifs li")).toHaveText([
      /10 min\s*32\s€/,
      /15 min\s*45\s€/,
      /20 min\s*53\s€/,
      /30 min\s*70\s€/,
      /35 min\s*82\s€/,
      /45 min\s*98\s€/,
      /50 min\s*108\s€/,
      /60 min\s*115\s€/,
    ]);

    await expect(
      page.getByRole("heading", { name: "Précautions et contre-indications" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Est-ce douloureux ?" }).click();
    await expect(page.getByText(/^La sensation est brève/)).toBeVisible();
  },
);
