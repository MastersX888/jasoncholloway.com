export default function ChamberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-register="research" className="register-research">
      {children}
      {/* ─── BRIDGE BACK TO CATALOG ─── */}
      <div
        style={{
          borderTop: "1px solid var(--border-faint)",
          padding: "2rem 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-faint)",
              marginBottom: "0.75rem",
            }}
          >
            The Analysis Chamber is the research companion to the Masters X Trilogy.
          </p>
          <a
            href="/books/masters-x"
            style={{
              fontSize: "0.85rem",
              color: "var(--gold)",
              fontWeight: 500,
            }}
          >
            View the Trilogy →
          </a>
        </div>
      </div>
    </div>
  );
}
