import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Base64Image } from "@/components/Base64Image";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, isLocale } from "@/lib/i18n";
import { editorial } from "@/lib/editorial";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "rooms", "habitaciones") : {};
}

export default async function Rooms({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <section className="pageHero section">
      <div className="shell">
        <SectionHeading level="h1" title={d.rooms.title} body={d.rooms.body} />
        <div className="splitMedia">
          <Base64Image
            source="/images/habitaciones.b64.txt"
            alt={editorial[locale].photos[1]}
            className="mediaLandscape"
          />
          <div className="infoPanel">
            <div className="eyebrow">{editorial[locale].roomLabel}</div>
            <h2>{editorial[locale].roomTitle}</h2>
            <p>{editorial[locale].roomBody}</p>
            <a className="button" href={`/${locale}/reservar`}>
              {d.rooms.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
