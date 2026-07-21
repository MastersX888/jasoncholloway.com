import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    type: "article",
  },
};

export default function FieldNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
