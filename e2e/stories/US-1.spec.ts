import { expect, test } from "@playwright/test";
import { PLANITY } from "../helpers";

// US-1 — Trouver l'institut et prendre rendez-vous depuis l'accueil [chemin-critique]
test(
  "US-1 — le bouton Prendre rendez-vous est visible sans scroller et le reste après 2 000 px",
  { tag: ["@US-1"] },
  async ({ page }, testInfo) => {
    await page.goto("/");
    await expect(
      page.getByText("Institut de beauté à Rouen").first(),
    ).toBeVisible();

    // 390: the fixed bar at the bottom of the screen; 1440: the button of the sticky header.
    const cta =
      testInfo.project.name === "mobile-390"
        ? page.getByTestId("cta-mobile")
        : page
            .getByRole("banner")
            .getByRole("link", { name: "Prendre rendez-vous" });

    await expect(cta).toHaveText(/Prendre rendez-vous/i);
    await expect(cta).toBeInViewport();
    await expect(cta).toHaveAttribute("href", PLANITY);
    await expect(cta).toHaveAttribute("target", "_blank");

    await page.mouse.wheel(0, 2000);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(1000);
    await expect(cta).toBeInViewport();
  },
);
