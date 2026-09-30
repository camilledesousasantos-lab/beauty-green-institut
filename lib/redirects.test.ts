import { describe, expect, it } from "vitest";
import { legacyRedirects } from "./redirects";

describe("legacyRedirects", () => {
  it("maps the 4 legacy Wix URLs", () => {
    expect(legacyRedirects).toEqual([
      { source: "/reservations", destination: "/prestations", permanent: true },
      {
        source: "/ch-ques-cadeaux",
        destination: "/cheques-cadeaux",
        permanent: true,
      },
      { source: "/chou2", destination: "/", permanent: true },
      { source: "/photographies-1", destination: "/institut", permanent: true },
    ]);
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
