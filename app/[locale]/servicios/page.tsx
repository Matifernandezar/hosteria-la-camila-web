import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale}=await params;return isLocale(locale)?pageMetadata(locale,"services","servicios"):{};}
export default async function Services({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))notFound();const d=getDictionary(locale);const items=[[d.services.breakfast,d.services.breakfastText],[d.services.spa,d.services.spaText],[d.services.pool,d.services.poolText],[d.services.wifi,d.services.wifiText],[d.services.parking,d.services.parkingText]];return <><section className="pageHero section"><div className="shell"><SectionHeading title={d.services.title}/></div></section><section className="section"><div className="shell servicesEditorial">{items.map((x,i)=><article key={x[0]}><div className="serviceNo">0{i+1}</div><div><h2>{x[0]}</h2><p>{x[1]}</p></div><MediaPlaceholder label={d.common.photoPending}/></article>)}<p className="serviceExtra">{d.services.extra}</p></div></section></>}
