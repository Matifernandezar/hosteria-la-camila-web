import "../globals.css";
import "../real-media.css";
import "../editorial.css";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { StructuredData } from "@/components/StructuredData";
import { Analytics } from "@/components/Analytics";
import { isLocale, languageTags } from "@/lib/i18n";
import { editorial } from "@/lib/editorial";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.canonicalHost),
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await connection();
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={languageTags[locale]}>
      <body>
        <StructuredData />
        <Analytics />
        <a className="skipLink" href="#main">
          {editorial[locale].skip}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <WhatsAppFloat locale={locale} />
      </body>
    </html>
  );
}
