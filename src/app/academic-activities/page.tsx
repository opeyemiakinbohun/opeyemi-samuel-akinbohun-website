import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { getActivities, getCredentials } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { StatusTag } from "@/components/StatusTag";
import { LogoMark } from "@/components/Logo";

export const metadata = pageMeta({
  title: "Academic activities",
  description: "University teaching, master's-level cryptography teaching, peer review for Scientific Reports and IET Blockchain, research representation and the Strathclyde Cybercrime Summer School.",
  path: "/academic-activities",
});

const kindLabel: Record<string, string> = {
  "summer-school": "Summer school",
  teaching: "Teaching",
  reviewing: "Peer review",
  representation: "Representation",
  conference: "Conference",
  workshop: "Workshop",
};

export default function ActivitiesPage() {
  const activities = getActivities();
  const credentials = getCredentials();
  return (
    <>
      <PageHead
        crumbs={[{ label: "Academic activities" }]}
        eyebrow="Academic"
        title="Teaching, review and academic service"
        lede="What I do alongside my PhD. Attendance, teaching and reviewing are listed as exactly what they were: attending is not presenting, and an accepted review invitation is not a completed review."
      />
      <section className="section">
        <div className="wrap">
          <ul className="row-list">
            {activities.map((a) => (
              <li key={a.meta.slug}>
                <Link href={`/academic-activities/${a.meta.slug}`} className="pub-row">
                  <LogoMark id={a.meta.logos[0] ?? "huddersfield"} size={22} />
                  <span>
                    <span className="label" style={{ display: "block", marginBottom: 6 }}>{kindLabel[a.meta.kind]}</span>
                    <span className="pub-title">{a.meta.title}</span>
                    <span className="muted" style={{ display: "block", marginTop: 6 }}>{a.meta.summary}</span>
                    <span className="read-more" style={{ marginTop: 10 }}>Read more</span>
                  </span>
                  <span>
                    <span style={{ display: "block" }}>{a.meta.host}</span>
                    <span className="label">{a.meta.role}</span>
                  </span>
                  <span className="label">{a.meta.period}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section" style={{ borderBottom: 0 }}>
        <div className="wrap">
          <h2 style={{ marginBottom: 20 }}>Professional development</h2>
          <ul className="chips" style={{ gap: 10 }}>
            {credentials.map((c) => <li key={c.name} style={{ display: "flex", alignItems: "center", gap: 10 }}><LogoMark id={c.logo} size={22} /><StatusTag status={c.status} label={`${c.issuer} ${c.name}: ${c.statusLabel}`} /></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
