import { notFound } from "next/navigation";
import MomentLayout from "@/components/books/MomentLayout";
import { getMomentBySlug, novelMoments } from "@/lib/data/moments";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return novelMoments.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const moment = getMomentBySlug(slug);
  if (!moment) return {};

  return buildMetadata({
    title: `${moment.title} · Masters X Scene`,
    description: moment.description,
    path: `/books/masters-x/moments/${slug}/`,
    ogType: "article",
  });
}

export default async function MomentPage({ params }: Props) {
  const { slug } = await params;
  const moment = getMomentBySlug(slug);
  if (!moment) notFound();
  return <MomentLayout moment={moment} />;
}
