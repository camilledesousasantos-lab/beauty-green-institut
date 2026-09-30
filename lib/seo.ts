import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";

// Imported by next.config.ts (outside the bundler): relative imports only.
// Only the exact string "1" switches the site to indexable.
export const isIndexable = (env: NodeJS.ProcessEnv = process.env): boolean =>
  env.SITE_INDEXABLE === "1";

export const siteBaseUrl = (env: NodeJS.ProcessEnv = process.env): string =>
  isIndexable(env) ? siteConfig.productionUrl : siteConfig.url;

export const robotsMetadata = (
  env: NodeJS.ProcessEnv = process.env,
): { index: boolean; follow: boolean } =>
  isIndexable(env)
    ? { index: true, follow: true }
    : { index: false, follow: false };

export const robotsRules = (
  env: NodeJS.ProcessEnv = process.env,
): MetadataRoute.Robots["rules"] =>
  isIndexable(env)
    ? { userAgent: "*", allow: "/" }
    : { userAgent: "*", disallow: "/" };

export const noindexHeaders = (
  env: NodeJS.ProcessEnv = process.env,
): { source: string; headers: { key: string; value: string }[] }[] =>
  isIndexable(env)
    ? []
    : [
        {
          source: "/:path*",
          headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
        },
      ];
