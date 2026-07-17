import { useState } from "react";

const STATUS = {
  live: { color: "#22c55e", label: "Live", bg: "rgba(34,197,94,0.12)" },
  pending: { color: "#f59e0b", label: "Pending", bg: "rgba(245,158,11,0.12)" },
  open: { color: "#ef4444", label: "Open", bg: "rgba(239,68,68,0.12)" },
  done: { color: "#06b6d4", label: "Done", bg: "rgba(6,182,212,0.12)" },
  deferred: { color: "#6b7280", label: "Deferred", bg: "rgba(107,114,128,0.12)" },
  wip: { color: "#a855f7", label: "WIP", bg: "rgba(168,85,247,0.12)" },
};

const TABS = ["Board", "Priorities", "Assessment", "Covers"];

const ownedNodes = [
  { id: "ja", name: "jasoncholloway.com", type: "Author Site", status: "live" },
  { id: "scp", name: "seventhcitypress.com", type: "Imprint Site", status: "live" },
  { id: "email", name: "Google Workspace", type: "jason@ info@ press@", status: "live" },
  { id: "gh", name: "GitHub", type: "MastersX888/jasoncholloway.com", status: "live" },
  { id: "cf", name: "Cloudflare Pages", type: "Hosting + KV + Worker", status: "live" },
];

const retailNodes = [
  { id: "amz", name: "Amazon KDP", type: "3 Kindle ($6.99 ea)", status: "live", note: "Trilogy only; no omnibus" },
  { id: "is", name: "IngramSpark", type: "Print + EPUB + Direct", status: "live", note: "Primary print distribution" },
  { id: "bs", name: "Bookshop.org", type: "Affiliate 126177", status: "live", note: "Curated list active" },
  { id: "gp", name: "Google Play Books", type: "4 Ebooks uploaded", status: "pending", note: "Pending account review (Jul 15)" },
  { id: "gmc", name: "Google Merchant Center", type: "10 print SKUs", status: "live", note: "All approved — no pending issues (Jul 16)" },
];

const discoveryNodes = [
  { id: "gsc", name: "Google Search Console", type: "Author domain active", status: "live" },
  { id: "gsc2", name: "GSC (Imprint)", type: "seventhcitypress.com", status: "open", note: "Not yet added" },
  { id: "bing", name: "Bing Webmaster", type: "Both sitemaps submitted", status: "done", note: "Just completed" },
  { id: "brave", name: "Brave Web Discovery", type: "Toggled + crawled", status: "done", note: "Just completed" },
  { id: "ga4", name: "GA4", type: "G-79RDL3BDEH", status: "live" },
  { id: "gr", name: "Goodreads", type: "Author 20924993", status: "live" },
  { id: "wd", name: "Wikidata", type: "Q140275300", status: "open", note: "Needs P856 official website" },
  { id: "gbp", name: "Google Business Profile", type: "CSV import ready", status: "open", note: "Not imported yet" },
  { id: "isni", name: "ISNI", type: "0000 0005 3044 7935", status: "live", note: "On site JSON-LD + llms.txt — Wikidata P213 still manual" },
  { id: "ol", name: "Open Library", type: "Not added", status: "open" },
  { id: "gbk", name: "Google Books Partner", type: "Not applied", status: "open" },
];

const pipelineNodes = [
  { id: "enc", name: "Encyclopedia", type: "67 entries, Pass 2 done", status: "wip" },
  { id: "aud", name: "Audiobook", type: "77 scripts ready", status: "wip" },
  { id: "yt", name: "YouTube", type: "Scripts + checklist", status: "wip" },
  { id: "gs", name: "Groundswell Monitor", type: "Reach Worker", status: "live" },
];

