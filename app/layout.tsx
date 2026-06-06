import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
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
    "Jason Carroll Holloway is the author of the Masters X Trilogy — literary fiction exploring acoustic consciousness, medieval manuscripts, and the architecture of human perception. Published by Seventh City Press.",
  keywords: [
    "Jason Carroll Holloway",
    "Masters X Trilogy",
    "Seventh City Press",
    "literary fiction",
    "acoustic consciousness",
    "The Grimoire",
    "The Kingdom",
    "The Inheritance of Frequency",
    "Ars Notoria",
    "resonance fiction",
  ],
  authors: [{ name: "Jason Carroll Holloway" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jasoncholloway.com",
    siteName: "Jason Carroll Holloway",
    title: "Jason Carroll Holloway — Author & Seventh City Press",
    description:
      "Literary fiction at the intersection of acoustic physics, medieval scholarship, and the architecture of human perception.",
    images: [{ url: "https://jasoncholloway.com/og-image.png", width: 1200, height: 630, alt: "Jason Carroll Holloway — Masters X Trilogy" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://jasoncholloway.com"),
};

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
                  "url": "https://jasoncholloway.com/",
                  "jobTitle": "Author",
                  "worksFor": { "@id": "https://jasoncholloway.com/#organization" },
                  "sameAs": [
                    "https://amazon.com/author/jasoncholloway",
                    "https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway"
                  ]
                },
                {
                  "@type": "Organization",
                  "@id": "https://jasoncholloway.com/#organization",
                  "name": "Seventh City Press",
                  "url": "https://jasoncholloway.com/press/",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://jasoncholloway.com/og-image.png"
                  },
                  "founder": { "@id": "https://jasoncholloway.com/#person" }
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <div className="bg-sacred-geometry" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
