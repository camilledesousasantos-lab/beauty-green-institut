/**
 * Journal articles — `content/journal/*.md`, written by Camille in Pages CMS. Server-only.
 * A draft (`published: false`) is never listed nor routed in production; the story suite builds
 * with `E2E_DRAFTS=1` to exercise the article template on the draft shipped with the site.
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { type Article, CONTENT_DIR, readMarkdown } from "./content";

export type ArticleWithSlug = Article & { slug: string; href: string };

/**
 * Drafts are rendered only for the suite's build. `VERCEL_ENV` is set by Vercel on every
 * build and runtime: a stray `E2E_DRAFTS` in the Vercel project can never publish a draft.
 */
export const draftsEnabled = (env: NodeJS.ProcessEnv = process.env) =>
  env.E2E_DRAFTS === "1" && env.VERCEL_ENV !== "production";

function articleFiles(): string[] {
  try {
    return readdirSync(join(CONTENT_DIR, "journal")).filter((f) =>
      f.endsWith(".md"),
    );
  } catch (error) {
    // Git drops an empty folder: no article left is a valid state, not an error.
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

/** Newest first. Slug = file name without its `YYYY-MM-DD-` prefix. */
export function getArticles({
  includeDrafts = draftsEnabled(),
} = {}): ArticleWithSlug[] {
  return articleFiles()
    .map((file) => {
      const slug = file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      return {
        ...(readMarkdown(`journal/${file}`) as Article),
        slug,
        href: `/journal/${slug}`,
      };
    })
    .filter((a) => includeDrafts || a.published === true)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getArticle = (
  slug: string,
  options?: { includeDrafts?: boolean },
) => getArticles(options).find((a) => a.slug === slug);

const FR_DATE = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** `2026-09-30` → `30 septembre 2026` */
export const formatDateFr = (iso: string) =>
  FR_DATE.format(new Date(`${iso}T00:00:00Z`));
