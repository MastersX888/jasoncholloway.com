#!/usr/bin/env node

/**
 * Daily Sweep — Seventh City Press
 *
 * Run: node scripts/daily-sweep.mjs
 *
 * Performs automated health checks on owned web properties and prints
 * a prioritized console report of what needs attention today.
 */

const SITES = [
  { name: 'Author Site', url: 'https://jasoncholloway.com/' },
  { name: 'Imprint Site', url: 'https://seventhcitypress.com/' },
  { name: 'Books Index', url: 'https://jasoncholloway.com/books/' },
  { name: 'Omnibus Page', url: 'https://jasoncholloway.com/books/masters-x/omnibus/' },
  { name: 'Chamber', url: 'https://jasoncholloway.com/chamber/folio-visualizer/' },
  { name: 'Merchant Feed', url: 'https://jasoncholloway.com/feeds/google-shopping.csv' },
  { name: 'llms.txt', url: 'https://jasoncholloway.com/llms.txt' },
  { name: 'Press redirect', url: 'https://jasoncholloway.com/press/', redirect: true },
  { name: 'www author', url: 'https://www.jasoncholloway.com/', redirect: true },
  { name: 'www imprint', url: 'https://www.seventhcitypress.com/', redirect: true },
];

const OPEN_TASKS = [
  { id: 'OPS-01', p: 'P0', role: 'Operations', title: 'Commit uncommitted working tree', effort: '5 min' },
  { id: 'PUB-01', p: 'P1', role: 'Publishing', title: 'Google Play Books — verify account review', effort: '10 min' },
  { id: 'PUB-02', p: 'P1', role: 'Publishing', title: 'Hawkes EPUB: fix "sixteen novels" to "seventeen"', effort: '15 min' },
  { id: 'PUB-03', p: 'P1', role: 'Publishing', title: 'Apple Books — claim author profile', effort: '15 min' },
  { id: 'AUTH-01', p: 'P1', role: 'Authority', title: 'Add seventhcitypress.com to GSC', effort: '10 min' },
  { id: 'AUTH-02', p: 'P1', role: 'Authority', title: 'Wikidata P856 — add official website', effort: '5 min' },
  { id: 'AUTH-03', p: 'P1', role: 'Authority', title: 'Wikidata P213 — add ISNI', effort: '5 min' },
  { id: 'AUTH-04', p: 'P1', role: 'Authority', title: 'Google Business Profile — import CSV', effort: '15 min' },
  { id: 'AUTH-05', p: 'P1', role: 'Authority', title: 'Open Library — create author page', effort: '20 min' },
  { id: 'AUTH-06', p: 'P1', role: 'Authority', title: 'Google Books Partner — apply', effort: '20 min' },
  { id: 'MKT-01', p: 'P1', role: 'Marketing', title: 'Pinterest — upload 5+ designed pins', effort: '30 min' },
  { id: 'MKT-02', p: 'P1', role: 'Marketing', title: 'Goodreads — comp shelves + About', effort: '15 min' },
  { id: 'MKT-03', p: 'P1', role: 'Marketing', title: 'StoryGraph — claim author', effort: '15 min' },
  { id: 'WEB-04', p: 'P1', role: 'Web', title: 'Email opt-in form — wire to provider', effort: '1-2 hrs' },
  { id: 'PUB-06', p: 'P2', role: 'Publishing', title: 'Order hardcover proofs', effort: '20 min + ship' },
  { id: 'CRE-01', p: 'P2', role: 'Creative', title: 'YouTube channel creation', effort: '1 hr' },
  { id: 'MKT-05', p: 'P2', role: 'Marketing', title: 'Email newsletter provider setup', effort: '1-2 hrs' },
];

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
};

function line(char = '─', len = 60) {
  return c.dim + char.repeat(len) + c.reset;
}

async function checkSite(site) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(site.url, {
      method: 'HEAD',
      redirect: site.redirect ? 'manual' : 'follow',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const status = res.status;
    const ok = site.redirect ? (status >= 300 && status < 400) : (status >= 200 && status < 300);
    return { ...site, status, ok };
  } catch (err) {
    return { ...site, status: 'ERR', ok: false, error: err.message };
  }
}

