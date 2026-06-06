import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harmonic Stack Explorer",
  description: "Virtual frequency stack explorer for analyzing acoustic resonance convergence. Masters Analysis Chamber tool.",
  alternates: {
    canonical: "https://jasoncholloway.com/chamber/harmonic-stack/",
  },
};

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
