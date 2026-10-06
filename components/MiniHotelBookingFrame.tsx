"use client";

import type { Locale } from "@/lib/i18n";
import { editorial } from "@/lib/editorial";
import Script from "next/script";
import { useState } from "react";

const resizeScript =
  "https://frame2.hotelpms.io/BookingFrameClient/public/assets/booking-frame/js/iframe-resizer.min.js";
const mainScript =
  "https://frame2.hotelpms.io/BookingFrameClient/public/assets/booking-frame/js/main.js";

export function MiniHotelBookingFrame({
  bookingUrl,
  nonce,
  fallbackLabel,
  locale,
}: {
  bookingUrl: string;
  nonce?: string;
  fallbackLabel: string;
  locale: Locale;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="bookingFrameShell" aria-busy={!loaded}>
      {!loaded ? (
        <div className="bookingLoading">{editorial[locale].loading}</div>
      ) : null}
      <iframe
        id="hw-booking-frame"
        src={bookingUrl}
        frameBorder="0"
        className="bookingFrame"
        title={editorial[locale].bookingTitle}
        onLoad={() => setLoaded(true)}
      />
      <Script src={resizeScript} strategy="afterInteractive" nonce={nonce} />
      <Script src={mainScript} strategy="afterInteractive" nonce={nonce} />
      <noscript>
        <a href={bookingUrl} target="_blank" rel="noreferrer">
          {fallbackLabel}
        </a>
      </noscript>
    </div>
  );
}
