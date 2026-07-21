export type TaskStatus = 'blocked' | 'open' | 'in_progress' | 'done' | 'deferred' | 'verify';
export type Priority = 'P0' | 'P1' | 'P2' | 'P3';
export type Owner = 'JASON' | 'AGENT' | 'EXT';
export type TeamRole =
  | 'operations'
  | 'publishing'
  | 'marketing'
  | 'authority'
  | 'creative'
  | 'web_engineering';

export interface SweepTask {
  id: string;
  role: TeamRole;
  priority: Priority;
  title: string;
  status: TaskStatus;
  owner: Owner;
  effort: string;
  detail: string;
  command?: string;
  blockedBy?: string;
  dueContext?: string;
}

export interface PlatformNode {
  id: string;
  name: string;
  type: string;
  status: 'live' | 'pending' | 'open' | 'done' | 'deferred' | 'wip';
  url?: string;
  note?: string;
  role: TeamRole;
}

export interface TeamBrief {
  role: TeamRole;
  title: string;
  subtitle: string;
  icon: string;
  grade: string;
  gradeColor: string;
  summary: string;
  strengths: string[];
  gaps: string[];
  topRecommendation: string;
}

export const ROLE_META: Record<TeamRole, { label: string; icon: string; color: string }> = {
  operations:      { label: 'Operations Manager',        icon: '\u{1F4CB}', color: '#60a5fa' },
  publishing:      { label: 'Publishing Director',       icon: '\u{1F4DA}', color: '#a78bfa' },
  marketing:       { label: 'Marketing Strategist',      icon: '\u{1F4E3}', color: '#f59e0b' },
  authority:       { label: 'Authority & Discovery Lead', icon: '\u{1F50D}', color: '#22c55e' },
  creative:        { label: 'Creative Pipeline Manager', icon: '\u{1F3A8}', color: '#ec4899' },
  web_engineering: { label: 'Web Engineering Lead',      icon: '\u{2699}\u{FE0F}',  color: '#06b6d4' },
};

