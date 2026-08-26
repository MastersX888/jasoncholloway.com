import type { Metadata } from "next";
import { authorSiteGraph } from "@/lib/seo/entities";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo/metadata";
import { Cormorant_Garamond, EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
    default: "Jason Carroll Holloway — Author & Seventh City Press",
    template: "%s | Jason Carroll Holloway",
  },
  description:
    "Jason Carroll Holloway is the author of the Masters X Trilogy — a Kansas City conspiracy thriller tracing the Voynich Manuscript, the Ars Notoria, SubTropolis, and the 111 Hz archaeoacoustics phenomenon. Published by Seventh City Press.",
  authors: [{ name: "Jason Carroll Holloway" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: "Jason Carroll Holloway — Masters X Trilogy | Kansas City Conspiracy Thriller",
    description:
      "Beneath Kansas City's SubTropolis, a fired security guard inherits 30 years of classified research. The Masters X Trilogy — where the Voynich Manuscript, the Ars Notoria, and a 111 Hz frequency converge.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jason Carroll Holloway — Masters X Trilogy | Kansas City Conspiracy Thriller",
    description:
      "Beneath Kansas City's SubTropolis, a fired security guard inherits 30 years of classified research. The Masters X Trilogy — where the Voynich Manuscript, the Ars Notoria, and a 111 Hz frequency converge.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  metadataBase: new URL(SITE_URL),
  verification: {
    yandex: "998186f9ff7ecbd7",
    // DRAFT — needs Jason: paste the token from Search Console → Add property →
    // HTML tag, or delete this line if the domain is already verified by DNS TXT.
    // google: "",
  },
};

import WebMCPProvider from "@/components/WebMCPProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${ebGaramond.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="p:domain_verify" content="b66427ab00203a09c3f7713f946ee71a" />
        <meta name="yandex-verification" content="998186f9ff7ecbd7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSiteGraph) }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <MetaPixel />
        <WebMCPProvider />
        <div className="bg-sacred-geometry" />
        <Header />
        <main data-register="fiction">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