const connectionsList = [
  { from: "Author Site", to: "Imprint Site", label: "301 /press + /press-kit/*", status: "live" },
  { from: "Author Site", to: "Imprint Site", label: "JSON-LD publisher ref", status: "live" },
  { from: "Author Site", to: "Amazon KDP", label: "Buy links (Kindle)", status: "live" },
  { from: "Author Site", to: "IngramSpark", label: "Buy links (print)", status: "live" },
  { from: "Author Site", to: "Bookshop", label: "Affiliate buy links", status: "live" },
  { from: "Author Site", to: "Merchant Center", label: "Shopping feed CSV", status: "live" },
  { from: "Author Site", to: "GA4", label: "Analytics", status: "live" },
  { from: "Author Site", to: "GSC", label: "Sitemap", status: "live" },
  { from: "Author Site", to: "Bing", label: "Sitemap", status: "done" },
  { from: "Imprint", to: "GSC (Imprint)", label: "Sitemap needed", status: "open" },
  { from: "Imprint", to: "Wikidata", label: "P856 needed", status: "open" },
  { from: "GitHub", to: "Cloudflare", label: "Manual deploy only", status: "live" },
  { from: "IngramSpark", to: "Google Play", label: "EPUBs", status: "pending" },
  { from: "Author Site", to: "Goodreads", label: "sameAs JSON-LD", status: "live" },
  { from: "Imprint", to: "Bing", label: "Sitemap", status: "done" },
  { from: "Encyclopedia", to: "IngramSpark", label: "Future print", status: "deferred" },
  { from: "Audiobook", to: "Amazon", label: "Future Audible", status: "deferred" },
];

const priorities = [
  { id: "P0-01", priority: "P0", title: "Deploy built out/ to production", owner: "JASON", time: "5 min", command: "npx wrangler pages deploy out --project-name=jasoncholloway --branch=main", detail: "Build succeeded Jul 16. Publishes press kit PDFs + copy tweaks + merchant feed." },
  { id: "P0-02", priority: "P0", title: "Purge Cloudflare cache (both projects)", owner: "JASON", time: "2 min", detail: "Cloudflare Dashboard > Workers & Pages > each project > Caching > Purge Everything" },
  { id: "P0-03", priority: "P0", title: "www to apex redirect (both domains)", owner: "JASON", time: "10 min", detail: "Cloudflare > Rules > Redirect Rules. Hostname equals www.jasoncholloway.com > Dynamic redirect > https://jasoncholloway.com${uri.path} 301. Repeat for SCP." },
  { id: "P0-04", priority: "P0", title: "Git commit working tree", owner: "JASON", time: "5 min", command: "git add -A && git commit -m \"chore: foundation audit, press kit regen, merchant feed sync\"" },
  { id: "P1-10", priority: "P1", title: "Add seventhcitypress.com to GSC", owner: "JASON", time: "10 min", detail: "Search Console > Add property > URL prefix or domain verification" },
  { id: "P1-11", priority: "P1", title: "Wikidata P856 = seventhcitypress.com", owner: "JASON", time: "5 min", detail: "Q140275300 > Add statement > P856 > https://seventhcitypress.com/" },
  { id: "P1-12", priority: "P1", title: "Google Business Profile import", owner: "JASON", time: "15 min", detail: "business.google.com > Import profiles > upload CSV from google_business/" },
  { id: "GMC", priority: "P1", title: "Merchant Center: US-only + shipping + fetch", owner: "JASON", time: "10 min", detail: "DONE Jul 16 — 10/10 products approved, all live, no pending issues. Account: Seventh City Press (5822707674)." },
  { id: "P1-15", priority: "P1", title: "Wikidata P213 ISNI + Open Library author", owner: "JASON", time: "15 min", detail: "Site done. Manual: Q140275300 > P213 = 0000 0005 3044 7935. See ISNI_AUTHORITY_BATCH.md" },
  { id: "P1-17", priority: "P1", title: "Open Library + Google Books Partner", owner: "JASON", time: "30 min", detail: "Add author + 4 works by ISBN on Open Library. Apply at books.google.com/partner." },
  { id: "P1-20", priority: "P1", title: "Hawkes EPUB fix: 'sixteen novels' > 'seventeen'", owner: "JASON", time: "15 min", detail: "IngramSpark dashboard > edit Hawkes metadata" },
];

