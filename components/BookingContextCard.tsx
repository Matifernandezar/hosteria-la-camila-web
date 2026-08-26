import type { Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";

const labels = {
  es: { title: "Datos que trajiste desde la web", checkin: "Entrada", checkout: "Salida", adults: "Adultos", children: "Menores", note: "Confirmalos dentro de MiniHotel para consultar disponibilidad real.", help: "Consultar estos datos por WhatsApp" },
  pt: { title: "Dados informados no site", checkin: "Entrada", checkout: "Saída", adults: "Adultos", children: "Crianças", note: "Confirme-os dentro do MiniHotel para consultar a disponibilidade real.", help: "Consultar estes dados pelo WhatsApp" },
  en: { title: "Details from the website", checkin: "Check-in", checkout: "Check-out", adults: "Adults", children: "Children", note: "Confirm them inside MiniHotel to check live availability.", help: "Ask about these dates on WhatsApp" },
} as const;

export function BookingContextCard({ locale, checkin, checkout, adults, children }: { locale: Locale; checkin?: string; checkout?: string; adults?: string; children?: string }) {
  if (!checkin && !checkout && !adults && !children) return null;
  const l = labels[locale];
  const message = locale === "pt"
    ? `Olá, quero consultar uma estadia na Hostería La Camila. Entrada: ${checkin || "-"}. Saída: ${checkout || "-"}. Adultos: ${adults || "-"}. Crianças: ${children || "-"}.`
    : locale === "en"
      ? `Hello, I would like to enquire about a stay at Hostería La Camila. Check-in: ${checkin || "-"}. Check-out: ${checkout || "-"}. Adults: ${adults || "-"}. Children: ${children || "-"}.`
      : `Hola, quiero consultar por una estadía en Hostería La Camila. Entrada: ${checkin || "-"}. Salida: ${checkout || "-"}. Adultos: ${adults || "-"}. Menores: ${children || "-"}.`;
  return (
    <aside className="contextCard">
      <strong>{l.title}</strong>
      <dl>
        {checkin ? <><dt>{l.checkin}</dt><dd>{checkin}</dd></> : null}
        {checkout ? <><dt>{l.checkout}</dt><dd>{checkout}</dd></> : null}
        {adults ? <><dt>{l.adults}</dt><dd>{adults}</dd></> : null}
        {children ? <><dt>{l.children}</dt><dd>{children}</dd></> : null}
      </dl>
      <p>{l.note}</p>
      <a className="textLink" href={whatsappUrl(message)} target="_blank" rel="noreferrer">{l.help}</a>
    </aside>
  );
}
