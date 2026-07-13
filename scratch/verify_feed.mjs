import fs from "fs";

const lines = fs.readFileSync("public/feeds/google-shopping.csv", "utf8").split("\n");
const ids = [
  "hawkes-pb", "hawkes-hc", "mx1-pb", "mx1-hc", "mx2-pb", "mx2-hc",
  "mx3-pb", "mx3-hc", "mx-omnibus-pb", "mx-omnibus-hc",
];

for (const line of lines) {
  const id = line.split(",")[0];
  if (!ids.includes(id)) continue;
  // price is column 7 (index 6) — find ",XX.XX USD," pattern after link column
  const m = line.match(/,(\d+\.\d{2} USD),/);
  console.log(id, m ? m[1] : "NOT FOUND");
}
