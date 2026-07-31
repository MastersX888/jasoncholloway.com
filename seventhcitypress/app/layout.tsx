import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import PressKitDownloadTracker from "@/components/analytics/PressKitDownloadTracker";
import { imprintSiteGraph } from "@/lib/entities";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/metadata";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Seventh City Press — Independent Literary Imprint",
    template: "%s | Seventh City Press",
  },
  description:
    "Seventh City Press is an independent literary imprint founded by Jason Carroll Holloway. Publisher of the Masters X Trilogy and the John Hawkes critical monograph. Kansas City, Missouri.",
  authors: [{ name: "Jason Carroll Holloway" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Seventh City Press — Independent Literary Imprint",
    description:
      "Publisher of the Masters X Trilogy by Jason Carroll Holloway. Literary fiction where acoustic science, medieval manuscripts, and Kansas City's hidden geography converge.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seventh City Press — Independent Literary Imprint",
    description:
      "Publisher of the Masters X Trilogy by Jason Carroll Holloway. Literary fiction where acoustic science, medieval manuscripts, and Kansas City's hidden geography converge.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  metadataBase: new URL(SITE_URL),
  verification: {
    yandex: "35271039e1472ca8",
    // DRAFT — needs Jason: paste the token from Search Console → Add property →
    // HTML tag, or delete this line if the domain is already verified by DNS TXT.
    // google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-register="imprint"
      className={`${cormorantGaramond.variable} ${ebGaramond.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="p:domain_verify" content="b66427ab00203a09c3f7713f946ee71a" />
        <meta name="yandex-verification" content="35271039e1472ca8" />
        {/*
          Plain <script>, not next/script: `afterInteractive` injects after
          hydration and never appears in the static export, which is how this
          site's Book and Person markup went missing from every crawl.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imprintSiteGraph) }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <PressKitDownloadTracker />
        <div className="bg-sacred-geometry" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
