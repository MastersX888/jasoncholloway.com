"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { buildBookItem, trackBeginCheckout } from "@/lib/analytics/gtag";

interface TrackedBuyLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  itemId: string;
  itemName: string;
  itemVariant?: string;
  price?: string;
  children: ReactNode;
}

export default function TrackedBuyLink({
  href,
  itemId,
  itemName,
  itemVariant,
  price,
  children,
  onClick,
  ...props
}: TrackedBuyLinkProps) {
  const stripeCheckout = href.startsWith("/api/checkout");

  return (
    <a
      href={href}
      target={stripeCheckout ? undefined : "_blank"}
      rel={stripeCheckout ? undefined : "noopener noreferrer"}
      onClick={(event) => {
        const item = buildBookItem({
          itemId,
          itemName,
          itemVariant,
          price,
        });
        trackBeginCheckout([item], item.price);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
