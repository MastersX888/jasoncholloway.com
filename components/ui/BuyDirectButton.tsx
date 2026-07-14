"use client";

import Link from "next/link";
import { buildBookItem, trackBeginCheckout } from "@/lib/analytics/gtag";

interface BuyDirectButtonProps {
  label: string;
  url: string;
  ecommPrice: string;
  msrpPrice?: string;
  className?: string;
  itemId?: string;
  itemName?: string;
  itemVariant?: string;
}

export default function BuyDirectButton({
  label,
  url,
  ecommPrice,
  msrpPrice,
  className = "",
  itemId,
  itemName,
  itemVariant,
}: BuyDirectButtonProps) {
  const hasDiscount = msrpPrice && msrpPrice !== ecommPrice;
  const savingsAmt = hasDiscount
    ? (parseFloat(msrpPrice!) - parseFloat(ecommPrice)).toFixed(2)
    : null;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`buy-direct-btn ${className}`}
      onClick={() => {
        if (!itemId || !itemName) return;
        const item = buildBookItem({
          itemId,
          itemName,
          itemVariant,
          price: ecommPrice,
        });
        trackBeginCheckout([item], item.price);
      }}
    >
      <span className="buy-direct-label">{label}</span>
      <span className="buy-direct-pricing">
        {hasDiscount && (
          <span className="buy-direct-msrp" aria-label={`Regular price $${msrpPrice}`}>
            ${msrpPrice}
          </span>
        )}
        <span className="buy-direct-price">${ecommPrice}</span>
        {savingsAmt && (
          <span className="buy-direct-badge" aria-label={`Save $${savingsAmt}`}>
            save ${savingsAmt}
          </span>
        )}
      </span>
    </Link>
  );
}
