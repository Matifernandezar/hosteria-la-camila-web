"use client";

import { useEffect, useState } from "react";

type Base64ImageProps = {
  source: string;
  alt: string;
  className?: string;
  eager?: boolean;
};

export function Base64Image({ source, alt, className = "", eager = false }: Base64ImageProps) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(source, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Image asset ${source} returned ${response.status}`);
        return response.text();
      })
      .then((base64) => {
        const clean = base64.trim();
        if (clean) setSrc(`data:image/webp;base64,${clean}`);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Unable to load hotel image", error);
      });

    return () => controller.abort();
  }, [source]);

  return (
    <div className={`realMedia ${className}`.trim()}>
      {src ? (
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
      ) : (
        <div className="realMediaLoading" aria-hidden="true" />
      )}
    </div>
  );
}
