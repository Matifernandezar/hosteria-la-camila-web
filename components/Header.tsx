import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const base = `/${locale}`;
  return (
    <header className="siteHeader">
      <div className="shell headerInner">
        <Link className="wordmark" href={base} aria-label="Hostería La Camila — inicio">
          <span className="wordmarkMain">La Camila</span>
          <span className="wordmarkSub">Hostería · Patagonia</span>
        </Link>
        <nav className="desktopNav" aria-label="Navegación principal">
          <Link href={`${base}/habitaciones`}>{d.nav.rooms}</Link>
          <Link href={`${base}/servicios`}>{d.nav.services}</Link>
          <Link href={`${base}/galeria`}>{d.nav.gallery}</Link>
          <Link href={`${base}/ubicacion`}>{d.nav.location}</Link>
          <Link href={`${base}/contacto`}>{d.nav.contact}</Link>
        </nav>
        <div className="headerActions">
          <LanguageSwitcher locale={locale} />
          <a className="button buttonSmall" href={`${base}/reservar`}>{d.nav.book}</a>
          <details className="mobileNav">
            <summary aria-label="Abrir menú">Menú</summary>
            <div className="mobileNavPanel">
              <Link href={`${base}/habitaciones`}>{d.nav.rooms}</Link>
              <Link href={`${base}/servicios`}>{d.nav.services}</Link>
              <Link href={`${base}/galeria`}>{d.nav.gallery}</Link>
              <Link href={`${base}/ubicacion`}>{d.nav.location}</Link>
              <Link href={`${base}/contacto`}>{d.nav.contact}</Link>
              <a href={`${base}/reservar`}>{d.nav.book}</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
