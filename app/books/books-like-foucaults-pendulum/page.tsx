import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books Like Foucault's Pendulum: The Masters X Trilogy",
  description: "Looking for books like Foucault's Pendulum? Jason C. Holloway's Masters X Trilogy is a sprawling conspiracy thriller that weaves real medieval manuscripts and acoustic science into a modern mystery.",
  alternates: {
    canonical: "https://jasoncholloway.com/books/books-like-foucaults-pendulum/",
  },
};

export default function FoucaultsPendulumCompPage() {
  return (
    <>
      <section className="page-header" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <div className="page-header-inner">
            <h1 className="display-lg" style={{ marginBottom: "1rem" }}>
              Books Like <em>Foucault&apos;s Pendulum</em>
            </h1>
            <p style={{ maxWidth: "60ch", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              If you are looking for novels that combine deep historical research, medieval manuscript traditions, and sprawling intellectual conspiracies, discover the Masters X Trilogy.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem", minHeight: "60vh" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", lineHeight: 1.8, color: "var(--text)" }}>
            <p>
              Umberto Eco&apos;s <em>Foucault&apos;s Pendulum</em> set the standard for the intellectual thriller. It demonstrated that a conspiracy novel didn&apos;t need to dumb down its history — it could weaponize it. It showed that the Voynich Manuscript, the Knights Templar, and Rosicrucian manifestos were more thrilling when treated with rigorous, almost academic obsession.
            </p>
            <p>
              For readers searching for <strong>books like Foucault&apos;s Pendulum</strong>, Jason Carroll Holloway&apos;s <Link href="/books/masters-x" className="hover-gold" style={{ textDecoration: "underline", color: "var(--gold)" }}>Masters X Trilogy</Link> operates in that exact tradition.
            </p>

            <div style={{ background: "var(--bg-raised)", padding: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-faint)", marginTop: "1rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "1rem" }}>The Architecture of the Conspiracy</h2>
              <p style={{ marginBottom: "1rem" }}>
                Where Eco&apos;s protagonists feed the history of the occult into a computer named Abulafia, the protagonists of the Masters X Trilogy are acoustic engineers and manuscript historians. They aren&apos;t inventing a conspiracy; they are decoding an architectural and acoustic reality that has been hidden in plain sight for centuries.
              </p>
              <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-muted)" }}>
                <li><strong>Real Manuscripts:</strong> The trilogy hinges on genuine, undeciphered texts like the <Link href="/field-notes/voynich-manuscript" className="hover-gold">Voynich Manuscript</Link> and the <Link href="/field-notes/ars-notoria" className="hover-gold">Ars Notoria</Link>.</li>
                <li><strong>Archaeoacoustics:</strong> The conspiracy isn&apos;t just textual; it&apos;s physical, centered around the <Link href="/field-notes/111-hz" className="hover-gold">111 Hz resonance frequency</Link> found in ancient megalithic structures.</li>
                <li><strong>Real Locations:</strong> From the massive <Link href="/field-notes/subtropolis" className="hover-gold">SubTropolis</Link> limestone mine beneath Kansas City to the crypts of the <Link href="/field-notes/strahov-monastery" className="hover-gold">Strahov Monastery</Link> in Prague.</li>
              </ul>
            </div>

            <p style={{ marginTop: "1rem" }}>
              Like <em>Foucault&apos;s Pendulum</em>, the Masters X Trilogy demands a reader willing to engage with complex ideas — from cognitive science to medieval theology. It is a thriller that thinks.
            </p>

            <div style={{ textAlign: "center", marginTop: "2rem", padding: "3rem 0", borderTop: "1px solid var(--border-faint)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: "1rem" }}>Begin the Investigation</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                Explore the research archive in the Analysis Chamber, or read the opening chapters of Volume I.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/books/masters-x" className="btn btn-gold">
                  Explore the Trilogy
                </Link>
                <Link href="/chamber" className="btn btn-outline">
                  Enter the Analysis Chamber
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
