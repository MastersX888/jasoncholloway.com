# Known Issues — SCP Domain Migration

---

## Do not break

| ID | Rule |
|----|------|
| K1 | Google Merchant feed stays at `jasoncholloway.com/feeds/google-shopping.csv` |
| K2 | All book product `link` URLs stay on `jasoncholloway.com/books/...` |
| K3 | Author `metadataBase` remains `https://jasoncholloway.com` |
| K4 | Enable `/press` redirect **only after** SCP site verified live |
| K5 | `www` → apex on **both** domains |
| K6 | Press kit PDFs must download on SCP (copy files, don't hotlink) |

---

## Contact / forms

Author site uses **Web3Forms** on `/contact`. Imprint `/contact` options:

- **A:** Copy `ContactForm` component — same form, imprint branding
- **B:** Link to `jasoncholloway.com/contact/` for all inquiries

Pick A for clean imprint; ensure form redirect still works.

---

## Chamber link in press copy

Press body references Analysis Chamber — must be **absolute**:

`https://jasoncholloway.com/chamber/research-archive`

---

## Hawkes / comp shelf

Press page comps mention Eco, Brown, etc. — keep as-is; not a metadata issue.

---

## Wikidata

Author press JSON-LD references `Q140275300`. After migration, Wikidata should list:

- Person official site → jasoncholloway.com
- Publisher/imprint → seventhcitypress.com (may need new item or property — flag for Jason)

---

## Dual Organization schema

After migration:

- **Author** `layout.tsx`: Organization url → SCP (publisher entity lives on imprint domain)
- **Imprint** homepage: Organization @ SCP with full publisher JSON-LD

Avoid duplicate conflicting `@id` — use `https://seventhcitypress.com/#organization` on imprint; author layout references same `@id` or links via `url` only.

---

## Page counts in press JSON-LD

Press page Book schema uses paperback page counts that may differ from CANON — **do not "fix"** in migration unless aligning to `books.ts`; flag only.

---

## IONOS

Domain only — email on SCP domain is separate (IONOS mail or forward). Out of scope for site handoff.

---

## Rollback

Remove `/press` lines from `_redirects` and redeploy author site if imprint fails.
