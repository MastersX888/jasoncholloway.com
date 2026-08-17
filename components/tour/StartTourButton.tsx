"use client";

import type { ReactNode } from "react";
import { useTour } from "@/components/tour/TourProvider";

interface StartTourButtonProps {
  source: string;
  children: ReactNode;
  className?: string;
}

export default function StartTourButton({
  source,
  children,
  className = "btn btn-ghost",
}: StartTourButtonProps) {
  const { start } = useTour();

  return (
    <button type="button" className={className} onClick={() => start(source)}>
      {children}
    </button>
  );
}
