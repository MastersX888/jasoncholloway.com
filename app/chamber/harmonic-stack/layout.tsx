import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Harmonic Stack Explorer",
  description:
    "The Ars Notoria's 14 major notae as acoustic specifications: gematria, body position and harmonic output — a Masters X Trilogy research tool.",
  path: "/chamber/harmonic-stack/",
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Analysis Chamber",
      "item": "https://jasoncholloway.com/chamber/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Harmonic Stack Explorer",
      "item": "https://jasoncholloway.com/chamber/harmonic-stack/"
    }
  ]
};

export default function HarmonicStackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
