/**
 * /api/state  — Cloudflare Pages Function
 * Server-side persistence for the Command Deck. The dashboard GETs the whole
 * state object on load and POSTs it back on every change. Intel is merged
 * rather than overwritten, so signals the worker adds between a load and a
 * save are never clobbered.
 *
 * Binding required (Pages project settings -> Functions -> KV bindings, or
 * wrangler.toml):  STATE_KV  ->  your KV namespace
 *   [[kv_namespaces]]
 *   binding = "STATE_KV"
 *   id = "<your-kv-namespace-id>"
 */

const KEY = 'dashboard-state';

export async function onRequestGet({ env }) {
  const raw = await env.STATE_KV.get(KEY);
  return new Response(raw || '{}', { headers: cors({ 'content-type': 'application/json' }) });
}

export async function onRequestPost({ request, env }) {
  let incoming;
  try { incoming = await request.json(); }
  catch { return json({ ok: false, error: 'invalid json' }, 400); }
  if (!incoming || typeof incoming !== 'object') return json({ ok: false, error: 'expected object' }, 400);

  const existing = JSON.parse((await env.STATE_KV.get(KEY)) || '{}');
  // Dashboard view is authoritative for its own fields, but keep any intel the
  // worker added that the dashboard hasn't seen yet (preferAdd = dashboard wins
  // on shared ids, union keeps the rest).
  incoming.intel = mergeIntel(existing.intel || [], incoming.intel || [], true);

  await env.STATE_KV.put(KEY, JSON.stringify(incoming));
  return json({ ok: true });
}

export function onRequestOptions() {
  return new Response(null, { headers: cors({ 'access-control-allow-methods': 'GET,POST,OPTIONS' }) });
}

// base wins on shared ids unless preferAdd; union keeps everything
function mergeIntel(base, add, preferAdd) {
  const m = {};
  (base || []).forEach(i => { if (i && i.id) m[i.id] = i; });
  (add || []).forEach(i => { if (i && i.id && (!m[i.id] || preferAdd)) m[i.id] = i; });
  return Object.values(m);
}
function cors(extra = {}) { return { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', ...extra }; }
function json(obj, status = 200) { return new Response(JSON.stringify(obj), { status, headers: cors({ 'content-type': 'application/json' }) }); }
