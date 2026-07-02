export const SITE_NAME = "Cabinet Juridique";
export const SITE_DESCRIPTION =
  "Cabinet d'avocats moderne — Droit des affaires, droit civil, droit numérique.";

export const LOCALES = ["fr", "en"] as const;
export const DEFAULT_LOCALE = "fr";

export const ROUTES = {
  home: "/",
  practiceAreas: "/practice-areas",
  attorneys: "/attorneys",
  insights: "/insights",
  contact: "/contact",
  legal: "/legal",
  dashboard: "/dashboard",
  login: "/login",
} as const;
