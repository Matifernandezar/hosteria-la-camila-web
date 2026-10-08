import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AvailabilityLauncher } from "@/components/AvailabilityLauncher";
import { Base64Image } from "@/components/Base64Image";
import { PhotoGallery } from "@/components/PhotoGallery";
import { getDictionary, isLocale } from "@/lib/i18n";
import { editorial } from "@/lib/editorial";
import { pageMetadata } from "@/lib/metadata";
import { site, whatsappUrl } from "@/lib/site";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "home") : {};
}
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale),
    e = editorial[locale];
  const wa = whatsappUrl(
    locale === "en"
      ? "Hello, I would like to enquire about a stay at Hostería La Camila."
      : locale === "pt"
        ? "Olá, quero consultar uma estadia na Hostería La Camila."
        : "Hola, quiero consultar por una estadía en Hostería La Camila.",
  );
  const services = [
    [d.services.breakfast, d.services.breakfastText],
    [d.services.spa, d.services.spaText],
    [d.services.pool, d.services.poolText],
    [d.services.wifi, d.services.wifiText],
    [d.services.parking, d.services.parkingText],
  ];
  return (
    <>
      <section className="arrivalHero">
        <div className="shell arrivalGrid">
          <div className="arrivalCopy">
            <div className="eyebrow">{d.hero.eyebrow}</div>
            <h1>{e.title}</h1>
            <p>{e.subtitle}</p>
            <div className="buttonRow">
              <Link className="button" href={`/${locale}/reservar`}>
                {d.hero.primary}
                <span aria-hidden="true">↗</span>
              </Link>
              <a
                className="textLink"
                href={wa}
                target="_blank"
                rel="noreferrer"
              >
                {d.hero.secondary}
              </a>
            </div>
            <a className="discoverLink" href="#descubri">
              ↓ <span>{e.scroll}</span>
            </a>
          </div>
          <figure className="arrivalPhoto">
            <Base64Image
              source="/images/exterior.b64.txt"
              alt={e.photos[0]}
              eager
            />
            <figcaption>
              <span>LA CAMILA</span>
              <span>Patagonia Argentina</span>
            </figcaption>
          </figure>
        </div>
        <div className="shell bookingDock">
          <AvailabilityLauncher locale={locale} />
        </div>
      </section>
      <section className="section introSection" id="descubri">
        <div className="shell introGrid">
          <div className="eyebrow">{e.stay}</div>
          <div>
            <h2>{d.intro.title}</h2>
            <p>{d.intro.body}</p>
          </div>
          <div className="introSignature">
            La Camila<span>Villa La Angostura</span>
          </div>
        </div>
        <div className="shell landscapeMoment">
          <Base64Image source="/images/living.b64.txt" alt={e.photos[3]} sizes="(max-width: 1320px) 100vw, 1240px" />
          <span>{d.hero.eyebrow}</span>
        </div>
      </section>
      <section className="section sectionMuted">
        <div className="shell splitMedia">
          <Base64Image
            source="/images/habitaciones.b64.txt"
            alt={e.photos[1]}
            className="mediaLandscape"
          />
          <div>
            <div className="eyebrow">{e.roomLabel}</div>
            <h2 className="editorialTitle">{e.roomTitle}</h2>
            <p>{d.rooms.body}</p>
            <Link className="textLink" href={`/${locale}/habitaciones`}>
              {d.nav.rooms} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section wellnessSection">
        <div className="shell splitMedia reverse">
          <div>
            <div className="eyebrow">{e.wellnessLabel}</div>
            <h2 className="editorialTitle">{e.wellnessTitle}</h2>
            <p>{e.wellnessBody}</p>
            <Link className="textLink" href={`/${locale}/servicios`}>
              {d.common.learnMore} <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <Base64Image
            source="/images/bienestar.b64.txt"
            alt={e.photos[2]}
            className="mediaWellness"
          />
        </div>
      </section>
      <section className="comfortSection">
        <div className="shell">
          <div className="serviceGrid">
            {services.map(([title, body], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section gallerySection">
        <div className="shell">
          <div className="sectionTopline">
            <div>
              <div className="eyebrow">{e.galleryLabel}</div>
              <h2>{d.gallery.title}</h2>
            </div>
            <Link className="textLink" href={`/${locale}/galeria`}>
              {d.common.viewGallery} ↗
            </Link>
          </div>
          <PhotoGallery locale={locale} />
        </div>
      </section>
      <section className="section destinationSection">
        <div className="shell splitMedia">
          <div>
            <div className="eyebrow">{e.place}</div>
            <h2 className="editorialTitle">{e.placeTitle}</h2>
            <p>{e.placeBody}</p>
            <p className="addressLine">{site.shortAddress}</p>
            <Link className="textLink" href={`/${locale}/ubicacion`}>
              {d.location.directions} ↗
            </Link>
          </div>
          <div className="mapFrame">
            <iframe
              title={d.location.title}
              src="https://www.google.com/maps?q=Av.%20Siete%20Lagos%205418%2C%20Villa%20La%20Angostura%2C%20Neuqu%C3%A9n%2C%20Argentina&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      <section className="section faqSection">
        <div className="shell faqGrid">
          <div>
            <div className="eyebrow">{d.contact.title}</div>
            <h2>{e.faq}</h2>
            <a className="textLink" href={wa} target="_blank" rel="noreferrer">
              {d.common.whatsapp} ↗
            </a>
          </div>
          <div className="faqList">
            {e.questions.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="finalCta">
        <div className="shell finalCtaInner">
          <div>
            <div className="eyebrow light">{d.common.direct}</div>
            <h2>{e.cta}</h2>
          </div>
          <div>
            <p>{d.book.body}</p>
            <Link className="button buttonCream" href={`/${locale}/reservar`}>
              {d.hero.primary} ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
