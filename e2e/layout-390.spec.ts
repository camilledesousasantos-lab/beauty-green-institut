import { expect, test } from "@playwright/test";
import { ROUTES } from "./helpers";

// Deterministic layout net at 390 × 844 (not a story): the mock only drew two screens at this
// size, the other compositions are ours — no page may scroll sideways, the longest price label
// wraps inside its row, and the footer stays reachable above the fixed booking bar.
// Listed in the desktop project's testIgnore (playwright.config.ts).
test.use({ viewport: { width: 390, height: 844 } });

test.describe("layout at 390", () => {
  for (const route of ROUTES) {
    test(`no horizontal overflow on ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const [scrollWidth, innerWidth] = await page.evaluate(() => [
        document.documentElement.scrollWidth,
        window.innerWidth,
      ]);
      expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 1);
    });
  }

  test("the longest price label wraps inside its row", async ({ page }) => {
    await page.goto("/prestations/soins-visage-rouen");
    await page.evaluate(() => document.fonts.ready);
    const row = page.locator("#tarifs li").filter({
      hasText: "Microneedling + BBglow + Photothérapie par lumière LED",
    });
    const fits = await row.evaluate((li) => {
      const box = li.getBoundingClientRect();
      const inside = [...li.querySelectorAll("span")].every((s) => {
        const r = s.getBoundingClientRect();
        return r.left >= box.left - 1 && r.right <= box.right + 1;
      });
      return inside && li.scrollWidth <= li.clientWidth + 1;
    });
    expect(fits).toBe(true);
    await expect(row).toContainText("160 €");
  });

  test("the last footer link is clickable above the fixed booking bar", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    const link = page.getByRole("contentinfo").getByRole("link").last();
    const bar = page.getByTestId("cta-mobile");
    const [linkBox, barBox] = [
      await link.boundingBox(),
      await bar.boundingBox(),
    ];
    expect(linkBox && barBox).toBeTruthy();
    if (!linkBox || !barBox) return;
    expect(linkBox.y + linkBox.height).toBeLessThanOrEqual(barBox.y);
    const hit = await page.evaluate(
      ([x, y]) =>
        document.elementFromPoint(x, y)?.closest("a")?.textContent ?? "",
      [linkBox.x + linkBox.width / 2, linkBox.y + linkBox.height / 2],
    );
    expect(hit).toBe(await link.textContent());
  });
});
