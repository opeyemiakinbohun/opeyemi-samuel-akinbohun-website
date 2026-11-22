import Link from "next/link";
import { Logo } from "./Logo";
import { stackLogos } from "@/config/stack-logos";

type Result = { value: string; label: string };
type Meta = { slug: string; title: string; kind: string; period: string; summary: string; tools: string[]; results: Result[] };

/** Stack tags with brand logos where one exists. */
export function StackTags({ tools, max = 8 }: { tools: string[]; max?: number }) {
  const shown = tools.slice(0, max);
  const more = tools.length - shown.length;
  return (
    <ul className="stack-tags" aria-label="Tech stack">
      {shown.map((t) => (
        <li key={t}>
          {stackLogos[t] && <Logo id={stackLogos[t]} size={13} colour decorative />}
          {t}
        </li>
      ))}
      {more > 0 && <li className="stack-more">+{more} more</li>}
    </ul>
  );
}

/** Compact list of documented results. */
export function ResultList({ results, max = 3 }: { results: Result[]; max?: number }) {
  if (!results.length) return null;
  return (
    <ul className="result-list" aria-label="Results">
      {results.slice(0, max).map((r) => (
        <li key={r.value + r.label}>
          <strong>{r.value}</strong>
          <span>{r.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Full project card: what it is, the stack used, results gained, and a Read more link to the case study. */
export function ProjectCard({ meta, maxTools = 8 }: { meta: Meta; maxTools?: number }) {
  return (
    <Link href={`/projects/${meta.slug}`} className="r-card r-card-sm project-card">
      <div className="pc-top">
        <span className="pc-kind">{meta.kind}</span>
        <span className="pc-period">{meta.period}</span>
      </div>
      <h3 className="pc-title">{meta.title}</h3>
      <p className="pc-summary">{meta.summary}</p>
      <div className="pc-block">
        <p className="pc-label">Stack</p>
        <StackTags tools={meta.tools} max={maxTools} />
      </div>
      {meta.results.length > 0 && (
        <div className="pc-block">
          <p className="pc-label">Results</p>
          <ResultList results={meta.results} />
        </div>
      )}
      <span className="read-more">Read more</span>
    </Link>
  );
}