// ---------------------------------------------------------------------------
// Consolidated task registry — sourced from FOUNDATION_STATUS.md,
// LOOSE_ENDS_REGISTER.md, BATCH_SPRINT.md, wave trackers, and CANON.md TODOs
// ---------------------------------------------------------------------------
export const tasks: SweepTask[] = [
  // ── OPERATIONS ──────────────────────────────────────────────────
  {
    id: 'OPS-01',
    role: 'operations',
    priority: 'P0',
    title: 'Commit uncommitted working tree',
    status: 'open',
    owner: 'JASON',
    effort: '5 min',
    detail: 'Press kit PDFs, copy changes, llms.txt updates are in an uncommitted diff. Risk of data loss.',
    command: 'git add -A && git commit -m "chore: foundation audit, press kit regen, merchant feed sync"',
  },
  {
    id: 'OPS-02',
    role: 'operations',
    priority: 'P0',
    title: 'Deploy built out/ to production',
    status: 'done',
    owner: 'JASON',
    effort: '5 min',
    detail: 'Jul 17 deploy completed for both Pages projects.',
    command: 'npx wrangler pages deploy out --project-name=jasoncholloway --branch=main',
  },
  {
    id: 'OPS-03',
    role: 'operations',
    priority: 'P0',
    title: 'Purge Cloudflare cache (both projects)',
    status: 'verify',
    owner: 'JASON',
    effort: '2 min',
    detail: 'User purged Jul 16; redeployed Jul 17. Verify latest content is live.',
  },
  {
    id: 'OPS-04',
    role: 'operations',
    priority: 'P0',
    title: 'www-to-apex redirect (both domains)',
    status: 'done',
    owner: 'AGENT',
    effort: '—',
    detail: 'Fixed via Cloudflare Worker www-to-apex. www hostnames removed from Pages custom domains.',
  },
  {
    id: 'OPS-05',
    role: 'operations',
    priority: 'P1',
    title: 'Reconcile status doc sprawl',
    status: 'done',
    owner: 'AGENT',
    effort: '—',
    detail: 'FOUNDATION_STATUS.md is now canonical ops truth.',
  },

  // ── PUBLISHING ──────────────────────────────────────────────────
  {
    id: 'PUB-01',
    role: 'publishing',
    priority: 'P1',
    title: 'Google Play Books — verify account review cleared',
    status: 'open',
    owner: 'JASON',
    effort: '10 min',
    detail: '4 titles uploaded Jul 15. Check Play Books Partner for review status. Set territories WORLD, prices $6.99/$9.99.',
  },
  {
    id: 'PUB-02',
    role: 'publishing',
    priority: 'P1',
    title: 'Hawkes EPUB: fix "sixteen novels" to "seventeen"',
    status: 'open',
    owner: 'JASON',
    effort: '15 min',
    detail: 'IngramSpark dashboard > edit Hawkes metadata for ISBN 9798295778926.',
    dueContext: 'Factual error in published metadata.',
  },
  {
    id: 'PUB-03',
    role: 'publishing',
    priority: 'P1',
    title: 'Apple Books — claim author profile',
    status: 'open',
    owner: 'JASON',
    effort: '15 min',
    detail: 'authors.apple.com — claim Jason Carroll Holloway.',
  },
  {
    id: 'PUB-04',
    role: 'publishing',
    priority: 'P2',
    title: 'Ingram keywords CSV — 15 ISBNs',
    status: 'open',
    owner: 'JASON',
    effort: '20 min',
    detail: 'Paste keyword set from ingram-metadata-wave1.csv into IngramSpark for all ISBNs.',
  },
  {
    id: 'PUB-05',
    role: 'publishing',
    priority: 'P2',
    title: 'KDP UK/DE/AU keyword optimization',
    status: 'open',
    owner: 'JASON',
    effort: '30 min',
    detail: 'Vol I-III Kindle keywords for UK, DE, AU markets per amazon-intl-keywords.md.',
  },
  {
    id: 'PUB-06',
    role: 'publishing',
    priority: 'P2',
    title: 'Order hardcover proofs',
    status: 'open',
    owner: 'JASON',
    effort: '20 min + ship time',
    detail: 'HC covers render as near-black thumbnails on retail sites. Order one proof of each HC to verify physical appearance before any digital adjustments.',
    dueContext: 'Biggest retail conversion risk identified.',
  },
  {
    id: 'PUB-07',
    role: 'publishing',
    priority: 'P3',
    title: 'Omnibus PB — dedicated cover art',
    status: 'deferred',
    owner: 'JASON',
    effort: 'Variable',
    detail: 'HC art is reused on PB slots. Commission or label honestly when art exists.',
  },

  // ── MARKETING ───────────────────────────────────────────────────
  {
    id: 'MKT-01',
    role: 'marketing',
    priority: 'P1',
    title: 'Pinterest — 5 pins minimum (Voynich + Strahov boards)',
    status: 'open',
    owner: 'JASON',
    effort: '30 min',
    detail: 'Designed pin assets exist at debt_consolidation_handoff/global_penetration_wave1/pinterest-assets/designed/. Upload D-01 through D-15 to Pinterest.',
  },
  {
    id: 'MKT-02',
    role: 'marketing',
    priority: 'P1',
    title: 'Goodreads — claim shelves + finalize About',
    status: 'open',
    owner: 'JASON',
    effort: '15 min',
    detail: 'Author page 20924993 exists. Add comp shelves per goodreads-comp-shelves.md.',
  },
  {
    id: 'MKT-03',
    role: 'marketing',
    priority: 'P1',
    title: 'StoryGraph — claim author profile',
    status: 'open',
    owner: 'JASON',
    effort: '15 min',
    detail: 'thestorygraph.com — sign up as author, add trilogy with genre tags.',
  },
  {
    id: 'MKT-04',
    role: 'marketing',
    priority: 'P2',
    title: 'Czech/German press PDFs — export and send',
    status: 'open',
    owner: 'JASON',
    effort: '1 hr',
    detail: 'press-summary-cz.md and press-summary-de.md need PDF export. Send to 3+ CZ/DE targets.',
  },
  {
    id: 'MKT-05',
    role: 'marketing',
    priority: 'P2',
    title: 'Email provider integration (MailerLite/ConvertKit/Beehiiv)',
    status: 'deferred',
    owner: 'JASON',
    effort: '1-2 hrs',
    detail: 'Newsletter capture forms exist on site but are not connected to a provider. Web3Forms handles contact only.',
    dueContext: 'Every visitor who wants updates is currently lost.',
  },
  {
    id: 'MKT-06',
    role: 'marketing',
    priority: 'P3',
    title: 'Prague Axis press kit PDF',
    status: 'open',
    owner: 'JASON',
    effort: '20 min',
    detail: 'Export prague-axis-press-kit.md to PDF for Czech/Prague-focused press outreach.',
  },

  // ── AUTHORITY & DISCOVERY ──────────────────────────────────────
  {
    id: 'AUTH-01',
    role: 'authority',
    priority: 'P1',
    title: 'Add seventhcitypress.com to Google Search Console',
    status: 'open',
    owner: 'JASON',
    effort: '10 min',
    detail: 'GSC > Add property > URL prefix or domain verification. Submit sitemap.',
  },
  {
    id: 'AUTH-02',
    role: 'authority',
    priority: 'P1',
    title: 'Wikidata Q140275300 — add P856 (official website)',
    status: 'open',
    owner: 'JASON',
    effort: '5 min',
    detail: 'Add P856 = https://seventhcitypress.com/ to Wikidata entry.',
    dueContext: 'Wikidata P856 + GBP together can trigger a Google Knowledge Panel.',
  },
  {
    id: 'AUTH-03',
    role: 'authority',
    priority: 'P1',
    title: 'Wikidata P213 — add ISNI number',
    status: 'open',
    owner: 'JASON',
    effort: '5 min',
    detail: 'Q140275300 > P213 = 0000 0005 3044 7935. ISNI is on site JSON-LD already.',
  },
  {
    id: 'AUTH-04',
    role: 'authority',
    priority: 'P1',
    title: 'Google Business Profile — import CSV',
    status: 'open',
    owner: 'JASON',
    effort: '15 min',
    detail: 'business.google.com > Import profiles > upload CSV from seventhcitypress/google_business/. Upload logo, set service area KC MO.',
    dueContext: 'GBP + Wikidata P856 = highest-leverage Knowledge Panel trigger.',
  },
  {
    id: 'AUTH-05',
    role: 'authority',
    priority: 'P1',
    title: 'Open Library — create author page + 4 works',
    status: 'open',
    owner: 'JASON',
    effort: '20 min',
    detail: 'openlibrary.org — add author + 4 works by ISBN.',
  },
  {
    id: 'AUTH-06',
    role: 'authority',
    priority: 'P1',
    title: 'Google Books Partner — apply and link',
    status: 'open',
    owner: 'JASON',
    effort: '20 min',
    detail: 'books.google.com/partner — apply. Link Play catalog after Google Play review clears.',
    dueContext: 'Single highest-leverage discovery gap.',
  },
  {
    id: 'AUTH-07',
    role: 'authority',
    priority: 'P2',
    title: 'VIAF cluster request email',
    status: 'open',
    owner: 'JASON',
    effort: '10 min',
    detail: 'Send viaf-submission-email.txt to oclcviaf@oclc.org with ISNI + name + publisher.',
  },
  {
    id: 'AUTH-08',
    role: 'authority',
    priority: 'P2',
    title: 'LoC PCN application',
    status: 'open',
    owner: 'JASON',
    effort: '30 min',
    detail: 'loc.gov/publish/pcn/ — apply as Seventh City Press.',
  },
  {
    id: 'AUTH-09',
    role: 'authority',
    priority: 'P1',
    title: 'Verify Amazon/BookBub/Goodreads Author Central',
    status: 'open',
    owner: 'JASON',
    effort: '15 min',
    detail: 'Verify author profiles are complete across Amazon Author Central (US/UK/DE), BookBub, Goodreads.',
  },

  // ── CREATIVE PIPELINES ─────────────────────────────────────────
  {
    id: 'CRE-01',
    role: 'creative',
    priority: 'P2',
    title: 'YouTube channel creation',
    status: 'open',
    owner: 'JASON',
    effort: '1 hr',
    detail: '5 video scripts ready (Voynich Prague, Strahov Crypt, Codex Gigas, Foucault comp, 111 Hz). Channel setup checklist in encyclopedia_project.',
  },
  {
    id: 'CRE-02',
    role: 'creative',
    priority: 'P2',
    title: 'Upload YouTube Videos 01-02 (Voynich Prague, Strahov)',
    status: 'open',
    owner: 'JASON',
    effort: '1 hr',
    detail: 'Scripts and metadata ready. Requires channel creation first.',
    blockedBy: 'CRE-01',
  },
  {
    id: 'CRE-03',
    role: 'creative',
    priority: 'P3',
    title: 'Upload YouTube Videos 03-05 (Codex, Foucault, 111 Hz)',
    status: 'open',
    owner: 'JASON',
    effort: '1.5 hrs',
    detail: 'Wave 2 YouTube content. Add DE + CZ subtitles.',
    blockedBy: 'CRE-01',
  },
  {
    id: 'CRE-04',
    role: 'creative',
    priority: 'P3',
    title: 'Encyclopedia print via BookVault',
    status: 'deferred',
    owner: 'JASON',
    effort: 'Multi-session',
    detail: '67 entries complete (Pass 2 creative done). Pending page-count decision (560-680 pp). See CANON.md TODO #5.',
  },
  {
    id: 'CRE-05',
    role: 'creative',
    priority: 'P3',
    title: 'Audiobook — Audible/ACX listing',
    status: 'deferred',
    owner: 'JASON',
    effort: 'Multi-session',
    detail: '77 ElevenLabs scripts complete. Audible/ACX upload process not started.',
  },

  // ── WEB ENGINEERING ─────────────────────────────────────────────
  {
    id: 'WEB-01',
    role: 'web_engineering',
    priority: 'P2',
    title: 'Inline style cleanup → CSS utilities',
    status: 'open',
    owner: 'AGENT',
    effort: '2 hrs',
    detail: 'Several components use inline styles that should be converted to CSS utility classes.',
  },
  {
    id: 'WEB-02',
    role: 'web_engineering',
    priority: 'P2',
    title: '412px device test matrix',
    status: 'open',
    owner: 'AGENT',
    effort: '1 hr',
    detail: 'Test responsive behavior at 412px width across key pages.',
  },
  {
    id: 'WEB-03',
    role: 'web_engineering',
    priority: 'P2',
    title: 'Mobile gold-button discipline audit',
    status: 'open',
    owner: 'JASON',
    effort: '30 min review',
    detail: 'Multiple btn-gold elements visible in same ~100vh zone on mobile. Document in ELEVATION_III_STATUS.md Mobile CTA Audit.',
  },
  {
    id: 'WEB-04',
    role: 'web_engineering',
    priority: 'P1',
    title: 'Email opt-in form wiring (CANON.md TODO #2-3)',
    status: 'open',
    owner: 'JASON',
    effort: '1-2 hrs',
    detail: 'Confirm opt-in wording, connect form elements to email provider (MailerLite/ConvertKit/Beehiiv).',
    dueContext: 'Visitor capture currently broken — every interested reader is lost.',
  },
];

