"use client";

import { useEffect, useRef } from "react";
import { trackViewItem, type GaItem } from "@/lib/analytics/gtag";

interface BookViewTrackerProps {
  items: GaItem[];
  value?: number;
}

export default function BookViewTracker({ items, value }: BookViewTrackerProps) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current || items.length === 0) return;
    sent.current = true;
    trackViewItem(items, value);
  }, [items, value]);

  return null;
}
