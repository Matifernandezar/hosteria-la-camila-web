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
      aria-label="Contactar por WhatsApp"
      onClick={() => track(analyticsEvents.whatsappClick, { page: pathname, locale })}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 4.25c-6.48 0-11.75 5.15-11.75 11.5 0 2.03.55 4.02 1.6 5.76L4 28l6.72-1.74A11.9 11.9 0 0 0 16 27.25c6.48 0 11.75-5.15 11.75-11.5S22.48 4.25 16 4.25Zm0 20.95c-1.73 0-3.42-.46-4.89-1.33l-.35-.2-3.99 1.03 1.06-3.78-.23-.37a9.32 9.32 0 0 1-1.45-4.8c0-5.22 4.42-9.46 9.85-9.46s9.85 4.24 9.85 9.46-4.42 9.45-9.85 9.45Zm5.4-7.08c-.3-.15-1.75-.84-2.02-.93-.27-.1-.47-.15-.67.15-.2.29-.77.93-.95 1.12-.17.2-.35.22-.65.08-.3-.15-1.25-.45-2.38-1.44-.88-.77-1.47-1.72-1.65-2.01-.17-.29-.02-.45.13-.59.14-.13.3-.34.45-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.03-.51-.07-.15-.67-1.57-.92-2.15-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.29-1.04 1-1.04 2.44s1.07 2.83 1.22 3.03c.15.19 2.1 3.14 5.1 4.4.71.3 1.27.48 1.7.62.71.22 1.36.19 1.88.12.57-.08 1.75-.7 2-1.38.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.34Z" />
      </svg>
    </a>
  );
}
