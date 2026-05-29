import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Jason C. Holloway — Author & Seventh City Press",
    template: "%s | Jason C. Holloway",
  },
  description:
    "Jason C. Holloway is the author of the Masters X Trilogy — literary fiction exploring acoustic consciousness, medieval manuscripts, and the architecture of human perception. Published by Seventh City Press.",
  keywords: [
    "Jason C. Holloway",
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
  authors: [{ name: "Jason C. Holloway" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jasoncholloway.com",
    siteName: "Jason C. Holloway",
    title: "Jason C. Holloway — Author & Seventh City Press",
    description:
      "Literary fiction at the intersection of acoustic physics, medieval scholarship, and the architecture of human perception.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Jason C. Holloway — Masters X Trilogy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jason C. Holloway — Author",
    description: "Literary fiction. Masters X Trilogy. Seventh City Press.",
  },
  metadataBase: new URL("https://jasoncholloway.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://jasoncholloway.com/#person",
                  "name": "Jason C. Holloway",
                  "url": "https://jasoncholloway.com",
                  "jobTitle": "Author",
                },
                {
                  "@type": "Organization",
                  "@id": "https://jasoncholloway.com/#organization",
                  "name": "Seventh City Press LLC",
                  "url": "https://jasoncholloway.com/press",
                  "founder": { "@id": "https://jasoncholloway.com/#person" }
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
