"use client";

// Lets server-rendered sections open the buy box.
import type { ReactNode } from "react";
import { useStore } from "@/components/store/StoreProvider";

interface OpenStoreButtonProps {
  source: string;
  children: ReactNode;
  className?: string;
}

export default function OpenStoreButton({
  source,
  children,
  className = "btn btn-outline",
}: OpenStoreButtonProps) {
  const { open } = useStore();

  return (
    <button type="button" className={className} onClick={() => open(source)}>
      {children}
    </button>
  );
}
