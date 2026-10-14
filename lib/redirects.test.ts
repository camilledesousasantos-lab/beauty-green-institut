import { describe, expect, it } from "vitest";
import { legacyRedirects } from "./redirects";

// Mirrors Next's matching for the two source shapes used here: a literal path, or
// `/prefix/:slug(<regex>)`. First match wins, as in next.config redirects().
function resolve(path: string): string | undefined {
  for (const r of legacyRedirects) {
    const m = r.source.match(/^(.*)\/:slug\((.*)\)$/);
    const re = m ? new RegExp(`^${m[1]}/(?:${m[2]})$`) : null;
    if (re ? re.test(path) : r.source === path) return r.destination;
  }
  return undefined;
}

// Old Wix URLs listed by the Wayback Machine (CDX, 14/10), percent-encoded as Wix served them.
const kept: Record<string, string> = {
  "/reservations": "/prestations",
  "/ch-ques-cadeaux": "/cheques-cadeaux",
  "/chou2": "/",
  "/photographies-1": "/institut",
  "/service-page/bilan-personnalis%C3%A9-s%C3%A9ance-de-15-min":
    "/prestations/electrolyse-rouen",
  "/service-page/s%C3%A9ance-de-10-min": "/prestations/electrolyse-rouen",
  "/service-page/s%C3%A9ance-de-15-min": "/prestations/electrolyse-rouen",
  "/service-page/s%C3%A9ance-de-20-min": "/prestations/electrolyse-rouen",
  "/service-page/s%C3%A9ance-de-30-min": "/prestations/electrolyse-rouen",
  "/service-page/s%C3%A9ance-de-35-min": "/prestations/electrolyse-rouen",
  "/service-page/s%C3%A9ance-de-45-min": "/prestations/electrolyse-rouen",
  "/service-page/s%C3%A9ance-de-50-min": "/prestations/electrolyse-rouen",
  "/service-page/s%C3%A9ance-de-60min": "/prestations/electrolyse-rouen",
  "/service-page/bbglow-phototh%C3%A9rapie": "/prestations/soins-visage-rouen",
  "/service-page/microneedling-bbglow-phototherapie":
    "/prestations/soins-visage-rouen",
  "/service-page/microneedling-phototh%C3%A9rapie":
    "/prestations/soins-visage-rouen",
  "/service-page/hydraface": "/prestations/soins-visage-rouen",
  "/service-page/rehaussement": "/prestations/cils-rouen",
  "/service-page/r%C3%A9haussement-teinture-de-cils-1":
    "/prestations/cils-rouen",
  "/service-page/browlift-avec-restructuration-du-sourcil":
    "/prestations/sourcils-rouen",
  "/service-page/restructuration-du-sourcil-avec-teinture":
    "/prestations/sourcils-rouen",
  "/service-page/blanchiment-dentaire-white-gold":
    "/prestations/blanchiment-dentaire-rouen",
  "/service-page/blanchiment-dentaire-white-gold-1":
    "/prestations/blanchiment-dentaire-rouen",
  "/service-page/grain-de-beaut%C3%A9": "/prestations",
  "/service-page/grain-de-beaut%C3%A9-1": "/prestations",
  "/product-page/cheque-cadeau": "/cheques-cadeaux",
  "/product-page/cheque-cadeau-1": "/cheques-cadeaux",
  "/product-page/cheque-cadeau-10": "/cheques-cadeaux",
};

// Chou2 accessories: discontinued (Camille, 20/09), no equivalent page — a 404 is the honest answer.
const gone = [
  "/product-page/chouchou-en-satin-noir",
  "/product-page/sac-banane-en-tweed-orange",
  "/product-page/maxi-chouchou-vichy-bleu-orange",
];

describe("legacyRedirects", () => {
  it.each(Object.entries(kept))("redirects %s to %s", (from, to) => {
    expect(resolve(from)).toBe(to);
  });
  it("matches the decoded form of an accented slug too", () => {
    expect(resolve("/service-page/séance-de-10-min")).toBe(
      "/prestations/electrolyse-rouen",
    );
    expect(resolve("/service-page/réhaussement-teinture-de-cils-1")).toBe(
      "/prestations/cils-rouen",
    );
  });
  it.each(gone)("leaves the discontinued %s in 404", (path) => {
    expect(resolve(path)).toBeUndefined();
  });
  it("is permanent everywhere", () => {
    for (const r of legacyRedirects) expect(r.permanent).toBe(true);
  });
  it("keeps /prestations as a real route", () => {
    expect(legacyRedirects.some((r) => r.source === "/prestations")).toBe(
      false,
    );
  });
});
