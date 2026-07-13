"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { schumannModes } from "@/lib/data/notae";

export default function SchumannPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMode, setActiveMode] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Background grid
      ctx.strokeStyle = "#1E1E2E";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 6]);
      for (let y = 0; y <= H; y += H / 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      for (let x = 0; x <= W; x += W / 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Center axis
      ctx.strokeStyle = "#2A2A3F";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();

      // Draw each Schumann mode
      schumannModes.forEach((mode, i) => {
        const isActive = i === activeMode;
        const normalizedFreq = mode.hz / 7.83;
        const amplitude = isActive ? 0.32 : 0.12;
        const speed = isActive ? 0.8 : 0.3;
        const color = isActive ? "#4CC9C9" : "#2A5A5A";
        const alpha = isActive ? 1 : 0.4;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = isActive ? 2 : 1;

        for (let x = 0; x < W; x++) {
          const t = tRef.current;
          const phase = (x / W) * Math.PI * 2 * normalizedFreq * 4 + t * speed;
          const y = H / 2 + Math.sin(phase) * H * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Active mode highlight pulse
      const pulseAlpha = 0.08 + 0.04 * Math.sin(tRef.current * 3);
      ctx.fillStyle = `rgba(76, 201, 201, ${pulseAlpha})`;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, W, H);

      // Label
      ctx.fillStyle = "#4CC9C9";
      ctx.globalAlpha = 0.8;
      ctx.font = `500 14px 'JetBrains Mono', monospace`;
      ctx.fillText(`${schumannModes[activeMode].hz} Hz — ${schumannModes[activeMode].label}`, 16, 28);
      ctx.globalAlpha = 1;

      if (isPlaying) {
        tRef.current += 0.016;
        animRef.current = requestAnimationFrame(draw);
      }
    };

    canvas.width = canvas.offsetWidth;
    canvas.height = 240;

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [activeMode, isPlaying]);

  return (
    <>
      <section className="page-header page-header-chamber">
        <div className="container">
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", alignItems: "center" }}>
            <Link href="/chamber" className="btn btn-ghost btn-sm">← Chamber</Link>
            <span className="label-cyan">Layer III</span>
          </div>
          <h1 className="display-lg" style={{ marginBottom: "0.75rem" }}>
            Schumann<br />
            <span className="glow-cyan">Resonance Baseline</span>
          </h1>
          <p style={{ maxWidth: "54ch", color: "var(--text-muted)", lineHeight: 1.7 }}>
            7.83 Hz. The earth&apos;s electromagnetic heartbeat. Andrew&apos;s Iceland control module monitored it
            continuously — the ground truth beneath every other measurement in the research.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">

          {/* Oscilloscope */}
          <div className="oscilloscope" style={{ marginBottom: "2rem" }}>
            <canvas ref={canvasRef} style={{ width: "100%", height: 240, display: "block" }} />
            <div style={{ padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--cyan-dim)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)" }}>
                LIVE · {schumannModes[activeMode].hz} Hz · Mode {activeMode + 1}
              </div>
              <button
                onClick={() => {
                  const next = !isPlaying;
                  setIsPlaying(next);
                  if (next && canvasRef.current) {
                    const ctx = canvasRef.current.getContext("2d");
                    if (ctx) {
                      const draw = () => {
                        animRef.current = requestAnimationFrame(draw);
                      };
                      draw();
                    }
                  }
                }}
                className="btn btn-outline btn-sm"
                style={{ color: "var(--cyan)", borderColor: "var(--cyan-dim)" }}
              >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>
            </div>
          </div>

          {/* Mode selector */}
          <div className="section-label-row"><span className="label-cyan">Schumann Resonance Modes</span></div>
          <div className="freq-grid" style={{ marginBottom: "3rem" }}>
            {schumannModes.map((mode, i) => (
              <button
                key={i}
                className="freq-cell"
                style={{
                  cursor: "pointer",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: activeMode === i ? "var(--cyan)" : "var(--border)",
                  background: activeMode === i ? "rgba(76,201,201,0.08)" : undefined,
                  textAlign: "left",
                }}
                onClick={() => setActiveMode(i)}
              >
                <div className="freq-cell-value">
                  {mode.hz}<span className="freq-cell-unit"> Hz</span>
                </div>
                <div className="freq-cell-label">Mode {mode.mode}</div>
                <div className="freq-cell-harmonic">{mode.label}</div>
              </button>
            ))}
          </div>

          {/* Relationship to 111.2 Hz */}
          <div className="section-label-row"><span className="label">Relationship to the Carrier Frequency</span></div>
          <div className="card" style={{ marginBottom: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
              {[
                { label: "Schumann Fundamental", hz: 7.83, note: "Earth's EM cavity baseline" },
                { label: "Ratio to Carrier", hz: "×14.2", note: "7.83 × 14.2 ≈ 111.2 Hz" },
                { label: "Carrier Frequency", hz: 111.2, note: "Blake's tremor / cave fundamental" },
                { label: "Raphael Harmonic", hz: 333.6, note: "3 × 111.2 Hz — third harmonic" },
              ].map((item) => (
                <div key={item.label} style={{ padding: "1rem", background: "var(--bg-raised)", borderRadius: "var(--r-md)", border: "1px solid var(--border-faint)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.4rem", color: "var(--cyan)", lineHeight: 1, marginBottom: "0.25rem" }}>{item.hz}</div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-muted)", marginBottom: "0.25rem" }}>{item.label}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-faint)" }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Manuscript context */}
          <div className="ms-pull">
            <p>
              The 7.83 Hz hummed on the cave monitors. He did not turn those off. He would never turn those off.
              Someone would come after him, a new keeper, or a student, or a stranger who had downloaded the archive
              and followed the coordinates to this basalt field in Iceland, and they would find the monitors still
              running, the frequency still present, the cave still singing.
            </p>
            <cite>— Andrew Chen · Book III, Chapter 14</cite>
          </div>

          <div style={{ marginTop: "2rem", padding: "1.25rem 1.5rem", background: "var(--bg-surface)", borderRadius: "var(--r-md)", border: "1px solid var(--border-faint)", fontSize: "0.82rem", color: "var(--text-faint)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-muted)" }}>Scientific note:</strong> The Schumann resonance is a real geophysical phenomenon, measured continuously by monitoring stations worldwide. The fundamental frequency of 7.83 Hz results from electromagnetic waves trapped between the earth&apos;s surface and the ionosphere. The connection between the Schumann baseline and the 111.2 Hz carrier frequency in the Masters X Trilogy is fictional — but the 7.83 Hz baseline itself is measurable fact.
          </div>
        </div>
      </section>
    </>
  );
}
