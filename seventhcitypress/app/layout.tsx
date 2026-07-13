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
    default: "Seventh City Press — Independent Literary Imprint",
    template: "%s | Seventh City Press",
  },
  description:
    "Seventh City Press is an independent literary imprint founded by Jason Carroll Holloway. Publisher of the Masters X Trilogy and the John Hawkes critical monograph. Kansas City, Missouri.",
  keywords: [
    "Seventh City Press",
    "Jason Carroll Holloway",
    "Masters X Trilogy",
    "independent literary press",
    "Kansas City publisher",
    "literary fiction",
    "conspiracy thriller",
    "John Hawkes",
  ],
  authors: [{ name: "Jason Carroll Holloway" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seventhcitypress.com",
    siteName: "Seventh City Press",
    title: "Seventh City Press — Independent Literary Imprint",
    description:
      "Publisher of the Masters X Trilogy by Jason Carroll Holloway. Literary fiction where acoustic science, medieval manuscripts, and Kansas City's hidden geography converge.",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://seventhcitypress.com"),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://seventhcitypress.com/#website",
                  url: "https://seventhcitypress.com/",
                  name: "Seventh City Press",
                  publisher: { "@id": "https://seventhcitypress.com/#organization" },
                },
                {
                  "@type": "Organization",
                  "@id": "https://seventhcitypress.com/#organization",
                  name: "Seventh City Press",
                  url: "https://seventhcitypress.com/",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://seventhcitypress.com/og-image.png",
                  },
                  founder: { "@id": "https://jasoncholloway.com/#person" },
                  location: {
                    "@type": "Place",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Kansas City",
                      addressRegion: "MO",
                      addressCountry: "US",
                    },
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "Press",
                    email: "press@seventhcitypress.com",
                  },
                  sameAs: ["https://jasoncholloway.com/"],
                },
              ],
            }),
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
