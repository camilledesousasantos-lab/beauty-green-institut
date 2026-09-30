import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/redirects";
import { noindexHeaders } from "./lib/seo";

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects;
  },
  // noindex everywhere until the go-live switch: SITE_INDEXABLE=1 in the Vercel production env (docs/go-live-kit.md in the hub), then a redeploy.
  async headers() {
    return noindexHeaders();
  },
};

export default nextConfig;
