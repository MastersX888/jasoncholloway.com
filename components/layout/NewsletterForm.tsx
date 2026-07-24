import React from "react";

interface NewsletterFormProps {
  compact?: boolean;
}

export default function NewsletterForm({ compact = false }: NewsletterFormProps) {
  return (
    <div 
      className={`newsletter-container ${compact ? "newsletter-compact" : "newsletter-featured"}`}
      style={{
        background: compact ? "transparent" : "var(--bg-raised)",
        border: compact ? "none" : "1px solid var(--border)",
        borderRadius: compact ? "0" : "var(--r-xl)",
        padding: compact ? "0" : "2rem",
        boxShadow: compact ? "none" : "0 12px 36px rgba(0,0,0,0.3)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {!compact && (
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, var(--gold), var(--cyan))"
          }} 
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {!compact && (
          <div>
            <h3 
              style={{ 
                fontFamily: "var(--font-display)", 
                fontSize: "1.6rem", 
                fontWeight: 400, 
                marginBottom: "0.5rem",
                color: "var(--text)"
              }}
            >
              Access the Scriptorium Archives
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
              Get the opening chapters of <em>The Inheritance of Frequency</em> (Volume I of the Masters X Trilogy) delivered directly to your inbox, along with dispatch notes from Jason Carroll Holloway on acoustic research and launch details.
            </p>
          </div>
        )}

        <form action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="29ea1914-9c58-4abf-b4e1-4e71e9a27186" />
          <input type="hidden" name="subject" value="Chapter request: Masters X opening chapters" />
          <input type="hidden" name="from_name" value="jasoncholloway.com" />
          <input type="hidden" name="redirect" value="https://jasoncholloway.com/chapters-sent/" />
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <label htmlFor="newsletter-email-input" className="sr-only" style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: "0",
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              border: "0"
            }}>
              Email Address
            </label>
            
            <div 
              style={{ 
                display: "flex", 
                flexDirection: compact ? "column" : "row", 
                gap: "0.5rem", 
                width: "100%" 
              }}
            >
              <input
                id="newsletter-email-input"
                type="email"
                name="email"
                placeholder="Email Address"
                autoComplete="email"
                required
                className="newsletter-input"
                style={{
                  flex: 1,
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)",
                  padding: "0.75rem 1rem",
                  fontSize: "0.9rem",
                  color: "var(--text)",
                  fontFamily: "var(--font-body)",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                  outline: "none",
                }}
              />
              
              <button
                type="submit"
                className="btn btn-gold"
                style={{
                  padding: "0.75rem 1.5rem",
                  fontSize: "0.9rem",
                  borderRadius: "var(--r-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  cursor: "pointer"
                }}
              >
                Receive Chapters
              </button>
            </div>
            
            <p style={{ fontSize: "0.75rem", color: "var(--text-faint)", margin: 0, lineHeight: 1.4 }}>
              You'll get the opening chapters plus occasional dispatch notes from Jason Carroll Holloway. Unsubscribe anytime.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
