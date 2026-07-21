import { BridgeLiveChat, liveChatStub } from "./live-chat-do.js";
import {
  getVapidPublicKey,
  handlePushSubscribe,
  handlePushUnsubscribe,
  runPushCron,
} from "./push.js";

export { BridgeLiveChat };

const USERS = ["Jason", "Tiffany"];
const SESSION_TTL_SEC = 604800; // 7 days
const PENDING_TTL_SEC = 600; // 10 minutes

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runPushCron(env));
  },

  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/bridge/auth")) {
      return handleAuth(request, env, url);
    }

    if (url.pathname.startsWith("/api/bridge/")) {
      return handleBridgeApi(request, env, url);
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("The Bridge API", { headers: cors({ "content-type": "text/plain" }) });
  },
};

async function handleBridgeApi(request, env, url) {
  if (url.pathname === "/api/bridge/kv") {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors({ "access-control-allow-methods": "GET,PUT,OPTIONS" }) });
    }
    const session = await requireSession(request, env);
    if (session.error) return session.error;

    if (request.method === "GET") {
      const key = url.searchParams.get("key");
      if (!isBridgeKey(key)) return json({ ok: false, error: "invalid key" }, 400);
      const raw = await env.BRIDGE_KV.get(key);
      return json({ ok: true, value: raw });
    }

    if (request.method === "PUT") {
      let body;
      try { body = await request.json(); }
      catch { return json({ ok: false, error: "invalid json" }, 400); }
      if (!isBridgeKey(body?.key)) return json({ ok: false, error: "invalid key" }, 400);
      await env.BRIDGE_KV.put(body.key, body.value ?? "");
      return json({ ok: true });
    }
  }

  if (url.pathname === "/api/bridge/live/ws") {
    const session = await requireSession(request, env);
    if (session.error) return session.error;
    if (!env.LIVE_CHAT) return json({ ok: false, error: "live chat unavailable" }, 503);

    const stub = liveChatStub(env);
    const headers = new Headers(request.headers);
    headers.set("X-Bridge-User", session.session.user);
    return stub.fetch(new Request("https://live-chat/ws", { headers }));
  }

  if (url.pathname === "/api/bridge/live/messages") {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors({ "access-control-allow-methods": "GET,OPTIONS" }) });
    }
    const session = await requireSession(request, env);
    if (session.error) return session.error;
    if (!env.LIVE_CHAT) return json({ ok: false, error: "live chat unavailable" }, 503);

    const stub = liveChatStub(env);
    const res = await stub.fetch(new Request("https://live-chat/history"));
    return new Response(await res.text(), {
      status: res.status,
      headers: cors({ "content-type": "application/json" }),
    });
  }

  if (url.pathname === "/api/bridge/claude") {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors({ "access-control-allow-methods": "POST,OPTIONS" }) });
    }
    const session = await requireSession(request, env);
    if (session.error) return session.error;

    if (request.method === "POST") {
      const apiKey = env.ANTHROPIC_API_KEY;
      if (!apiKey) return json({ ok: false, error: "Anthropic API key not configured on server" }, 503);

      let body;
      try { body = await request.json(); }
      catch { return json({ ok: false, error: "invalid json" }, 400); }

      const model = body.model || env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
      const maxTokens = clamp(Math.round(+body.max_tokens || 1000), 1, 4096);

      const upstream = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: maxTokens,
          system: body.system || "",
          messages: body.messages || [],
        }),
      });

      const data = await upstream.json();
      if (!upstream.ok) {
        const msg = data?.error?.message || data?.error?.type || "Anthropic request failed";
        return json({ ok: false, error: msg }, upstream.status);
      }

      const text = (data.content || []).map((b) => b.text || "").join("\n");
      return json({ ok: true, text });
    }
  }

  if (url.pathname === "/api/bridge/push/vapid-public" && request.method === "GET") {
    const key = getVapidPublicKey(env);
    if (!key) return json({ ok: false, error: "push not configured" }, 503);
    return json({ ok: true, publicKey: key });
  }

  if (url.pathname === "/api/bridge/push/subscribe") {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors({ "access-control-allow-methods": "POST,DELETE,OPTIONS" }) });
    }
    const session = await requireSession(request, env);
    if (session.error) return session.error;
    if (request.method === "POST") return handlePushSubscribe(request, env, session.session.user);
    if (request.method === "DELETE") return handlePushUnsubscribe(env, session.session.user);
  }

  return json({ ok: false, error: "not found" }, 404);
}

