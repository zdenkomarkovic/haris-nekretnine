import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/nekretnine`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tipovi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Primer za dinamicke stranice:
    // ...nekretnine.map((n) => ({
    //   url: `${SITE_URL}/nekretnine/${n.slug}`,
    //   lastModified: new Date(n._updatedAt),
    //   changeFrequency: "weekly" as const,
    //   priority: 0.8,
    // })),
  ];
}
