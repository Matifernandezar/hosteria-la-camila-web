import Image from "next/image";
type Base64ImageProps = {
  source: string;
  alt: string;
  className?: string;
  eager?: boolean;
};
export function Base64Image({
  source,
  alt,
  className = "",
  eager = false,
}: Base64ImageProps) {
  const src = source.replace(/\.b64\.txt$/, ".webp");
  const logo = source.includes("logo-la-camila");
  return (
    <div className={`realMedia ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={logo ? "155px" : "(max-width: 980px) 100vw, 55vw"}
        priority={eager}
      />
    </div>
  );
}
