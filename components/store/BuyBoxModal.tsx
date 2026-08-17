"use client";

// The buy box: a familiar online-store panel for readers who came to buy a
// book rather than explore the site. Editions are listed in the order a buyer
// expects — omnibus hardcover first — with the price and one button per row.
import Link from "next/link";
import CoverImage from "@/components/ui/CoverImage";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  PAYMENT_NOTES,
  storeProducts,
  type StoreOffer,
  type StoreProduct,
} from "@/lib/data/storefront";
import TrackedBuyLink from "@/components/ui/TrackedBuyLink";
import { useTour } from "@/components/tour/TourProvider";

const COVER_ASPECT: Record<string, string> = {
  pb: "55 / 85",
  hc: "614 / 921",
  ebook: "2 / 3",
  omnibus: "614 / 921",
};

interface BuyBoxModalProps {
  onClose: (reason: string) => void;
}

export default function BuyBoxModal({ onClose }: BuyBoxModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(storeProducts[0].id);
  const { start: startTour } = useTour();

  const product = useMemo(
    () => storeProducts.find((item) => item.id === activeId) ?? storeProducts[0],
    [activeId]
  );

  const close = useCallback((reason: string) => onClose(reason), [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  // Escape closes; Tab stays inside the dialog while it is open.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close("escape_key");
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    <div
      className="buybox-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) close("backdrop");
      }}
    >
      <div
        className="buybox"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
      >
        <header className="buybox-head">
          <div>
            <span className="label">Seventh City Press · Order direct</span>
            <h2 className="buybox-title" id={titleId}>
              Buy the books
            </h2>
            <p className="buybox-sub">
              Print editions ship direct from the publisher at the lowest price. Kindle
              editions are on Amazon.
            </p>
          </div>
          <button
            type="button"
            className="buybox-close"
            onClick={() => close("close_button")}
            aria-label="Close the buy panel"
            data-autofocus
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="buybox-body">
          <div className="buybox-tabs" role="tablist" aria-label="Choose an edition">
            {storeProducts.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`buybox-tab-${item.id}`}
                aria-selected={item.id === product.id}
                aria-controls={`buybox-panel-${item.id}`}
                className={`buybox-tab ${item.id === product.id ? "active" : ""}`.trim()}
                onClick={() => setActiveId(item.id)}
              >
                <span className="buybox-tab-label">{item.tabLabel}</span>
                {item.badge && <span className="buybox-tab-badge">{item.badge}</span>}
              </button>
            ))}
          </div>

          <div
            className="buybox-panel"
            role="tabpanel"
            id={`buybox-panel-${product.id}`}
            aria-labelledby={`buybox-tab-${product.id}`}
          >
            <ProductPanel product={product} onNavigate={() => close("detail_link")} />
          </div>
        </div>

        <footer className="buybox-foot">
          <button
            type="button"
            className="buybox-tour-link"
            onClick={() => {
              close("start_tour");
              startTour("buy_box");
            }}
          >
            Just exploring? Take me down the rabbit hole →
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => close("continue_browsing")}
          >
            Continue to the site
          </button>
        </footer>
      </div>
    </div>
  );
}

function ProductPanel({
  product,
  onNavigate,
}: {
  product: StoreProduct;
  onNavigate: () => void;
}) {
  const channels = Array.from(new Set(product.offers.map((offer) => offer.channel)));

  return (
    <>
      <div className="buybox-product">
        <div className={`buybox-covers ${product.covers.length > 1 ? "multi" : ""}`.trim()}>
          {product.covers.map((cover) => (
            <figure key={cover.src} className="buybox-cover">
              <div
                className="buybox-cover-frame"
                style={{ aspectRatio: COVER_ASPECT[cover.shape] ?? "2 / 3" }}
              >
                <CoverImage
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(max-width: 780px) 36vw, 148px"
                />
              </div>
              {cover.caption && <figcaption>{cover.caption}</figcaption>}
            </figure>
          ))}
        </div>

        <div className="buybox-product-body">
          <h3 className="buybox-product-title">{product.title}</h3>
          <p className="buybox-product-byline">{product.byline}</p>
          <p className="buybox-product-blurb">{product.blurb}</p>
          {product.spec && <p className="buybox-product-spec">{product.spec}</p>}
          <Link href={product.detailHref} className="buybox-detail-link" onClick={onNavigate}>
            Read more about this edition →
          </Link>
        </div>
      </div>

      <ul className="buybox-offers">
        {product.offers.map((offer) => (
          <OfferRow key={offer.key} offer={offer} />
        ))}
      </ul>

      {product.bundleTotal && (
        <p className="buybox-bundle-note">
          <strong>Set total: ${product.bundleTotal}</strong> {product.bundleNote}
        </p>
      )}

      {product.valueNote && <p className="buybox-bundle-note">{product.valueNote}</p>}

      <p className="buybox-payments">
        {channels.map((channel) => PAYMENT_NOTES[channel]).join(" · ")}
      </p>

      {product.secondaryLinks.length > 0 && (
        <ul className="buybox-secondary">
          {product.secondaryLinks.map((link) => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label} →
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function OfferRow({ offer }: { offer: StoreOffer }) {
  const savings =
    offer.listPrice && offer.price && offer.listPrice !== offer.price
      ? (parseFloat(offer.listPrice) - parseFloat(offer.price)).toFixed(2)
      : null;

  return (
    <li className="buybox-offer">
      <div className="buybox-offer-main">
        <span className="buybox-offer-format">
          {offer.eyebrow ? `${offer.eyebrow} — ${offer.label}` : offer.label}
        </span>
        <span className="buybox-offer-meta">
          {offer.eyebrow ? `${offer.format} · ` : ""}
          {offer.channelLabel}
          {offer.fulfillment ? ` · ${offer.fulfillment}` : ""}
        </span>
      </div>

      <div className="buybox-offer-pricing">
        {offer.listPrice && offer.listPrice !== offer.price && (
          <span className="buybox-offer-list">${offer.listPrice}</span>
        )}
        <span className="buybox-offer-price">${offer.price}</span>
        {savings && <span className="buybox-offer-save">save ${savings}</span>}
      </div>

      <TrackedBuyLink
        href={offer.url}
        itemId={offer.itemId}
        itemName={offer.itemName}
        itemVariant={offer.itemVariant}
        price={offer.price}
        className="btn btn-gold buybox-offer-btn"
        aria-label={`Buy ${offer.itemName} for $${offer.price} from ${offer.channelLabel}`}
      >
        Buy now
      </TrackedBuyLink>
    </li>
  );
}
