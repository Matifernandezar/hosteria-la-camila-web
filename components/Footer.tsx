import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <footer className="siteFooter">
      <div className="shell footerGrid">
        <div><div className="footerMark">La Camila</div><p>{d.footer.tagline}</p></div>
        <div><strong>{site.shortAddress}</strong><p>{site.whatsappDisplay}<br />{site.email}</p></div>
        <div className="footerLinks">
          <Link href={`/${locale}/reservar`}>{d.nav.book}</Link>
          <Link href={`/${locale}/politicas`}>{d.policies.title}</Link>
          <a href={site.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
      <div className="shell footerBottom">© {new Date().getFullYear()} {site.name}. {d.footer.rights}</div>
    </footer>
  );
}
