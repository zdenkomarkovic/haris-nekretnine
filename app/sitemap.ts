import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllSlugsForSitemap } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { nekretnine, oblasti, tipovi } = await getAllSlugsForSitemap();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/nekretnine`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/oblasti`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/tipovi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/edukacija`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/o-nama`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/kontakt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  return [
    ...staticPages,
    ...nekretnine.map((n) => ({
      url: `${SITE_URL}/nekretnine/${n.slug}`,
      lastModified: new Date(n._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...oblasti.map((o) => ({
      url: `${SITE_URL}/oblasti/${o.slug}`,
      lastModified: new Date(o._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...tipovi.map((t) => ({
      url: `${SITE_URL}/tipovi/${t.slug}`,
      lastModified: new Date(t._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
