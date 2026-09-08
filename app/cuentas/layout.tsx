import type { Metadata } from "next";
import type { ReactNode } from "react";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Cuentas | La Camila",
  description: "Generador interno de cuentas de consumo de Hostería La Camila.",
  robots: { index: false, follow: false },
};

export default async function CuentasLayout({ children }: Readonly<{ children: ReactNode }>) {
  // This route must render dynamically so Next.js can apply the per-request CSP nonce.
  await connection();

  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
