import { describe, expect, it } from "vitest";
import { siteConfig } from "./site-config";

describe("siteConfig NAP (local SEO — must stay consistent everywhere)", () => {
  it("phone href is the E.164 form of the displayed number", () => {
    expect(siteConfig.contact.phone).toBe("07 86 66 87 99");
    expect(siteConfig.contact.phoneHref).toBe("tel:+33786668799");
  });

  it("institute is in Rouen (76000), 8 rue Anatole France", () => {
    expect(siteConfig.contact.address.street).toBe("8 rue Anatole France");
    expect(siteConfig.contact.address.postalCode).toBe("76000");
    expect(siteConfig.contact.address.city).toBe("Rouen");
  });

  it("booking goes to Planity only (no contact form, charter §25)", () => {
    expect(siteConfig.booking.href).toMatch(/^https:\/\/www\.planity\.com\//);
  });

  it("canonical url is https and has no trailing slash", () => {
    expect(siteConfig.url).toMatch(/^https:\/\/[^/]+$/);
  });

  it("SIRET has 14 digits", () => {
    expect(siteConfig.legal.siret.replace(/\s/g, "")).toMatch(/^\d{14}$/);
  });
});
