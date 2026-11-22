import type { Article } from "@/lib/schemas";

type Brief = NonNullable<Article["brief"]>;

/** "Brief at a glance": the question, who it is for and the recommendations, before the full text. */
export function BriefPanel({ brief }: { brief: Brief }) {
  return (
    <aside className="brief-panel measure" aria-label="Brief at a glance">
      <p className="label">Brief at a glance</p>
      <dl className="brief-facts">
        <div>
          <dt>The question</dt>
          <dd>{brief.question}</dd>
        </div>
        <div>
          <dt>Written for</dt>
          <dd>{brief.audience}</dd>
        </div>
      </dl>
      <p className="brief-sub">Recommendations</p>
      <ol className="brief-recs">
        {brief.recommendations.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ol>
      <p className="brief-note">Personal analysis by a cyber security researcher. Not legal or regulatory advice, and not written on behalf of any organisation.</p>
    </aside>
  );
}
