import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Cuentas | La Camila",
  description: "Generador interno de cuentas de consumo de Hostería La Camila.",
  robots: { index: false, follow: false },
};

export default function CuentasLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
