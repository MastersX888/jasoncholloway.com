import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Tremor Convergence Analysis",
  description:
    "Blake's tremor at 111.2 Hz against Andrew's model at 111.19 Hz — a 0.01 Hz deviation, visualised. From the Masters X Trilogy.",
  path: "/chamber/tremor-analysis/",
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
      "name": "Tremor Convergence Analysis",
      "item": "https://jasoncholloway.com/chamber/tremor-analysis/"
    }
  ]
};

export default function TremorAnalysisLayout({
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
