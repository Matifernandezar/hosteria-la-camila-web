"use client";

import Script from "next/script";
import { useState } from "react";

const resizeScript = "https://frame2.hotelpms.io/BookingFrameClient/public/assets/booking-frame/js/iframe-resizer.min.js";
const mainScript = "https://frame2.hotelpms.io/BookingFrameClient/public/assets/booking-frame/js/main.js";

export function MiniHotelBookingFrame({ bookingUrl, nonce, fallbackLabel }: { bookingUrl: string; nonce?: string; fallbackLabel: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="bookingFrameShell" aria-busy={!loaded}>
      {!loaded ? <div className="bookingLoading">Cargando motor oficial de reservas…</div> : null}
      <iframe
        id="hw-booking-frame"
        src={bookingUrl}
        frameBorder="0"
        className="bookingFrame"
        title="Motor de reservas de Hostería La Camila"
        onLoad={() => setLoaded(true)}
      />
      <Script src={resizeScript} strategy="afterInteractive" nonce={nonce} />
      <Script src={mainScript} strategy="afterInteractive" nonce={nonce} />
      <noscript><a href={bookingUrl} target="_blank" rel="noreferrer">{fallbackLabel}</a></noscript>
    </div>
  );
}
