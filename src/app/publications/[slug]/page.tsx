import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Mdx } from "@/components/Mdx";
import { LogoMark } from "@/components/Logo";
import { PageHead } from "@/components/PageHead";
import { StatusTag } from "@/components/StatusTag";
import { getDatasets, getProject, getPublication, getPublications } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublications().map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({ params }: Props) {
  const p = getPublication((await params).slug);
  if (!p) return {};
  return pageMeta({ title: p.meta.title, description: `${p.meta.statusLabel} at ${p.meta.venue}. ${p.meta.summary}`, path: `/publications/${p.meta.slug}`, type: "article" });
}

export default async function PublicationPage({ params }: Props) {
  const pub = getPublication((await params).slug);
  if (!pub) notFound();
  const m = pub.meta;
  const projects = m.relatedProjects.map((s) => getProject(s)).filter((p) => p !== undefined);
  const datasets = getDatasets().filter((d) => m.relatedDatasets.includes(d.slug));
  const all = getPublications();
  const i = all.findIndex((p) => p.meta.slug === m.slug);
  const next = all[(i + 1) % all.length];

  return (
    <>
      {m.status === "published" && (
        <JsonLd data={{ "@context": "https://schema.org", "@type": "ScholarlyArticle", headline: m.title, author: m.authors.map((a) => ({ "@type": "Person", name: a })), isPartOf: m.venue, sameAs: m.doi ? `https://doi.org/${m.doi}` : undefined }} />
      )}
      <PageHead crumbs={[{ label: "Publications", href: "/publications" }, { label: m.venueShort }]} eyebrow={m.type === "journal" ? "Journal manuscript" : "Conference manuscript"} title={m.title}>
        <dl className="kv" style={{ marginTop: 28 }}>
          <dt>Venue</dt><dd style={{ display: "flex", alignItems: "center", gap: 10 }}><LogoMark id={m.publisherLogo} size={22} />{m.venue}{m.publisher ? ` (${m.publisher})` : ""}</dd>
          <dt>Status</dt><dd><StatusTag status={m.status} label={m.statusLabel} /> <span className="label" style={{ marginLeft: 8 }}>as of {m.statusAsOf}</span></dd>
          <dt>Authors</dt><dd>{m.authors.length ? m.authors.join(", ") : "Full author list added on publication."}</dd>
          <dt>DOI</dt><dd>{m.doi ?? "Not yet assigned"}</dd>
          <dt>Topics</dt><dd><ul className="chips">{m.topics.map((t) => <li key={t} className="chip">{t}</li>)}</ul></dd>
        </dl>
      </PageHead>
      <section className="section">
        <div className="wrap layout-aside">
          <article className="stack">
            <p className="lede">{m.summary}</p>
            <Mdx source={pub.body} />
          </article>
          <aside className="toc stack">
            {projects.length > 0 && (
              <div>
                <p className="label">Related project</p>
                {projects.map((p) => <p key={p.meta.slug} style={{ marginTop: 6 }}><Link className="text-link" href={`/projects/${p.meta.slug}`}>{p.meta.title}</Link></p>)}
              </div>
            )}
            {datasets.length > 0 && (
              <div>
                <p className="label">Data</p>
                {datasets.map((d) => (
                  <div key={d.slug} style={{ marginTop: 6 }}>
                    <p>{d.title}</p>
                    <StatusTag status={d.access === "public" ? "published" : "planned"} label={d.accessLabel} />
                  </div>
                ))}
              </div>
            )}
            <div>
              <p className="label">Next manuscript</p>
              <p style={{ marginTop: 6 }}><Link className="text-link" href={`/publications/${next.meta.slug}`}>{next.meta.title}</Link></p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
