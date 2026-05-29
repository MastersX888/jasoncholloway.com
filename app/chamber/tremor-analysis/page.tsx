"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { caveSites } from "@/lib/data/notae";

const BLAKE_BASELINE = 111.2;
const MODEL_RESULT = 111.19;
const DEVIATION = Math.abs(BLAKE_BASELINE - MODEL_RESULT);

const measurements = [
  { label: "Blake's tremor baseline", hz: BLAKE_BASELINE, source: "Bilateral tremor onset, Strahov crypt, Book I" },
  { label: "Iceland basalt cave", hz: 111.0, source: "Andrew's primary research site, Book II–III" },
  { label: "Laser vibrometer model", hz: MODEL_RESULT, source: "Andrew's proof-of-concept — 'It works.', Book II" },
  { label: "Kansas City limestone", hz: 109.0, source: "Moreau chamber, SubTropolis, Book III" },
  { label: "Ghana laterite cave", hz: 111.7, source: "Cave Three, Blake's fourth harmonic session, Book II" },
  { label: "Prague Strahov", hz: 111.2, source: "Origin site, initial exposure, Book I" },
  { label: "Preparation protocol target", hz: 111.2, source: "William Masters Foundation specification" },
  { label: "Chartres cathedral (nave)", hz: 110.5, source: "Andrew's algorithm analysis, Book II" },
];

