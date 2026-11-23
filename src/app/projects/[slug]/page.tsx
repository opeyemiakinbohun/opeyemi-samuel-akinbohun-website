import { notFound } from "next/navigation";
import { Mdx } from "@/components/Mdx";
import { PageHead } from "@/components/PageHead";
import { Results } from "@/components/Results";
import { Logo } from "@/components/Logo";
import { brand } from "@/config/brands";
import { ExternalIcon } from "@/components/Icons";
import { getProject, getProjects } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { getToc } from "@/lib/toc";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) return {};
  return pageMeta({ title: p.meta.title, description: p.meta.summary, path: `/projects/${p.meta.slug}`, type: "article" });
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const m = project.meta;
  const toc = getToc(project.body);

  return (
    <>
      <PageHead crumbs={[{ label: "Projects", href: "/projects" }, { label: m.title }]} eyebrow={m.kind} title={m.title} lede={m.summary}>
        <dl className="kv" style={{ marginTop: 28 }}>
          <dt>Period</dt><dd>{m.period}</dd>
          <dt>Status</dt><dd>{m.status}</dd>
          {m.liveUrl && (<><dt>Live</dt><dd><a className="text-link" href={m.liveUrl} rel="noopener noreferrer">{m.liveUrl.replace("https://", "").replace(/\/$/, "")} <ExternalIcon /></a></dd></>)}
          <dt>Code</dt><dd>{m.repositoryUrl ? <a className="text-link" href={m.repositoryUrl}>Repository</a> : "Not publicly available"}</dd>
        </dl>
      </PageHead>

      {m.results.length > 0 && (
        <div className="wrap" style={{ marginTop: 40 }}><Results items={m.results} /></div>
      )}

      <section className="section">
        <div className="wrap layout-aside">
          <article>
            <Mdx source={project.body} />
          </article>
          <aside className="toc stack" aria-label="On this page">
            {toc.length > 2 && (
              <nav aria-label="Contents">
                <p className="label">On this page</p>
                <ol>{toc.map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>)}</ol>
              </nav>
            )}
            <div>
              <p className="label">Skills</p>
              <ul className="chips" style={{ marginTop: 8 }}>{m.skills.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
            </div>
            {m.logos.length > 0 && (
              <div>
                <p className="label">Technology</p>
                <ul className="tool-row" style={{ marginTop: 8 }}>{m.logos.map((l) => <li key={l} className="tool"><Logo id={l} size={16} decorative />{brand(l)?.name}</li>)}</ul>
              </div>
            )}
            <div>
              <p className="label">Tools</p>
              <ul className="chips" style={{ marginTop: 8 }}>{m.tools.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
            </div>
          </aside>
        </div>
      </section>

    </>
  );
}
