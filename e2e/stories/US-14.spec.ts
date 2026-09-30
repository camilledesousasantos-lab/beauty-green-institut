import { expect, test } from "@playwright/test";

// US-14 — Arriver par une ancienne adresse du site Wix (the paths; `fr.` is a domain-level
// redirect checked after the DNS switch by the go-live script).
const LEGACY: [string, string][] = [
  ["/reservations", "/prestations"],
  ["/ch-ques-cadeaux", "/cheques-cadeaux"],
  ["/chou2", "/"],
  ["/photographies-1", "/institut"],
];

test(
  "US-14 — les 4 anciennes adresses Wix répondent 308 vers la bonne page",
  { tag: ["@US-14"] },
  async ({ request, baseURL }) => {
    for (const [from, to] of LEGACY) {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status(), from).toBe(308);
      const location = new URL(response.headers().location ?? "", baseURL)
        .pathname;
      expect(location, from).toBe(to);
    }
  },
);
