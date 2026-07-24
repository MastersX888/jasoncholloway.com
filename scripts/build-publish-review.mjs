#!/usr/bin/env node
/**
 * Builds a self-contained HTML review file for the finalized blog series and the
 * social posts derived from it. This reads the live site copy in content/blog/,
 * not the Fable drafts in content_fable_handoff/.
 *
 * Run:    node scripts/build-publish-review.mjs
 * Output: public/publish-review.html
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BLOG_DIR = path.join(ROOT, "content/blog");
const OUT = path.join(ROOT, "public/publish-review.html");
const SITE = "https://jasoncholloway.com";

const POSTS = [
  { id: "01", slot: 1, file: "01_frequency_that_was_already_there.md", slug: "the-frequency-that-was-already-there", title: "The Frequency That Was Already There", status: "live" },
  { id: "02", slot: 4, file: "02_grimoire_study_aid.md", slug: "the-grimoire-that-was-a-study-aid", title: "The Grimoire That Was Actually a Study Aid", status: "live" },
  { id: "03", slot: 2, file: "03_sound_into_form.md", slug: "sound-into-form-hans-jenny", title: "Sound Into Form: What Hans Jenny Actually Proved", status: "live" },
  { id: "04", slot: 3, file: "04_why_kansas_city.md", slug: "why-kansas-city", title: "Why Kansas City? The Ground Itself Is Significant", status: "live" },
  { id: "06", slot: 6, file: "06_three_factions_declassified.md", slug: "three-factions-one-declassified-document", title: "Three Factions, One Declassified Document", status: "ready" },
  { id: "07", slot: 5, file: "07_stone_remembers.md", slug: "the-stone-remembers", title: "The Stone Remembers: A Fire in Westport", status: "ready" },
  { id: "08", slot: 7, file: "08_document_cannot_be_unreleased.md", slug: "a-document-that-cannot-be-unreleased", title: "A Document That Cannot Be Un-Released", status: "ready" },
];

function read(rel) {
  const p = path.join(BLOG_DIR, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function inline(s) {
  let out = esc(s);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*]+?)\*/g, "$1<em>$2</em>");
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  return out;
}

