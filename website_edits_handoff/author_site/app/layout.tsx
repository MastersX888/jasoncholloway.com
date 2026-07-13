import type { Metadata } from "next";
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
  keywords: [
    "Jason Carroll Holloway",
    "Jason C. Holloway",
    "Masters X Trilogy",
    "Seventh City Press",
    "Kansas City fiction",
    "SubTropolis",
    "Voynich Manuscript",
    "Ars Notoria",
    "111 Hz frequency",
    "archaeoacoustics",
    "The Inheritance of Frequency",
    "The Grimoire",
    "The Kingdom",
    "conspiracy thriller",
    "medieval manuscript thriller",
  ],
  authors: [{ name: "Jason Carroll Holloway" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jasoncholloway.com",
    siteName: "Jason Carroll Holloway",
    title: "Jason Carroll Holloway — Masters X Trilogy | Kansas City Conspiracy Thriller",
    description:
      "Beneath Kansas City's SubTropolis, a fired security guard inherits 30 years of classified research. The Masters X Trilogy — where the Voynich Manuscript, the Ars Notoria, and a 111 Hz frequency converge.",
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://jasoncholloway.com"),
};

import WebMCPProvider from "@/components/WebMCPProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${ebGaramond.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://jasoncholloway.com/#website",
                  "url": "https://jasoncholloway.com/",
                  "name": "Jason Carroll Holloway",
                  "publisher": {
                    "@id": "https://jasoncholloway.com/#organization"
                  }
                },
                {
                  "@type": "Person",
                  "@id": "https://jasoncholloway.com/#person",
                  "name": "Jason Carroll Holloway",
                  "alternateName": "Jason C. Holloway",
                  "url": "https://jasoncholloway.com/",
                  "jobTitle": "Author",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Kansas City",
                    "addressRegion": "MO",
                    "addressCountry": "US"
                  },
                  "alumniOf": {
                    "@type": "EducationalOrganization",
                    "name": "University of Missouri–Kansas City"
                  },
                  "knowsAbout": [
                    "Voynich Manuscript",
                    "Ars Notoria",
                    "archaeoacoustics",
                    "SubTropolis",
                    "Strahov Monastery",
                    "medieval manuscripts",
                    "John Hawkes",
                    "acoustic frequency",
                    "conspiracy fiction"
                  ],
                  "worksFor": { "@id": "https://jasoncholloway.com/#organization" },
                  "sameAs": [
                    "https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway",
                    "https://seventhcitypress.com/"
                  ]
                },
                {
                  "@type": "Organization",
                  "@id": "https://jasoncholloway.com/#organization",
                  "name": "Seventh City Press",
                  "url": "https://seventhcitypress.com/",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://jasoncholloway.com/og-image.png"
                  },
                  "founder": { "@id": "https://jasoncholloway.com/#person" },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "General",
                    "email": "info@seventhcitypress.com"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <WebMCPProvider />
        <div className="bg-sacred-geometry" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
