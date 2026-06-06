"use client";

import React, { useState } from "react";

interface NewsletterFormProps {
  compact?: boolean;
}

export default function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "29ea1914-9c58-4abf-b4e1-4e71e9a27186",
          email: email,
          subject: "New Newsletter Signup — JasonCHolloway.com",
          from_name: "Newsletter System",
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(result.message || "An unexpected transmission error occurred. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("An unexpected transmission error occurred. Please try again.");
    }
  };

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

      {status === "success" ? (
        <div 
          className="newsletter-success animate-fade-in" 
          role="status" 
          aria-live="polite"
          style={{ textAlign: compact ? "left" : "center", padding: compact ? "0" : "1.5rem 0" }}
        >
          <div style={{ color: "var(--cyan)", fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "0.5rem" }}>
            Transmission Established
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            Check your inbox shortly. We have queued the opening chapters of <strong>The Inheritance of Frequency</strong> for transmission.
          </p>
        </div>
      ) : (
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

          <form onSubmit={handleSubmit} noValidate>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Get the opening chapters of The Inheritance of Frequency"
                  disabled={status === "loading"}
                  className="newsletter-input"
                  required
                  aria-required="true"
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? "newsletter-error-message" : undefined}
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
                  disabled={status === "loading"}
                  className="btn btn-gold"
                  style={{
                    padding: "0.75rem 1.5rem",
                    fontSize: "0.9rem",
                    borderRadius: "var(--r-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    cursor: status === "loading" ? "not-allowed" : "pointer"
                  }}
                >
                  {status === "loading" ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span className="nav-chamber-dot" style={{ width: 6, height: 6, margin: 0 }} />
                      Transmitting...
                    </span>
                  ) : (
                    "Receive Chapters"
                  )}
                </button>
              </div>

              {status === "error" && (
                <p 
                  id="newsletter-error-message" 
                  role="alert"
                  style={{ 
                    color: "#E57373", 
                    fontSize: "0.8rem", 
                    margin: "0.25rem 0 0 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem"
                  }}
                >
                  <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#E57373" }} />
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
