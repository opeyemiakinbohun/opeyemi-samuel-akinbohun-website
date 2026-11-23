"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { SearchIcon } from "./Icons";

type Answer = { question: string; keywords: string; answer: string; href: string; hrefLabel: string };

/** Plain search over the site's own answer records. No AI, no guessing. */
export function QuickAnswers({ answers }: { answers: Answer[] }) {
  const id = useId();
  const [q, setQ] = useState("");
  const [pick, setPick] = useState(0);
  const hits = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return answers.filter((a) => terms.every((t) => `${a.question} ${a.keywords}`.toLowerCase().includes(t)));
  }, [q, answers]);
  const current = hits[Math.min(pick, Math.max(0, hits.length - 1))];

  return (
    <div className="qa">
      <div className="qa-search">
        <SearchIcon />
        <label htmlFor={id} className="sr-only">Search questions from recruiters, hiring managers and employers</label>
        <input id={id} type="search" value={q} placeholder="Try: start date, relocate, Python, forensics, teaching" autoComplete="off"
          onChange={(e) => { setQ(e.target.value); setPick(0); }} />
      </div>
      <ul className="qa-list" aria-label="Questions">
        {hits.map((a, i) => (
          <li key={a.question}>
            <button type="button" aria-current={a === current} onClick={() => setPick(i)}>{a.question}</button>
          </li>
        ))}
        {hits.length === 0 && <li className="muted" style={{ padding: 12 }}>No match. Try &ldquo;teaching&rdquo;, &ldquo;data&rdquo; or &ldquo;contact&rdquo;.</li>}
      </ul>
      <div className="qa-answer" aria-live="polite">
        {current ? (
          <>
            <p className="label">Answer</p>
            <p style={{ marginTop: 8, fontSize: "1.05rem" }}>{current.answer}</p>
            <p className="label" style={{ marginTop: 16 }}>Source on this site</p>
            <Link className="arrow-link" href={current.href}>{current.hrefLabel}</Link>
          </>
        ) : (
          <p className="muted">Choose a question.</p>
        )}
      </div>
    </div>
  );
}