/** Block-level markdown renderer covering the constructs used in these documents. */
function mdToHtml(md, { headingOffset = 0 } = {}) {
  const lines = md.split("\n");
  const out = [];
  let para = [];
  let quote = [];
  let list = null;
  let table = null;

  const flushPara = () => {
    if (!para.length) return;
    out.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };
  const flushQuote = () => {
    if (!quote.length) return;
    const text = quote.join("\n");
    const chars = text.replace(/\s+/g, " ").trim().length;
    const body = quote.map((l) => (l.trim() === "" ? "</p><p>" : inline(l))).join(" ");
    out.push(`<blockquote data-chars="${chars}"><p>${body}</p></blockquote>`);
    quote = [];
  };
  const flushList = () => {
    if (!list) return;
    out.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join("")}</${list.tag}>`);
    list = null;
  };
  const flushTable = () => {
    if (!table) return;
    const cells = (row) => row.split("|").slice(1, -1).map((c) => c.trim());
    const head = cells(table[0]);
    const rows = table.slice(2).map(cells);
    out.push(
      `<table><thead><tr>${head.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead>` +
        `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`
    );
    table = null;
  };
  const flushAll = () => {
    flushPara();
    flushQuote();
    flushList();
    flushTable();
  };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    const t = line.trim();

    if (/^\|.*\|$/.test(t)) {
      flushPara();
      flushQuote();
      flushList();
      (table ??= []).push(t);
      continue;
    }
    flushTable();

    if (t === "") {
      flushPara();
      flushList();
      if (quote.length) quote.push("");
      continue;
    }
    if (t === "---") {
      flushAll();
      out.push("<hr>");
      continue;
    }

    const h = t.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushAll();
      const level = Math.min(6, h[1].length + headingOffset);
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }

    if (t.startsWith("> ")) {
      flushPara();
      flushList();
      quote.push(t.slice(2));
      continue;
    }
    if (t === ">") {
      if (quote.length) quote.push("");
      continue;
    }
    flushQuote();

    const ul = t.match(/^[-*]\s+(.*)$/);
    const ol = t.match(/^(\d+)\.\s+(.*)$/);
    if (ul || ol) {
      flushPara();
      const tag = ul ? "ul" : "ol";
      if (!list || list.tag !== tag) {
        flushList();
        list = { tag, items: [] };
      }
      list.items.push(ul ? ul[1] : ol[2]);
      continue;
    }
    flushList();

    para.push(t);
  }
  flushAll();
  return out.join("\n");
}

function words(md) {
  return md.split(/\s+/).filter(Boolean).length;
}

/** Splits SOCIAL_FROM_BLOG.md into its per-essay slot sections. */
function parseSocial(md) {
  const preambleEnd = md.indexOf("\n## Slot 1");
  const preamble = preambleEnd === -1 ? md : md.slice(0, preambleEnd);
  const heldStart = md.indexOf("\n## Held: do not schedule");
  const held = heldStart === -1 ? "" : md.slice(heldStart);
  const body = md.slice(preambleEnd === -1 ? 0 : preambleEnd, heldStart === -1 ? undefined : heldStart);

  const slots = [];
  const re = /^## (Slot \d+ · Essay (\d+): .+)$/gm;
  const marks = [...body.matchAll(re)];
  marks.forEach((m, i) => {
    const start = m.index;
    const end = i + 1 < marks.length ? marks[i + 1].index : body.length;
    slots.push({
      heading: m[1],
      essay: m[2],
      content: body.slice(start + m[0].length, end).replace(/^\s*\n/, "").replace(/\n---\s*$/, ""),
    });
  });
  return { preamble, slots, held };
}

const socialRaw = read("SOCIAL_FROM_BLOG.md");
const social = parseSocial(socialRaw);
const auditRaw = read("BLOG_EDITORIAL_AUDIT.md");

function badge(status) {
  const label = { live: "LIVE", ready: "AWAITING APPROVAL", hold: "HOLD", verify: "VERIFY" }[status] ?? status.toUpperCase();
  return `<span class="badge badge-${status}">${label}</span>`;
}

function signoff(key, label) {
  return `<div class="signoff" data-key="${key}">
    <span class="signoff-label">${esc(label)}</span>
    <label class="opt approve"><input type="radio" name="${key}" value="approve"> Approve</label>
    <label class="opt changes"><input type="radio" name="${key}" value="changes"> Needs changes</label>
    <label class="opt reject"><input type="radio" name="${key}" value="hold"> Hold</label>
    <textarea placeholder="Notes (saved in this browser)" rows="2"></textarea>
  </div>`;
}

const blogCards = POSTS.map((p) => {
  const md = read(p.file);
  const wc = words(md);
  const mins = Math.max(1, Math.round(wc / 225));
  const url = `${SITE}/blog/${p.slug}/`;
  const meta = [
    p.slot ? `Publish slot ${p.slot} of 7` : "Not scheduled",
    `${wc.toLocaleString()} words`,
    `~${mins} min read`,
  ].join(" · ");
  return `
<article class="card status-${p.status}" id="blog-${p.id}" data-status="${p.status}" data-kind="blog">
  <header class="card-header">
    <h3><span class="num">Essay ${p.id}</span> ${esc(p.title)} ${badge(p.status)}</h3>
    <p class="meta">${esc(meta)}</p>
    <p class="meta"><span class="url">${esc(url)}</span></p>
    ${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}
  </header>
  <div class="card-body prose">${mdToHtml(md, { headingOffset: 2 })}</div>
  ${signoff(`blog-${p.id}`, `Essay ${p.id} decision`)}
</article>`;
}).join("\n");

const socialCards = social.slots
  .map((s) => {
    const post = POSTS.find((p) => p.id === s.essay);
    return `
<article class="card status-${post ? post.status : "ready"}" id="social-${s.essay}" data-status="${post ? post.status : "ready"}" data-kind="social">
  <header class="card-header">
    <h3>${esc(s.heading)} ${badge(post ? post.status : "ready")}</h3>
    <p class="meta">Derived from Essay ${s.essay}${post ? ` · links to /blog/${post.slug}/` : ""}</p>
  </header>
  <div class="card-body prose social">${mdToHtml(s.content, { headingOffset: 1 })}</div>
  ${signoff(`social-${s.essay}`, `Essay ${s.essay} social decision`)}
</article>`;
  })
  .join("\n");

const heldCard = social.held
  ? `<article class="card status-hold" id="social-held" data-status="hold" data-kind="social">
  <header class="card-header"><h3>Held: do not schedule ${badge("hold")}</h3></header>
  <div class="card-body prose">${mdToHtml(social.held.replace(/^## /m, "### "), { headingOffset: 1 })}</div>
</article>`
  : "";

const generated = new Date().toISOString().slice(0, 10);
const liveCount = POSTS.filter((p) => p.status === "live").length;
const pendingCount = POSTS.filter((p) => p.status === "ready").length;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Publish Review: The Facts Behind the Fiction</title>
<style>
  :root {
    --bg:#08080F; --surface:#13131E; --surface2:#191926; --border:#272740;
    --text:#EDE9DA; --muted:#B8B4C8; --gold:#D4AA52;
    --hold:#ef4444; --verify:#f59e0b; --ready:#22c55e;
  }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--text); line-height:1.75;
         font-family:Georgia,'Iowan Old Style',serif; }
  .wrap { max-width:820px; margin:0 auto; padding:2rem 1.25rem 6rem; }
  h1 { font-size:1.9rem; color:var(--gold); margin:0 0 .4rem; }
  .subtitle { color:var(--muted); font-size:.9rem; margin:0 0 2rem; }
  .panel { background:var(--surface); border:1px solid var(--border); border-left:4px solid var(--gold);
           padding:1.1rem 1.4rem; border-radius:4px; margin-bottom:1.25rem; }
  .panel h2 { margin:0 0 .6rem; font-size:1rem; color:var(--gold); letter-spacing:.02em; }
  .panel ul { margin:0; padding-left:1.15rem; }
  .panel li { margin:.4rem 0; font-size:.92rem; }
  .panel.warn { border-left-color:var(--hold); }
  .toolbar { position:sticky; top:0; z-index:20; background:var(--bg); border-bottom:1px solid var(--border);
             padding:.7rem 0; margin-bottom:1.5rem; display:flex; flex-wrap:wrap; gap:.45rem; align-items:center; }
  .toolbar button { background:var(--surface); border:1px solid var(--border); color:var(--text);
                    padding:.38rem .8rem; border-radius:4px; cursor:pointer; font-size:.82rem;
                    font-family:system-ui,sans-serif; }
  .toolbar button:hover { border-color:var(--gold); }
  .toolbar button.active { border-color:var(--gold); color:var(--gold); }
  .spacer { flex:1; }
  .progress { font-family:system-ui,sans-serif; font-size:.78rem; color:var(--muted); }
  .legend { display:flex; gap:1.1rem; flex-wrap:wrap; font-size:.78rem; color:var(--muted);
            margin-bottom:1.75rem; font-family:system-ui,sans-serif; }
  .badge { font-family:system-ui,sans-serif; font-size:.62rem; font-weight:700; letter-spacing:.06em;
           padding:.16rem .5rem; border-radius:3px; vertical-align:middle; }
  .badge-ready { background:rgba(245,158,11,.18); color:var(--verify); }
  .badge-live { background:rgba(34,197,94,.18); color:var(--ready); }
  .badge-hold { background:rgba(239,68,68,.18); color:var(--hold); }
  .badge-verify { background:rgba(245,158,11,.18); color:var(--verify); }
  .toc { background:var(--surface); border:1px solid var(--border); border-radius:4px;
         padding:1rem 1.25rem; margin-bottom:2rem; }
  .toc strong { color:var(--gold); font-size:.85rem; font-family:system-ui,sans-serif;
                letter-spacing:.05em; display:block; margin-bottom:.5rem; }
  .toc a { color:var(--muted); text-decoration:none; display:block; padding:.18rem 0; font-size:.88rem; }
  .toc a:hover { color:var(--gold); }
  .toc .done::after { content:" ✓"; color:var(--ready); }
  h2.section { color:var(--gold); font-size:1.25rem; margin:3rem 0 1rem; padding-top:1.1rem;
               border-top:1px solid var(--border); }
  .card { background:var(--surface); border:1px solid var(--border); border-radius:4px;
          margin-bottom:1.6rem; overflow:hidden; }
  .card.status-hold { border-left:4px solid var(--hold); }
  .card.status-verify { border-left:4px solid var(--verify); }
  .card.status-ready { border-left:4px solid var(--verify); }
  .card.status-live { border-left:4px solid var(--ready); }
  .card.decided-approve { border-left-color:var(--ready); }
  .card.decided-changes { border-left-color:var(--verify); }
  .card.decided-hold { border-left-color:var(--hold); }
  .card-header { padding:1.05rem 1.35rem; background:var(--surface2); border-bottom:1px solid var(--border); }
  .card-header h3 { margin:0; font-size:1.08rem; line-height:1.45; }
  .num { color:var(--gold); font-family:system-ui,sans-serif; font-size:.72rem; letter-spacing:.08em;
         display:block; margin-bottom:.2rem; }
  .meta { margin:.4rem 0 0; font-size:.8rem; color:var(--muted); font-family:system-ui,sans-serif; }
  .url { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.76rem; }
  .note { margin:.6rem 0 0; padding:.6rem .75rem; background:rgba(239,68,68,.09);
          border-left:2px solid var(--hold); font-size:.85rem; color:#fca5a5; font-style:italic; }
  .card-body { padding:1.4rem 1.5rem; }
  .prose h3 { color:var(--gold); font-size:1.35rem; margin:0 0 .3rem; }
  .prose h4 { color:var(--gold); font-size:1.02rem; margin:1.9rem 0 .5rem; }
  .prose h5 { color:var(--text); font-size:.94rem; margin:1.4rem 0 .4rem;
              font-family:system-ui,sans-serif; letter-spacing:.03em; }
  .prose p { margin:.85rem 0; }
  .prose a { color:var(--gold); }
  .prose em { color:var(--muted); }
  .prose code { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.85em;
                background:rgba(255,255,255,.06); padding:.1rem .3rem; border-radius:3px; }
  .prose hr { border:none; border-top:1px solid var(--border); margin:1.8rem 0; }
  .prose ul, .prose ol { margin:.8rem 0; padding-left:1.3rem; }
  .prose li { margin:.35rem 0; }
  .prose table { width:100%; border-collapse:collapse; margin:1rem 0; font-size:.86rem;
                 font-family:system-ui,sans-serif; }
  .prose th, .prose td { border:1px solid var(--border); padding:.45rem .6rem; text-align:left;
                         vertical-align:top; }
  .prose th { background:var(--surface2); color:var(--gold); font-weight:600; }
  .prose blockquote { margin:.9rem 0; padding:.9rem 1.1rem; background:var(--surface2);
                      border-left:3px solid var(--gold); border-radius:0 3px 3px 0; position:relative; }
  .prose blockquote p { margin:.4rem 0; }
  .social blockquote::after { content:attr(data-chars) " chars";
    position:absolute; top:.45rem; right:.6rem; font-family:system-ui,sans-serif; font-size:.66rem;
    color:var(--muted); background:var(--bg); padding:.1rem .4rem; border-radius:3px; }
  .signoff { display:flex; flex-wrap:wrap; align-items:center; gap:.6rem;
             padding:.85rem 1.35rem; background:var(--surface2); border-top:1px solid var(--border);
             font-family:system-ui,sans-serif; font-size:.82rem; }
  .signoff-label { color:var(--muted); margin-right:.3rem; }
  .signoff .opt { display:inline-flex; align-items:center; gap:.3rem; cursor:pointer;
                  padding:.25rem .6rem; border:1px solid var(--border); border-radius:4px; }
  .signoff .opt:hover { border-color:var(--gold); }
  .signoff .approve { color:var(--ready); }
  .signoff .changes { color:var(--verify); }
  .signoff .reject { color:var(--hold); }
  .signoff textarea { flex:1 1 100%; background:var(--bg); color:var(--text); border:1px solid var(--border);
                      border-radius:4px; padding:.5rem .6rem; font-family:inherit; font-size:.82rem;
                      resize:vertical; }
  .hidden { display:none !important; }
  @media print {
    body { background:#fff; color:#111; }
    .toolbar, .signoff, .toc { display:none; }
    .card, .panel { background:#fff; border:1px solid #ccc; break-inside:avoid; }
    .card-header { background:#f4f4f4; }
    h1, h2.section, .prose h3, .prose h4 { color:#222; }
    a { color:#222; }
  }
</style>
</head>
<body>
<div class="wrap">
  <h1>Publish Review</h1>
  <p class="subtitle">The Facts Behind the Fiction · Jason Carroll Holloway · Seventh City Press · Generated ${generated}</p>

  <div class="panel">
    <h2>Where this stands</h2>
    <ul>
      <li><strong>${liveCount} essays are live</strong> at <code>jasoncholloway.com/blog/</code>: essays 01 through 04, in publish slots 1 to 4</li>
      <li><strong>${pendingCount} essays are revised and waiting</strong> on your approval: essays 06, 07, and 08</li>
      <li><strong>${social.slots.length} social sets</strong> covering X, Bluesky, Instagram, and LinkedIn, each written from the essay it links to</li>
    </ul>
  </div>

  <div class="panel">
    <h2>Two changes since the last review</h2>
    <ul>
      <li><strong>Em-dashes are gone.</strong> All ${POSTS.length} essays, the social pack, and the page metadata were rewritten to zero em-dashes. Sentences were restructured rather than having punctuation swapped, so the rhythm changed in places. En-dashes remain only in number ranges such as 3600–2500 BCE.</li>
      <li><strong>The Billings essay is cut.</strong> Essay 05 is out of the series, off the site, and absent from social. Its draft is parked at <code>content/blog/held/05_man_under_zion.md</code>. Essay 04 previously closed on a teaser for it; that section is rewritten to stand on four traditions with William Masters as the invented addition.</li>
    </ul>
  </div>

  <div class="legend">
    <span><span class="badge badge-live">LIVE</span> published</span>
    <span><span class="badge badge-ready">AWAITING APPROVAL</span> revised, not published</span>
    <span>Character counts appear on every social post</span>
    <span>Your decisions and notes save in this browser</span>
  </div>

  <div class="toolbar">
    <button class="active" data-filter="all">Everything</button>
    <button data-filter="blog">Blog only</button>
    <button data-filter="social">Social only</button>
    <button data-filter="hold">Holds</button>
    <button data-filter="undecided">Undecided</button>
    <span class="spacer"></span>
    <span class="progress" id="progress"></span>
    <button id="export">Copy decisions</button>
    <button onclick="window.print()">Print</button>
  </div>

  <nav class="toc">
    <strong>BLOG, in publish order</strong>
    ${[...POSTS]
      .filter((p) => p.slot)
      .sort((a, b) => a.slot - b.slot)
      .map((p) => `<a href="#blog-${p.id}" data-toc="blog-${p.id}">${p.slot}. Essay ${p.id}: ${esc(p.title)}</a>`)
      .join("")}
    <strong style="margin-top:.9rem">SOCIAL</strong>
    ${social.slots.map((s) => `<a href="#social-${s.essay}" data-toc="social-${s.essay}">${esc(s.heading.replace(/^Slot \d+ · /, ""))}</a>`).join("")}
  </nav>

  <h2 class="section" data-group="blog">Blog essays</h2>
  ${blogCards}

  <h2 class="section" data-group="social">Social posts</h2>
  <div class="panel">
    ${mdToHtml(social.preamble.replace(/^# .*$/m, ""), { headingOffset: 1 })}
  </div>
  ${socialCards}
  ${heldCard}

  <h2 class="section" data-group="blog">Editorial audit</h2>
  <article class="card status-live" data-status="live" data-kind="blog">
    <header class="card-header"><h3>Full audit record</h3>
      <p class="meta">Pass-by-pass results, source tables, and open questions</p></header>
    <div class="card-body prose">${mdToHtml(auditRaw.replace(/^# .*$/m, ""), { headingOffset: 2 })}</div>
  </article>
</div>

<script>
  const KEY = 'mx-publish-review';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const save = (s) => localStorage.setItem(KEY, JSON.stringify(s));
  let state = load();

  const cards = [...document.querySelectorAll('.card')];
  const decidable = [...document.querySelectorAll('.signoff')];

  function paint(key) {
    const box = document.querySelector('.signoff[data-key="' + key + '"]');
    if (!box) return;
    const card = box.closest('.card');
    const v = state[key] || {};
    card.classList.remove('decided-approve','decided-changes','decided-hold');
    if (v.decision) card.classList.add('decided-' + v.decision);
    const link = document.querySelector('[data-toc="' + key + '"]');
    if (link) link.classList.toggle('done', v.decision === 'approve');
  }

  decidable.forEach(box => {
    const key = box.dataset.key;
    const saved = state[key] || {};
    if (saved.decision) {
      const input = box.querySelector('input[value="' + saved.decision + '"]');
      if (input) input.checked = true;
    }
    if (saved.note) box.querySelector('textarea').value = saved.note;
    box.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        state[key] = { ...(state[key] || {}), decision: input.value };
        save(state); paint(key); progress();
      });
    });
    box.querySelector('textarea').addEventListener('input', (e) => {
      state[key] = { ...(state[key] || {}), note: e.target.value };
      save(state);
    });
    paint(key);
  });

  function progress() {
    const total = decidable.length;
    const done = decidable.filter(b => (state[b.dataset.key] || {}).decision).length;
    document.getElementById('progress').textContent = done + ' of ' + total + ' reviewed';
  }
  progress();

  document.querySelectorAll('.toolbar button[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.toolbar button[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(c => {
        let show = true;
        if (f === 'blog' || f === 'social') show = c.dataset.kind === f;
        else if (f === 'hold') show = c.dataset.status === 'hold';
        else if (f === 'undecided') {
          const box = c.querySelector('.signoff');
          show = !box || !(state[box.dataset.key] || {}).decision;
        }
        c.classList.toggle('hidden', !show);
      });
      document.querySelectorAll('.section').forEach(t => {
        t.classList.toggle('hidden', (f === 'blog' || f === 'social') && t.dataset.group !== f);
      });
    });
  });

  document.getElementById('export').addEventListener('click', async () => {
    const lines = ['Publish review decisions, ' + new Date().toISOString().slice(0,10), ''];
    decidable.forEach(box => {
      const key = box.dataset.key;
      const v = state[key] || {};
      lines.push(box.querySelector('.signoff-label').textContent + ': ' + (v.decision || 'undecided') + (v.note ? ': ' + v.note : ''));
    });
    const text = lines.join('\\n');
    try { await navigator.clipboard.writeText(text); document.getElementById('export').textContent = 'Copied'; }
    catch { window.prompt('Copy your decisions:', text); }
    setTimeout(() => { document.getElementById('export').textContent = 'Copy decisions'; }, 1800);
  });
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log(`Wrote ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(1)} KB)`);
console.log(`  ${POSTS.length} blog essays (${liveCount} live, ${pendingCount} awaiting approval)`);
console.log(`  ${social.slots.length} social sets`);
