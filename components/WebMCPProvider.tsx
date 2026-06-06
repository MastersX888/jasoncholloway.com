"use client";

import { useEffect } from "react";

export default function WebMCPProvider() {
  useEffect(() => {
    // Safely check if the WebMCP API is injected by the browser
    if (typeof navigator !== "undefined" && "modelContext" in navigator) {
      try {
        const mc = (navigator as any).modelContext;
        
        const contactTool = {
          name: "contact_publisher",
          description: "Navigate to the contact page to send a direct inquiry to the publisher or author.",
          inputSchema: { type: "object", properties: {} },
          execute: async () => {
            window.location.href = "/contact";
            return { success: true, message: "Navigated to contact page." };
          }
        };

        const booksTool = {
          name: "view_books",
          description: "Navigate to the Masters X Trilogy books page to view book details.",
          inputSchema: { type: "object", properties: {} },
          execute: async () => {
            window.location.href = "/books/masters-x";
            return { success: true, message: "Navigated to the Masters X books page." };
          }
        };

        // Support registerTool (per Agent Skills RFC)
        if (typeof mc.registerTool === "function") {
          mc.registerTool(contactTool);
          mc.registerTool(booksTool);
        }
        
        // Support provideContext (per user request prompt)
        if (typeof mc.provideContext === "function") {
          mc.provideContext({
            tools: [contactTool, booksTool]
          });
        }
      } catch (err) {
        console.error("WebMCP registration failed:", err);
      }
    }
  }, []);

  return null;
}