const coverData = [
  { vol: "Vol I", title: "The Inheritance of Frequency", format: "PB", vis: "good", note: "Colors and detail render well at thumbnail" },
  { vol: "Vol I", title: "The Inheritance of Frequency", format: "HC", vis: "poor", note: "Dark tones compress to near-black at small sizes" },
  { vol: "Vol II", title: "The Grimoire", format: "PB", vis: "good", note: "Lighter palette reads at thumbnail" },
  { vol: "Vol II", title: "The Grimoire", format: "HC", vis: "poor", note: "Dark background loses detail without zoom" },
  { vol: "Vol III", title: "The Kingdom", format: "PB", vis: "good", note: "Good contrast at all sizes" },
  { vol: "Vol III", title: "The Kingdom", format: "HC", vis: "poor", note: "Title nearly invisible at thumbnail" },
  { vol: "Omnibus", title: "Masters X Omnibus", format: "PB", vis: "good", note: "Strong shelf presence" },
  { vol: "Omnibus", title: "Masters X Omnibus", format: "HC", vis: "fair", note: "Better than individual HCs" },
  { vol: "Hawkes", title: "Innocence, Desire...", format: "PB", vis: "good", note: "Clear at all sizes" },
  { vol: "Hawkes", title: "Innocence, Desire...", format: "HC", vis: "fair", note: "Readable but dark" },
];

const assessmentAreas = [
  {
    title: "Search Discoverability", grade: "B", gc: "#22c55e",
    items: [
      { ok: true, text: "GSC active on author domain with sitemap" },
      { ok: true, text: "Bing Webmaster + Brave now submitted" },
      { ok: false, text: "Imprint domain NOT in GSC yet" },
      { ok: false, text: "No Google Books Partner account" },
      { ok: true, text: "ISNI 0000 0005 3044 7935 on site JSON-LD + llms.txt (Jul 16)" },
    ],
    rec: "Close GSC imprint + ISNI this sprint. Google Books Partner is the single highest-leverage discovery gap."
  },
  {
    title: "Retail & Buy Path", grade: "B-", gc: "#f59e0b",
    items: [
      { ok: true, text: "IngramSpark strong: all formats, direct buy, library distribution" },
      { ok: true, text: "Bookshop affiliate + curated list active" },
      { ok: true, text: "Google Play uploaded, pending review" },
      { ok: false, text: "Amazon is Kindle-only (no print listing)" },
      { ok: true, text: "Merchant Center: 10/10 print SKUs approved and live (Jul 16)" },
    ],
    rec: "Merchant Center is closed. Focus on GSC imprint + ISNI + GBP for remaining retail discovery gaps."
  },
  {
    title: "Authority & Trust Signals", grade: "C+", gc: "#ef4444",
    items: [
      { ok: true, text: "Wikidata entity exists (Q140275300)" },
      { ok: true, text: "Goodreads author claimed" },
      { ok: true, text: "JSON-LD structured data solid on all book pages" },
      { ok: false, text: "Wikidata missing P856 official website" },
      { ok: true, text: "ISNI on site JSON-LD (0000 0005 3044 7935)" },
      { ok: false, text: "Wikidata P213 ISNI not yet added manually" },
      { ok: false, text: "Open Library author page not created" },
      { ok: false, text: "No Google Business Profile" },
    ],
    rec: "Wikidata P856 + GBP together can trigger a Google Knowledge Panel. That is the single biggest trust signal for a new publisher."
  },
  {
    title: "Visual Merchandising", grade: "C", gc: "#ef4444",
    items: [
      { ok: true, text: "PB and Omnibus covers have good contrast" },
      { ok: false, text: "HC covers for Vols I-III render as near-black thumbnails" },
      { ok: false, text: "No proofs ordered yet to verify physical appearance" },
      { ok: false, text: "Dark covers underperform in scroll-based retail browsing" },
    ],
    rec: "Order proofs before making any changes. See Covers tab for detailed options."
  },
  {
    title: "Site Architecture & SEO", grade: "A-", gc: "#22c55e",
    items: [
      { ok: true, text: "48 static routes with proper structured data" },
      { ok: true, text: "Field Notes provide topical authority + internal linking" },
      { ok: true, text: "Analysis Chamber is a unique competitive asset" },
      { ok: true, text: "llms.txt present for AI discoverability" },
      { ok: false, text: "www to apex redirect broken on live (duplicate content risk)" },
    ],
    rec: "Fix www redirect and site architecture is best-in-class for indie publishing."
  },
  {
    title: "Operational Hygiene", grade: "B-", gc: "#f59e0b",
    items: [
      { ok: true, text: "FOUNDATION_STATUS.md exists as single ops truth" },
      { ok: true, text: "Build succeeded Jul 16 with 48 routes" },
      { ok: false, text: "Deploy has not run: press kit is stale on live" },
      { ok: false, text: "Uncommitted diff: local work could be lost" },
      { ok: false, text: "Manual deploy process: one missed step = drift" },
    ],
    rec: "Deploy + commit + cache purge clears three P0s in 10 minutes. Do it first."
  },
];

