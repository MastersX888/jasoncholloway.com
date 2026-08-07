interface PassageExcerptProps {
  title?: string;
  paragraphs: string[];
  attribution?: string;
  className?: string;
}

/** Multi-paragraph verbatim fiction block (Field Notes excerpt styling). */
export default function PassageExcerpt({
  title,
  paragraphs,
  attribution,
  className = "",
}: PassageExcerptProps) {
  return (
    <figure className={className}>
      {title && (
        <figcaption
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.75rem",
            fontWeight: 600,
          }}
        >
          {title}
        </figcaption>
      )}
      <blockquote className="fn-excerpt" style={{ margin: title ? "0 0 0.5rem" : undefined }}>
        {paragraphs.map((para, i) => (
          <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? "0.75rem" : 0 }}>
            {para}
          </p>
        ))}
        {attribution && <cite>— {attribution}</cite>}
      </blockquote>
    </figure>
  );
}
