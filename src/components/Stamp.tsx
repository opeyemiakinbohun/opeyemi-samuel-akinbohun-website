import { categoryLabel } from "@/lib/content";

const TONE: Record<string, string> = {
  cryptography: "crypto",
  cybersecurity: "security",
  "digital-forensics": "security",
  "advanced-research": "research",
  "data-and-machine-learning": "research",
  policy: "policy",
};

/** A rubber-stamp style mark for article cards: category and reading time. */
export function Stamp({ category, minutes }: { category: string; minutes: number }) {
  return (
    <span className="stamp" data-tone={TONE[category] ?? "default"}>
      {categoryLabel(category)} / {minutes} min read
    </span>
  );
}
