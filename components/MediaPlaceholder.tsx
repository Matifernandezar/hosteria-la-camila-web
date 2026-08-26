export function MediaPlaceholder({ label, variant = "landscape" }: { label: string; variant?: "landscape" | "portrait" | "wide" }) {
  return (
    <div className={`mediaPlaceholder mediaPlaceholder--${variant}`} role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}
