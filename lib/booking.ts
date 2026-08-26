import { site } from "@/lib/site";

export function getBookingUrl() {
  const url = new URL(site.bookingUrl);
  if (url.origin !== "https://frame2.hotelpms.io") {
    throw new Error("NEXT_PUBLIC_MINIHOTEL_BOOKING_URL must use https://frame2.hotelpms.io");
  }
  if (url.searchParams.get("currency") !== "USD") url.searchParams.set("currency", "USD");
  if (url.searchParams.get("language") !== "es-ES") url.searchParams.set("language", "es-ES");
  if (!url.searchParams.has("rp")) url.searchParams.set("rp", "");
  return url.toString();
}
