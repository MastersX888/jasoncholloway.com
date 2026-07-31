import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Global Cave Site Map",
  description: "Global acoustic cave site map exploring convergent frequencies. Virtual Masters Analysis Chamber tool.",
  path: "/chamber/global-map/",
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
      "name": "Global Cave Site Map",
      "item": "https://jasoncholloway.com/chamber/global-map/"
    }
  ]
};

export default function GlobalMapLayout({
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
