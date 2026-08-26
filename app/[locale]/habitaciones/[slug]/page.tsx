import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
export default async function RoomDetail({params}:{params:Promise<{locale:string;slug:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();const d=getDictionary(locale);return <section className="pageHero section"><div className="shell narrow"><div className="eyebrow">{d.rooms.title}</div><h1>{d.rooms.detailTitle}</h1><p>{d.rooms.detailBody}</p><a className="button" href={`/${locale}/reservar`}>{d.rooms.cta}</a></div></section>}