// ---------------------------------------------------------------------------
// Platform inventory — consolidated from PLATFORM_INVENTORY.md
// ---------------------------------------------------------------------------
export const platforms: PlatformNode[] = [
  { id: 'ja',   name: 'jasoncholloway.com',   type: 'Author Site',                status: 'live',    url: 'https://jasoncholloway.com',  role: 'operations' },
  { id: 'scp',  name: 'seventhcitypress.com',  type: 'Imprint Site',              status: 'live',    url: 'https://seventhcitypress.com', role: 'operations' },
  { id: 'email',name: 'Google Workspace',       type: 'jason@ info@ press@',      status: 'live',    role: 'operations' },
  { id: 'gh',   name: 'GitHub',                 type: 'MastersX888/jasoncholloway.com', status: 'live', url: 'https://github.com/MastersX888/jasoncholloway.com', role: 'web_engineering' },
  { id: 'cf',   name: 'Cloudflare Pages',       type: 'Hosting + KV + Worker',    status: 'live',    role: 'web_engineering' },
  { id: 'amz',  name: 'Amazon KDP',             type: '3 Kindle ($6.99 ea)',      status: 'live',    note: 'Trilogy only; no omnibus on Amazon', role: 'publishing' },
  { id: 'is',   name: 'IngramSpark',            type: 'Print + EPUB + Direct',    status: 'live',    note: 'Primary print distribution',  role: 'publishing' },
  { id: 'bs',   name: 'Bookshop.org',           type: 'Affiliate 126177',         status: 'live',    note: 'Curated list active',         role: 'marketing' },
  { id: 'gp',   name: 'Google Play Books',      type: '4 ebooks uploaded',        status: 'pending', note: 'Pending account review',      role: 'publishing' },
  { id: 'gmc',  name: 'Google Merchant Center',  type: '10 print SKUs',           status: 'live',    note: '10/10 approved — acct 5822707674', role: 'marketing' },
  { id: 'gsc',  name: 'Google Search Console',   type: 'Author domain active',    status: 'live',    role: 'authority' },
  { id: 'gsc2', name: 'GSC (Imprint)',           type: 'seventhcitypress.com',    status: 'open',    note: 'Not yet added',               role: 'authority' },
  { id: 'bing', name: 'Bing Webmaster',          type: 'Both sitemaps submitted', status: 'done',    role: 'authority' },
  { id: 'brave',name: 'Brave Web Discovery',     type: 'Toggled + crawled',       status: 'done',    role: 'authority' },
  { id: 'ga4',  name: 'GA4',                     type: 'G-79RDL3BDEH',           status: 'live',    role: 'marketing' },
  { id: 'gr',   name: 'Goodreads',               type: 'Author 20924993',         status: 'live',    role: 'marketing' },
  { id: 'wd',   name: 'Wikidata',                type: 'Q140275300',              status: 'open',    note: 'Needs P856 + P213',           role: 'authority' },
  { id: 'gbp',  name: 'Google Business Profile', type: 'CSV import ready',        status: 'open',    note: 'Not imported yet',            role: 'authority' },
  { id: 'isni', name: 'ISNI',                    type: '0000 0005 3044 7935',     status: 'live',    note: 'On site JSON-LD — Wikidata P213 manual', role: 'authority' },
  { id: 'ol',   name: 'Open Library',            type: 'Not added',               status: 'open',    role: 'authority' },
  { id: 'gbk',  name: 'Google Books Partner',    type: 'Not applied',             status: 'open',    note: 'Highest-leverage discovery gap', role: 'authority' },
  { id: 'sg',   name: 'StoryGraph',              type: 'Not claimed',             status: 'open',    role: 'marketing' },
  { id: 'enc',  name: 'Encyclopedia',            type: '67 entries, Pass 2 done', status: 'wip',     role: 'creative' },
  { id: 'aud',  name: 'Audiobook',               type: '77 scripts ready',        status: 'wip',     role: 'creative' },
  { id: 'yt',   name: 'YouTube',                 type: 'Scripts + checklist',      status: 'wip',     role: 'creative' },
  { id: 'gs',   name: 'Groundswell Monitor',     type: 'Reach Worker',            status: 'live',    role: 'marketing' },
];

