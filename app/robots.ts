import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = site.canonicalHost;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
