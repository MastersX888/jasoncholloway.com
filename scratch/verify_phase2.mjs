const base = process.argv[2] || "https://8aae222e.jasoncholloway.pages.dev";
const checks = [
  ["/books/hawkes-monograph/", ["register-criticism", "cover-artifact", "criticism-meta"]],
  ["/books/", ["omnibus-flagship-card", "Collected Edition"]],
  ["/books/masters-x/the-grimoire/", ["cover-artifact-spine"]],
];
for (const [path, needles] of checks) {
  const h = await fetch(base + path).then((r) => r.text());
  console.log(path, needles.map((n) => `${n}:${h.includes(n)}`).join(" "));
}
