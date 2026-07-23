#!/usr/bin/env node
/**
 * Builds a self-contained HTML review file for Fable content production return.
 * Run: node scripts/build-content-preview.mjs
 * Output: public/content-review-preview.html
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const RETURN = path.join(ROOT, "content_fable_handoff/return");
const OUT = path.join(ROOT, "public/content-review-preview.html");

function read(rel) {
  const p = path.join(RETURN, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}

function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mdToHtml(md) {
  let html = esc(md);
  html = html.replace(/^# (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^## (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");
  html = html.replace(/^---$/gm, "<hr>");
  html = html.replace(/\n\n/g, "</p><p>");
  return `<p>${html}</p>`.replace(/<p><\/p>/g, "");
}

function highlightBillings(html) {
  return html.replace(
    /(Roger Billings|Billings'|Billings |180 underground|patriarch and prophet|Church of Jesus Christ in Zion|hydrogen car at seventeen|ROGER_BILLINGS)/gi,
    '<mark class="billings">$1</mark>'
  );
}

function highlightEncyclopedia(html) {
  return html.replace(
    /(Masters X Universe Encyclopedia|encyclopedia announce|Post 15|Forthcoming from Seventh City Press)/gi,
    '<mark class="encyclopedia">$1</mark>'
  );
}

const BLOG = [
  { id: "01", file: "blog/01_frequency_that_was_already_there.md", title: "The Frequency That Was Already There", status: "ready", note: "Encyclopedia closing line — consider Field Notes only until print." },
  { id: "02", file: "blog/02_grimoire_study_aid.md", title: "The Grimoire That Was a Study Aid", status: "ready", note: "" },
  { id: "03", file: "blog/03_sound_into_form.md", title: "Sound Into Form", status: "ready", note: "" },
  { id: "04", file: "blog/04_why_kansas_city.md", title: "Why Kansas City?", status: "ready", note: "" },
  { id: "05", file: "blog/05_man_under_zion.md", title: "The Man Who Built a City Under Zion", status: "hold", note: "Roger Billings — entire post. Review sourcing before publish." },
  { id: "06", file: "blog/06_three_factions_declassified.md", title: "Three Factions, One Declassified Document", status: "verify", note: "Verify CIA-RDP96-00792R before prop print." },
  { id: "07", file: "blog/07_stone_remembers.md", title: "The Stone Remembers", status: "ready", note: "" },
  { id: "08", file: "blog/08_document_cannot_be_unreleased.md", title: "A Document That Cannot Be Un-Released", status: "verify", note: "Heavy encyclopedia references — hold or edit closings." },
];

const YOUTUBE = [
  { id: "EP04", file: "youtube/FINAL_SCRIPTS/EP04_TABLE_TOP_MIRACLE_FINAL.md", title: "Table-Top Miracle (PILOT)", status: "ready" },
  { id: "EP01", file: "youtube/FINAL_SCRIPTS/EP01_FREQUENCY_IN_THE_STONE_FINAL.md", title: "Frequency in the Stone", status: "ready" },
  { id: "EP05", file: "youtube/FINAL_SCRIPTS/EP05_FIVE_TRADITIONS_FINAL.md", title: "Five Traditions, One Riverbank", status: "verify", note: "Billings beat in segment 5" },
  { id: "EP03", file: "youtube/FINAL_SCRIPTS/EP03_THREE_FACTIONS_FINAL.md", title: "Three Factions", status: "verify" },
  { id: "EP02", file: "youtube/FINAL_SCRIPTS/EP02_PROPHETS_UNDERGROUND_CITY_FINAL.md", title: "Prophet's Underground City", status: "hold", note: "Roger Billings segment — hold until blog 05 approved" },
];

const FN = [
  { id: "FN01", file: "youtube/FIELD_NOTES_VIDEO_SCRIPTS/FN01_VOYNICH_MANUSCRIPT.md", title: "Voynich Manuscript", status: "ready" },
  { id: "FN02", file: "youtube/FIELD_NOTES_VIDEO_SCRIPTS/FN02_STRAHOV_MONASTERY.md", title: "Strahov Monastery", status: "ready", note: "Andrew Chen (site fix applied)" },
  { id: "FN03", file: "youtube/FIELD_NOTES_VIDEO_SCRIPTS/FN03_CODEX_GIGAS.md", title: "Codex Gigas", status: "ready" },
  { id: "FN04", file: "youtube/FIELD_NOTES_VIDEO_SCRIPTS/FN04_FOUCAULT_ECO_PATTERN_HUNTING.md", title: "Eco / Pattern Hunting", status: "ready" },
  { id: "FN05", file: "youtube/FIELD_NOTES_VIDEO_SCRIPTS/FN05_111HZ_CHAMBER_ARCHAEOLOGY.md", title: "111 Hz Chambers", status: "verify" },
];

function badge(status) {
  return `<span class="badge badge-${status}">${status.toUpperCase()}</span>`;
}

function section(id, title, status, note, bodyHtml) {
  return `
<article class="card status-${status}" id="${id}" data-status="${status}">
  <header class="card-header">
    <h3>${esc(title)} ${badge(status)}</h3>
    ${note ? `<p class="note">${esc(note)}</p>` : ""}
  </header>
  <div class="card-body prose">${bodyHtml}</div>
</article>`;
}

const blogHtml = BLOG.map((b) => {
  let body = mdToHtml(read(b.file));
  if (b.status === "hold" || b.id === "05") body = highlightBillings(body);
  body = highlightEncyclopedia(body);
  return section(`blog-${b.id}`, `Blog ${b.id}: ${b.title}`, b.status, b.note, body);
}).join("\n");

const ytHtml = YOUTUBE.map((b) => {
  let body = mdToHtml(read(b.file));
  if (b.status === "hold") body = highlightBillings(body);
  body = highlightEncyclopedia(body);
  return section(`yt-${b.id}`, `YouTube ${b.id}: ${b.title}`, b.status, b.note || "", body);
}).join("\n");

const fnHtml = FN.map((b) => {
  const body = highlightEncyclopedia(mdToHtml(read(b.file)));
  return section(`fn-${b.id}`, `Field Notes Video ${b.id}: ${b.title}`, b.status, b.note || "", body);
}).join("\n");

const socialHtml = section(
  "social-all",
  "Social: 15 Posts (all platforms)",
  "verify",
  "Post 15 (encyclopedia announce) = HOLD per author. Post 4 = Billings = HOLD.",
  highlightBillings(highlightEncyclopedia(mdToHtml(read("social/SOCIAL_POSTS_FINAL.md"))))
);

const calendarHtml = section(
  "social-cal",
  "Social Calendar (4 weeks)",
  "ready",
  "Adjust Week 5 — skip Post 15 until encyclopedia ready.",
  mdToHtml(read("social/SOCIAL_CALENDAR.md"))
);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Content Review Preview — Masters X · Jason Carroll Holloway</title>
  <style>
    :root {
      --bg: #08080F; --surface: #13131E; --border: #272740;
      --text: #EDE9DA; --muted: #B8B4C8; --gold: #D4AA52;
      --hold: #ef4444; --verify: #f59e0b; --ready: #22c55e;
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Georgia, serif; background: var(--bg); color: var(--text); line-height: 1.7; }
    .wrap { max-width: 900px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
    h1 { font-size: 1.75rem; color: var(--gold); margin-bottom: 0.5rem; }
    .subtitle { color: var(--muted); margin-bottom: 2rem; font-size: 0.95rem; }
    .decisions { background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--gold); padding: 1.25rem 1.5rem; margin-bottom: 2rem; border-radius: 4px; }
    .decisions h2 { margin-top: 0; font-size: 1.1rem; color: var(--gold); }
    .decisions ul { margin: 0; padding-left: 1.25rem; }
    .decisions li { margin: 0.5rem 0; }
    .filters { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; position: sticky; top: 0; background: var(--bg); padding: 0.75rem 0; z-index: 10; border-bottom: 1px solid var(--border); }
    .filters button { background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 0.4rem 0.85rem; cursor: pointer; border-radius: 4px; font-size: 0.85rem; }
    .filters button.active { border-color: var(--gold); color: var(--gold); }
    .legend { display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.8rem; margin-bottom: 2rem; color: var(--muted); }
    .legend span { display: flex; align-items: center; gap: 0.35rem; }
    .badge { font-size: 0.65rem; font-family: system-ui, sans-serif; padding: 0.15rem 0.5rem; border-radius: 3px; font-weight: 600; letter-spacing: 0.05em; vertical-align: middle; }
    .badge-ready { background: rgba(34,197,94,0.2); color: var(--ready); }
    .badge-hold { background: rgba(239,68,68,0.2); color: var(--hold); }
    .badge-verify { background: rgba(245,158,11,0.2); color: var(--verify); }
    .card { background: var(--surface); border: 1px solid var(--border); margin-bottom: 1.5rem; border-radius: 4px; overflow: hidden; }
    .card.status-hold { border-left: 4px solid var(--hold); }
    .card.status-verify { border-left: 4px solid var(--verify); }
    .card.status-ready { border-left: 4px solid var(--ready); }
    .card-header { padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); }
    .card-header h3 { margin: 0; font-size: 1.05rem; }
    .note { margin: 0.5rem 0 0; font-size: 0.85rem; color: var(--verify); font-style: italic; }
    .card-body { padding: 1.25rem; max-height: 600px; overflow-y: auto; }
    .prose h2, .prose h3, .prose h4 { color: var(--gold); margin-top: 1.5rem; }
    .prose p { margin: 0.75rem 0; }
    .prose a { color: var(--gold); }
    .prose blockquote { border-left: 3px solid var(--gold); margin: 1rem 0; padding-left: 1rem; color: var(--muted); font-style: italic; }
    .prose hr { border: none; border-top: 1px solid var(--border); margin: 1.5rem 0; }
    mark.billings { background: rgba(239,68,68,0.25); color: #fca5a5; padding: 0 2px; }
    mark.encyclopedia { background: rgba(245,158,11,0.25); color: #fcd34d; padding: 0 2px; }
    .toc { margin-bottom: 2rem; }
    .toc a { color: var(--muted); text-decoration: none; display: block; padding: 0.25rem 0; font-size: 0.9rem; }
    .toc a:hover { color: var(--gold); }
    .hidden { display: none !important; }
    h2.section-title { color: var(--gold); font-size: 1.3rem; margin: 2.5rem 0 1rem; padding-top: 1rem; border-top: 1px solid var(--border); }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Content Review Preview</h1>
    <p class="subtitle">Fable return · July 23, 2026 · Review before publish · Generated ${new Date().toISOString().slice(0, 10)}</p>

    <div class="decisions">
      <h2>Author decisions (locked for this review)</h2>
      <ul>
        <li><strong>Roger Billings content → HOLD</strong> until sourcing reviewed (Blog 05, EP02, Social Post 4, EP05 beat 5)</li>
        <li><strong>Encyclopedia announce → HOLD</strong> (Social Post 15; soften encyclopedia CTAs in blog closings)</li>
        <li><strong>Andrew Chen</strong> — not Andrew Vance. Strahov Field Note fixed on site.</li>
        <li><strong>Blog platform → jasoncholloway.com/blog/</strong> (not Substack)</li>
      </ul>
    </div>

    <div class="legend">
      <span><span class="badge badge-ready">READY</span> OK to publish after spot-check</span>
      <span><span class="badge badge-verify">VERIFY</span> Check sources first</span>
      <span><span class="badge badge-hold">HOLD</span> Do not publish yet</span>
      <span><mark class="billings">highlight</mark> Roger Billings</span>
      <span><mark class="encyclopedia">highlight</mark> Encyclopedia mention</span>
    </div>

    <div class="filters">
      <button class="active" data-filter="all">All</button>
      <button data-filter="hold">Hold only</button>
      <button data-filter="blog">Blog</button>
      <button data-filter="youtube">YouTube</button>
      <button data-filter="social">Social</button>
      <button data-filter="billings">Billings flagged</button>
    </div>

    <nav class="toc">
      <strong style="color:var(--gold)">Jump to</strong>
      ${BLOG.map((b) => `<a href="#blog-${b.id}">Blog ${b.id}: ${esc(b.title)} ${b.status === "hold" ? "⛔" : ""}</a>`).join("")}
      ${YOUTUBE.map((b) => `<a href="#yt-${b.id}">YouTube ${b.id} ${b.status === "hold" ? "⛔" : ""}</a>`).join("")}
      <a href="#social-all">Social posts</a>
    </nav>

    <h2 class="section-title" data-group="blog">Blog (8 posts)</h2>
    ${blogHtml}

    <h2 class="section-title" data-group="youtube">YouTube (5 episodes)</h2>
    ${ytHtml}

    <h2 class="section-title" data-group="youtube">Field Notes Videos (stretch)</h2>
    ${fnHtml}

    <h2 class="section-title" data-group="social">Social</h2>
    ${socialHtml}
    ${calendarHtml}
  </div>
  <script>
    const cards = document.querySelectorAll('.card');
    document.querySelectorAll('.filters button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        cards.forEach(c => {
          if (f === 'all') { c.classList.remove('hidden'); return; }
          if (f === 'hold') { c.classList.toggle('hidden', c.dataset.status !== 'hold'); return; }
          if (f === 'billings') {
            c.classList.toggle('hidden', !c.querySelector('mark.billings'));
            return;
          }
          if (f === 'blog') { c.classList.toggle('hidden', !c.id.startsWith('blog-')); return; }
          if (f === 'youtube') { c.classList.toggle('hidden', !c.id.startsWith('yt-') && !c.id.startsWith('fn-')); return; }
          if (f === 'social') { c.classList.toggle('hidden', !c.id.startsWith('social-')); return; }
        });
        document.querySelectorAll('.section-title').forEach(t => {
          const g = t.dataset.group;
          if (f === 'all' || f === 'hold' || f === 'billings') { t.classList.remove('hidden'); return; }
          t.classList.toggle('hidden', g !== f);
        });
      });
    });
  </script>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log(`Wrote ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(1)} KB)`);
