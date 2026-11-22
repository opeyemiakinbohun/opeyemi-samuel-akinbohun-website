import Link from "next/link";
import data from "../../content/data/why-hire-me.json";

/** Recruiter-facing summary of strengths. Every point links to evidence elsewhere on the site. */
export function WhyHireMe() {
  return (
    <section className="section why" id="why-hire-me" aria-labelledby="why-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">For recruiters, hiring managers and employers</p>
            <h2 id="why-title" style={{ marginTop: 12 }}>{data.title}</h2>
            <p>{data.lede}</p>
          </div>
        </div>
        <ol className="why-grid">
          {data.reasons.map((r, i) => (
            <li key={r.title} className="why-card">
              <span className="why-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <Link className="arrow-link why-link" href={r.href}>{r.evidence}</Link>
            </li>
          ))}
        </ol>
        <h3 className="why-sub">{data.qualitiesTitle}</h3>
        <ul className="why-traits">
          {data.qualities.map((q) => (
            <li key={q.title}>
              <strong>{q.title}</strong>
              <span>{q.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
