import Script from "next/script";
import { headers } from "next/headers";

export async function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" nonce={nonce} />
      <Script id="ga4-init" strategy="afterInteractive" nonce={nonce}>
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',${JSON.stringify(id)},{anonymize_ip:true});`}
      </Script>
    </>
  );
}
