import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary,isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale}=await params;return isLocale(locale)?pageMetadata(locale,"gallery","galeria"):{};}
export default async function Gallery({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))notFound();const d=getDictionary(locale);return <section className="pageHero section"><div className="shell"><SectionHeading title={d.gallery.title} body={d.gallery.body}/><div className="galleryFull">{["portrait","landscape","portrait","landscape","portrait","landscape"].map((v,i)=><MediaPlaceholder key={i} label={d.common.photoPending} variant={v as "portrait"|"landscape"}/>)}</div></div></section>}
