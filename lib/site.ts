const DEFAULT_BOOKING_URL =
  "https://frame2.hotelpms.io/BookingFrameClient/hotel/5CC9EFFB4A8A2A7083E1B6A9E5B00F4A/edd71bb0-e640-4371-834d-8eb6b8c8d337/book/rooms?currency=USD&language=es-ES&rp=";

function nonEmptyEnv(value: string | undefined, fallback: string) {
  const normalized = value?.trim();
  return normalized ? normalized : fallback;
}

export const site = {
  name: "Hostería La Camila",
  canonicalHost: nonEmptyEnv(
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://www.hosterialacamila.com",
  ),
  address:
    "Ruta 40 Km 2120, Av. Siete Lagos 5418, Barrio Las Bandurrias, Villa La Angostura, Neuquén, Argentina",
  shortAddress: "Av. Siete Lagos 5418, Villa La Angostura, Neuquén",
  whatsappDisplay: "+54 9 2944 387981",
  whatsappDigits: "5492944387981",
  email: "nuevahosterialacamila@gmail.com",
  instagramHandle: "@nuevahosterialacamila",
  instagramUrl: "https://www.instagram.com/nuevahosterialacamila/",
  bookingUrl: nonEmptyEnv(
    process.env.NEXT_PUBLIC_MINIHOTEL_BOOKING_URL,
    DEFAULT_BOOKING_URL,
  ),
} as const;

export const services = ["breakfast", "spa", "pool", "wifi", "parking"] as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(message)}`;
}
