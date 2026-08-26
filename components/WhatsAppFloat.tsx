"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";
import { analyticsEvents, track } from "@/lib/analytics";

const baseMessages: Record<Locale, string> = {
  es: "Hola, quiero consultar por una estadía en Hostería La Camila.",
  pt: "Olá, gostaria de consultar uma estadia na Hostería La Camila.",
  en: "Hello, I would like to enquire about a stay at Hostería La Camila.",
};

export function WhatsAppFloat({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const message = `${baseMessages[locale]}\nPágina: ${pathname}`;
  return (
    <a
      className="whatsappFloat"
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      onClick={() => track(analyticsEvents.whatsappClick, { page: pathname, locale })}
    >
      <span aria-hidden="true">WA</span>
    </a>
  );
}
