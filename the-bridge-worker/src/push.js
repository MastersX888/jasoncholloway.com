/** Web Push for Cloudflare Workers (nodejs_compat + web-push) */
import webpush from "web-push";

export function getVapidPublicKey(env) {
  return env.VAPID_PUBLIC_KEY || null;
}

export async function handlePushSubscribe(request, env, user) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid json" }, 400);
  }
  if (!body?.subscription?.endpoint) return json({ ok: false, error: "invalid subscription" }, 400);
  await env.BRIDGE_KV.put(`bridge:push:${user.toLowerCase()}`, JSON.stringify(body.subscription));
  return json({ ok: true });
}

export async function handlePushUnsubscribe(env, user) {
  await env.BRIDGE_KV.delete(`bridge:push:${user.toLowerCase()}`);
  return json({ ok: true });
}

function configureWebPush(env) {
  const pub = env.VAPID_PUBLIC_KEY;
  const priv = env.VAPID_PRIVATE_KEY;
  const subject = env.VAPID_SUBJECT || "mailto:zh5779485@gmail.com";
  if (!pub || !priv) return false;
  webpush.setVapidDetails(subject, pub, priv);
  return true;
}

export async function sendPushToUser(env, user, payload) {
  if (!configureWebPush(env)) return { ok: false, error: "no vapid" };
  const raw = await env.BRIDGE_KV.get(`bridge:push:${user.toLowerCase()}`);
  if (!raw) return { ok: false, error: "no subscription" };
  const sub = JSON.parse(raw);
  try {
    await webpush.sendNotification(sub, JSON.stringify(payload));
    return { ok: true };
  } catch (e) {
    if (e.statusCode === 410 || e.statusCode === 404) {
      await env.BRIDGE_KV.delete(`bridge:push:${user.toLowerCase()}`);
    }
    return { ok: false, error: String(e.message || e) };
  }
}

export async function runPushCron(env) {
  const configRaw = await env.BRIDGE_KV.get("bridge:cycle-config");
  const checkRaw = await env.BRIDGE_KV.get("bridge:checkins");
  const config = configRaw ? JSON.parse(configRaw) : {};
  const checkIns = checkRaw ? JSON.parse(checkRaw) : {};
  const today = new Date().toISOString().slice(0, 10);
  let sent = 0;

  for (const name of ["Jason", "Tiffany"]) {
    const p = config[name];
    if (!p?.pushEnabled) continue;

    const alerts = [];

    if (p.sex === "female" && p.lastPeriodStart) {
      const start = new Date(p.lastPeriodStart + "T12:00:00");
      const len = p.cycleLength || 28;
      const diff = Math.floor((Date.now() - start.getTime()) / 86400000);
      const cd = ((diff % len) + len) % len + 1;
      if (cd === 1) alerts.push({ title: "Cycle day 1", body: "Menstrual phase — rest & recovery support hormone balance." });
      if (cd === Math.round(len * 0.5)) alerts.push({ title: "Mid-cycle peak", body: "Ovulatory window — energy & communication often highest." });
      if (cd === len - 4) alerts.push({ title: "Late luteal", body: "PMS-sensitive window — extra patience with yourself & partner." });
    }

    const partner = name === "Jason" ? "Tiffany" : "Jason";
    const pCi = checkIns[`${today}:${partner}`];
    const myCi = checkIns[`${today}:${name}`];
    if (pCi && !myCi) {
      alerts.push({ title: `${partner} checked in`, body: `Mood: ${pCi.mood || "see app"}. Open The Bridge to connect.` });
    }

    for (const a of alerts) {
      const r = await sendPushToUser(env, name, { title: a.title, body: a.body, url: "/" });
      if (r.ok) sent++;
    }
  }
  return sent;
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
  });
}
