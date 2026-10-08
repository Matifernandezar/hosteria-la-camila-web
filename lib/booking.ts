import type { BookingContext } from "@/lib/booking-context";
import { site } from "@/lib/site";

export function getBookingUrl(context?: BookingContext) {
  const url = new URL(site.bookingUrl);
  if (url.origin !== "https://frame2.hotelpms.io") {
    throw new Error("NEXT_PUBLIC_MINIHOTEL_BOOKING_URL must use https://frame2.hotelpms.io");
  }
  if (url.searchParams.get("currency") !== "USD") url.searchParams.set("currency", "USD");
  if (url.searchParams.get("language") !== "es-ES") url.searchParams.set("language", "es-ES");
  if (!url.searchParams.has("rp")) url.searchParams.set("rp", "");
  if (context) {
    url.searchParams.set("from", context.checkin);
    url.searchParams.set("to", context.checkout);
    url.searchParams.set("nAdults", context.adults);
    url.searchParams.set("nChilds", context.children);
  }
  return url.toString();
}
