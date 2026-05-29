# THE LIGHTHOUSE PROTOCOL: DIAGNOSTIC REPORT
**Date:** May 28, 2026 (Launch Window: June 2026)
**Project:** jasoncholloway (Seventh City Press)
**Auditor:** Antigravity Agent (Senior Front-End Engineer, IP Consultant, IA Auditor)

## 1. ARCHITECTURE & NEXT.JS IMPLEMENTATION (DIAGNOSTIC)

**1.1 Routing & Build Strategy**
The application uses Next.js 16 App Router correctly. The `npm run build` completed successfully, producing static pages. However, the dynamic route `/books/masters-x/[slug]` does not export `generateStaticParams`. Consequently, book pages are being rendered on demand (ƒ) rather than statically pre-rendered (○) at build time. For a catalog site with a fixed number of books, this is an architectural miss.

**1.2 Component Paradigms**
Client components (`"use client"`) are used correctly for interactive elements (`WaveformHero`, `SchumannPage`, `FolioVisualizerPage`). `app/books/masters-x/[slug]/page.tsx` is currently a Client Component using the React 19 `use(params)` hook and state for format switching. This is acceptable, but pushes book content rendering to the client, slightly impacting SEO.

**1.3 SEO & Structured Data**
The metadata API is utilized well in `app/layout.tsx`, including OpenGraph and Twitter cards. However, the site entirely lacks **JSON-LD Structured Data**. There is no `Person` schema for Jason C. Holloway, no `Organization` schema for Seventh City Press, and no `Book` schemas for the individual titles. This is a critical omission for search engine indexing and discovery.

## 2. BRAND COHERENCE & CANONICAL FACTS (DIAGNOSTIC)

**2.1 ISBN Discrepancies (CRITICAL)**
There is a severe data collision in `app/press/page.tsx`:
- It lists *Masters X: The Inheritance of Frequency* with ISBN `9798295812675`.
- According to `lib/data/books.ts`, `9798295812675` is the ISBN for *The Grimoire* (Book 2) Hardcover. *The Inheritance of Frequency* Hardcover is `9798295800801`.
This cross-wiring will cause catastrophic fulfillment issues if not corrected before launch.

**2.2 Omnibus Data Management**
The Omnibus Edition is hardcoded into `app/books/masters-x/page.tsx` and `app/press/page.tsx` instead of being driven by `lib/data/books.ts`. This breaks the single-source-of-truth pattern.

**2.3 Lore & Do-Not List Compliance**
- **Andrew Chen:** Correctly identified. No legacy references to "Blackwood" exist.
- **111.2 Hz Context:** Correctly defined as Blake's tremor and the carrier frequency, while distinguishing the Iceland cave fundamental as 111.0 Hz.
- **Nadia's Coffee / Ring:** No erroneous coffee mentions found.
- **Hardcover Artifacts:** No site copy currently mirrors the "VOLUME ONE" / "MASTERS X: THE GRIMOIRE on P8" artifacts.

## 3. THE BLUEPRINT: REPAIR MANDATES (W-SERIES)

To move this site to production-ready status, the following discrete mandates must be executed in order. Do not begin execution until authorized via the command `"Execute the W-series"`.

* **[W1] Re-architect Dynamic Routes & Data Layer**
  Move the Omnibus data into `lib/data/books.ts` to establish a true single source of truth. Implement `generateStaticParams` in `app/books/masters-x/[slug]/page.tsx` to ensure all book pages are statically generated at build time.

* **[W2] Resolve ISBN & Metadata Conflicts**
  Correct the ISBN collision in `app/press/page.tsx` by feeding the page directly from `lib/data/books.ts` rather than hardcoding the catalog lists.

* **[W3] Implement JSON-LD Structured Data**
  Inject `Person` and `Organization` schemas into the root layout. Inject dynamic `Book` schemas (including ISBNs, formats, and Author references) into the individual book pages.

* **[W4] Accessibility & Web Vitals Pass**
  Audit and repair color contrast ratios (specifically faint text on dark backgrounds), ensure all external links have descriptive `aria-label`s, and verify that `WaveformHero` honors `prefers-reduced-motion` for users sensitive to animations.

* **[W5] Component Refactoring**
  Refactor `app/books/masters-x/[slug]/page.tsx`. If possible, move the interactive format toggle to a smaller isolated Client Component and keep the main page as a Server Component for optimal SEO and performance.

---
**Status:** Diagnostic Complete. Waiting for execution command.
