import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Voynich Manuscript Folio Visualizer — 181 Folios",
  titleAbsolute: true,
  description:
    "Explore 181 Voynich Manuscript folios and Ars Notoria notae interactively. Beinecke MS 408 scans with folio navigation — free tool from the Analysis Chamber.",
  socialTitle: "Voynich Manuscript Folio Visualizer — 181 Folios Interactive",
  path: "/chamber/folio-visualizer/",
  ogType: "article",
  image: {
    url: "https://jasoncholloway.com/folios/voynich/Vol%204/f85v-86r.jpg",
    alt: "Voynich Manuscript folio f85v-86r Great Rosette foldout — Beinecke MS 408",
  },
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
