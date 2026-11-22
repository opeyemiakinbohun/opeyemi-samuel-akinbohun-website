import Link from "next/link";
import data from "../../content/data/capabilities.json";
import { StackTags } from "./ProjectCard";

/** Hands-on skills, each tied to where it was used and a link to the evidence. */
export function Capabilities({ compact = false }: { compact?: boolean }) {
  return (
    <section className="r-section" id="hands-on" aria-labelledby="hands-on-title">
      <div className="wrap">
        <h2 id="hands-on-title" className="r-h2">
          {data.title} <span className="r-dim">{data.dim}</span>
        </h2>
        <p className="r-sub" style={{ fontSize: "1.05rem" }}>{data.lede}</p>
        <ul className="cap-list">
          {data.items.map((c) => (
            <li key={c.skill}>
              <Link href={c.href} className="cap-row">
                <div className="cap-head">
                  <strong>{c.skill}</strong>
                  <span className="cap-context">{c.context}</span>
                </div>
                <p className="cap-what">{c.what}</p>
                {!compact && <StackTags tools={c.tools} max={5} />}
                <span className="read-more">Read more</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
