"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill out all fields.");
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
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Contact Form Submission: JasonCHolloway.com",
          from_name: "JasonCHolloway.com Website",
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.message || "An unexpected transmission error occurred. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("An unexpected transmission error occurred. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (status === "success") {
    return (
      <div className="card animate-fade-in" style={{ padding: "2.5rem", textAlign: "center", background: "var(--bg-raised)", borderColor: "var(--border)" }}>
        <div style={{ color: "var(--cyan)", fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 400, marginBottom: "0.75rem" }}>
          Message Transmitted
        </div>
        <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
          Thank you for reaching out. Your message has been routed directly to the press desk. 
          We will review your inquiry and respond shortly.
        </p>
        <button 
          onClick={() => setStatus("idle")} 
          className="btn btn-outline" 
          style={{ marginTop: "2rem" }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ background: "var(--bg-raised)", borderColor: "var(--border)", padding: "2rem" }} noValidate>
      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "0.5rem", color: "var(--text)" }}>
          Direct Inquiry
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
          Use the secure transmission form below to send a direct message to our team.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label htmlFor="contact-name" style={{ display: "block", fontSize: "0.85rem", color: "var(--text-faint)", marginBottom: "0.4rem" }}>Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={status === "loading"}
            required
            style={{
              width: "100%",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              padding: "0.75rem 1rem",
              fontSize: "0.9rem",
              color: "var(--text)",
              fontFamily: "var(--font-body)",
              transition: "border-color 0.25s",
            }}
          />
        </div>

        <div>
          <label htmlFor="contact-email" style={{ display: "block", fontSize: "0.85rem", color: "var(--text-faint)", marginBottom: "0.4rem" }}>Email Address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === "loading"}
            required
            style={{
              width: "100%",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              padding: "0.75rem 1rem",
              fontSize: "0.9rem",
              color: "var(--text)",
              fontFamily: "var(--font-body)",
              transition: "border-color 0.25s",
            }}
          />
        </div>

        <div>
          <label htmlFor="contact-message" style={{ display: "block", fontSize: "0.85rem", color: "var(--text-faint)", marginBottom: "0.4rem" }}>Message</label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={status === "loading"}
            required
            rows={5}
            style={{
              width: "100%",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              padding: "0.75rem 1rem",
              fontSize: "0.9rem",
              color: "var(--text)",
              fontFamily: "var(--font-body)",
              transition: "border-color 0.25s",
              resize: "vertical",
            }}
          />
        </div>

        {status === "error" && (
          <p role="alert" style={{ color: "#E57373", fontSize: "0.85rem", margin: 0, display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#E57373" }} />
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-gold"
          style={{
            padding: "0.85rem",
            fontSize: "0.95rem",
            justifyContent: "center",
            marginTop: "0.5rem",
            cursor: status === "loading" ? "not-allowed" : "pointer"
          }}
        >
          {status === "loading" ? (
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="nav-chamber-dot" style={{ width: 6, height: 6, margin: 0 }} />
              Transmitting...
            </span>
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </form>
  );
}
