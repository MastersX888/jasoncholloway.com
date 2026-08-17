"use client";

// The "rabbit hole" tour: an opt-in guided path that walks a first-time reader
// from the books, through the research the novels are built on, and back to the
// buy box. State lives in the root layout so the panel survives navigation.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { trackTourComplete, trackTourStart, trackTourStep } from "@/lib/analytics/gtag";

export interface TourStep {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  anchor?: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "books",
    eyebrow: "Step one · The books",
    title: "Three novels, or all three in one",
    body:
      "Masters X is a trilogy. Book I is where the story starts; the omnibus hardcover collects all three novels in a single volume. Every edition and price is in this panel — you can buy at any point on this tour.",
    href: "/",
    anchor: "buy",
  },
  {
    id: "premise",
    eyebrow: "Step two · The premise",
    title: "A safety deposit box, paid fifty-seven years in advance",
    body:
      "Blake Masters loses his job guarding the limestone tunnels under Kansas City, then inherits seven notebooks of his grandfather's classified acoustic research. Everything that follows comes out of those notebooks.",
    href: "/books/masters-x",
  },
  {
    id: "subtropolis",
    eyebrow: "Step three · The place",
    title: "The city beneath Kansas City is a real place",
    body:
      "SubTropolis is an actual industrial complex 160 feet down in mined limestone. It is where Blake worked, and where he photographed carvings that no official map acknowledges.",
    href: "/field-notes/subtropolis",
  },
  {
    id: "voynich",
    eyebrow: "Step four · The manuscript",
    title: "A codex nobody has ever read",
    body:
      "The Voynich Manuscript sits in Yale's Beinecke Library, undeciphered since the fifteenth century. Its folios are real, photographed, and public — and in the novels, Blake matches their geometry to his grandfather's diagrams.",
    href: "/field-notes/voynich-manuscript",
  },
  {
    id: "111-hz",
    eyebrow: "Step five · The frequency",
    title: "111 Hz, measured in caves on four continents",
    body:
      "Archaeoacoustic surveys keep finding the same resonance in ancient chambers. The trilogy asks what happens to a person who learns to listen to it — and the research behind that question is documented here.",
    href: "/field-notes/111-hz",
  },
  {
    id: "chamber",
    eyebrow: "Step six · See it yourself",
    title: "The Analysis Chamber",
    body:
      "Stack and rotate 181 historical manuscript pages, watch the harmonic derivations, read the cave measurements. This is the archive that came before the novels, not an illustration of them.",
    href: "/chamber",
  },
  {
    id: "read",
    eyebrow: "Last step · Start reading",
    title: "Where to begin",
    body:
      "Start with Book I if you want to meet Blake first, or take the omnibus hardcover if you would rather have the whole thing on the shelf. Not ready to buy? The opening chapters are free by email.",
    href: "/",
    anchor: "buy",
  },
];

const STORAGE_KEY = "scp.tour.state";

interface TourContextValue {
  active: boolean;
  stepIndex: number;
  steps: TourStep[];
  start: (source: string) => void;
  stop: (completed?: boolean) => void;
  next: () => void;
  previous: () => void;
}

const TourContext = createContext<TourContextValue | null>(null);

export function useTour(): TourContextValue {
  const context = useContext(TourContext);
  if (!context) throw new Error("useTour must be used inside TourProvider");
  return context;
}

function normalizePath(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export default function TourProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const highestStep = useRef(0);

  // Restore an in-progress tour after a reload, and honour ?tour=1 deep links.
  useEffect(() => {
    const timer = setTimeout(() => {
      let restoredIndex: number | null = null;
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as { stepIndex?: number };
          restoredIndex = Math.min(Math.max(saved.stepIndex ?? 0, 0), TOUR_STEPS.length - 1);
        }
      } catch {
        // Private-mode storage failures are not worth surfacing.
      }

      if (restoredIndex !== null) {
        setStepIndex(restoredIndex);
        setActive(true);
        return;
      }

      if (new URLSearchParams(window.location.search).get("tour") === "1") {
        setStepIndex(0);
        setActive(true);
        trackTourStart("deep_link");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      if (active) sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ stepIndex }));
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
  }, [active, stepIndex]);

  const step = TOUR_STEPS[stepIndex];

  // Navigate to the step's page, then scroll its anchor into view.
  useEffect(() => {
    if (!active || !step) return;

    if (normalizePath(pathname) !== normalizePath(step.href)) {
      router.push(step.href);
      return;
    }

    if (!step.anchor) return;
    const target = document.getElementById(step.anchor);
    if (!target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
    target.classList.add("tour-target");
    return () => {
      cancelAnimationFrame(frame);
      target.classList.remove("tour-target");
    };
  }, [active, pathname, router, step]);

  useEffect(() => {
    if (!active || !step) return;
    highestStep.current = Math.max(highestStep.current, stepIndex + 1);
    trackTourStep(stepIndex + 1, step.id);
  }, [active, step, stepIndex]);

  const start = useCallback((source: string) => {
    highestStep.current = 0;
    setStepIndex(0);
    setActive(true);
    trackTourStart(source);
  }, []);

  const stop = useCallback((completed = false) => {
    setActive(false);
    if (completed) trackTourComplete(highestStep.current);
  }, []);

  const next = useCallback(() => {
    if (stepIndex >= TOUR_STEPS.length - 1) {
      setActive(false);
      trackTourComplete(TOUR_STEPS.length);
      return;
    }
    setStepIndex(stepIndex + 1);
  }, [stepIndex]);

  const previous = useCallback(() => {
    setStepIndex((index) => Math.max(0, index - 1));
  }, []);

  const value = useMemo<TourContextValue>(
    () => ({ active, stepIndex, steps: TOUR_STEPS, start, stop, next, previous }),
    [active, next, previous, start, stepIndex, stop]
  );

  return (
    <TourContext.Provider value={value}>
      {children}
      <TourPanel />
    </TourContext.Provider>
  );
}

function TourPanel() {
  const { active, stepIndex, steps, next, previous, stop } = useTour();
  if (!active) return null;

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  return (
    <aside className="tour-panel" role="complementary" aria-label="Guided tour of the site">
      <div className="tour-panel-head">
        <span className="tour-panel-eyebrow">{step.eyebrow}</span>
        <button
          type="button"
          className="tour-panel-close"
          onClick={() => stop(false)}
          aria-label="End the guided tour"
        >
          End tour
        </button>
      </div>

      <h2 className="tour-panel-title">{step.title}</h2>
      <p className="tour-panel-body">{step.body}</p>

      <div className="tour-panel-foot">
        <div className="tour-panel-progress" aria-hidden="true">
          {steps.map((item, index) => (
            <span
              key={item.id}
              className={`tour-dot ${index === stepIndex ? "current" : ""} ${index < stepIndex ? "done" : ""}`.trim()}
            />
          ))}
        </div>
        <p className="tour-panel-count">
          Step {stepIndex + 1} of {steps.length}
        </p>
        <div className="tour-panel-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={previous}
            disabled={stepIndex === 0}
          >
            Back
          </button>
          <button type="button" className="btn btn-gold btn-sm" onClick={next}>
            {isLast ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </aside>
  );
}
