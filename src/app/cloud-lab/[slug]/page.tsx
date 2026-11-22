import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/Mdx";
import { PageHead } from "@/components/PageHead";
import { StackTags } from "@/components/ProjectCard";
import { LabProgress, LabStatus } from "@/components/LabParts";
import { ExternalIcon } from "@/components/Icons";
import { getLab, getLabs, labSectionStatus } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLabs().map((l) => ({ slug: l.meta.slug }));
}

export async function generateMetadata({ params }: Props) {
  const l = getLab((await params).slug);
  if (!l) return {};
  return pageMeta({ title: `${l.meta.title} (Azure Cloud Lab)`, description: l.meta.objective, path: `/cloud-lab/${l.meta.slug}`, type: "article" });
}

export default async function LabPage({ params }: Props) {
  const lab = getLab((await params).slug);
  if (!lab) notFound();
  const m = lab.meta;
  const sections = labSectionStatus(lab.body);
  const hasBody = lab.body.trim().length > 0;

  return (
    <>
      <PageHead crumbs={[{ label: "Azure Cloud Lab", href: "/cloud-lab" }, { label: m.title }]} eyebrow="Azure Cloud Lab" title={m.title} lede={m.objective}>
        <div className="btn-row" style={{ marginTop: 22, alignItems: "center" }}>
          <LabStatus status={m.status} completedAt={m.completedAt} />
          {m.github ? (
            <a className="btn btn-primary" href={m.github} rel="noopener noreferrer">GitHub repository <ExternalIcon /></a>
          ) : (
            <span className="label">Repository not yet published</span>
          )}
        </div>
      </PageHead>

      {m.status !== "completed" && (
        <div className="wrap" style={{ marginTop: 32 }}>
          <p className="notice">
            {m.status === "planned"
              ? "This lab is planned. Nothing on this page is presented as completed work yet; the sections below show what the write-up will cover."
              : "This lab is in progress. Only the sections marked as documented are written up so far."}
          </p>
        </div>
      )}

      <section className="section">
        <div className="wrap layout-aside">
          <article className="stack" style={{ gap: 36 }}>
            <div className="lab-overview">
              <div>
                <p className="pc-label">Architecture</p>
                <p>{m.architecture ?? "To be documented when the lab is written up."}</p>
              </div>
              <div>
                <p className="pc-label">Azure services and technologies</p>
                <StackTags tools={m.services} max={20} />
              </div>
              {m.examAreas.length > 0 && (
                <div>
                  <p className="pc-label">AZ-104 skill areas practised</p>
                  <ul className="chips">{m.examAreas.map((a) => <li key={a} className="chip">{a}</li>)}</ul>
                </div>
              )}
              {m.skills.length > 0 && (
                <div>
                  <p className="pc-label">Skills</p>
                  <ul className="chips">{m.skills.map((a) => <li key={a} className="chip">{a}</li>)}</ul>
                </div>
              )}
            </div>

            {m.architectureDiagram && (
              <figure className="lab-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.architectureDiagram.src} alt={m.architectureDiagram.alt} loading="lazy" />
                <figcaption>{m.architectureDiagram.caption}</figcaption>
              </figure>
            )}

            {hasBody && <Mdx source={lab.body} />}

            {m.evidence.length > 0 && (
              <div>
                <h2 style={{ marginBottom: 16 }}>Screenshots and validation evidence</h2>
                <div className="lab-gallery">
                  {m.evidence.map((e) => (
                    <figure key={e.src} className="lab-figure">
                      <a href={e.src}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={e.src} alt={e.alt} loading="lazy" />
                      </a>
                      <figcaption>{e.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {m.cost && (
              <div className="lab-cost">
                <p className="pc-label">Cleanup and cost</p>
                <p>{m.cost}</p>
              </div>
            )}

            <p className="label">Identifiers such as tenant IDs, subscription IDs, public IP addresses and resource IDs are removed from all screenshots and text.</p>
          </article>

          <aside className="toc stack" aria-label="Lab details">
            <LabProgress sections={sections} />
            <dl className="kv">
              {m.startedAt && <><dt>Started</dt><dd>{m.startedAt}</dd></>}
              {m.completedAt && <><dt>Completed</dt><dd>{m.completedAt}</dd></>}
              <dt>Evidence</dt><dd>{m.evidence.length ? `${m.evidence.length} screenshots` : "Not yet published"}</dd>
            </dl>
            <Link className="arrow-link" href="/cloud-lab">All labs</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
