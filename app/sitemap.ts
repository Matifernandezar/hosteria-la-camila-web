import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.canonicalHost;
  const paths = ["", "habitaciones", "servicios", "galeria", "ubicacion", "reservar", "contacto", "politicas"];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path ? `/${path}` : ""}`,
      lastModified: new Date(),
      changeFrequency: path === "reservar" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path === "reservar" ? 0.9 : 0.7,
    })),
  );
}
