import Link from "next/link";
import { OMNIBUS_PATH, omnibusSavingsLine } from "@/lib/data/trilogyCheckout";

type OmnibusVolumeNudgeProps = {
  compact?: boolean;
};

/** Shown on individual volume pages/cards — routes trilogy buyers to one checkout. */
export default function OmnibusVolumeNudge({ compact = false }: OmnibusVolumeNudgeProps) {
  if (compact) {
    return (
      <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.75rem", lineHeight: 1.6 }}>
        Want all three volumes?{" "}
        <Link href={OMNIBUS_PATH} style={{ color: "var(--gold)" }}>
          Omnibus edition — one order
        </Link>
      </p>
    );
  }

  return (
    <div
      className="card"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border)",
        padding: "1rem 1.25rem",
        marginBottom: "1.25rem",
      }}
    >
      <div
        style={{
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--gold)",
          marginBottom: "0.35rem",
          fontWeight: 600,
        }}
      >
        Complete trilogy
      </div>
      <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "0.75rem" }}>
        {omnibusSavingsLine()}
      </p>
      <Link href={OMNIBUS_PATH} className="btn btn-outline btn-sm">
        Buy omnibus — one checkout →
      </Link>
    </div>
  );
}
