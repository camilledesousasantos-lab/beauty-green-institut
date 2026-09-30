import type { MetadataRoute } from "next";
import { PRESTATION_SLUGS } from "@/lib/content";
import { getArticles } from "@/lib/journal";
import { siteBaseUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/prestations",
    ...Object.values(PRESTATION_SLUGS).map((slug) => `/prestations/${slug}`),
    "/institut",
    "/cheques-cadeaux",
    "/journal",
    "/formations",
    "/mentions-legales",
    "/confidentialite",
    ...getArticles({ includeDrafts: false }).map((a) => a.href),
  ];
  return paths.map((path) => ({
    url: new URL(path, siteBaseUrl()).toString(),
  }));
}
