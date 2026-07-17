# Connections Diagram — Yarn-on-the-Wall View
**Purpose:** Visual map of how everything connects. Paste Mermaid blocks into any renderer (Notion, GitHub, Claude artifacts).

---

## Master ecosystem (top level)

```mermaid
flowchart TB
  subgraph OWNED["OWNED PROPERTIES"]
    JA["jasoncholloway.com<br/>Author Site"]
    SCP["seventhcitypress.com<br/>Imprint Site"]
    EMAIL["Google Workspace<br/>jason@ info@ press@"]
    GH["GitHub<br/>MastersX888/jasoncholloway.com"]
    CF["Cloudflare Pages<br/>+ KV + Worker"]
  end

  subgraph RENTED["RENTED / THIRD-PARTY"]
    AMZ["Amazon KDP<br/>3 Kindle titles"]
    IS["IngramSpark<br/>Print + EPUB + Direct"]
    BS["Bookshop.org<br/>Affiliate 126177"]
    GP["Google Play Books"]
    GMC["Google Merchant Center"]
    GR["Goodreads"]
    WD["Wikidata Q140275300"]
    GSC["Google Search Console"]
    GA4["GA4 G-79RDL3BDEH"]
  end

  subgraph WIP["CREATIVE PIPELINES (not live)"]
    ENC["Encyclopedia Project<br/>67 entries"]
    AUD["Audiobook Scripts<br/>77 units"]
    YT["YouTube Scripts<br/>Setup checklist"]
    GS["Groundswell Monitor<br/>Reach Worker"]
  end

  JA -->|"301 /press"| SCP
  JA -->|"301 /press-kit/*"| SCP
  JA -->|"JSON-LD publisher"| SCP
  JA -->|"Web3Forms"| EMAIL
  SCP -->|"Web3Forms"| EMAIL
  JA -->|"buy links"| IS
  JA -->|"buy links"| AMZ
  JA -->|"buy links"| BS
  JA -->|"feed"| GMC
  GH -->|"manual deploy"| CF
  CF --> JA
  CF --> SCP
  CF --> GS
  JA -->|"analytics"| GA4
  JA -->|"sitemap"| GSC
  SCP -.->|"pending"| GSC
  SCP --> WD
  JA -->|"sameAs"| GR
  GP -.->|"EPUBs"| IS
  ENC -.->|"future print"| IS
  AUD -.->|"future Audible"| AMZ
  YT -.->|"future channel"| JA
```

---

## Author site internal web

```mermaid
flowchart LR
  HOME["/"] --> BOOKS["/books/"]
  HOME --> CHAMBER["/chamber/"]
  HOME --> FN["/field-notes/"]
  HOME --> ABOUT["/about/"]
  HOME --> CONTACT["/contact/"]

  BOOKS --> MX["/books/masters-x/"]
  MX --> V1["Vol I"]
  MX --> V2["Vol II"]
  MX --> V3["Vol III"]
  MX --> OMN["Omnibus"]
  BOOKS --> HAWK["Hawkes Monograph"]

  CHAMBER --> FOLIO["Folio Visualizer"]
  CHAMBER --> HARM["Harmonic Stack"]
  CHAMBER --> ARCH["Research Archive"]
  CHAMBER --> MAP["Global Map"]

  FN --> FN12["12 Real-History Articles"]
  FN12 -.->|"bridges to"| MX

  CONTACT --> CS["/chapters-sent/"]
  CONTACT --> PRESS["Press Kit PDF"]
  PRESS -->|"redirect"| SCP_PDF["SCP /press-kit/"]
```

---

## Data flow (canonical sources → outputs)

```mermaid
flowchart TD
  CANON["CANON.md<br/>Bibliographic law"]
  BOOKS_TS["lib/data/books.ts"]
  INGRAM["ingram-catalog.json"]
  BUY["buyLinks.ts"]
  CATALOG["content/catalog.ts"]

  CANON --> BOOKS_TS
  INGRAM --> BOOKS_TS
  BUY --> BOOKS_TS
  BOOKS_TS --> PAGES["Book pages + JSON-LD"]
  BOOKS_TS --> FEED["generate-google-merchant-feed.py"]
  FEED --> CSV["/feeds/google-shopping.csv"]
  CATALOG --> PRESS_GEN["generate_press_kit.py"]
  PRESS_GEN --> PDF["Press Kit PDFs"]
  PDF --> JA_PDF["Author /press-kit/"]
  PDF --> SCP_PDF2["Imprint /press-kit/"]
```

---

## Deploy pipeline (critical — manual)

```mermaid
flowchart LR
  EDIT["Edit source<br/>app/ lib/ components/"]
  BUILD["build_export.ps1<br/>npm run build"]
  OUT["out/ static export"]
  WRANGLE["wrangler pages deploy"]
  LIVE["jasoncholloway.com"]
  PURGE["Cloudflare cache purge"]

  EDIT --> BUILD --> OUT --> WRANGLE --> LIVE
  WRANGLE --> PURGE

  GIT["git push GitHub"] -.->|"does NOT deploy"| LIVE
```

---

## Retail connection matrix

| Edition | IngramSpark Direct | Amazon | Bookshop | Google Play | Merchant Feed |
|---------|-------------------|--------|----------|-------------|---------------|
| Vol I PB/HC/EPUB | Yes | Kindle only | ISBN search | EPUB | PB+HC |
| Vol II PB/HC/EPUB | Yes | Kindle only | ISBN search | EPUB | PB+HC |
| Vol III PB/HC/EPUB | Yes | Kindle only | ISBN search | EPUB | PB+HC |
| Omnibus PB/HC | Yes | No | List link | No | PB+HC |
| Hawkes PB/HC/EPUB | Yes | No | — | EPUB | PB+HC |

---

## Foundation vs. expansion layers

```mermaid
flowchart TB
  subgraph L1["LAYER 1 — FOUNDATION (do first)"]
    L1A["Both sites live + deployed"]
    L1B["Deploy runbook + cache purge"]
    L1C["GSC both domains"]
    L1D["Wikidata + ISNI"]
    L1E["Press kit PDFs current"]
    L1F["Single status doc"]
  end

  subgraph L2["LAYER 2 — DISCOVERY"]
    L2A["Google Books Partner"]
    L2B["Retailer author pages"]
    L2C["Groundswell monitoring"]
    L2D["Google Business Profile"]
  end

  subgraph L3["LAYER 3 — EXPANSION"]
    L3A["YouTube channel"]
    L3B["Audible production"]
    L3C["Encyclopedia print"]
    L3D["Newsletter provider"]
    L3E["StoryGraph / Reedsy"]
  end

  L1 --> L2 --> L3
```

---

## Thumbtack legend (for physical wall map)

If you want to replicate this on a physical board:

| Color | Meaning |
|-------|---------|
| Blue | Owned web property |
| Green | Live third-party account |
| Yellow | WIP / pipeline (not public) |
| Red | Open debt / verify needed |
| Gray | Retired / historical |

**Yarn types:**
- Solid line = active link (redirect, buy link, JSON-LD)
- Dashed line = planned / WIP connection
- Red yarn = broken or stale connection
