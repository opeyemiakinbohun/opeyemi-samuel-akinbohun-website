/**
 * Copy gate. Fails the build if public content or source contains an em dash
 * or any phrase from the writing policy's banned list.
 */
import fs from "node:fs";
import path from "node:path";

const roots = ["content", "src"];
const banned = [
  "\u2014",
  "fast-paced digital landscape",
  "passionate about",
  "cutting-edge",
  "unlocking the power",
  "at the forefront",
  "bridging the gap",
  "seamlessly",
  "transforming the future",
  "game-changing",
  "game changing",
  "revolutionary",
  "world-class",
  "trailblazing",
  "synergy",
  "thought leader",
  "unwavering passion",
  "leverage",
  "leveraging",
  "delve",
];

const problems = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(mdx?|tsx?|json|css)$/.test(entry.name)) {
      const text = fs.readFileSync(p, "utf8");
      text.split("\n").forEach((line, i) => {
        if (line.includes("check-copy")) return;
        for (const b of banned) {
          if (line.toLowerCase().includes(b.toLowerCase())) problems.push(`${p}:${i + 1}  "${b === "\u2014" ? "em dash" : b}"`);
        }
      });
    }
  }
};
roots.forEach(walk);

if (problems.length) {
  console.error("Copy check failed:\n" + problems.join("\n"));
  process.exit(1);
}
console.log("Copy check passed: no em dashes or banned phrases.");
