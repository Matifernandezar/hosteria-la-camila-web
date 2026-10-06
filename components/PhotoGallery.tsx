"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { editorial } from "@/lib/editorial";
const sources = [
  "/images/exterior.webp",
  "/images/habitaciones.webp",
  "/images/bienestar.webp",
  "/images/living.webp",
  "/images/desayuno.webp",
  "/images/habitacion-interior.webp",
  "/images/sauna.webp",
  "/images/living-chimenea.webp",
];
export function PhotoGallery({
  locale,
  full = false,
}: {
  locale: Locale;
  full?: boolean;
}) {
  const e = editorial[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  function open(index: number) {
    setActive(index);
    dialog.current?.showModal();
  }
  function move(step: number) {
    setActive((i) => (i + step + sources.length) % sources.length);
  }
  return (
    <>
      <div className={`photoGallery ${full ? "photoGalleryFull" : ""}`}>
        {(full ? sources : sources.slice(0, 3)).map((src, i) => (
          <button
            className="galleryTile"
            key={src}
            onClick={() => open(i)}
            aria-label={`${e.enlarge}: ${e.photos[i]}`}
          >
            <span className="galleryImage">
              <Image
                src={src}
                alt={e.photos[i]}
                fill
                sizes="(max-width: 680px) 90vw, 33vw"
              />
            </span>
            <span className="galleryCaption">
              <span>{e.photos[i]}</span>
              <span aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="photoDialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") move(1);
          if (event.key === "ArrowLeft") move(-1);
        }}
      >
        <div className="dialogToolbar">
          <span>
            {active + 1} / {sources.length}
          </span>
          <button autoFocus onClick={() => dialog.current?.close()}>
            {e.close} ×
          </button>
        </div>
        <div className="dialogImage">
          <Image
            src={sources[active]}
            alt={e.photos[active]}
            fill
            sizes="90vw"
          />
        </div>
        <div className="dialogToolbar">
          <button onClick={() => move(-1)}>← {e.previous}</button>
          <p>{e.photos[active]}</p>
          <button onClick={() => move(1)}>{e.next} →</button>
        </div>
      </dialog>
    </>
  );
}
