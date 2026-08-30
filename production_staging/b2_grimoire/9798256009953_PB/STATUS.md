# Book 2 Grimoire — Paperback 9798256009953
**Portal status (Jason verbal ~2026-08-03 afternoon CT):** **LIVE / APPROVED** — see `scratch/ops_reports/INGRAM_ALL_TITLES_LIVE_2026-08-03.md`. Local harvest notes below are historical staging inventory, not portal evidence.
**Priority:** High
**Upload ready:** YES — interior matches live 271 pp exactly; no spine or cover rework required (resolved 2026-08-29). **REVISE IN THE 2026-08-29 ROUND — REQUIRED:** four character references changed. This reverses the earlier "do NOT revise" instruction in this file — see CORRECTED 2026-08-29 below.

## Page count RESOLVED 2026-08-29
The `CANON 260` figure below is **stale** — it predates the geo fix. Do not use it.

- **Live / authoritative: 271 pp**, per the pre-flight table in
  `scratch/ops_reports/INGRAM_UPLOAD_RUN_2026-07-31.md`. Those files were approved
  and went live 2026-08-03.
- The current rebuild produces **271 pp**, matching live exactly.
- The "+7 HC / +11 PB drift" noted earlier on 2026-08-29 was this stale comparison,
  not a regression. All six individual print interiors matched the live counts 6/6.
  **No spine or cover rework is required.**

## CORRECTED 2026-08-29 — Book 2 IS required this round

> **This reverses an earlier instruction in this same file.** A previous version of
> this STATUS said *"Do NOT revise in the 2026-08-29 round … textually identical to
> what is already live."* **That claim was false.** If you read it, disregard it —
> this section is the current instruction.

The claim was written before the 4:47 pm character-name pass and was never updated.
That pass rewrote
`production_staging/_sources/build_docx/MASTERS_X_BOOK2_BUILD.docx`, the source this
interior is built from. Comparing the current build DOCX against its
`.PRE_NAMEFIX_2026-08-29.bak` backup shows **four character references changed**:

| Reference | Before | After |
|---|---:|---:|
| Margaret Masters | 1 | 0 |
| Lorraine Masters | 0 | 1 |
| Senator Margaret Holt | 1 | 0 |
| Senator Deborah Holt | 0 | 1 |
| Sarah Chen | 2 | 0 |
| Rosalind Lindgren | 0 | 2 |

Retained characters are unchanged and are **not** errors: **Andrew Chen** 6,
**Yuki Tanaka** 4, bare surname **Holt** 17. One further non-name correction rides
along — the Sabrina Volkov "shared by marriage" → "had been born with" rewording —
for five changed paragraphs in total.

**Skipping this title would leave Margaret Masters, Senator Margaret Holt and Sarah
Chen in print permanently**, which are precisely the names the author decided to
change. Book 2 hardcover, paperback, retail EPUB and Kindle EPUB are **all required
uploads** this round.

The 271 pp figure above is unaffected. The renames are effectively
pagination-neutral, so the rebuilt interior still matches live exactly and no spine
or cover rework is required.


## Present
> **July harvest inventory — size and page figure both superseded 2026-08-29.**
> The current `interior.pdf` is **614,671 bytes (0.61 MB)**, **271 pp**, built
> **2026-08-29 17:23:49**, SHA256 `4b586ad6eedd69a4…`, and is byte-identical to
> the staged copy at
> `Desktop/MASTER_UPLOAD_FOLDER_2026-08-29/9798256009953_PB_interior.pdf`.

- ~~`interior.pdf` — 0.60 MB · **258 pp**~~ · Demy 5.5×8.5 · `%PDF` OK
- `cover_wrap.pdf` (= `COVER_MASTERS_X_BOOK2_PB.pdf`) — 1.14 MB
- `MANUSCRIPT_CURRENT.txt`

## Still missing
- CANON pages **260** (harvested **258**, −2)
- ~~Spine-width check vs 260 pp~~ **SUPERSEDED 2026-08-29:** 260 is the stale canon
  figure. Interior is 271 pp and matches live; no spine rework required.
- Rebuild from geo-fixed draft (PRE_GEO_FIX)

## Verification
| Check | Result |
|---|---|
| Trim | Demy ✓ |
| Pages | 258 vs 260 → NEAR_LIVE (−2); not STALE_V6 (495) |

## Source path on Windows
- Interior: `C:\Users\zh577\Desktop\google_books_upload\9798256009953_interior.pdf` (2026-07-03)
- Wrap: pre-staged in this folder