async function handleAuth(request, env, url) {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: cors({ "access-control-allow-methods": "GET,POST,OPTIONS" }) });
  }

  if (url.pathname === "/api/bridge/auth/status" && request.method === "GET") {
    const users = {};
    for (const name of USERS) {
      users[name] = { enrolled: !!(await env.BRIDGE_KV.get(authKey(name))) };
    }
    const enrolledCount = Object.values(users).filter((u) => u.enrolled).length;
    return json({ ok: true, users, bootstrapOpen: enrolledCount < USERS.length });
  }

  if (url.pathname === "/api/bridge/auth/me" && request.method === "GET") {
    const session = await getSession(request, env);
    if (!session) return json({ ok: false, error: "unauthorized" }, 401);
    return json({ ok: true, user: session.user, expires: session.expires });
  }

  if (url.pathname === "/api/bridge/auth/enroll/start" && request.method === "POST") {
    let body;
    try { body = await request.json(); }
    catch { return json({ ok: false, error: "invalid json" }, 400); }

    const user = body.user;
    if (!isUser(user)) return json({ ok: false, error: "invalid user" }, 400);
    if (!validPassword(body.password)) return json({ ok: false, error: "password must be at least 10 characters" }, 400);
    if (body.password !== body.confirmPassword) return json({ ok: false, error: "passwords do not match" }, 400);

    const enrolled = await env.BRIDGE_KV.get(authKey(user));
    if (enrolled) return json({ ok: false, error: "already enrolled — sign in instead" }, 409);

    const bootstrap = !(await allUsersEnrolled(env));
    if (!bootstrap && !validSetupToken(body.setupToken, env)) {
      return json({ ok: false, error: "setup not authorized" }, 403);
    }

    const totpSecret = generateBase32Secret();
    const passwordCreds = await hashPassword(body.password);
    await env.BRIDGE_KV.put(
      pendingKey(user),
      JSON.stringify({ passwordCreds, totpSecret, createdAt: Date.now() }),
      { expirationTtl: PENDING_TTL_SEC },
    );

    const otpauthUrl = buildOtpAuthUrl(user, totpSecret);
    return json({ ok: true, otpauthUrl, qrUrl: qrCodeUrl(otpauthUrl) });
  }

  if (url.pathname === "/api/bridge/auth/enroll/confirm" && request.method === "POST") {
    let body;
    try { body = await request.json(); }
    catch { return json({ ok: false, error: "invalid json" }, 400); }

    const user = body.user;
    if (!isUser(user)) return json({ ok: false, error: "invalid user" }, 400);
    if (!validPassword(body.password)) return json({ ok: false, error: "invalid password" }, 400);
    const totpCode = normalizeTotp(body.totpCode);
    if (!totpCode) return json({ ok: false, error: "invalid verification code" }, 400);

    const pendingRaw = await env.BRIDGE_KV.get(pendingKey(user));
    if (!pendingRaw) return json({ ok: false, error: "setup expired — start again" }, 410);

    const pending = JSON.parse(pendingRaw);
    const passwordOk = await verifyPassword(body.password, pending.passwordCreds);
    if (!passwordOk) return json({ ok: false, error: "invalid password" }, 401);

    if (!(await verifyTotp(pending.totpSecret, totpCode))) {
      return json({ ok: false, error: "incorrect verification code" }, 401);
    }

    await env.BRIDGE_KV.put(
      authKey(user),
      JSON.stringify({
        passwordCreds: pending.passwordCreds,
        totpSecret: pending.totpSecret,
        enrolledAt: Date.now(),
      }),
    );
    await env.BRIDGE_KV.delete(pendingKey(user));

    const session = await createSession(env, user);
    return json({ ok: true, user, sessionToken: session.token, expires: session.expires });
  }

  if (url.pathname === "/api/bridge/auth/login" && request.method === "POST") {
    let body;
    try { body = await request.json(); }
    catch { return json({ ok: false, error: "invalid json" }, 400); }

    const user = body.user;
    if (!isUser(user)) return json({ ok: false, error: "invalid user" }, 400);
    const totpCode = normalizeTotp(body.totpCode);
    if (!totpCode) return json({ ok: false, error: "invalid verification code" }, 400);

    const authRaw = await env.BRIDGE_KV.get(authKey(user));
    if (!authRaw) return json({ ok: false, error: "not enrolled" }, 404);

    const auth = JSON.parse(authRaw);
    if (!(await verifyPassword(body.password || "", auth.passwordCreds))) {
      return json({ ok: false, error: "invalid credentials" }, 401);
    }
    if (!(await verifyTotp(auth.totpSecret, totpCode))) {
      return json({ ok: false, error: "invalid credentials" }, 401);
    }

    const session = await createSession(env, user);
    return json({ ok: true, user, sessionToken: session.token, expires: session.expires });
  }

  if (url.pathname === "/api/bridge/auth/logout" && request.method === "POST") {
    const session = await getSession(request, env);
    if (session?.token) await env.BRIDGE_KV.delete(sessionKey(session.token));
    return json({ ok: true });
  }

  return json({ ok: false, error: "not found" }, 404);
}

