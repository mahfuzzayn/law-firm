import type { MetadataRoute } from "next";

const locales = ["fr", "en"] as const;
const baseUrl = "https://www.cabinet-juridique.fr";

const routes = [
  "",
  "/practice-areas",
  "/practice-areas/droit-des-affaires",
  "/practice-areas/droit-civil",
  "/practice-areas/droit-numerique",
  "/practice-areas/droit-du-travail",
  "/practice-areas/droit-immobilier",
  "/practice-areas/droit-de-la-famille",
  "/attorneys",
  "/attorneys/sophie-moreau",
  "/attorneys/thomas-bernard",
  "/attorneys/camille-petit",
  "/attorneys/antoine-leroy",
  "/insights",
  "/contact",
  "/legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "monthly" : "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
