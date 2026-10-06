import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhotoGallery } from "@/components/PhotoGallery";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "gallery", "galeria") : {};
}

export default async function Gallery({
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
        <SectionHeading
          level="h1"
          title={d.gallery.title}
          body={d.gallery.body}
        />
        <PhotoGallery locale={locale} full />
      </div>
    </section>
  );
}
