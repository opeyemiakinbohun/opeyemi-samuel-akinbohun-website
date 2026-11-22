import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { LogoBadge } from "@/components/Logo";
import { StackTags } from "@/components/ProjectCard";
import { LabProgress, LabStatus } from "@/components/LabParts";
import { site } from "@/config/site";
import { LAB_SECTIONS, getLabs, labSectionStatus } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Azure Cloud Lab",
  description: "Hands-on Microsoft Azure administration and security labs, documented with architecture, configuration, evidence, troubleshooting and cleanup as I prepare for AZ-104.",
  path: "/cloud-lab",
});

const GROUPS = [
  { status: "completed", title: "Completed and documented", empty: "No completed write-ups are published yet. Labs appear here once the full write-up and its evidence are online." },
  { status: "in-progress", title: "In progress", empty: "No labs are currently being written up." },
  { status: "planned", title: "Planned", empty: "No further labs are planned at the moment." },
] as const;

export default function CloudLabPage() {
  const labs = getLabs();
  return (
    <>
      <PageHead
        crumbs={[{ label: "Azure Cloud Lab" }]}
        eyebrow="Cloud administration and security"
        title="Azure Cloud Lab"
        lede={`Practical Microsoft Azure work as I prepare for the AZ-104 Azure Administrator exam. I have completed hands-on Azure exercises and I am writing each one up here with its architecture, configuration, evidence and lessons. Exam status: ${site.personal.az104}. I am not yet certified.`}
      />

      <section className="section-tight">
        <div className="wrap logo-strip">
          <LogoBadge id="azure" title="Microsoft Azure" status="Hands-on labs" />
          <LogoBadge id="azure" title="AZ-104 Azure Administrator" status="Preparing for exam (2027). Not certified" />
        </div>
      </section>

      <section className="section">
        <div className="wrap r-split">
          <div className="r-split-left">
            <h2 className="r-h2">How each lab is documented. <span className="r-dim">The same eight sections every time.</span></h2>
            <p className="r-sub" style={{ fontSize: "1rem" }}>
              A lab is marked completed only when I have done it myself and published the write-up with evidence. Each lab page shows how many
              sections are documented. Tenant IDs, subscription IDs, credentials, public IP addresses and resource IDs are always removed.
            </p>
          </div>
          <ol className="lab-sections">
            {LAB_SECTIONS.map((t, i) => (
              <li key={t}><span className="r-mono r-dim">{String(i + 1).padStart(2, "0")}</span>{t}</li>
            ))}
          </ol>
        </div>
      </section>

      {GROUPS.map((g) => {
        const items = labs.filter((l) => l.meta.status === g.status);
        return (
          <section key={g.status} className="section" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <h2 className="r-h2" style={{ marginBottom: 24 }}>{g.title} <span className="r-dim">({items.length})</span></h2>
              {items.length === 0 ? (
                <p className="notice measure">{g.empty}</p>
              ) : (
                <div className="pc-grid">
                  {items.map((l) => (
                    <Link key={l.meta.slug} href={`/cloud-lab/${l.meta.slug}`} className="r-card r-card-sm project-card">
                      <div className="pc-top">
                        <LabStatus status={l.meta.status} completedAt={l.meta.completedAt} />
                        <span className="pc-period">{l.meta.github ? "GitHub repository" : "Repository not yet published"}</span>
                      </div>
                      <h3 className="pc-title">{l.meta.title}</h3>
                      <p className="pc-summary">{l.meta.objective}</p>
                      <div className="pc-block">
                        <p className="pc-label">Azure services</p>
                        <StackTags tools={l.meta.services} />
                      </div>
                      <LabProgress sections={labSectionStatus(l.body)} compact />
                      {l.meta.evidence.length > 0 && <p className="pc-label" style={{ textTransform: "none", letterSpacing: 0 }}>{l.meta.evidence.length} screenshots of evidence</p>}
                      <span className="read-more">Read more</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