export default function TremorAnalysisPage() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const rangeMin = 107;
  const rangeMax = 115;
  const rangeSpan = rangeMax - rangeMin;

  return (
    <>
      <section className="page-header page-header-chamber">
        <div className="container">
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", alignItems: "center" }}>
            <Link href="/chamber" className="btn btn-ghost btn-sm">← Chamber</Link>
            <span className="label-cyan">Layer IV</span>
          </div>
          <h1 className="display-lg" style={{ marginBottom: "0.75rem" }}>
            Tremor<br />
            <span className="glow-cyan">Convergence Analysis</span>
          </h1>
          <p style={{ maxWidth: "54ch", color: "var(--text-muted)", lineHeight: 1.7 }}>
            Blake&apos;s bilateral tremor: 111.2 Hz. Andrew&apos;s laser vibrometer model: 111.19 Hz.
            Deviation: 0.01 Hz — within four-hundredths of a hertz.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">

          {/* Key result card */}
          <div style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--cyan-dim)",
            borderRadius: "var(--r-xl)",
            padding: "2rem",
            marginBottom: "3rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "2rem",
            textAlign: "center",
          }}>
            {[
              { label: "Blake's Tremor Baseline", value: `${BLAKE_BASELINE} Hz`, sub: "Permanent bilateral tremor onset: Strahov crypt", color: "var(--gold)" },
              { label: "Model Resonance (Andrew)", value: `${MODEL_RESULT} Hz`, sub: "Laser vibrometer proof-of-concept", color: "var(--cyan)" },
              { label: "Deviation", value: `Δ ${DEVIATION.toFixed(2)} Hz`, sub: "Within four-hundredths of a hertz", color: "var(--text-muted)" },
            ].map((item) => (
              <div key={item.label} style={{ padding: "1rem", background: "var(--bg-raised)", borderRadius: "var(--r-lg)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-faint)", marginBottom: "0.5rem" }}>{item.label}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.8rem", color: item.color, lineHeight: 1, marginBottom: "0.5rem" }}>{item.value}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Convergence visualization */}
          <div className="section-label-row"><span className="label-cyan">All Measurements — Convergence Plot ({rangeMin}–{rangeMax} Hz)</span></div>

          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "2rem", marginBottom: "3rem" }}>
            {/* Scale */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>
              {[107, 108, 109, 110, 111, 112, 113, 114, 115].map((hz) => (
                <span key={hz}>{hz}</span>
              ))}
            </div>

            {/* Target band */}
            <div style={{ position: "relative", height: 24, background: "var(--bg-raised)", borderRadius: "var(--r-sm)", marginBottom: "2rem", overflow: "hidden" }}>
              <div style={{
                position: "absolute",
                left: `${((110 - rangeMin) / rangeSpan) * 100}%`,
                right: `${100 - ((112 - rangeMin) / rangeSpan) * 100}%`,
                top: 0, bottom: 0,
                background: "rgba(76, 201, 201, 0.1)",
                borderLeft: "1px dashed var(--cyan-dim)",
                borderRight: "1px dashed var(--cyan-dim)",
              }} />
              <div style={{
                position: "absolute",
                left: `${((BLAKE_BASELINE - rangeMin) / rangeSpan) * 100}%`,
                top: 0, bottom: 0,
                width: 2,
                background: "var(--gold)",
              }} />
              <div style={{ position: "absolute", left: `${((BLAKE_BASELINE - rangeMin) / rangeSpan) * 100}%`, top: "4px", fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "var(--gold)", whiteSpace: "nowrap", transform: "translateX(-50%)" }}>
                Blake 111.2
              </div>
            </div>

            {/* Measurements */}
            {measurements.map((m, i) => {
              const pos = ((m.hz - rangeMin) / rangeSpan) * 100;
              const isBlake = m.hz === BLAKE_BASELINE;
              const isModel = m.hz === MODEL_RESULT;
              return (
                <div key={i} style={{ marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem", fontSize: "0.78rem" }}>
                    <span style={{ color: isBlake ? "var(--gold)" : isModel ? "var(--cyan)" : "var(--text-muted)" }}>{m.label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", color: isBlake ? "var(--gold)" : isModel ? "var(--cyan)" : "var(--text-muted)" }}>{m.hz} Hz</span>
                  </div>
                  <div style={{ position: "relative", height: 8, background: "var(--bg-raised)", borderRadius: 4 }}>
                    {/* Target zone */}
                    <div style={{
                      position: "absolute",
                      left: `${((110 - rangeMin) / rangeSpan) * 100}%`,
                      right: `${100 - ((112 - rangeMin) / rangeSpan) * 100}%`,
                      top: 0, bottom: 0,
                      background: "rgba(76,201,201,0.06)",
                    }} />
                    {/* Bar */}
                    <div
                      className="convergence-fill"
                      style={{
                        width: animated ? `${pos}%` : "0%",
                        background: isBlake ? "var(--gold)" : isModel ? "var(--cyan)" : "linear-gradient(90deg, var(--bg-elevated), var(--cyan-dim))",
                        transitionDelay: `${i * 80}ms`,
                      }}
                    />
                    {/* Dot at position */}
                    <div style={{
                      position: "absolute",
                      left: animated ? `${pos}%` : "0%",
                      top: "50%",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: isBlake ? "var(--gold)" : isModel ? "var(--cyan)" : "var(--cyan-dim)",
                      border: "2px solid var(--bg)",
                      transform: "translate(-50%, -50%)",
                      transition: `left 1s var(--ease-out) ${i * 80}ms`,
                    }} />
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-faint)", marginTop: "0.2rem" }}>{m.source}</div>
                </div>
              );
            })}
          </div>

          {/* The "It works" moment */}
          <div className="ms-pull">
            <p>
              He knew this. He built anyway. Because the alternative was to stop, and stopping meant Jennifer had left for nothing,
              and Stanford had been declined for nothing, and two years of eighteen-hour days had produced nothing but an impressive
              software system. The model resonated at 111.19 Hz. Within four-hundredths of a hertz. The data was clean.
              The proof of concept was proved.
            </p>
            <cite>— Andrew Chen · Book II, Chapter 29</cite>
          </div>

          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="card">
              <div className="label" style={{ marginBottom: "0.75rem" }}>The Carrier Bloodline</div>
              <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                The &ldquo;carrier signature&rdquo; concept holds that certain bloodlines maintain a neural architecture
                shaped by generational proximity to high-frequency geological environments. Blake&apos;s tremor (111.2 Hz)
                is not a pathology — it&apos;s an inheritance. William Masters encoded his own reading (111.2) on the
                flyleaf of his grandson&apos;s copy of Don Quixote in 1974.
              </p>
            </div>
            <div className="card">
              <div className="label" style={{ marginBottom: "0.75rem" }}>The Laser Vibrometer</div>
              <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                Andrew calibrated his laser vibrometer using Jennifer&apos;s engagement ring as a reference weight
                (4.2 grams, 14-karat white gold, 0.6-carat princess cut). The ring remained on his desk after she
                left — not as sentiment, but as calibration. The model confirmed 111.19 Hz. He sent Blake two words:
                <em style={{ color: "var(--cyan)" }}> It works.</em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
