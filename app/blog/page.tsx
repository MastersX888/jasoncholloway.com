import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedBlogPosts } from "@/lib/data/blogPosts";

export const metadata: Metadata = {
  title: "The Facts Behind the Fiction: Essays",
  description:
    "Essays on the real research behind the Masters X Trilogy: 111 Hz archaeoacoustics, cymatics, Kansas City geography, and declassified files, with the line between fact and fiction named in every piece.",
  alternates: { canonical: "https://jasoncholloway.com/blog/" },
  openGraph: {
    title: "The Facts Behind the Fiction: Essays by Jason Carroll Holloway",
    description:
      "Real documents, measured frequencies, and real places behind the Masters X Trilogy, each one labeled.",
    url: "https://jasoncholloway.com/blog/",
    images: [{ url: "https://jasoncholloway.com/og/field-notes/hub.png", width: 1200, height: 630, alt: "The Facts Behind the Fiction: Masters X research essays" }],
  },
};

export default function BlogHub() {
  const posts = getPublishedBlogPosts();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <div className="section-label-row" style={{ marginBottom: "1.5rem" }}>
              <span className="label">Jason Carroll Holloway · Seventh City Press</span>
            </div>
            <h1 className="display-xl" style={{ marginBottom: "1rem" }}>
              The Facts Behind<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>the Fiction</span>
            </h1>
            <p style={{ maxWidth: "62ch", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.85 }}>
              Each essay opens from a single concrete detail in the trilogy, walks into the real research behind it, and closes by naming exactly where fact ends and fiction begins.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="fn-hub-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}/`} className="fn-hub-card">
                <div className="fn-hub-card-label">Essay {post.seriesNumber}</div>
                <div className="fn-hub-card-title">{post.title}</div>
                <div className="fn-hub-card-desc">{post.dek}</div>
                <div className="fn-hub-card-arrow">Read the essay →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
