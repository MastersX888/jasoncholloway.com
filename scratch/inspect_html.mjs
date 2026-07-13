const base = process.argv[2] || "https://946810cf.jasoncholloway.pages.dev";

const pages = [
  "/books/masters-x/the-grimoire/",
  "/books/",
  "/books/masters-x/omnibus/",
  "/books/hawkes-monograph/",
];

for (const path of pages) {
  const b = await fetch(base + path).then((r) => r.text());
  console.log("\n=== " + path + " ===");
  if (path.includes("grimoire")) {
    const i = b.indexOf("buy-direct-badge");
    console.log("badge:", b.slice(i, i + 150));
  }
  if (path === "/books/") {
    const i = b.indexOf("direct");
    console.log("catalog:", b.slice(Math.max(0, i - 100), i + 60));
  }
  if (path.includes("omnibus")) {
    const prices = [...b.matchAll(/"price":"([^"]+)"/g)].map((m) => m[1]);
    console.log("jsonld prices:", prices);
  }
  if (path.includes("hawkes")) {
    const prices = [...b.matchAll(/"price":"([^"]+)"/g)].map((m) => m[1]);
    console.log("jsonld prices:", prices);
  }
}