// ---------------------------------------------------------------------------
// Team briefs — what each "consultant" reports in their daily standup
// ---------------------------------------------------------------------------
export const teamBriefs: TeamBrief[] = [
  {
    role: 'operations',
    title: 'Operations Manager',
    subtitle: 'Infrastructure, deploy pipeline, git hygiene',
    icon: '\u{1F4CB}',
    grade: 'B+',
    gradeColor: '#22c55e',
    summary: 'Both sites are live and returning 200. www-to-apex redirect is fixed. Build pipeline succeeds with 48 routes. Main risk: uncommitted local changes that could be lost.',
    strengths: [
      'Both sites live and healthy (200 OK)',
      'www redirect fixed via Cloudflare Worker',
      'Build succeeds — 48 static routes',
      'FOUNDATION_STATUS.md is single ops truth',
      'Google Workspace email operational',
    ],
    gaps: [
      'Uncommitted working tree — risk of data loss',
      'Manual deploy process (no CI/CD) — drift risk',
      'Cache purge needs verification after last deploy',
    ],
    topRecommendation: 'Commit your uncommitted diff right now. It takes 5 minutes and eliminates the biggest single risk to your work.',
  },
  {
    role: 'publishing',
    title: 'Publishing Director',
    subtitle: 'Distribution, storefronts, catalog accuracy',
    icon: '\u{1F4DA}',
    grade: 'B-',
    gradeColor: '#f59e0b',
    summary: 'IngramSpark and Amazon KDP are both live. Merchant Center approved all 10 print SKUs. Google Play is pending review. Hawkes EPUB has a factual error that needs correction.',
    strengths: [
      'IngramSpark — all formats, direct buy, library distribution',
      'Amazon KDP — 3 Kindle editions live',
      'Google Merchant Center — 10/10 products approved',
      'Bookshop.org affiliate active with curated list',
    ],
    gaps: [
      'Google Play Books still pending review',
      'Hawkes EPUB says "sixteen novels" — should be seventeen',
      'Apple Books author profile unclaimed',
      'HC covers render as near-black thumbnails on retail sites',
      'No omnibus on Amazon',
    ],
    topRecommendation: 'Check Google Play review status and fix the Hawkes "sixteen novels" error in IngramSpark. These are your two highest-priority publishing tasks.',
  },
  {
    role: 'marketing',
    title: 'Marketing Strategist',
    subtitle: 'Social media, outreach, reader engagement',
    icon: '\u{1F4E3}',
    grade: 'C+',
    gradeColor: '#ef4444',
    summary: 'You have excellent content assets (12 Field Notes, Analysis Chamber, curated Bookshop list) but low distribution. Pinterest pins are ready but not uploaded. No email capture is active. StoryGraph unclaimed.',
    strengths: [
      'Bookshop.org affiliate + curated list live',
      'GA4 tracking view_item + begin_checkout events',
      '12 Field Notes providing topical authority',
      'Analysis Chamber as unique competitive asset',
      '15 designed Pinterest pin assets ready to upload',
      'Groundswell Monitor tracking reach',
    ],
    gaps: [
      'Pinterest pins designed but not uploaded',
      'StoryGraph unclaimed — free reader community',
      'Goodreads comp shelves not finalized',
      'No email newsletter capture (every interested reader is lost)',
      'No Czech/German press outreach yet (assets ready)',
      'No YouTube channel (scripts ready)',
    ],
    topRecommendation: 'Upload your 5 designed Pinterest pins today (30 min). Then claim StoryGraph and finalize Goodreads shelves. These are free, ready-to-go actions that expand your reach immediately.',
  },
  {
    role: 'authority',
    title: 'Authority & Discovery Lead',
    subtitle: 'Search presence, knowledge graph, library systems',
    icon: '\u{1F50D}',
    grade: 'C+',
    gradeColor: '#ef4444',
    summary: 'Structured data on the site is excellent (JSON-LD, ISNI, sameAs). But external authority signals are incomplete — Wikidata is missing P856 and P213, GSC lacks the imprint domain, GBP not imported, Open Library and Google Books Partner not started.',
    strengths: [
      'JSON-LD structured data solid on all book pages',
      'ISNI assigned + on site JSON-LD + llms.txt',
      'Goodreads author 20924993 claimed',
      'GSC active on author domain with sitemap',
      'Bing Webmaster + Brave submitted',
      'Wikidata entity Q140275300 exists',
    ],
    gaps: [
      'Wikidata missing P856 (official website) + P213 (ISNI)',
      'Imprint domain NOT in Google Search Console',
      'Google Business Profile not imported (Knowledge Panel trigger)',
      'Open Library author page not created',
      'Google Books Partner not applied (highest-leverage discovery gap)',
      'VIAF / LoC PCN not started',
    ],
    topRecommendation: 'Do these three things in one sitting (30 min total): Wikidata P856 + P213, add seventhcitypress.com to GSC, and import the Google Business Profile CSV. Together they can trigger a Google Knowledge Panel.',
  },
  {
    role: 'creative',
    title: 'Creative Pipeline Manager',
    subtitle: 'Encyclopedia, audiobook, YouTube, content production',
    icon: '\u{1F3A8}',
    grade: 'B',
    gradeColor: '#22c55e',
    summary: 'Strong asset pipeline — encyclopedia has 67 entries at Pass 2, audiobook has 77 ElevenLabs scripts, 5 YouTube video scripts are ready. None of these have been published yet. YouTube channel doesn\'t exist.',
    strengths: [
      'Encyclopedia: 67 entries, Pass 2 creative done',
      'Audiobook: 77 ElevenLabs scripts complete',
      '5 YouTube video scripts ready (Voynich, Strahov, Codex, Foucault, 111 Hz)',
      'Universe memory layer documented (5 files)',
      'Folio verification: 166/166 Voynich beineckeRef mapped',
    ],
    gaps: [
      'YouTube channel not created',
      'No videos uploaded',
      'Audiobook Audible/ACX upload not started',
      'Encyclopedia page-count decision pending (560-680 pp)',
      'No published multimedia content',
    ],
    topRecommendation: 'Create the YouTube channel. It\'s free, takes an hour, and unblocks 5 ready-to-upload videos. This is your single biggest expansion opportunity.',
  },
  {
    role: 'web_engineering',
    title: 'Web Engineering Lead',
    subtitle: 'Site architecture, code quality, responsive design',
    icon: '\u{2699}\u{FE0F}',
    grade: 'A-',
    gradeColor: '#22c55e',
    summary: 'Site architecture is best-in-class for indie publishing. 48 static routes, proper structured data, llms.txt, RSS feed. TypeScript compiles with 0 errors. Remaining work is polish: CSS cleanup, mobile CTA discipline, email form wiring.',
    strengths: [
      '48 static routes with proper structured data',
      'TypeScript 0 errors (npx tsc --noEmit)',
      'Field Notes provide topical authority + internal linking',
      'Analysis Chamber is a unique competitive asset',
      'llms.txt for AI discoverability',
      'RSS feed for Field Notes',
      'GA4 conversion tracking (view_item, begin_checkout, generate_lead)',
    ],
    gaps: [
      'Email opt-in forms not connected to a provider',
      'Inline styles should be CSS utilities',
      '412px device test matrix not run',
      'Mobile gold-button audit needs review',
    ],
    topRecommendation: 'Wire the email opt-in form to a provider. Without it, every visitor who wants updates is lost forever. This is the highest-impact web task.',
  },
];

