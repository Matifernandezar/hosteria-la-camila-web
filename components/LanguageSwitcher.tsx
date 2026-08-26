"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { track, analyticsEvents } from "@/lib/analytics";

const labels: Record<Locale, string> = { es: "ES", pt: "PT", en: "EN" };

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function change(nextLocale: Locale) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) parts.push(nextLocale);
    else parts[0] = nextLocale;
    track(analyticsEvents.languageChanged, { from: locale, to: nextLocale });
    const query = searchParams.toString();
    window.location.assign(`/${parts.join("/")}${query ? `?${query}` : ""}`);
  }
  return (
    <label className="languageSelect">
      <span className="srOnly">Idioma</span>
      <select value={locale} onChange={(e) => change(e.target.value as Locale)} aria-label="Idioma">
        {(Object.keys(labels) as Locale[]).map((key) => <option key={key} value={key}>{labels[key]}</option>)}
      </select>
    </label>
  );
}
