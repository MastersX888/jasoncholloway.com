import type { Metadata } from "next";

const ogTitle = "Voynich Manuscript Folio Visualizer — 181 Folios Interactive";
const ogDescription =
  "Explore 181 Voynich Manuscript folios and Ars Notoria notae interactively. Beinecke MS 408 scans with folio navigation — free tool from the Analysis Chamber.";
const ogImage = {
  url: "https://jasoncholloway.com/folios/voynich/Vol%204/f85v-86r.jpg",
  alt: "Voynich Manuscript folio f85v-86r Great Rosette foldout — Beinecke MS 408",
};

export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  alternates: {
    canonical: "https://jasoncholloway.com/chamber/folio-visualizer/",
  },
  openGraph: {
    type: "article",
    title: ogTitle,
    description: ogDescription,
    url: "https://jasoncholloway.com/chamber/folio-visualizer/",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [ogImage.url],
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
