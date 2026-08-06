import Script from "next/script";
import { AW_CONVERSION_ID, GA_MEASUREMENT_ID } from "@/lib/analytics/gtag";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
          gtag('config', '${AW_CONVERSION_ID}');
        `}
      </Script>
    </>
  );
}
