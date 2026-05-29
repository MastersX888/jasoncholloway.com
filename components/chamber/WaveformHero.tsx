"use client";
import { useEffect, useRef } from "react";

export default function WaveformHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Draw multiple frequency waves at very low opacity
      const waves = [
        { freq: 7.83 / 7.83, amp: 0.035, color: "#C9A84C", speed: 0.003, offset: 0 },       // Schumann
        { freq: 111.2 / 7.83, amp: 0.02, color: "#4CC9C9", speed: 0.012, offset: 200 },    // Fundamental
        { freq: 222.8 / 7.83, amp: 0.012, color: "#4CC9C9", speed: 0.018, offset: 100 },   // 2nd harmonic
        { freq: 333.6 / 7.83, amp: 0.008, color: "#C9A84C", speed: 0.025, offset: 300 },   // 3rd harmonic
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = 0.06;
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += 2) {
          const normalizedX = (x + wave.offset) / width;
          const y =
            height / 2 +
            Math.sin(normalizedX * Math.PI * 6 * wave.freq + t * wave.speed * 100) *
              height * wave.amp +
            Math.sin(normalizedX * Math.PI * 2 * wave.freq + t * wave.speed * 70 + 1.2) *
              height * wave.amp * 0.5;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Draw the primary visible wave — the 111.2 Hz signature
      ctx.beginPath();
      ctx.strokeStyle = "#4CC9C9";
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 1.5;

      for (let x = 0; x <= width; x += 1) {
        const nx = x / width;
        const y =
          height / 2 +
          Math.sin(nx * Math.PI * 12 + t * 1.5) * height * 0.025 +
          Math.sin(nx * Math.PI * 24 + t * 2.2) * height * 0.012 +
          Math.sin(nx * Math.PI * 36 + t * 3.1) * height * 0.006;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Gold baseline (Schumann reference)
      ctx.beginPath();
      ctx.strokeStyle = "#C9A84C";
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);

      for (let x = 0; x <= width; x += 2) {
        const nx = x / width;
        const y = height / 2 + Math.sin(nx * Math.PI * 2 + t * 0.4) * height * 0.02;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      t += 0.016;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