// ---------------------------------------------------------------------------
// Computed helpers
// ---------------------------------------------------------------------------
export function getTasksByRole(role: TeamRole): SweepTask[] {
  return tasks.filter(t => t.role === role);
}

export function getOpenTasks(): SweepTask[] {
  return tasks.filter(t => t.status === 'open' || t.status === 'blocked' || t.status === 'verify');
}

export function getTasksByPriority(priority: Priority): SweepTask[] {
  return tasks.filter(t => t.priority === priority);
}

export function getDailyFocus(): SweepTask[] {
  const open = getOpenTasks();
  return open
    .sort((a, b) => {
      const po = { P0: 0, P1: 1, P2: 2, P3: 3 };
      return (po[a.priority] ?? 9) - (po[b.priority] ?? 9);
    })
    .slice(0, 5);
}

export function getPlatformsByRole(role: TeamRole): PlatformNode[] {
  return platforms.filter(p => p.role === role);
}

export function getSweepStats() {
  const total = tasks.length;
  const open = tasks.filter(t => t.status === 'open').length;
  const done = tasks.filter(t => t.status === 'done').length;
  const blocked = tasks.filter(t => t.status === 'blocked').length;
  const deferred = tasks.filter(t => t.status === 'deferred').length;
  const verify = tasks.filter(t => t.status === 'verify').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;

  const platformsLive = platforms.filter(p => p.status === 'live').length;
  const platformsOpen = platforms.filter(p => p.status === 'open').length;
  const platformsPending = platforms.filter(p => p.status === 'pending').length;

  return { total, open, done, blocked, deferred, verify, inProgress, platformsLive, platformsOpen, platformsPending };
}
