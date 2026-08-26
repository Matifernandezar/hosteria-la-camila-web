export const analyticsEvents = {
  availabilitySearch: "availability_search",
  availabilityResult: "availability_result",
  roomSelected: "room_selected",
  bookingStarted: "booking_started",
  paymentStarted: "payment_started",
  paymentApproved: "payment_approved",
  paymentRejected: "payment_rejected",
  bookingConfirmed: "booking_confirmed",
  whatsappClick: "whatsapp_click",
  languageChanged: "language_changed",
  contactSubmitted: "contact_submitted",
} as const;

export function track(event: string, payload: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, payload);
}
