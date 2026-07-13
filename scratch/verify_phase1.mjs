const checks = [
  ["https://060a1e8b.jasoncholloway.pages.dev/", [
    "The Masters X Trilogy · Seventh City Press",
    "hero-artifact-strip",
    "Voynich MS · Folio 9",
    "111.2 Hz",
    "SubTropolis Grid",
  ]],
  ["https://1156d9e1.seventhcitypress.pages.dev/", [
    'data-register="imprint"',
    "--bg:           #FAFAF8",
    "Communications Desk",
  ]],
];

for (const [url, needles] of checks) {
  const html = await fetch(url).then((r) => r.text());
  console.log("\n" + url);
  for (const n of needles) {
    console.log("  " + n + ": " + html.includes(n));
  }
  // imprint: check no cyan glow in hero-bg
  if (url.includes("seventhcitypress")) {
    const css = await fetch(url.replace(/\/$/, "") + "/_next/static/css/").catch(() => null);
    console.log("  bg is light (no #08080F body): " + !html.includes('background:var(--bg);color:var(--text);font-family:var(--font-body)'));
  }
}
