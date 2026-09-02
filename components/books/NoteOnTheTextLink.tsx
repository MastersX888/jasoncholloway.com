import Link from "next/link";

type Props = {
  variant?: "compact" | "card";
};

export default function NoteOnTheTextLink({ variant = "compact" }: Props) {
  if (variant === "card") {
    return (
      <div
        style={{
          background: "var(--bg-raised)",
          border: "1px solid var(--border-faint)",
          borderLeft: "3px solid var(--gold-dim)",
          borderRadius: "var(--r-lg)",
          padding: "1.25rem 1.5rem",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.5rem",
          }}
        >
          Textual History
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
          The trilogy exists in three states of the printed text — what changed after publication, and how to tell which copy you hold.
        </p>
        <Link href="/note-on-the-text" style={{ fontSize: "0.88rem", fontWeight: 500 }}>
          A Note on the Text →
        </Link>
      </div>
    );
  }

  return (
    <p style={{ color: "var(--text-faint)", fontSize: "0.85rem", lineHeight: 1.65, marginTop: "1.25rem" }}>
      Own a copy from June–August 2026?{" "}
      <Link href="/note-on-the-text" style={{ color: "var(--gold)" }}>
        A Note on the Text
      </Link>{" "}
      records three states of the edition and how to identify yours.
    </p>
  );
}
