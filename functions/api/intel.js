/**
 * /api/intel  — Cloudflare Pages Function
 * Ingest endpoint for the intelligence worker. The worker POSTs an array of
 * scored items here; they are merged into the dashboard state's `intel` array
 * (existing items win, so your keep/dismiss decisions are preserved). The
 * dashboard then picks them up on its next /api/state GET.
 *
 * Bindings:  STATE_KV (same namespace as /api/state)
 * Secret (optional but recommended): INGEST_TOKEN  — must match the worker's
 *   DASHBOARD_INGEST_TOKEN. If unset, the endpoint is open (fine while testing).
 */

const KEY = 'dashboard-state';

export async function onRequestGet({ env }) {
  const s = JSON.parse((await env.STATE_KV.get(KEY)) || '{}');
  return json(s.intel || []);
}

export async function onRequestPost({ request, env }) {
  if (env.INGEST_TOKEN) {
    const auth = request.headers.get('authorization') || '';
    if (auth !== 'Bearer ' + env.INGEST_TOKEN) return json({ ok: false, error: 'unauthorized' }, 401);
  }
  let items;
  try { items = await request.json(); }
  catch { return json({ ok: false, error: 'invalid json' }, 400); }
  if (!Array.isArray(items)) return json({ ok: false, error: 'expected array' }, 400);

  const state = JSON.parse((await env.STATE_KV.get(KEY)) || '{}');
  if (!Array.isArray(state.intel)) state.intel = [];

  const byId = {};
  state.intel.forEach(i => { if (i && i.id) byId[i.id] = i; });
  let added = 0;
  for (const raw of items) {
    if (!raw || !raw.text) continue;
    const id = raw.id || ('w:' + Math.random().toString(36).slice(2, 10));
    if (byId[id]) continue; // existing wins — preserve user's keep/dismiss
    byId[id] = {
      id, ts: raw.ts || new Date().toISOString(), source: raw.source || 'web',
      author: raw.author || '', url: raw.url || '', text: String(raw.text).slice(0, 500),
      score: clamp(Math.round(+raw.score || 0), 0, 100),
      sentiment: ['pos', 'neu', 'neg'].includes(raw.sentiment) ? raw.sentiment : 'neu',
      why: raw.why || '', term: raw.term || '', status: 'new',
    };
    added++;
  }
  state.intel = Object.values(byId);
  await env.STATE_KV.put(KEY, JSON.stringify(state));
  return json({ ok: true, added });
}

export function onRequestOptions() {
  return new Response(null, { headers: cors({ 'access-control-allow-methods': 'GET,POST,OPTIONS' }) });
}

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
function cors(extra = {}) { return { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', ...extra }; }
function json(obj, status = 200) { return new Response(JSON.stringify(obj), { status, headers: cors({ 'content-type': 'application/json' }) }); }
