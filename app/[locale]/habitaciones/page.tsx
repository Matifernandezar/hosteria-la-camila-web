import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Base64Image } from "@/components/Base64Image";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "rooms", "habitaciones") : {};
}

export default async function Rooms({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <section className="pageHero section">
      <div className="shell">
        <SectionHeading title={d.rooms.title} body={d.rooms.body} />
        <div className="splitMedia">
          <Base64Image source="/images/habitaciones.b64.txt" alt="Habitaciones Doble Classic, Doble Premier, Loft Classic y Loft Premier de Hostería La Camila" className="mediaLandscape" />
          <div className="infoPanel">
            <p className="roomCategoryNames">Doble Classic · Doble Premier · Loft Classic · Loft Premier</p>
            <p>{d.rooms.detailBody}</p>
            <a className="button" href={`/${locale}/reservar`}>{d.rooms.cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
