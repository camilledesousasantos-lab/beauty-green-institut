import { describe, expect, it } from "vitest";
import {
  isIndexable,
  noindexHeaders,
  robotsMetadata,
  robotsRules,
  siteBaseUrl,
} from "./seo";

const on = { SITE_INDEXABLE: "1" } as unknown as NodeJS.ProcessEnv;
const off = {} as unknown as NodeJS.ProcessEnv;

describe("isIndexable", () => {
  it("is false when unset and true for 1", () => {
    expect(isIndexable(off)).toBe(false);
    expect(isIndexable(on)).toBe(true);
  });
  it("only the exact string 1 switches", () => {
    expect(
      isIndexable({ SITE_INDEXABLE: "true" } as unknown as NodeJS.ProcessEnv),
    ).toBe(false);
  });
});

describe("siteBaseUrl", () => {
  it("uses the vercel alias unset, the production domain switched", () => {
    expect(siteBaseUrl(off)).toBe("https://beauty-green-institut.vercel.app");
    expect(siteBaseUrl(on)).toBe("https://beautygreeninstitut.com");
  });
});

describe("robotsMetadata", () => {
  it("blocks unset, allows switched", () => {
    expect(robotsMetadata(off)).toEqual({ index: false, follow: false });
    expect(robotsMetadata(on)).toEqual({ index: true, follow: true });
  });
});

describe("robotsRules", () => {
  it("disallows unset, allows switched", () => {
    expect(robotsRules(off)).toEqual({ userAgent: "*", disallow: "/" });
    expect(robotsRules(on)).toEqual({ userAgent: "*", allow: "/" });
  });
});

describe("noindexHeaders", () => {
  it("sends X-Robots-Tag unset, nothing switched", () => {
    expect(noindexHeaders(off)).toEqual([
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ]);
    expect(noindexHeaders(on)).toEqual([]);
  });
});