function printResults(results) {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  console.log();
  console.log(line('═'));
  console.log(`${c.bold}  SEVENTH CITY PRESS — DAILY SWEEP${c.reset}`);
  console.log(`  ${c.dim}${date} at ${time}${c.reset}`);
  console.log(line('═'));

  console.log();
  console.log(`${c.bold}${c.cyan}  SITE HEALTH${c.reset}`);
  console.log(line());

  let healthy = 0;
  let unhealthy = 0;

  for (const r of results) {
    const icon = r.ok ? `${c.green}✓${c.reset}` : `${c.red}✗${c.reset}`;
    const statusStr = r.ok
      ? `${c.green}${r.status}${c.reset}`
      : `${c.red}${r.status}${c.reset}`;
    const note = r.error ? ` ${c.dim}(${r.error})${c.reset}` : '';
    console.log(`  ${icon}  ${statusStr}  ${r.name}${note}`);
    if (r.ok) healthy++; else unhealthy++;
  }

  console.log();
  if (unhealthy === 0) {
    console.log(`  ${c.bgGreen}${c.bold} ALL SITES HEALTHY ${c.reset}  ${healthy}/${results.length} endpoints OK`);
  } else {
    console.log(`  ${c.bgRed}${c.bold} ${unhealthy} SITE(S) DOWN ${c.reset}  ${healthy}/${results.length} OK`);
  }

  console.log();
  console.log(`${c.bold}${c.yellow}  TODAY'S PRIORITIES${c.reset}`);
  console.log(line());

  const p0 = OPEN_TASKS.filter(t => t.p === 'P0');
  const p1 = OPEN_TASKS.filter(t => t.p === 'P1');
  const p2 = OPEN_TASKS.filter(t => t.p === 'P2');

  if (p0.length > 0) {
    console.log(`  ${c.bgRed}${c.bold} P0 — DO NOW ${c.reset}`);
    for (const t of p0) {
      console.log(`  ${c.red}■${c.reset} [${t.id}] ${c.bold}${t.title}${c.reset}  ${c.dim}(${t.effort})${c.reset}`);
    }
    console.log();
  }

  console.log(`  ${c.bgYellow}${c.bold} P1 — THIS WEEK ${c.reset}`);
  for (const t of p1) {
    const roleColor =
      t.role === 'Publishing' ? c.magenta :
      t.role === 'Authority' ? c.green :
      t.role === 'Marketing' ? c.yellow :
      t.role === 'Web' ? c.cyan : c.blue;
    console.log(`  ${c.yellow}■${c.reset} [${t.id}] ${t.title}  ${roleColor}${t.role}${c.reset}  ${c.dim}(${t.effort})${c.reset}`);
  }
  console.log();

  console.log(`  ${c.dim}P2 — WHEN READY${c.reset}`);
  for (const t of p2) {
    console.log(`  ${c.dim}○ [${t.id}] ${t.title}  (${t.effort})${c.reset}`);
  }

  console.log();
  console.log(`${c.bold}${c.magenta}  TEAM GRADES${c.reset}`);
  console.log(line());
  const grades = [
    { team: 'Operations',  grade: 'B+', color: c.green },
    { team: 'Publishing',  grade: 'B-', color: c.yellow },
    { team: 'Marketing',   grade: 'C+', color: c.red },
    { team: 'Authority',   grade: 'C+', color: c.red },
    { team: 'Creative',    grade: 'B',  color: c.green },
    { team: 'Web Eng.',    grade: 'A-', color: c.green },
  ];
  for (const g of grades) {
    console.log(`  ${g.color}${g.grade}${c.reset}  ${g.team}`);
  }

  console.log();
  console.log(`${c.bold}${c.blue}  TOP RECOMMENDATION${c.reset}`);
  console.log(line());
  console.log(`  ${c.bold}30-minute power block:${c.reset}`);
  console.log(`    1. Commit your uncommitted diff (5 min)`);
  console.log(`    2. Wikidata P856 + P213 (10 min)`);
  console.log(`    3. Add seventhcitypress.com to GSC (10 min)`);
  console.log(`    4. Import Google Business Profile CSV (15 min)`);
  console.log(`  ${c.dim}These four items close 4 open tasks and can trigger a Knowledge Panel.${c.reset}`);

  console.log();
  console.log(`  ${c.bold}Then, if you have energy:${c.reset}`);
  console.log(`    5. Upload 5 Pinterest pins (30 min)`);
  console.log(`    6. Check Google Play review status (5 min)`);

  console.log();
  console.log(`  ${c.dim}Local ops dashboard: npm run dev:ops → http://localhost:3000/ops/${c.reset}`);
  console.log(line('═'));
  console.log();
}

async function main() {
  const results = await Promise.all(SITES.map(checkSite));
  printResults(results);
}

main().catch(err => {
  console.error('Sweep failed:', err);
  process.exit(1);
});
