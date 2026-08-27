import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Base64Image } from "@/components/Base64Image";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "gallery", "galeria") : {};
}

export default async function Gallery({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <section className="pageHero section">
      <div className="shell">
        <SectionHeading title={d.gallery.title} body={d.gallery.body} />
        <div className="galleryFull">
          <Base64Image source="/images/hero.b64.txt" alt="Vista del lago Nahuel Huapi desde Hostería La Camila" />
          <Base64Image source="/images/exterior.b64.txt" alt="Exterior y piscina de Hostería La Camila" />
          <Base64Image source="/images/habitaciones.b64.txt" alt="Habitaciones de Hostería La Camila" />
          <Base64Image source="/images/bienestar.b64.txt" alt="Spa, hidromasaje, sauna y desayuno de Hostería La Camila" />
        </div>
      </div>
    </section>
  );
}
