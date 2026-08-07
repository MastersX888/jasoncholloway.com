import Link from "next/link";
import type { PassageBeat } from "@/lib/data/passages";

interface PassageSequenceProps {
  beats: PassageBeat[];
  /** Section label — default "From the Novel" */
  label?: string;
}

/** Ordered scene reel: story context + verbatim excerpt. */
export default function PassageSequence({ beats, label = "From the Novel" }: PassageSequenceProps) {
  return (
    <section
      className="section"
      style={{ borderTop: "1px solid var(--border-faint)", borderBottom: "1px solid var(--border-faint)" }}
    >
      <div className="container">
        <div className="section-label-row" style={{ marginBottom: "2.5rem" }}>
          <h2 className="label">{label}</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", maxWidth: "820px" }}>
          {beats.map((beat, i) => (
            <article key={i}>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-faint)",
                  lineHeight: 1.6,
                  marginBottom: "0.85rem",
                  maxWidth: "65ch",
                }}
              >
                {beat.context}
              </p>
              <blockquote className="fn-excerpt" style={{ margin: 0 }}>
                {beat.paragraphs.map((para, j) => (
                  <p key={j} style={{ marginBottom: j < beat.paragraphs.length - 1 ? "0.75rem" : 0 }}>
                    {para}
                  </p>
                ))}
                <cite>
                  — {beat.attribution}
                  {beat.href && (
                    <>
                      {" · "}
                      <Link href={beat.href} style={{ color: "inherit", textDecoration: "underline" }}>
                        Read more
                      </Link>
                    </>
                  )}
                </cite>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
