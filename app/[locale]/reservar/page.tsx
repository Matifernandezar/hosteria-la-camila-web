import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { parseBookingContext } from "@/lib/booking-context";
import { BookingContextCard } from "@/components/BookingContextCard";
import { MiniHotelBookingFrame } from "@/components/MiniHotelBookingFrame";
import { SectionHeading } from "@/components/SectionHeading";
import { getBookingUrl } from "@/lib/booking";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "book", "reservar") : {};
}
export default async function Book({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const sp = await searchParams;
  const d = getDictionary(locale);
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const result = parseBookingContext(sp);
  const context = result.status === "valid" ? result.context : undefined;
  const bookingUrl = getBookingUrl(context);
  return (
    <section className="pageHero section bookingPage">
      <div className="shell">
        <SectionHeading level="h1" title={d.book.title} body={d.book.body} />
        {locale !== "es" ? (
          <div className="languageNotice">{d.book.engineSpanish}</div>
        ) : null}
        {result.status === "invalid" ? (
          <div className="languageNotice" role="alert">{d.book.invalidContext}</div>
        ) : null}
        {context ? <BookingContextCard
          locale={locale}
          checkin={context.checkin}
          checkout={context.checkout}
          adults={context.adults}
          childCount={context.children}
        /> : null}
        <MiniHotelBookingFrame
          locale={locale}
          bookingUrl={bookingUrl}
          nonce={nonce}
          fallbackLabel={d.book.fallback}
        />
        <div className="bookingFallback">
          <a
            className="textLink"
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            {d.book.fallback} →
          </a>
        </div>
      </div>
    </section>
  );
}
