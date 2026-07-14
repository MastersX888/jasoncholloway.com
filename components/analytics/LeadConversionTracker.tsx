"use client";

import { useEffect, useRef } from "react";
import { trackGenerateLead } from "@/lib/analytics/gtag";

export default function LeadConversionTracker() {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackGenerateLead();
  }, []);

  return null;
}
