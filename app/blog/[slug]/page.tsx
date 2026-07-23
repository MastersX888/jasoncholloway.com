import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { getBlogMarkdownFile, getBlogPost, getPublishedBlogPosts } from "@/lib/data/blogPosts";
import { markdownToHtml, siteReadyMarkdown } from "@/lib/markdown";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post || post.status !== "published") return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `https://jasoncholloway.com/blog/${slug}/` },
    openGraph: {
      title: `${post.metaTitle} | Jason Carroll Holloway`,
      description: post.metaDescription,
      url: `https://jasoncholloway.com/blog/${slug}/`,
      type: "article",
      publishedTime: post.datePublished,
      images: [{ url: `https://jasoncholloway.com${post.ogImage}`, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post || post.status !== "published") notFound();

  const mdFile = getBlogMarkdownFile(slug);
  if (!mdFile) notFound();

  const raw = fs.readFileSync(path.join(process.cwd(), "content/blog", `${mdFile}.md`), "utf8");
  const html = markdownToHtml(siteReadyMarkdown(raw));

  return (
    <BlogPostLayout
      slug={slug}
      title={post.title}
      seriesNumber={post.seriesNumber}
      datePublished={post.datePublished}
      fieldNotes={post.fieldNotes}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </BlogPostLayout>
  );
}
