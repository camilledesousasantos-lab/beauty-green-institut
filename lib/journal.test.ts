import { describe, expect, it } from "vitest";
import { draftsEnabled, formatDateFr, getArticles } from "./journal";

describe("journal — the site launches with an empty Journal", () => {
  it("no article is published at launch", () => {
    expect(getArticles({ includeDrafts: false })).toEqual([]);
  });

  it("the shipped draft is listed only when drafts are included", () => {
    const drafts = getArticles({ includeDrafts: true });
    expect(drafts.map((a) => a.slug)).toEqual(["electrolyse-tout-comprendre"]);
    expect(drafts[0]).toMatchObject({
      title: "Électrolyse : tout comprendre",
      category: "Électrolyse",
      published: false,
      href: "/journal/electrolyse-tout-comprendre",
    });
  });
});

describe("journal — drafts switch", () => {
  it("is on only for E2E_DRAFTS=1 outside Vercel production", () => {
    expect(
      draftsEnabled({ E2E_DRAFTS: "1" } as unknown as NodeJS.ProcessEnv),
    ).toBe(true);
    expect(
      draftsEnabled({
        E2E_DRAFTS: "1",
        VERCEL_ENV: "preview",
      } as unknown as NodeJS.ProcessEnv),
    ).toBe(true);
    expect(
      draftsEnabled({
        E2E_DRAFTS: "1",
        VERCEL_ENV: "production",
      } as unknown as NodeJS.ProcessEnv),
    ).toBe(false);
    expect(draftsEnabled({} as unknown as NodeJS.ProcessEnv)).toBe(false);
  });
});

describe("journal — French dates", () => {
  it("formats an ISO date the French way", () => {
    expect(formatDateFr("2026-09-30")).toBe("30 septembre 2026");
  });
});
