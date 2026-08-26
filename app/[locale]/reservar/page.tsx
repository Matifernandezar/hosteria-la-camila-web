import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { BookingContextCard } from "@/components/BookingContextCard";
import { MiniHotelBookingFrame } from "@/components/MiniHotelBookingFrame";
import { SectionHeading } from "@/components/SectionHeading";
import { getBookingUrl } from "@/lib/booking";
import { getDictionary,isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale}=await params;return isLocale(locale)?pageMetadata(locale,"book","reservar"):{};}
export default async function Book({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<Record<string,string|string[]|undefined>>}){const{locale}=await params;if(!isLocale(locale))notFound();const sp=await searchParams;const d=getDictionary(locale);const nonce=(await headers()).get("x-nonce")??undefined;const bookingUrl=getBookingUrl();const one=(k:string)=>typeof sp[k]==="string"?sp[k] as string:undefined;return <section className="pageHero section bookingPage"><div className="shell"><SectionHeading title={d.book.title} body={d.book.body}/>{locale!=="es"?<div className="languageNotice">{d.book.engineSpanish}</div>:null}<BookingContextCard locale={locale} checkin={one("checkin")} checkout={one("checkout")} adults={one("adults")} children={one("children")}/><MiniHotelBookingFrame bookingUrl={bookingUrl} nonce={nonce} fallbackLabel={d.book.fallback}/><div className="bookingFallback"><a className="textLink" href={bookingUrl} target="_blank" rel="noreferrer">{d.book.fallback} →</a></div></div></section>}
