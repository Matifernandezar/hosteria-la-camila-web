import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({ params }: { params: Promise<{locale:string}> }): Promise<Metadata> { const {locale}=await params; return isLocale(locale)?pageMetadata(locale,"rooms","habitaciones"):{}; }
export default async function Rooms({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();const d=getDictionary(locale);return <section className="pageHero section"><div className="shell"><SectionHeading title={d.rooms.title} body={d.rooms.body}/><div className="splitMedia"><MediaPlaceholder label={d.common.photoPending}/><div className="infoPanel"><p>{d.rooms.detailBody}</p><a className="button" href={`/${locale}/reservar`}>{d.rooms.cta}</a></div></div></div></section>}
