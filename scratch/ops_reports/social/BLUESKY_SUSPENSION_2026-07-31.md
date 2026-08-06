# Bluesky Account Suspension — 2026-07-31

**Account:** `@jasonhollowaykc.bsky.social` (author)  
**Status:** **Permanently suspended** — "Critical Violation" under **Account Authenticity**  
**Email:** `jason@seventhcitypress.com` · received **2026-07-31 ~12:59 AM CT** (ID 56)  
**Appeal window:** **14 days** · in-app preferred; **email appeal sent Jul 31, 2026 AM**

## Appeal sent

| Field | Value |
|-------|-------|
| **Sent** | 2026-07-31 AM CT |
| **From** | jason@seventhcitypress.com |
| **To** | moderation@blueskyweb.xyz |
| **CC** | zh5779485@gmail.com |
| **Subject** | Appeal: Account suspension @jasonhollowaykc.bsky.social — Account Authenticity (Jul 31, 2026) |
| **Reason in-app unavailable** | Jason does not have login credentials |

---

## What Bluesky said

> We've reviewed activity on your account @jasonhollowaykc.bsky.social and found it violates Bluesky's Community Guidelines on **Account Authenticity**.  
> Your activity was classified as a **Critical Violation** — behavior that is illegal, poses imminent harm, or accounts dedicated to violating our guidelines. These violations result in **immediate and permanent account removal**.

Policy cited: [Community Guidelines — Account Authenticity](https://bsky.social/about/support/community-guidelines)

---

## Live check (2026-07-31 AM)

| Account | Status |
|---------|--------|
| `@jasonhollowaykc.bsky.social` | **Suspended** — profile shows "Account has been suspended" |
| `@seventhcitypress.bsky.social` | **Still active** — 21 posts, 3 followers |

---

## Likely trigger (our assessment — not confirmed by Bluesky)

On **2026-07-30 ~07:57 UTC**, the v2 social batch published **14 Bluesky posts in ~2 minutes** via API script (`BLUESKY_V2_ASSIGNMENT_REPORT.md`):

- 7 posts on `@jasonhollowaykc` (author voice)
- 7 posts on `@seventhcitypress` (imprint voice)

Both accounts posted parallel field-note content linking to the same blog URLs. Combined with:

- **Default/unset avatar** on the author account (noted in branding audit)
- **Near-duplicate content** across two linked accounts at the same timestamp
- **Automated bulk posting** pattern

…this may have been classified as **coordinated deception** or a **non-authentic / bot-like account** under Account Authenticity — **not** because the posts themselves were offensive.

The imprint account feed also shows **duplicate posts** (each field note appears twice — text-only and image/ALT versions), which may have amplified the automation signal.

**We did not impersonate anyone.** Both accounts represent the same real author/imprint (Jason Carroll Holloway / Seventh City Press LLC) with public websites and matching email domain.

---

## Jason action required (priority order)

### 1. Appeal today (do not wait)

Bluesky requires appeals for **account suspensions via the mobile app** (not email).

1. Open the **Bluesky app** on your phone (must be logged into the suspended account if possible, or use the appeal path Bluesky shows on login).
2. Submit appeal within **14 days** of Jul 31.
3. Use the draft below — edit in your voice, add anything only you know (account creation date, verification attempts, etc.).

**Do not** create a replacement `@jasonhollowaykc` or evasion account — that violates ban-evasion rules and can harden the ban.

### 2. Pause Bluesky automation

- Stop any scheduled/API Bluesky posting until appeal resolves.
- Do not publish to `@seventhcitypress` from scripts until we understand why only the author account was hit.

### 3. If appeal fails

- Continue on `@seventhcitypress.bsky.social` only (author voice can live on imprint account temporarily).
- Or appeal informally: `moderation@blueskyweb.xyz` for **post** takedowns only — account suspensions are in-app per Bluesky docs, but a polite follow-up email with context may help if in-app fails.

---

## Draft appeal text (edit before submitting)

> I am Jason Carroll Holloway, a real author and publisher in Kansas City. The account @jasonhollowaykc.bsky.social is my personal author account for my published Masters X trilogy (Seventh City Press LLC). It is not impersonation.
>
> On July 30, 2026, I published seven posts in a short window as part of a coordinated book-marketing batch for my own imprint. A separate account, @seventhcitypress.bsky.social, posted related field-note content for the same imprint. Both accounts are mine, link to my own websites (jasoncholloway.com, seventhcitypress.com), and use my real contact email on the imprint profile.
>
> I believe enforcement may have misclassified this as deceptive or coordinated inauthentic behavior. There was no intent to mislead users about identity, squat handles, or evade any prior action. I am happy to add a verified bio, author photo, and slower posting cadence if required.
>
> Please restore @jasonhollowaykc.bsky.social or advise what specific change would satisfy Account Authenticity requirements.

---

## Related files

- `content/social/BLUESKY_V2_ASSIGNMENT_REPORT.md` — publish log
- `scratch/ops_reports/SOCIAL_BRANDING_AUDIT_2026-07-30.md` — avatar gap noted
- `scratch/ops_reports/social/2026-07-30.md` — post URLs and timestamps

**No auto-reply sent. No account changes made.**
