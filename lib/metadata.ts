import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { languageTags } from "@/lib/i18n";
import { site } from "@/lib/site";

const pageTitles = {
  es: { home: "Hostería en Villa La Angostura con vista al Nahuel Huapi", rooms: "Habitaciones", services: "Servicios, spa y desayuno", gallery: "Galería", location: "Ubicación", book: "Reserva directa", contact: "Contacto", policies: "Políticas" },
  pt: { home: "Hotel em Villa La Angostura com vista para o Nahuel Huapi", rooms: "Quartos", services: "Serviços, spa e café da manhã", gallery: "Galeria", location: "Localização", book: "Reserva direta", contact: "Contato", policies: "Políticas" },
  en: { home: "Hotel in Villa La Angostura overlooking Nahuel Huapi", rooms: "Rooms", services: "Services, spa and breakfast", gallery: "Gallery", location: "Location", book: "Book direct", contact: "Contact", policies: "Policies" },
} as const;

type PageKey = keyof typeof pageTitles.es;

const descriptions: Record<Locale, string> = {
  es: "Hostería La Camila en Villa La Angostura: vistas al lago Nahuel Huapi, desayuno patagónico, spa, hidromasaje, piscina estacional y reserva directa.",
  pt: "Hostería La Camila em Villa La Angostura: vista para o lago Nahuel Huapi, café da manhã patagônico, spa, hidromassagem, piscina sazonal e reserva direta.",
  en: "Hostería La Camila in Villa La Angostura: Nahuel Huapi views, Patagonian breakfast, spa, hot tub, seasonal pool and direct booking.",
};

export function pageMetadata(locale: Locale, page: PageKey, path = ""): Metadata {
  const base = site.canonicalHost;
  const suffix = path ? `/${path}` : "";
  const canonical = `${base}/${locale}${suffix}`;

  return {
    title: `${pageTitles[locale][page]} | ${site.name}`,
    description: descriptions[locale],
    alternates: {
      canonical,
      languages: {
        "es-AR": `${base}/es${suffix}`,
        "pt-BR": `${base}/pt${suffix}`,
        en: `${base}/en${suffix}`,
        "x-default": `${base}/es${suffix}`,
      },
    },
    openGraph: {
      type: "website",
      locale: languageTags[locale].replace("-", "_"),
      siteName: site.name,
      title: `${pageTitles[locale][page]} | ${site.name}`,
      description: descriptions[locale],
      url: canonical,
    },
  };
}
