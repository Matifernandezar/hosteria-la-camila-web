"use client";

import type { Locale } from "@/lib/i18n";
import { editorial } from "@/lib/editorial";
import Script from "next/script";
import Image from "next/image";
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
  const galleryDialog = useRef<HTMLDialogElement>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const e = editorial[locale];
  function moveImage(step: number) {
    setActiveImage((index) => (index + step + galleryImages.length) % galleryImages.length);
  }
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
      if (event.data?.type === "hw-open-gallery" && Array.isArray(event.data.images)) {
        const images = event.data.images.flatMap((image: unknown) => {
          if (!image || typeof image !== "object" || !("src" in image) || typeof image.src !== "string") return [];
          try { return new URL(image.src).protocol === "https:" ? [image.src] : []; }
          catch { return []; }
        });
        if (images.length) {
          setGalleryImages(images);
          setActiveImage(0);
          galleryDialog.current?.showModal();
        }
      }
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
      <dialog ref={galleryDialog} className="photoDialog" aria-label={e.enlarge}
        onClick={(event) => { if (event.target === event.currentTarget) galleryDialog.current?.close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") moveImage(1);
          if (event.key === "ArrowLeft") moveImage(-1);
        }}>
        <div className="dialogToolbar">
          <span>{activeImage + 1} / {galleryImages.length}</span>
          <button autoFocus onClick={() => galleryDialog.current?.close()}>{e.close} ×</button>
        </div>
        <div className="dialogImage">
          {galleryImages[activeImage] ? <Image src={galleryImages[activeImage]}
            alt={`${e.photos[1]} — ${activeImage + 1}`} fill unoptimized sizes="90vw" /> : null}
        </div>
        <div className="dialogToolbar">
          <button onClick={() => moveImage(-1)}>← {e.previous}</button>
          <p>{e.photos[1]}</p>
          <button onClick={() => moveImage(1)}>{e.next} →</button>
        </div>
      </dialog>
      <noscript><a href={bookingUrl} target="_blank" rel="noreferrer">{fallbackLabel}</a></noscript>
    </div>
  );
}
