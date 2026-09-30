import type { MetadataRoute } from "next";
import { robotsRules, siteBaseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return { rules: robotsRules(), sitemap: `${siteBaseUrl()}/sitemap.xml` };
}
