import fs from "fs";
import path from "path";

const dirs = ["app", "seventhcitypress/app", "lib", "components"];
const exts = [".tsx", ".ts", ".css", ".json"];
const refs = new Set();
const mediaExt = /\.(png|jpg|jpeg|gif|webp|svg|mp4|pdf|ico)$/i;

function walk(d) {
  if (!fs.existsSync(d)) return;
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (exts.some((e) => f.endsWith(e))) {
      const c = fs.readFileSync(p, "utf8");
      for (const m of c.matchAll(/(?:src|href|poster)=["']([^"']+)["']/g)) {
        const v = m[1];
        if (v.startsWith("/") && mediaExt.test(v)) refs.add(v);
      }
      for (const m of c.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
        const v = m[1];
        if (v.startsWith("/") && mediaExt.test(v)) refs.add(v);
      }
      for (const m of c.matchAll(/images:\s*\[\s*\{\s*url:\s*["']https:\/\/jasoncholloway\.com([^"']+)["']/g)) {
        const v = m[1];
        if (mediaExt.test(v)) refs.add(v);
      }
    }
  }
}

dirs.forEach(walk);

const present = [];
const missing = [];

for (const r of [...refs].sort()) {
  const p = r.replace(/^\//, "");
  if (
    fs.existsSync(path.join("public", p)) ||
    fs.existsSync(path.join("seventhcitypress/public", p))
  )
    present.push(r);
  else missing.push(r);
}

console.log("PRESENT:" + present.length);
present.forEach((x) => console.log(x));
console.log("MISSING:" + missing.length);
missing.forEach((x) => console.log(x));
