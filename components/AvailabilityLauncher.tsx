"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { analyticsEvents, track } from "@/lib/analytics";

export function AvailabilityLauncher({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    track(analyticsEvents.availabilitySearch, { locale, checkin, checkout, adults: Number(adults), children: Number(children) });
    const params = new URLSearchParams();
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    params.set("adults", adults);
    params.set("children", children);
    window.location.assign(`/${locale}/reservar?${params.toString()}`);
  }

  return (
    <form className="availabilityBar" onSubmit={submit}>
      <div className="availabilityTitle">{d.availability.title}</div>
      <label><span>{d.availability.checkin}</span><input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} /></label>
      <label><span>{d.availability.checkout}</span><input type="date" value={checkout} min={checkin || undefined} onChange={(e) => setCheckout(e.target.value)} /></label>
      <label><span>{d.availability.adults}</span><select value={adults} onChange={(e) => setAdults(e.target.value)}>{[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}</select></label>
      <label><span>{d.availability.children}</span><select value={children} onChange={(e) => setChildren(e.target.value)}>{[0,1,2,3,4].map(n => <option key={n}>{n}</option>)}</select></label>
      <button className="button" type="submit">{d.availability.submit}</button>
      <p className="availabilityNote">{d.availability.note}</p>
    </form>
  );
}
