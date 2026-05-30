"use client";
import { useState } from "react";
import Link from "next/link";
import { caveSites, type CaveSite } from "@/lib/data/notae";

// Map pin positions (% of map image size)
// Using a simplified world map projection
const sitePositions: Record<string, { x: number; y: number }> = {
  iceland:      { x: 46.5, y: 20 },
  ghana:        { x: 48.5, y: 57 },
  "kansas-city": { x: 23, y: 37 },
  prague:       { x: 51.5, y: 28 },
  chartres:     { x: 49.5, y: 30 },
  reims:        { x: 50.2, y: 29.5 },
  "buenos-aires": { x: 28, y: 74 },
  osaka:        { x: 79, y: 38 },
  lagos:        { x: 49, y: 57.5 },
};

export default function GlobalMapPage() {
  const [activeSite, setActiveSite] = useState<CaveSite | null>(caveSites[0]);

  return (
    <>
      <section className="page-header page-header-chamber">
        <div className="container">
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", alignItems: "center" }}>
            <Link href="/chamber" className="btn btn-ghost btn-sm">← Chamber</Link>
            <span className="label-cyan">Layer II</span>
          </div>
          <h1 className="display-lg" style={{ marginBottom: "0.75rem" }}>
            Global Cave<br />
            <span className="glow-cyan">Site Map</span>
          </h1>
          <p style={{ maxWidth: "54ch", color: "var(--text-muted)", lineHeight: 1.7 }}>
            Nine documented sites. Four continents. Every geology produces its own song — but every song
            converges within 3% of the 111 Hz fundamental.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "2rem", alignItems: "start" }}>

            {/* Map */}
            <div>
              <div className="map-container" style={{ paddingBottom: "55%" }}>
                {/* World map SVG background */}
                <svg
                  viewBox="0 0 1000 550"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35 }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simplified continent outlines */}
                  {/* North America */}
                  <path d="M80,80 L200,60 L240,90 L260,160 L230,200 L180,220 L150,260 L120,300 L80,320 L60,280 L40,200 L60,140 Z" fill="#2A2A3F" stroke="#3A3A5F" strokeWidth="1"/>
                  {/* South America */}
                  <path d="M180,310 L230,300 L260,340 L280,400 L260,460 L220,500 L180,490 L160,440 L150,380 L160,340 Z" fill="#2A2A3F" stroke="#3A3A5F" strokeWidth="1"/>
                  {/* Europe */}
                  <path d="M440,80 L520,70 L560,90 L570,130 L540,160 L500,170 L460,160 L440,140 L430,110 Z" fill="#2A2A3F" stroke="#3A3A5F" strokeWidth="1"/>
                  {/* Africa */}
                  <path d="M450,170 L530,160 L570,200 L580,280 L560,380 L530,450 L490,470 L460,440 L440,360 L430,280 L440,220 Z" fill="#2A2A3F" stroke="#3A3A5F" strokeWidth="1"/>
                  {/* Asia */}
                  <path d="M560,60 L750,50 L830,80 L860,120 L840,180 L800,210 L750,200 L700,180 L650,190 L600,180 L570,150 L550,120 Z" fill="#2A2A3F" stroke="#3A3A5F" strokeWidth="1"/>
                  {/* Australia */}
                  <path d="M750,320 L840,310 L880,360 L870,420 L820,450 L760,440 L730,400 L730,360 Z" fill="#2A2A3F" stroke="#3A3A5F" strokeWidth="1"/>
                  {/* Grid lines */}
                  {[0, 100, 200, 300, 400, 500].map((y) => (
                    <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#1E1E2E" strokeWidth="0.5"/>
                  ))}
                  {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((x) => (
                    <line key={x} x1={x} y1="0" x2={x} y2="550" stroke="#1E1E2E" strokeWidth="0.5"/>
                  ))}
                  {/* Equator */}
                  <line x1="0" y1="280" x2="1000" y2="280" stroke="#2A2A3F" strokeWidth="1" strokeDasharray="4 8"/>
                </svg>

                {/* Site pins */}
                {caveSites.map((site) => {
                  const pos = sitePositions[site.id] || { x: 50, y: 50 };
                  const isActive = activeSite?.id === site.id;
                  return (
                    <button
                      key={site.id}
                      className="map-pin"
                      style={{
                        position: "absolute",
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        zIndex: isActive ? 10 : 5,
                      }}
                      onClick={() => setActiveSite(site)}
                      title={site.name}
                    >
                      <div
                        className="map-pin-dot"
                        style={{
                          background: isActive ? "var(--gold)" : "var(--cyan)",
                          boxShadow: isActive ? "0 0 0 0 rgba(201,168,76,0.4)" : undefined,
                          transform: isActive ? "scale(1.5)" : undefined,
                        }}
                      />
                      <div className="map-pin-label" style={{ opacity: 1, bottom: 20 }}>
                        {site.frequencyHz} Hz
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Frequency convergence bar */}
              <div style={{ marginTop: "1.5rem" }}>
                <div className="label-cyan" style={{ marginBottom: "0.75rem" }}>Frequency Distribution — All Sites</div>
                <div style={{ position: "relative", height: 48, background: "var(--bg-surface)", borderRadius: "var(--r-md)", border: "1px solid var(--border)", overflow: "hidden" }}>
                  {/* Target band */}
                  <div style={{
                    position: "absolute",
                    left: `${((110 - 105) / 10) * 100}%`,
                    right: `${100 - ((113 - 105) / 10) * 100}%`,
                    top: 0, bottom: 0,
                    background: "rgba(76,201,201,0.06)",
                    borderLeft: "1px solid var(--cyan-dim)",
                    borderRight: "1px solid var(--cyan-dim)",
                  }} />
                  <div style={{ position: "absolute", left: `${((111.2 - 105) / 10) * 100}%`, top: 0, bottom: 0, width: 2, background: "var(--gold)", opacity: 0.7 }} />
                  {caveSites.map((site) => {
                    const pos = ((site.frequencyHz - 105) / 10) * 100;
                    const isActive = activeSite?.id === site.id;
                    return (
                      <button key={site.id} onClick={() => setActiveSite(site)} style={{
                        position: "absolute",
                        left: `${pos}%`,
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 10, height: 10,
                        borderRadius: "50%",
                        background: isActive ? "var(--gold)" : "var(--cyan)",
                        border: "2px solid var(--bg)",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                      }} title={`${site.name}: ${site.frequencyHz} Hz`} />
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem", fontSize: "0.65rem", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
                  <span>105 Hz</span><span>107.5 Hz</span><span>111.2 Hz (Blake)</span><span>112.5 Hz</span><span>115 Hz</span>
                </div>
              </div>
            </div>

            {/* Site detail panel */}
            <div style={{ position: "sticky", top: 80 }}>
              {activeSite && (
                <div className="site-modal">
                  <div className="label-cyan" style={{ marginBottom: "0.5rem" }}>{activeSite.country}</div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", marginBottom: "0.25rem" }}>{activeSite.name}</h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>{activeSite.location}</p>

                  <div className="site-modal-freq">
                    {activeSite.frequencyHz}<span style={{ fontSize: "0.5em", color: "var(--cyan-dim)", marginLeft: "0.2em" }}>Hz</span>
                  </div>

                  {/* Deviation from 111.2 */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-faint)", marginBottom: "0.25rem" }}>
                      Δ from Blake&apos;s baseline (111.2 Hz): {Math.abs(activeSite.frequencyHz - 111.2).toFixed(1)} Hz
                      ({((Math.abs(activeSite.frequencyHz - 111.2) / 111.2) * 100).toFixed(1)}%)
                    </div>
                    <div className="convergence-track">
                      <div className="convergence-fill" style={{ width: `${100 - (Math.abs(activeSite.frequencyHz - 111.2) / 5) * 100}%` }} />
                    </div>
                  </div>

                  {[
                    { label: "Substrate", value: activeSite.substrate },
                    { label: "Chapter Ref", value: activeSite.chapterRef },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid var(--border-faint)", fontSize: "0.8rem" }}>
                      <span style={{ color: "var(--text-faint)", width: "80px", flexShrink: 0 }}>{row.label}</span>
                      <span style={{ color: "var(--text-muted)" }}>{row.value}</span>
                    </div>
                  ))}

                  <div className="ms-pull" style={{ marginTop: "1rem" }}>
                    <p style={{ fontSize: "0.82rem" }}>{activeSite.excerpt}</p>
                  </div>

                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.6, marginTop: "1rem" }}>
                    {activeSite.significance}
                  </p>
                </div>
              )}

              {/* All sites list */}
              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {caveSites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => setActiveSite(site)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.6rem 0.75rem",
                      borderRadius: "var(--r-sm)",
                      background: activeSite?.id === site.id ? "var(--cyan-glow)" : "transparent",
                      border: activeSite?.id === site.id ? "1px solid var(--cyan-dim)" : "1px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text)", fontFamily: "var(--font-display)" }}>{site.name}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-faint)" }}>{site.country}</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--cyan)" }}>{site.frequencyHz} Hz</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
