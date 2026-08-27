import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Base64Image } from "@/components/Base64Image";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "services", "servicios") : {};
}

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const items = [
    [d.services.breakfast, d.services.breakfastText],
    [d.services.spa, d.services.spaText],
    [d.services.pool, d.services.poolText],
    [d.services.wifi, d.services.wifiText],
    [d.services.parking, d.services.parkingText],
  ];

  return (
    <>
      <section className="pageHero section">
        <div className="shell">
          <SectionHeading title={d.services.title} />
          <Base64Image source="/images/bienestar.b64.txt" alt="Spa, hidromasaje, sauna y desayuno en Hostería La Camila" className="serviceHeroPhoto" />
        </div>
      </section>
      <section className="section">
        <div className="shell servicesEditorial">
          {items.map((item, index) => (
            <article key={item[0]}>
              <div className="serviceNo">0{index + 1}</div>
              <div><h2>{item[0]}</h2><p>{item[1]}</p></div>
            </article>
          ))}
          <p className="serviceExtra">{d.services.extra}</p>
        </div>
      </section>
    </>
  );
}
