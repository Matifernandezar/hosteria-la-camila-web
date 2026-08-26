import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary,isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale}=await params;return isLocale(locale)?pageMetadata(locale,"policies","politicas"):{};}
export default async function Policies({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))notFound();const d=getDictionary(locale);return <section className="pageHero section"><div className="shell narrow"><div className="eyebrow">Hostería La Camila</div><h1>{d.policies.title}</h1><p>{d.policies.body}</p></div></section>}
