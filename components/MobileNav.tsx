"use client";

import Link from "next/link";
import { useRef } from "react";

export function MobileNav({ label, links }: {
  label: string;
  links: { href: string; label: string }[];
}) {
  const details = useRef<HTMLDetailsElement>(null);
  return (
    <details ref={details} className="mobileNav">
      <summary>{label}</summary>
      <div className="mobileNavPanel">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => {
            if (details.current) details.current.open = false;
          }}>{link.label}</Link>
        ))}
      </div>
    </details>
  );
}
