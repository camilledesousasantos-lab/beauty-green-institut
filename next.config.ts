import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is a validation surface until go-live: keep every route out of search engines.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
