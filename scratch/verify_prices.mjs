const base = process.argv[2] || "https://946810cf.jasoncholloway.pages.dev";

const checks = [
  ["/books/masters-x/the-grimoire/", ["buy-direct-price", "16.99", "18.99", "save $2.00"]],
  ["/books/masters-x/the-inheritance-of-frequency/", ["buy-direct-price", "16.99", "18.99"]],
  ["/books/masters-x/the-kingdom/", ["buy-direct-price", "16.99", "18.99"]],
  ["/books/masters-x/omnibus/", ["32.99", "44.99", "omnibus-savings-note", '"price": "49.99"', '"price": "36.99"']],
  ["/books/hawkes-monograph/", ["12.99", "14.99", "29.99", "reg. $14.99", '"price": "14.99"', '"price": "29.99"']],
  ["/books/", ["from $16.99 direct", "save up to $17.98"]],
];

for (const [path, needles] of checks) {
  const b = await fetch(base + path).then((r) => r.text());
  const results = needles.map((n) => `${n}:${b.includes(n)}`);
  console.log(path);
  console.log("  " + results.join(" | "));
}
