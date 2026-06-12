import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem",
      background: "var(--bg)",
    }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "5rem", color: "var(--border)", lineHeight: 1, marginBottom: "1rem" }}>404</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "0.75rem", fontWeight: 300 }}>
        This frequency is not in the archive
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontStyle: "italic", fontFamily: "var(--font-display)" }}>
        The page you&apos;re looking for doesn&apos;t exist — or has been scattered across seven cities.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", maxWidth: "600px" }}>
        <Link href="/" className="btn btn-outline">Return Home</Link>
        <Link href="/books/masters-x" className="btn btn-gold">Read the Trilogy</Link>
        <Link href="/field-notes" className="btn btn-outline">Field Notes</Link>
        <Link href="/chamber" className="btn btn-outline" style={{ color: "var(--cyan)", borderColor: "var(--cyan-dim)" }}>
          Analysis Chamber
        </Link>
      </div>
    </div>
  );
}
