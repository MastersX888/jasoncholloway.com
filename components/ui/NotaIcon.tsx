import type { CSSProperties } from "react";

export type NotaVariant = "forward" | "back" | "link" | "external" | "mark";

interface NotaIconProps {
  variant?: NotaVariant;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function NotaIcon({
  variant = "forward",
  size = 14,
  className = "",
  style,
}: NotaIconProps) {
  const cls = `nota-icon nota-icon--${variant} ${className}`.trim();

  if (variant === "back") {
    return (
      <svg
        className={cls}
        style={style}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="1.4" fill="currentColor" />
        <path
          d="M10 8H4M6 6L4 8l2 2"
          stroke="currentColor"
          strokeWidth="1.15"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "link") {
    return (
      <svg
        className={cls}
        style={style}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none" />
        <rect x="8" y="8" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M8 5h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="0.9" fill="none" />
      </svg>
    );
  }

  if (variant === "external") {
    return (
      <svg
        className={cls}
        style={style}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M9 3h4v4M13 3L7 9" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <path d="M6 5H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    );
  }

  if (variant === "mark") {
    return (
      <svg
        className={cls}
        style={style}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="8" cy="8" r="1.2" fill="currentColor" />
        <path d="M8 2.5v2M8 11.5v2M2.5 8h2M11.5 8h2" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    );
  }

  return (
    <svg
      className={cls}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <circle cx="4" cy="8" r="1.4" fill="currentColor" />
      <path
        d="M6 8h6M10 6l2 2-2 2"
        stroke="currentColor"
        strokeWidth="1.15"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
