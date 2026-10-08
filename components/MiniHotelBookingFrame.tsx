"use client";

import type { Locale } from "@/lib/i18n";
import { editorial } from "@/lib/editorial";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

const resizeScript =
  "https://frame2.hotelpms.io/BookingFrameClient/public/assets/booking-frame/js/iframe-resizer.min.js";
type ResizableFrame = HTMLIFrameElement & { iFrameResizer?: { removeListeners: () => void } };
type ResizeWindow = Window & {
  iFrameResize?: (options: { log: boolean; heightCalculationMethod: string; checkOrigin: string[] }, frame: HTMLIFrameElement) => void;
};

export function MiniHotelBookingFrame({ bookingUrl, nonce, fallbackLabel, locale }: {
  bookingUrl: string;
  nonce?: string;
  fallbackLabel: string;
  locale: Locale;
}) {
  const frame = useRef<ResizableFrame>(null);
  const [loaded, setLoaded] = useState(false);
  const initialize = useCallback(() => {
    const element = frame.current;
    if (element && !element.iFrameResizer) {
      (window as ResizeWindow).iFrameResize?.({
        log: false,
        heightCalculationMethod: "taggedElement",
        checkOrigin: [new URL(bookingUrl).origin],
      }, element);
    }
  }, [bookingUrl]);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const origin = new URL(bookingUrl).origin;
    initialize();
    // MiniHotel uses the parent position for its embedded controls.
    function sendPosition() {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      element.contentWindow?.postMessage({
        top: rect.top, left: rect.left, bottom: rect.bottom, right: rect.right,
        height: rect.height, width: rect.width,
        scrollY: window.scrollY, scrollX: window.scrollX,
        topOffset: rect.top + window.scrollY, leftOffset: rect.left + window.scrollX,
        currentScrollY: document.scrollingElement?.scrollTop ?? 0,
        currentScrollX: document.scrollingElement?.scrollLeft ?? 0,
        viewportWidth: window.innerWidth, viewportHeight: window.innerHeight,
      }, origin);
    }
    function receiveMessage(event: MessageEvent) {
      if (event.origin !== origin || event.source !== element?.contentWindow) return;
      if (event.data?.type === "BFRAME_SCROLL_TOP") element?.scrollIntoView();
    }
    sendPosition();
    window.addEventListener("scroll", sendPosition, { passive: true });
    window.addEventListener("resize", sendPosition);
    window.addEventListener("message", receiveMessage);
    return () => {
      window.removeEventListener("scroll", sendPosition);
      window.removeEventListener("resize", sendPosition);
      window.removeEventListener("message", receiveMessage);
      element.iFrameResizer?.removeListeners();
      delete element.iFrameResizer;
    };
  }, [bookingUrl, initialize]);

  return (
    <div className="bookingFrameShell" aria-busy={!loaded}>
      {!loaded ? <div className="bookingLoading">{editorial[locale].loading}</div> : null}
      <iframe ref={frame} id="hw-booking-frame" src={bookingUrl}
        className="bookingFrame" title={editorial[locale].bookingTitle}
        onLoad={() => { setLoaded(true); initialize(); }} />
      <Script src={resizeScript} strategy="afterInteractive" nonce={nonce} onReady={initialize} />
      <noscript><a href={bookingUrl} target="_blank" rel="noreferrer">{fallbackLabel}</a></noscript>
    </div>
  );
}
