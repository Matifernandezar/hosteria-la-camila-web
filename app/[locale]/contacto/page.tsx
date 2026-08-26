import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary,isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { site,whatsappUrl } from "@/lib/site";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale}=await params;return isLocale(locale)?pageMetadata(locale,"contact","contacto"):{};}
export default async function Contact({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))notFound();const d=getDictionary(locale);const msg=locale==="pt"?"Olá, quero fazer uma consulta à Hostería La Camila.":locale==="en"?"Hello, I would like to contact Hostería La Camila.":"Hola, quiero hacer una consulta a Hostería La Camila.";return <section className="pageHero section"><div className="shell"><SectionHeading title={d.contact.title} body={d.contact.body}/><div className="contactGrid"><div className="contactMethods"><a href={whatsappUrl(msg)} target="_blank" rel="noreferrer"><small>WhatsApp</small><strong>{site.whatsappDisplay}</strong></a><a href={`mailto:${site.email}`}><small>Email</small><strong>{site.email}</strong></a><a href={site.instagramUrl} target="_blank" rel="noreferrer"><small>Instagram</small><strong>{site.instagramHandle}</strong></a></div><ContactForm locale={locale}/></div></div></section>}
