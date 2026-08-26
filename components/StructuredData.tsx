import Script from "next/script";
import { headers } from "next/headers";
import { site } from "@/lib/site";

export async function StructuredData() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const data = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: site.name,
    url: site.canonicalHost,
    email: site.email,
    telephone: site.whatsappDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ruta 40 Km 2120, Av. Siete Lagos 5418, Barrio Las Bandurrias",
      addressLocality: "Villa La Angostura",
      addressRegion: "Neuquén",
      addressCountry: "AR",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Estacionamiento privado", value: true },
      { "@type": "LocationFeatureSpecification", name: "Spa e hidromasaje", value: true },
      { "@type": "LocationFeatureSpecification", name: "Piscina exterior climatizada en temporada estival", value: true },
    ],
  };
  return <Script id="hotel-jsonld" type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
