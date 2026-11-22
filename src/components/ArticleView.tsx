import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { BriefPanel } from "./BriefPanel";
import { Mdx } from "./Mdx";
import { PageHead } from "./PageHead";
import { PolicySeal } from "./PolicySeal";
import { site } from "@/config/site";
import type { Article } from "@/lib/schemas";
import { getToc } from "@/lib/toc";
import { tagLabel } from "@/lib/content";

export function ArticleView({ meta, body, readingMinutes, section }: { meta: Article; body: string; readingMinutes: number; section: { label: string; href: string } }) {
  const toc = getToc(body);
  const isDraft = meta.visibility === "draft";
  return (
    <>
      {!isDraft && (
        <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: meta.title, description: meta.description, datePublished: meta.publishedAt, dateModified: meta.updatedAt ?? meta.publishedAt, author: { "@type": "Person", name: site.name } }} />
      )}
      <PageHead crumbs={[section, { label: meta.title }]} eyebrow={section.label} title={meta.title} lede={meta.description}>
        {meta.brief ? (
          <div className="page-seal">
            <PolicySeal number={meta.brief.number} date={meta.publishedAt?.slice(0, 7).split("-").reverse().join(" / ")} size={112} />
            <p className="label">
              By {site.name}
              {meta.publishedAt ? ` / ${meta.publishedAt}` : ""}
              {meta.updatedAt ? ` / Updated ${meta.updatedAt}` : ""} / {readingMinutes} min read
            </p>
          </div>
        ) : (
          <p className="label" style={{ marginTop: 20 }}>
            By {site.name}
            {meta.publishedAt ? ` / ${meta.publishedAt}` : ""}
            {meta.updatedAt ? ` / Updated ${meta.updatedAt}` : ""} / {readingMinutes} min read
          </p>
        )}
      </PageHead>
      <section className="section">
        <div className="wrap layout-aside">
          <article className="stack">
            {meta.brief && <BriefPanel brief={meta.brief} />}
            <Mdx source={body} />
            {meta.sources.length > 0 && (
              <div className="measure" style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--rule)" }}>
                <h2 style={{ fontSize: "1.2rem" }}>Further reading</h2>
                <ol style={{ paddingLeft: "1.2em", marginTop: 12 }}>
                  {meta.sources.map((s) => (
                    <li key={s.title} style={{ marginTop: 6 }}>{s.url ? <a className="text-link" href={s.url} rel="noopener noreferrer">{s.title}</a> : s.title}</li>
                  ))}
                </ol>
              </div>
            )}
          </article>
          <aside className="toc stack">
            {toc.length > 2 && (
              <nav aria-label="Contents">
                <p className="label">On this page</p>
                <ol>{toc.map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>)}</ol>
              </nav>
            )}
            {meta.tags.length > 0 && (
              <div>
                <p className="label">Tags</p>
                <ul className="tag-cloud" style={{ marginTop: 8 }}>
                  {meta.tags.map((t) => <li key={t}>{section.href === "/insights" || section.href === "/policy" ? <Link className="tag-pill" href={`/insights/tag/${t}`}>{tagLabel(t)}</Link> : <span className="tag-pill">{tagLabel(t)}</span>}</li>)}
                </ul>
              </div>
            )}
            {meta.relatedProjects.length > 0 && (
              <div>
                <p className="label">Related research</p>
                <p style={{ marginTop: 6 }}><Link className="text-link" href={`/projects/${meta.relatedProjects[0]}`}>PhD smart-home security research</Link></p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