function isBridgeKey(key) {
  return typeof key === "string" && key.startsWith("bridge:") && !key.startsWith("bridge:auth:") && !key.startsWith("bridge:session:") && key.length <= 128;
}

function isUser(user) {
  return USERS.includes(user);
}

function authKey(user) {
  return `bridge:auth:${user.toLowerCase()}`;
}

function pendingKey(user) {
  return `bridge:auth:pending:${user.toLowerCase()}`;
}

function sessionKey(token) {
  return `bridge:session:${token}`;
}

function validPassword(password) {
  return typeof password === "string" && password.length >= 10;
}

function validSetupToken(token, env) {
  return env.SETUP_TOKEN && token === env.SETUP_TOKEN;
}

async function allUsersEnrolled(env) {
  for (const name of USERS) {
    if (!(await env.BRIDGE_KV.get(authKey(name)))) return false;
  }
  return true;
}

async function requireSession(request, env) {
  const session = await getSession(request, env);
  if (!session) return { error: json({ ok: false, error: "unauthorized" }, 401) };
  return { session };
}

async function getSession(request, env) {
  const url = new URL(request.url);
  const auth = request.headers.get("authorization") || "";
  let token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : url.searchParams.get("token");
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;

  const raw = await env.BRIDGE_KV.get(sessionKey(token));
  if (!raw) return null;

  const session = JSON.parse(raw);
  if (!session.expires || session.expires < Date.now()) {
    await env.BRIDGE_KV.delete(sessionKey(token));
    return null;
  }
  return { ...session, token };
}

async function createSession(env, user) {
  const token = [...crypto.getRandomValues(new Uint8Array(32))]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const expires = Date.now() + SESSION_TTL_SEC * 1000;
  await env.BRIDGE_KV.put(sessionKey(token), JSON.stringify({ user, expires }), { expirationTtl: SESSION_TTL_SEC });
  return { token, expires };
}

function generateBase32Secret() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  let secret = "";
  for (const byte of bytes) secret += alphabet[byte % 32];
  return secret;
}

function buildOtpAuthUrl(user, secret) {
  const label = encodeURIComponent(`The Bridge:${user}`);
  const issuer = encodeURIComponent("The Bridge");
  return `otpauth://totp/${label}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;
}

function qrCodeUrl(data) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(data)}`;
}

function normalizeTotp(code) {
  const digits = String(code || "").replace(/\D/g, "");
  return digits.length === 6 ? digits : null;
}

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt);
  return { salt: bytesToB64(salt), hash: bytesToB64(hash) };
}

async function verifyPassword(password, stored) {
  const salt = b64ToBytes(stored.salt);
  const hash = await pbkdf2(password, salt);
  return bytesToB64(hash) === stored.hash;
}

async function pbkdf2(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  return new Uint8Array(bits);
}

function base32Decode(encoded) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const cleaned = encoded.toUpperCase().replace(/=+$/, "").replace(/\s/g, "");
  let bits = "";
  for (const char of cleaned) {
    const val = alphabet.indexOf(char);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, "0");
  }
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  }
  return bytes;
}

async function totpAt(secretBase32, counter) {
  const key = base32Decode(secretBase32);
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setUint32(4, counter, false);
  const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, buffer));
  const offset = sig[sig.length - 1] & 0x0f;
  const bin =
    ((sig[offset] & 0x7f) << 24) |
    ((sig[offset + 1] & 0xff) << 16) |
    ((sig[offset + 2] & 0xff) << 8) |
    (sig[offset + 3] & 0xff);
  return String(bin % 1000000).padStart(6, "0");
}

async function verifyTotp(secretBase32, code) {
  const step = Math.floor(Date.now() / 1000 / 30);
  for (let offset = -1; offset <= 1; offset++) {
    if ((await totpAt(secretBase32, step + offset)) === code) return true;
  }
  return false;
}

function bytesToB64(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

function b64ToBytes(b64) {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
function cors(extra = {}) {
  return { "access-control-allow-origin": "*", "access-control-allow-headers": "*", ...extra };
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: cors({ "content-type": "application/json" }) });
}
