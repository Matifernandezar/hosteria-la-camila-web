import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary,isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale}=await params;return isLocale(locale)?pageMetadata(locale,"location","ubicacion"):{};}
export default async function Location({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))notFound();const d=getDictionary(locale);return <section className="pageHero section"><div className="shell"><SectionHeading title={d.location.title} body={d.location.body}/><div className="locationGrid"><div className="mapFrame large"><iframe title="Mapa Hostería La Camila" src="https://www.google.com/maps?q=Av.%20Siete%20Lagos%205418%2C%20Villa%20La%20Angostura%2C%20Neuqu%C3%A9n%2C%20Argentina&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><aside className="infoPanel"><div className="eyebrow">Hostería La Camila</div><h2>{site.shortAddress}</h2><p>{site.address}</p><a className="button" href="https://www.google.com/maps/search/?api=1&query=Av.%20Siete%20Lagos%205418%20Villa%20La%20Angostura%20Neuquen" target="_blank" rel="noreferrer">{d.location.directions}</a></aside></div></div></section>}
