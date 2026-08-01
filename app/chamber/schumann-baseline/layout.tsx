import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Schumann Resonance Baseline",
  description: "Virtual Schumann Resonance Baseline monitoring interface. Masters Analysis Chamber tool.",
  path: "/chamber/schumann-baseline/",
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
      "name": "Schumann Resonance Baseline",
      "item": "https://jasoncholloway.com/chamber/schumann-baseline/"
    }
  ]
};

export default function SchumannBaselineLayout({
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
