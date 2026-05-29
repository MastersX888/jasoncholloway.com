"use client";
import { useState } from "react";
import Link from "next/link";
import { majorNotae, harmonicStack, type Nota } from "@/lib/data/notae";

export default function HarmonicStackPage() {
  const [activeNota, setActiveNota] = useState<Nota>(majorNotae[0]);
  const [activeHarmonic, setActiveHarmonic] = useState<number | null>(null);

  return (
    <>
      <section className="page-header page-header-chamber">
        <div className="container">
          <div className="page-header-inner">
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", alignItems: "center" }}>
              <Link href="/chamber" className="btn btn-ghost btn-sm">← Chamber</Link>
              <span className="label-cyan">Layer I</span>
            </div>
            <h1 className="display-lg" style={{ marginBottom: "0.75rem" }}>
              Harmonic Stack<br />
              <span className="glow-cyan">Explorer</span>
            </h1>
            <p style={{ maxWidth: "54ch", color: "var(--text-muted)", lineHeight: 1.7 }}>
              The Ars Notoria&apos;s 14 major <em>notae</em> decoded as acoustic engineering specifications.
              Select a nota to see the gematria derivation, body position, and harmonic output.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">

          {/* Harmonic Stack Overview */}
          <div className="section-label-row"><span className="label-cyan">The Harmonic Stack</span></div>
          <div className="freq-grid" style={{ marginBottom: "4rem" }}>
            {harmonicStack.map((h, i) => (
              <div
                key={i}
                className="freq-cell"
                style={{
                  cursor: "pointer",
                  borderColor: activeHarmonic === i ? "var(--cyan-dim)" : undefined,
                  background: activeHarmonic === i ? "rgba(76,201,201,0.06)" : undefined,
                }}
                onClick={() => setActiveHarmonic(activeHarmonic === i ? null : i)}
              >
                <div className="freq-cell-value">
                  {h.hz}<span className="freq-cell-unit"> Hz</span>
                </div>
                <div className="freq-cell-label">{h.label}</div>
                <div className="freq-cell-harmonic">{h.description}</div>
              </div>
            ))}
          </div>

          {/* Nota Selector */}
          <div className="section-label-row"><span className="label">Major Notae — 14 of 46</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            {/* Nota grid */}
            <div>
              <div className="nota-grid">
                {majorNotae.map((nota) => (
                  <button
                    key={nota.id}
                    className={`nota-btn ${activeNota.id === nota.id ? "active" : ""}`}
                    onClick={() => setActiveNota(nota)}
                  >
                    <span className="nota-btn-glyph">{nota.glyph}</span>
                    <span className="nota-btn-name">{nota.name}</span>
                    <span className="nota-btn-hz">{nota.harmonicHz} Hz</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active nota detail */}
            <div style={{ position: "sticky", top: "80px" }}>
              <div className="card" style={{ background: "var(--bg-raised)", borderColor: "var(--gold-dim)" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div>
                    <div style={{ fontSize: "3rem", lineHeight: 1, marginBottom: "0.25rem" }}>{activeNota.glyph}</div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 400 }}>{activeNota.name}</h2>
                    <div className="badge badge-gold" style={{ marginTop: "0.4rem" }}>{activeNota.type === "major" ? "Major Nota" : "Minor Nota"}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "2.2rem", color: "var(--cyan)", lineHeight: 1 }}>
                      {activeNota.harmonicHz}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--cyan-dim)", letterSpacing: "0.1em" }}>Hz</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-faint)", marginTop: "0.25rem" }}>{activeNota.harmonicName}</div>
                  </div>
                </div>

                {/* Gematria */}
                <div style={{ background: "var(--bg-surface)", borderRadius: "var(--r-md)", padding: "1rem", marginBottom: "1rem" }}>
                  <div className="label" style={{ marginBottom: "0.5rem" }}>Gematria Derivation</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                    {activeNota.derivation}
                  </div>
                  <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "var(--text-faint)", fontSize: "0.75rem" }}>Sum:</span>
                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--gold)" }}>{activeNota.gematria}</span>
                  </div>
                </div>

                {/* Body position */}
                <div style={{ marginBottom: "1rem" }}>
                  <div className="label" style={{ marginBottom: "0.5rem", color: "var(--text-faint)" }}>Body Position (Coupling Configuration)</div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    {activeNota.bodyPosition}
                  </p>
                </div>

                {/* Manuscript excerpt */}
                <div className="ms-pull" style={{ marginTop: "1rem" }}>
                  <p style={{ fontSize: "0.88rem" }}>{activeNota.excerpt}</p>
                  <cite>{activeNota.chapterRef}</cite>
                </div>
              </div>
            </div>
          </div>

          {/* Visual frequency bar */}
          <div style={{ marginTop: "4rem" }}>
            <div className="section-label-row"><span className="label-cyan">Frequency Spectrum — Harmonic Stack</span></div>
            <div style={{ position: "relative", height: "80px", background: "var(--bg-surface)", borderRadius: "var(--r-md)", border: "1px solid var(--border)", overflow: "hidden" }}>
              {/* Schumann reference */}
              <div style={{ position: "absolute", left: "0.5%", top: 0, bottom: 0, width: 1, background: "var(--gold-dim)", opacity: 0.5 }} />
              <div style={{ position: "absolute", left: "0.5%", top: "4px", fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--gold-dim)", whiteSpace: "nowrap" }}>7.83</div>

              {/* Harmonic bars — normalized across 0–500 Hz */}
              {harmonicStack.map((h, i) => {
                const pos = (h.hz / 500) * 100;
                const isActive = activeNota.harmonicHz === h.hz;
                return (
                  <div key={i} style={{ position: "absolute", left: `${pos}%`, top: 0, bottom: 0, width: isActive ? 3 : 2, background: isActive ? "var(--cyan)" : "var(--cyan-dim)", opacity: isActive ? 1 : 0.4 }}>
                    <div style={{ position: "absolute", top: "4px", left: "4px", fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: isActive ? "var(--cyan)" : "var(--text-faint)", whiteSpace: "nowrap" }}>
                      {h.hz}
                    </div>
                  </div>
                );
              })}

              {/* Active nota highlight */}
              <div style={{
                position: "absolute",
                left: `${(activeNota.harmonicHz / 500) * 100 - 1}%`,
                top: 0,
                bottom: 0,
                width: "2%",
                background: "var(--cyan)",
                opacity: 0.08,
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem", fontSize: "0.65rem", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
              <span>0 Hz</span><span>100 Hz</span><span>200 Hz</span><span>300 Hz</span><span>400 Hz</span><span>500 Hz</span>
            </div>
          </div>

          {/* Context note */}
          <div style={{ marginTop: "3rem", padding: "1.25rem 1.5rem", background: "var(--bg-surface)", borderRadius: "var(--r-md)", border: "1px solid var(--border-faint)", fontSize: "0.82rem", color: "var(--text-faint)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-muted)" }}>Historical source:</strong> The Ars Notoria is a genuine 13th-century grimoire tradition documented in the British Library (Sloane MSS 1712, 3826). The frequency derivations above are the fictional extension Jason C. Holloway developed for the Masters X Trilogy, grounded in the manuscript&apos;s actual notae imagery and gematria tradition.
          </div>
        </div>
      </section>
    </>
  );
}