const coverOptions = [
  { title: "Option A: Brightness/Contrast Lift", effort: "Low", risk: "Low", cost: "$0", desc: "Increase brightness 15-25% and boost contrast on HC cover files. Re-upload to IngramSpark. Same design, same layout. Just lift the darks so detail is visible at thumbnail scale.", verdict: "Recommended first step" },
  { title: "Option B: Add Border/Edge Treatment", effort: "Low", risk: "Low", cost: "$0", desc: "Add a subtle light border (gold, cream, or white hairline) around HC covers. Gives thumbnails a defined edge against white/gray retailer backgrounds.", verdict: "Quick win, combine with A" },
  { title: "Option C: Shift HC Jacket to Dark Navy/Charcoal", effort: "Medium", risk: "Medium", cost: "IS resubmit fee", desc: "Change the HC jacket background from pure black to a deep navy, charcoal, or burgundy. Keeps premium feel but adds thumbnail differentiation.", verdict: "If A+B are not enough" },
  { title: "Option D: Order Proofs First", effort: "Low", risk: "None", cost: "~$30-50", desc: "Before changing anything, order one proof of each HC. The physical cover may look spectacular in hand even if it photographs poorly. Matte black with foil/emboss can be stunning.", verdict: "Strongly recommended regardless" },
];

function StatusDot({ status }) {
  const s = STATUS[status] || STATUS.open;
  return <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", backgroundColor: s.color, boxShadow: "0 0 6px " + s.color + "40", marginRight: 8, flexShrink: 0 }} />;
}

function Badge({ status }) {
  const s = STATUS[status] || STATUS.open;
  return <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, backgroundColor: s.bg, color: s.color, letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{s.label}</span>;
}

function NodeCard({ node }) {
  const s = STATUS[node.status] || STATUS.open;
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid " + s.color + "30", borderRadius: 8, padding: "12px 14px", borderLeft: "3px solid " + s.color }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
        <StatusDot status={node.status} />
        <span style={{ fontWeight: 700, fontSize: 13, color: "#f0f0f0" }}>{node.name}</span>
        <Badge status={node.status} />
      </div>
      <div style={{ fontSize: 12, color: "#a0a0a0", marginLeft: 18 }}>{node.type}</div>
      {node.note && <div style={{ fontSize: 11, color: "#666", marginLeft: 18, marginTop: 3, fontStyle: "italic" }}>{node.note}</div>}
    </div>
  );
}

function SectionHead({ title, count, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, marginTop: 8, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 10 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#f0f0f0", letterSpacing: "-0.01em" }}>{title}</h3>
      {count != null && <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, backgroundColor: "rgba(96,165,250,0.1)", color: "#60a5fa" }}>{count}</span>}
    </div>
  );
}

