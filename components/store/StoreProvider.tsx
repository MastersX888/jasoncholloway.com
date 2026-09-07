"use client";

// Owns the buy box for the whole site: any component can open it, and readers
// arriving for the first time are offered it once, without having to hunt for
// purchase links.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import BuyBoxModal from "@/components/store/BuyBoxModal";
import { omnibusProduct } from "@/lib/data/storefront";
import { trackBuyBoxDismiss, trackBuyBoxOpen } from "@/lib/analytics/gtag";

const PROMPTED_KEY = "scp.buybox.prompted";
/** Let the page paint before offering the panel. */
const FIRST_VISIT_DELAY_MS = 1200;
const AUTO_OPEN_MIN_WIDTH = 768;

/**
 * Sections where the panel never opens on its own.
 *
 * The Field Notes and the Chamber are top-of-funnel: most of their traffic
 * arrives from a search for the subject, not for the books, and a price list
 * over the first paragraph spends the reader's attention before the essay has
 * earned it. The sticky bar and the header's Buy button are still there, and an
 * explicit `open()` or a `?buy=1` deep link still works — this suppresses only
 * the unprompted open.
 *
 * A visitor who is not prompted here is not marked as prompted either, so the
 * panel is still offered once they reach a commercial page.
 */
const NO_AUTO_OPEN_PREFIXES = ["/field-notes", "/chamber"];

function suppressesAutoOpen(pathname: string): boolean {
  return NO_AUTO_OPEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

interface StoreContextValue {
  isOpen: boolean;
  open: (source: string) => void;
  close: (reason: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}

function alreadyPrompted(): boolean {
  try {
    return localStorage.getItem(PROMPTED_KEY) === "1";
  } catch {
    return false;
  }
}

function markPrompted() {
  try {
    localStorage.setItem(PROMPTED_KEY, "1");
  } catch {
    // Private-mode storage failures only cost us the "once" guarantee.
  }
}

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const pathname = usePathname();

  const open = useCallback((source: string) => {
    setShowBar(false);
    setIsOpen(true);
    trackBuyBoxOpen(source);
  }, []);

  const close = useCallback((reason: string) => {
    setIsOpen(false);
    trackBuyBoxDismiss(reason);
  }, []);

  useEffect(() => {
    // ?buy=1 (ads, QR codes, print inserts) always opens the panel.
    const deepLink = new URLSearchParams(window.location.search).get("buy") === "1";
    if (!deepLink && alreadyPrompted()) return;

    // Runs again on client-side navigation, so a reader who arrives on an essay
    // and then clicks through to a book page is offered the panel there.
    if (!deepLink && suppressesAutoOpen(pathname)) return;

    markPrompted();

    // A dialog that opens itself on a phone reads as an intrusive interstitial,
    // so narrow screens are offered the bar unless the visitor asked to buy.
    if (!deepLink && window.innerWidth < AUTO_OPEN_MIN_WIDTH) {
      const barTimer = setTimeout(() => setShowBar(true), 0);
      return () => clearTimeout(barTimer);
    }

    const timer = setTimeout(
      () => {
        setIsOpen(true);
        trackBuyBoxOpen(deepLink ? "deep_link" : "first_visit");
      },
      deepLink ? 0 : FIRST_VISIT_DELAY_MS
    );

    return () => clearTimeout(timer);
  }, [pathname]);

  const value = useMemo<StoreContextValue>(
    () => ({ isOpen, open, close }),
    [close, isOpen, open]
  );

  const omnibusHardcover = omnibusProduct.offers[0];

  return (
    <StoreContext.Provider value={value}>
      {children}
      {isOpen && <BuyBoxModal onClose={close} />}
      {showBar && !isOpen && (
        <div className="buybar" role="region" aria-label="Buy the books">
          <div className="buybar-copy">
            <span className="buybar-label">Here to buy the book?</span>
            <span className="buybar-price">
              Omnibus hardcover ${omnibusHardcover.price} · all formats inside
            </span>
          </div>
          <button
            type="button"
            className="btn btn-gold btn-sm"
            onClick={() => open("mobile_bar")}
          >
            See all formats
          </button>
          <button
            type="button"
            className="buybar-close"
            onClick={() => setShowBar(false)}
            aria-label="Dismiss the purchase bar"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      )}
    </StoreContext.Provider>
  );
}
