"use client";

import { useState } from "react";
import { z } from "zod";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";
import { analyticsEvents, track } from "@/lib/analytics";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(8).max(1200),
  website: z.string().max(0),
});

export function ContactForm({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const [status, setStatus] = useState<"idle"|"success"|"error">("idle");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const result = schema.safeParse({ name: form.get("name"), email: form.get("email"), message: form.get("message"), website: form.get("website") });
    if (!result.success) { setStatus("error"); return; }
    const { name, email, message } = result.data;
    const text = locale === "pt" ? `Olá, sou ${name}. E-mail: ${email}. Consulta: ${message}` : locale === "en" ? `Hello, I'm ${name}. Email: ${email}. Enquiry: ${message}` : `Hola, soy ${name}. Correo: ${email}. Consulta: ${message}`;
    setStatus("success");
    track(analyticsEvents.contactSubmitted, { locale, destination: "whatsapp" });
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  }
  return (
    <form className="contactForm" onSubmit={submit} noValidate>
      <label><span>{d.contact.name}</span><input name="name" autoComplete="name" required /></label>
      <label><span>{d.contact.email}</span><input name="email" type="email" autoComplete="email" required /></label>
      <label><span>{d.contact.message}</span><textarea name="message" rows={6} required /></label>
      <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="button" type="submit">{d.contact.submit}</button>
      <div className="formStatus" role="status" aria-live="polite">{status === "success" ? d.contact.success : status === "error" ? d.contact.error : ""}</div>
    </form>
  );
}