function BoardTab() {
  const all = [...ownedNodes, ...retailNodes, ...discoveryNodes, ...pipelineNodes];
  const counts = { live: 0, pending: 0, open: 0, done: 0 };
  all.forEach(n => { if (counts[n.status] !== undefined) counts[n.status]++; });

  const sections = [
    { title: "Owned Properties", icon: "\u{1F535}", nodes: ownedNodes },
    { title: "Retail & Distribution", icon: "\u{1F7E2}", nodes: retailNodes },
    { title: "Discovery & Authority", icon: "\u{1F7E1}", nodes: discoveryNodes },
    { title: "Creative Pipelines", icon: "\u{1F7E3}", nodes: pipelineNodes },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10, marginBottom: 24 }}>
        {[["Live", counts.live, "live"], ["Pending", counts.pending, "pending"], ["Open", counts.open, "open"], ["Just Done", counts.done, "done"]].map(([label, count, st]) => (
          <div key={label} style={{ background: STATUS[st].bg, borderRadius: 8, padding: "12px 16px", border: "1px solid " + STATUS[st].color + "20", textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: STATUS[st].color }}>{count}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: STATUS[st].color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 14, marginBottom: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#f0f0f0", marginBottom: 10 }}>Connection Yarn Map</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {connectionsList.map((c, i) => {
            const s = STATUS[c.status] || STATUS.open;
            return (
              <span key={i} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, backgroundColor: s.bg, color: s.color, border: "1px solid " + s.color + "20", whiteSpace: "nowrap" }}>
                {c.from} &rarr; {c.to}
              </span>
            );
          })}
        </div>
      </div>

      {sections.map(sec => (
        <div key={sec.title} style={{ marginBottom: 24 }}>
          <SectionHead title={sec.title} count={sec.nodes.length} icon={sec.icon} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 10 }}>
            {sec.nodes.map(n => <NodeCard key={n.id} node={n} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function PrioritiesTab() {
  const [done, setDone] = useState({});
  const toggle = id => setDone(p => ({ ...p, [id]: !p[id] }));
  const doneCount = Object.values(done).filter(Boolean).length;
  const p0 = priorities.filter(p => p.priority === "P0");
  const p1 = priorities.filter(p => p.priority === "P1");

  return (
    <div>
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 16, marginBottom: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f0f0f0" }}>Sprint Progress</div>
            <div style={{ fontSize: 12, color: "#a0a0a0", marginTop: 2 }}>{doneCount}/{priorities.length} checked off</div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#60a5fa" }}>{Math.round(doneCount / priorities.length * 100)}%</div>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)", marginTop: 12, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 3, width: (doneCount / priorities.length * 100) + "%", background: "#60a5fa", transition: "width 0.3s" }} />
        </div>
      </div>

      {[{ label: "P0 \u2014 Foundation Blockers", items: p0, icon: "\u{1F534}" }, { label: "P1 \u2014 Sprint Items", items: p1, icon: "\u{1F7E0}" }].map(group => (
        <div key={group.label} style={{ marginBottom: 28 }}>
          <SectionHead title={group.label} count={group.items.filter(i => !done[i.id]).length + " left"} icon={group.icon} />
          {group.items.map(item => {
            const isDone = done[item.id];
            return (
              <div key={item.id} onClick={() => toggle(item.id)} style={{ background: isDone ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.04)", border: "1px solid " + (isDone ? "#22c55e30" : "rgba(255,255,255,0.08)"), borderRadius: 8, padding: "14px 16px", marginBottom: 8, cursor: "pointer", opacity: isDone ? 0.6 : 1, transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 1, border: isDone ? "2px solid #22c55e" : "2px solid #666", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: isDone ? "#22c55e" : "transparent" }}>
                    {isDone && <span style={{ color: "#fff", fontSize: 13, fontWeight: 800 }}>{"\u2713"}</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: "#f0f0f0", textDecoration: isDone ? "line-through" : "none" }}>{item.title}</span>
                      <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, background: "rgba(96,165,250,0.1)", color: "#60a5fa", fontWeight: 600 }}>{item.owner}</span>
                      {item.time && <span style={{ fontSize: 10, color: "#666" }}>~{item.time}</span>}
                    </div>
                    {item.detail && <div style={{ fontSize: 12, color: "#a0a0a0", marginTop: 4 }}>{item.detail}</div>}
                    {item.command && <code style={{ display: "block", fontSize: 11, marginTop: 6, padding: "6px 10px", background: "rgba(0,0,0,0.4)", borderRadius: 4, color: "#a5f3fc", fontFamily: "monospace", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>{item.command}</code>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div style={{ background: "rgba(168,85,247,0.08)", borderRadius: 8, padding: 16, border: "1px solid rgba(168,85,247,0.2)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#a855f7", marginBottom: 6 }}>Recently Completed (Not in Original Sprint)</div>
        <div style={{ fontSize: 12, color: "#a0a0a0", lineHeight: 1.7 }}>
          {"\u2705"} Google Play Books &mdash; 4 titles uploaded, pending account review<br/>
          {"\u2705"} Bing Webmaster &mdash; both sitemaps submitted<br/>
          {"\u2705"} Brave Web Discovery &mdash; enabled and crawled<br/>
          {"\u2705"} Google Merchant Center &mdash; 10/10 products approved, all live (Jul 16)<br/>
          {"\u2705"} Multiple P1 website bugs closed on live (Jul 16 audit)<br/>
        </div>
      </div>
    </div>
  );
}

function AssessmentTab() {
  return (
    <div>
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 16, marginBottom: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#f0f0f0", marginBottom: 6 }}>Marketing Team Assessment &mdash; July 16, 2026</div>
        <div style={{ fontSize: 12, color: "#a0a0a0", lineHeight: 1.6 }}>
          Foundation is approximately 90% solid. Web properties work, redirects are correct, structured data is in place. Remaining gaps are dashboard tasks (not code) and authority registrations. The biggest risk to sales conversion is the HC cover visibility issue.
        </div>
      </div>
      {assessmentAreas.map(area => (
        <div key={area.title} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, marginBottom: 12, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#f0f0f0" }}>{area.title}</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: area.gc, fontFamily: "monospace" }}>{area.grade}</span>
          </div>
          <div style={{ padding: 16 }}>
            {area.items.map((it, i) => (
              <div key={i} style={{ fontSize: 12, color: "#a0a0a0", padding: "4px 0", display: "flex", gap: 8, lineHeight: 1.5 }}>
                <span style={{ color: it.ok ? "#22c55e" : "#ef4444", flexShrink: 0 }}>{it.ok ? "\u2713" : "\u2717"}</span>
                {it.text}
              </div>
            ))}
            <div style={{ fontSize: 12, fontWeight: 600, color: "#60a5fa", padding: "10px 12px", background: "rgba(96,165,250,0.1)", borderRadius: 6, lineHeight: 1.5, marginTop: 10 }}>
              &rarr; {area.rec}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CoversTab() {
  const vc = { good: "#22c55e", fair: "#f59e0b", poor: "#ef4444" };
  return (
    <div>
      <div style={{ background: "rgba(239,68,68,0.08)", borderRadius: 8, padding: 16, marginBottom: 24, border: "1px solid rgba(239,68,68,0.2)" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#ef4444", marginBottom: 8 }}>Cover Visibility Concern &mdash; Hardcover Editions</div>
        <div style={{ fontSize: 12, color: "#a0a0a0", lineHeight: 1.7 }}>
          The hardcover editions of Vols I&ndash;III are rendering as predominantly black thumbnails across every retailer platform. In scroll-based retail UIs (Amazon, Google Play, Bookshop, IngramSpark storefront), buyers make split-second decisions based on thumbnail visibility. A cover that reads as a dark rectangle gets scrolled past.
        </div>
      </div>

      <SectionHead title="Visibility Matrix" icon={"\u{1F4D6}"} />
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", overflow: "auto", marginBottom: 24 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)" }}>
              {["Edition", "Format", "Thumbnail", "Notes"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "#f0f0f0", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coverData.map((c, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <td style={{ padding: "10px 14px", color: "#f0f0f0", fontWeight: 600 }}>{c.vol}</td>
                <td style={{ padding: "10px 14px", color: "#a0a0a0" }}>{c.format}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, backgroundColor: vc[c.vis] + "18", color: vc[c.vis], textTransform: "uppercase" }}>{c.vis}</span>
                </td>
                <td style={{ padding: "10px 14px", color: "#a0a0a0", fontSize: 11 }}>{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionHead title="Options Without Redesign" icon={"\u{1F527}"} />
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {coverOptions.map(opt => (
          <div key={opt.title} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#f0f0f0", marginBottom: 8 }}>{opt.title}</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
              {[["Effort", opt.effort], ["Risk", opt.risk], ["Cost", opt.cost]].map(([k, v]) => (
                <span key={k} style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, background: "rgba(96,165,250,0.1)", color: "#a0a0a0" }}>{k}: {v}</span>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#a0a0a0", lineHeight: 1.6, marginBottom: 10 }}>{opt.desc}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", padding: "8px 10px", background: "rgba(96,165,250,0.1)", borderRadius: 4 }}>&rarr; {opt.verdict}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 16, marginTop: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#f0f0f0", marginBottom: 8 }}>Marketing Team Recommendation</div>
        <div style={{ fontSize: 12, color: "#a0a0a0", lineHeight: 1.7 }}>
          <strong style={{ color: "#f0f0f0" }}>Order proofs first (Option D).</strong> You cannot make an informed decision about digital adjustments without knowing what the physical product looks like. If the HCs are stunning in person (matte black with foil or emboss can be gorgeous), then the fix is digital-only: create brightened thumbnail variants for retailer listings while keeping physical covers as-is. Many publishers use different cover art for digital thumbnails than what ships.
          <br/><br/>
          If proofs confirm the covers are too dark physically as well, then Option A (brightness lift) + Option B (border) together solve the thumbnail problem without any design overhaul. Total turnaround: one afternoon plus an IngramSpark resubmit.
          <br/><br/>
          <strong style={{ color: "#f0f0f0" }}>Do not redesign.</strong> The covers have a consistent visual language across the trilogy. Changing the design at this stage creates version confusion across every retailer you have already uploaded to. The goal is to make the existing design read at small sizes, not to replace it.
        </div>
      </div>
    </div>
  );
}

export default function PegBoard() {
  const [tab, setTab] = useState("Board");
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#f0f0f0", minHeight: "100vh", padding: "0 0 40px 0" }}>
      <div style={{ padding: "24px 24px 0", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ width: 36, height: 36, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, background: "linear-gradient(135deg, #1e3a5f, #0f172a)", border: "1px solid rgba(96,165,250,0.3)" }}>{"\u{1F4CC}"}</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>Seventh City Press &mdash; Operations Board</h1>
            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>Last audit: July 16, 2026 &middot; Post Google Play upload &middot; Bing + Brave submitted</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 2, padding: "0 24px", marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 18px", fontSize: 13, fontWeight: tab === t ? 700 : 500, color: tab === t ? "#60a5fa" : "#a0a0a0", background: "transparent", border: "none", cursor: "pointer", borderBottom: tab === t ? "2px solid #60a5fa" : "2px solid transparent", marginBottom: -1 }}>
            {t}{t === "Covers" ? " \u26A0" : ""}
          </button>
        ))}
      </div>
      <div style={{ padding: "0 24px", maxWidth: 960 }}>
        {tab === "Board" && <BoardTab />}
        {tab === "Priorities" && <PrioritiesTab />}
        {tab === "Assessment" && <AssessmentTab />}
        {tab === "Covers" && <CoversTab />}
      </div>
    </div>
  );
}
