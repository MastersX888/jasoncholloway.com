import { DurableObject } from "cloudflare:workers";

const ROOM = "jason-tiffany";
const MAX_TEXT = 2000;
const HISTORY_LIMIT = 100;

export class BridgeLiveChat extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          user TEXT NOT NULL,
          text TEXT NOT NULL,
          ts INTEGER NOT NULL
        )
      `);
      ctx.storage.sql.exec(`
        CREATE INDEX IF NOT EXISTS idx_messages_ts ON messages(ts)
      `);
    });
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/history") {
      return json({ ok: true, messages: this.getRecentMessages(HISTORY_LIMIT) });
    }

    if (request.headers.get("Upgrade") !== "websocket") {
      return json({ ok: false, error: "expected websocket" }, 426);
    }

    const user = request.headers.get("X-Bridge-User");
    if (!user) return json({ ok: false, error: "unauthorized" }, 401);

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server);
    server.serializeAttachment({ user });

    server.send(
      JSON.stringify({
        type: "init",
        messages: this.getRecentMessages(HISTORY_LIMIT),
        online: this.getOnlineUsers(),
      }),
    );
    this.broadcast({ type: "presence", online: this.getOnlineUsers() }, server);

    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, message) {
    const attachment = ws.deserializeAttachment();
    if (!attachment?.user) return;

    let data;
    try {
      data = JSON.parse(message);
    } catch {
      return;
    }

    if (data.type === "msg") {
      const text = String(data.text || "").trim().slice(0, MAX_TEXT);
      if (!text) return;
      const msg = {
        id: crypto.randomUUID(),
        user: attachment.user,
        text,
        ts: Date.now(),
      };
      this.persistMessage(msg);
      this.broadcast({ type: "msg", ...msg });
      return;
    }

    if (data.type === "typing") {
      this.broadcast(
        { type: "typing", user: attachment.user, active: !!data.active },
        ws,
      );
    }
  }

  async webSocketClose() {
    this.broadcast({ type: "presence", online: this.getOnlineUsers() });
  }

  persistMessage(msg) {
    this.ctx.storage.sql.exec(
      "INSERT INTO messages (id, user, text, ts) VALUES (?, ?, ?, ?)",
      msg.id,
      msg.user,
      msg.text,
      msg.ts,
    );
  }

  getRecentMessages(limit) {
    const rows = this.ctx.storage.sql
      .exec(
        "SELECT id, user, text, ts FROM messages ORDER BY ts DESC LIMIT ?",
        limit,
      )
      .toArray();
    return rows.reverse();
  }

  getOnlineUsers() {
    const users = new Set();
    for (const ws of this.ctx.getWebSockets()) {
      const attachment = ws.deserializeAttachment();
      if (attachment?.user) users.add(attachment.user);
    }
    return [...users];
  }

  broadcast(payload, except = null) {
    const raw = JSON.stringify(payload);
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === except) continue;
      try {
        ws.send(raw);
      } catch {
        /* closed socket */
      }
    }
  }
}

export function liveChatStub(env) {
  const id = env.LIVE_CHAT.idFromName(ROOM);
  return env.LIVE_CHAT.get(id);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json" },
  });
}
