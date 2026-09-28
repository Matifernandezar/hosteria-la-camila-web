type Base64ImageProps = {
  source: string;
  alt: string;
  className?: string;
  eager?: boolean;
};

export function Base64Image({ source, alt, className = "", eager = false }: Base64ImageProps) {
  const src = source.replace(/\.b64\.txt$/, ".webp");

  return (
    <div className={`realMedia ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
      />
    </div>
  );
}
