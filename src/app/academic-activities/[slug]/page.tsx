import { notFound } from "next/navigation";
import { ExternalIcon } from "@/components/Icons";
import { Mdx } from "@/components/Mdx";
import { Logo } from "@/components/Logo";
import { isWide } from "@/config/brands";
import { PageHead } from "@/components/PageHead";
import { getActivities, getActivity } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getActivities().map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({ params }: Props) {
  const a = getActivity((await params).slug);
  if (!a) return {};
  return pageMeta({ title: a.meta.title, description: a.meta.summary, path: `/academic-activities/${a.meta.slug}` });
}

export default async function ActivityPage({ params }: Props) {
  const a = getActivity((await params).slug);
  if (!a) notFound();
  const m = a.meta;
  return (
    <>
      <PageHead crumbs={[{ label: "Academic activities", href: "/academic-activities" }, { label: m.title }]} eyebrow={m.period} title={m.title}>
        <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
          {m.logos.map((l) => <span key={l} className="logo-badge"><span className={`logo-badge-mark${isWide(l) ? " wide" : ""}`}><Logo id={l} size={24} decorative /></span><span className="logo-badge-title">{l === "spriteplus" ? "SPRITE+ (sponsor)" : l === "strathclyde" ? "University of Strathclyde (host)" : l === "scientificreports" ? "Scientific Reports (Springer Nature)" : l === "iet" ? "IET Blockchain" : "University of Huddersfield"}</span></span>)}
        </div>
        <dl className="kv" style={{ marginTop: 28 }}>
          <dt>Role</dt><dd>{m.role}</dd>
          <dt>Host</dt><dd>{m.host}</dd>
          {m.location && (<><dt>Location</dt><dd>{m.location}</dd></>)}
          {m.evidenceUrl && (<><dt>Evidence</dt><dd><a className="text-link" href={m.evidenceUrl} rel="noopener noreferrer">{m.evidenceLabel} <ExternalIcon /></a></dd></>)}
        </dl>
      </PageHead>
      <section className="section" style={{ borderBottom: 0 }}>
        <div className="wrap"><Mdx source={a.body} /></div>
      </section>
    </>
  );
}
