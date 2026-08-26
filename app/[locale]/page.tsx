import Link from "next/link";
import type { Metadata } from "next";
import { AvailabilityLauncher } from "@/components/AvailabilityLauncher";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { whatsappUrl } from "@/lib/site";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) return {}; return pageMetadata(locale, "home");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const wa = locale === "pt" ? "Olá, quero consultar uma estadia na Hostería La Camila." : locale === "en" ? "Hello, I would like to enquire about a stay at Hostería La Camila." : "Hola, quiero consultar por una estadía en Hostería La Camila.";
  return (
    <>
      <section className="hero">
        <div className="heroMedia"><MediaPlaceholder label={d.common.photoPending} variant="wide" /></div>
        <div className="heroOverlay" />
        <div className="shell heroContent">
          <div className="eyebrow light">{d.hero.eyebrow}</div>
          <h1>{d.hero.title}</h1>
          <p>{d.hero.subtitle}</p>
          <div className="buttonRow">
            <a className="button" href={`/${locale}/reservar`}>{d.hero.primary}</a>
            <a className="button buttonGhost" href={whatsappUrl(wa)} target="_blank" rel="noreferrer">{d.hero.secondary}</a>
          </div>
        </div>
        <div className="shell availabilityWrap"><AvailabilityLauncher locale={locale} /></div>
      </section>

      <section className="section sectionIntro">
        <div className="shell splitEditorial">
          <SectionHeading eyebrow={d.intro.eyebrow} title={d.intro.title} body={d.intro.body} />
          <div className="editorialFact"><span>15</span><p>habitaciones · Villa La Angostura</p></div>
        </div>
      </section>

      <section className="section sectionMuted">
        <div className="shell splitMedia">
          <MediaPlaceholder label={d.common.photoPending} variant="landscape" />
          <div>
            <SectionHeading title={d.rooms.title} body={d.rooms.body} />
            <a className="textLink" href={`/${locale}/reservar`}>{d.rooms.cta} →</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading title={d.services.title} />
          <div className="serviceGrid">
            <article><span>01</span><h3>{d.services.breakfast}</h3><p>{d.services.breakfastText}</p></article>
            <article><span>02</span><h3>{d.services.spa}</h3><p>{d.services.spaText}</p></article>
            <article><span>03</span><h3>{d.services.pool}</h3><p>{d.services.poolText}</p></article>
            <article><span>04</span><h3>{d.services.wifi}</h3><p>{d.services.wifiText}</p></article>
            <article><span>05</span><h3>{d.services.parking}</h3><p>{d.services.parkingText}</p></article>
          </div>
          <Link className="textLink" href={`/${locale}/servicios`}>{d.common.learnMore} →</Link>
        </div>
      </section>

      <section className="section sectionDark">
        <div className="shell splitMedia reverse">
          <div>
            <div className="eyebrow light">Nahuel Huapi</div>
            <h2>{locale === "pt" ? "Vista que muda o ritmo da viagem" : locale === "en" ? "A view that changes the pace of your trip" : "Una vista que cambia el ritmo del viaje"}</h2>
            <p>{d.location.body}</p>
            <Link className="textLink lightLink" href={`/${locale}/ubicacion`}>{d.location.directions} →</Link>
          </div>
          <MediaPlaceholder label={d.common.photoPending} variant="portrait" />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading title={d.gallery.title} body={d.gallery.body} />
          <div className="galleryPreview">
            <MediaPlaceholder label={d.common.photoPending} variant="portrait" />
            <MediaPlaceholder label={d.common.photoPending} variant="landscape" />
            <MediaPlaceholder label={d.common.photoPending} variant="portrait" />
          </div>
          <Link className="textLink" href={`/${locale}/galeria`}>{d.common.viewGallery} →</Link>
        </div>
      </section>

      <section className="section sectionLocation">
        <div className="shell splitMedia">
          <div className="mapFrame"><iframe title="Mapa Hostería La Camila" src="https://www.google.com/maps?q=Av.%20Siete%20Lagos%205418%2C%20Villa%20La%20Angostura%2C%20Neuqu%C3%A9n%2C%20Argentina&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          <div><SectionHeading title={d.location.title} body={d.location.body} /><Link className="textLink" href={`/${locale}/ubicacion`}>{d.location.directions} →</Link></div>
        </div>
      </section>

      <section className="finalCta">
        <div className="shell finalCtaInner"><div><div className="eyebrow light">{d.common.direct}</div><h2>{d.book.title}</h2><p>{d.book.body}</p></div><a className="button buttonCream" href={`/${locale}/reservar`}>{d.hero.primary}</a></div>
      </section>
    </>
  );
}
