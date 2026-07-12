# Author Site Migration — Patch List

Apply to `jasoncholloway` repo **after** `seventhcitypress.com` is live and verified.

**Deploy imprint first. Deploy author patches second.**

---

## 1. `public/_redirects`

**Add** (keep existing www rule):

```
https://www.jasoncholloway.com/* https://jasoncholloway.com/:splat 301
/press    https://seventhcitypress.com/    301
/press/   https://seventhcitypress.com/    301
```

**Optional** (if press-kit only on imprint):

```
/press-kit/*    https://seventhcitypress.com/press-kit/:splat    301
```

If optional redirect used, remove duplicate `public/press-kit/` from author deploy or keep as mirror (redirect makes mirror unnecessary).

---

## 2. `app/layout.tsx`

**Change** Organization `url`:

```diff
- "url": "https://jasoncholloway.com/press/",
+ "url": "https://seventhcitypress.com/",
```

**Add** to Person `sameAs`:

```json
"https://seventhcitypress.com/"
```

---

## 3. `components/layout/Header.tsx`

```diff
- { href: "/press", label: "Press" },
+ { href: "https://seventhcitypress.com/", label: "Press", external: true },
```

Implement external link pattern (plain `<a>` or Link with `target="_blank"` — prefer same-tab navigation to imprint: use `<a href="https://seventhcitypress.com/">` without target blank).

---

## 4. `components/layout/Footer.tsx`

```diff
- <Link href="/press">Seventh City Press</Link>
+ <a href="https://seventhcitypress.com/">Seventh City Press</a>
```

---

## 5. `app/page.tsx`

Homepage button:

```diff
- <Link href="/press" className="btn btn-ghost">Seventh City Press</Link>
+ <a href="https://seventhcitypress.com/" className="btn btn-ghost">Seventh City Press</a>
```

---

## 6. `app/sitemap.ts`

**Remove** `/press` entry from author sitemap (imprint owns press URL now).

---

## 7. `app/sitemap/page.tsx`

Update HTML sitemap link: Press → `https://seventhcitypress.com/`

---

## 8. `app/contact/page.tsx`

Sidebar:

```diff
- <a href="/press" ...>Individual sheets on the Press page →</a>
+ <a href="https://seventhcitypress.com/" ...>Press &amp; media kit at Seventh City Press →</a>
```

Press kit PDF link: either keep `/press-kit/...` on author (if no redirect) or point to `https://seventhcitypress.com/press-kit/...`

---

## 9. `app/press/page.tsx`

**Option A (recommended):** Delete route; rely on `_redirects` only.

**Option B:** Replace with minimal static HTML meta-refresh — redundant if redirects work on Cloudflare Pages.

After redirect live, remove from `app/press/` to avoid building unused page (optional cleanup).

---

## 10. `public/llms.txt`

```diff
 Publisher section:
-www.seventhcitypress.com
+https://seventhcitypress.com/
+
+Add to Key URLs:
+- Seventh City Press (imprint): https://seventhcitypress.com/
```

Remove or annotate `jasoncholloway.com/press` if listed.

---

## 11. `scripts/generate_press_kit.py`

Replace footer URLs:

| Old | New |
|-----|-----|
| `jasoncholloway.com/press` | `seventhcitypress.com` |
| Press materials line | `seventhcitypress.com · jasoncholloway.com/contact` |

Regenerate PDFs after patch: `python scripts/generate_press_kit.py`

---

## 12. `app/press/page.tsx` JSON-LD — N/A if page removed

Organization on press page moved to imprint site.

---

## Do NOT change

| File / area | Reason |
|-------------|--------|
| `metadataBase` in `app/layout.tsx` | Author site identity |
| `app/books/**` | Product canonicals |
| `public/feeds/google-shopping.csv` | Merchant Center |
| `lib/data/books.ts` buy links | Commerce |
| `app/field-notes/**` | Author research |
| `app/chamber/**` | Author tools |
| Ingram catalog JSON | Imprint name field only — no URL |

---

## Verification after author deploy

```text
GET https://jasoncholloway.com/press/     → 301 → https://seventhcitypress.com/
GET https://jasoncholloway.com/books/masters-x/omnibus/  → 200
GET https://jasoncholloway.com/feeds/google-shopping.csv  → 200
```

Rich Results Test: Organization url = `seventhcitypress.com`
