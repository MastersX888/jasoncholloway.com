import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Folio Pattern Visualizer",
  description: "Explore the Voynich manuscript and Ars Notoria folios. Virtual visualizer tool for acoustic convergence analysis.",
  alternates: {
    canonical: "https://jasoncholloway.com/chamber/folio-visualizer/",
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
      "name": "Folio Pattern Visualizer",
      "item": "https://jasoncholloway.com/chamber/folio-visualizer/"
    }
  ]
};

export default function FolioVisualizerLayout({
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
