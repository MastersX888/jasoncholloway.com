import Link from "next/link";
import Image from "next/image";
import { books } from "@/lib/data/books";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Downloads Are Ready",
  description: "Download your complimentary opening chapters of the Masters X Trilogy and the Distribution File.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ChaptersSentPage() {
  const trilogy = books.filter((b) => b.series === "Masters X" && b.slug !== "omnibus");
  
  return (
    <div className="container" style={{ padding: "6rem 0", maxWidth: "800px" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 className="display-lg" style={{ marginBottom: "1.5rem" }}>
          Your downloads are ready.
        </h1>
        
        <div style={{ margin: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <a 
            href="/downloads/masters-x-opening-chapters.epub" 
            download
            className="btn btn-gold"
            style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
          >
            Download the Opening Chapters (EPUB)
          </a>
          <a 
            href="/downloads/The_Distribution_File.pdf" 
            download
            className="btn btn-outline"
            style={{ fontSize: "1rem", padding: "0.9rem 2.5rem" }}
          >
            Download the Distribution File (PDF)
          </a>
        </div>
        
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto" }}>
          Save these files now — this page is your delivery. You&apos;re also on the dispatch list for
          launch notes from Jason Carroll Holloway. Add dispatch@jasoncholloway.com to your contacts
          so nothing lands in spam.
        </p>
      </div>

      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-faint)", borderRadius: "var(--r-xl)", padding: "2rem", marginBottom: "4rem" }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text)" }}>How to read an EPUB</h3>
        <ul style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.7, paddingLeft: "1.2rem", margin: 0 }}>
          <li><strong>Apple devices:</strong> Apple Books and most Android readers open it natively.</li>
          <li><strong>Kindle:</strong> Use Amazon's Send-to-Kindle (the Kindle app and send.amazon.com accept EPUB).</li>
          <li><strong>Desktop:</strong> Use Calibre or any standard EPUB reader.</li>
        </ul>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "4rem" }}>
        <div className="section-label-row">
          <span className="label">The Masters X Trilogy</span>
        </div>
        
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginBottom: "3rem" }}>
          {trilogy.map((b) => (
            <Link key={b.slug} href={`/books/masters-x/${b.slug}`} style={{ display: "block", transition: "transform 0.2s" }} className="hover:-translate-y-1">
              <div style={{
                position: "relative",
                width: "120px",
                aspectRatio: "2/3",
                borderRadius: "var(--r-sm)",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                border: "1px solid var(--border-faint)"
              }}>
                <Image src={b.coverImagePB} alt={b.subtitle} fill style={{ objectFit: "cover" }} sizes="120px" />
              </div>
            </Link>
          ))}
        </div>
        
        <div className="section-label-row">
          <span className="label">Field Notes Teasers</span>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <Link href="/field-notes/subtropolis" className="card" style={{ padding: "1.5rem" }}>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold)", marginBottom: "0.5rem" }}>Beneath Kansas City</div>
            <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--text)" }}>SubTropolis</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>The world's largest underground business complex, carved into 270-million-year-old limestone.</p>
          </Link>
          
          <Link href="/field-notes/voynich-manuscript" className="card" style={{ padding: "1.5rem" }}>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold)", marginBottom: "0.5rem" }}>The Manuscripts</div>
            <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--text)" }}>The Voynich Manuscript</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>An undeciphered 15th-century codex once owned by Emperor Rudolf II.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
