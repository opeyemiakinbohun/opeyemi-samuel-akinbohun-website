/**
 * Crawls a running copy of the site and fails if any internal link returns an
 * error. Usage: node scripts/check-links.mjs http://localhost:3000
 */
const base = process.argv[2] ?? "http://localhost:3000";
const seen = new Set();
const broken = [];
const queue = ["/"];

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await fetch(base + path, { redirect: "manual" });
  if (res.status >= 400) {
    broken.push(`${res.status} ${path}`);
    continue;
  }
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) continue;
  const html = await res.text();
  for (const m of html.matchAll(/href="([^"#]*)(#[^"]*)?"/g)) {
    const href = m[1];
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/_next")) continue;
    if (!seen.has(href)) queue.push(href);
  }
}

console.log(`Checked ${seen.size} internal URLs.`);
if (broken.length) {
  console.error("Broken links:\n" + broken.join("\n"));
  process.exit(1);
}
console.log("No broken internal links.");
