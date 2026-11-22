import Link from "next/link";
import { CvButton } from "@/components/CvButton";
import { PageHead } from "@/components/PageHead";
import { QuickAnswers } from "@/components/QuickAnswers";
import { site } from "@/config/site";
import { getAnswers, getRoles } from "@/lib/content";
import { WhyHireMe } from "@/components/WhyHireMe";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Opportunities",
  description: "Open to UK industry and academic roles from January 2028, including lecturing, postdoctoral and fellowship posts, security engineering, research, applied cryptography, digital forensics, data and machine learning, software engineering, consulting and security policy.",
  path: "/opportunities",
});


export default function OpportunitiesPage() {
  const roles = getRoles();
  return (
    <>
      <PageHead
        crumbs={[{ label: "Opportunities" }]}
        eyebrow="For recruiters, hiring managers and employers"
        title="Open to UK industry and academic roles"
        lede={`I am ${site.name}, a cybersecurity PhD researcher at the University of Huddersfield. I am looking for a full-time industry role or an academic post, such as a lectureship, postdoctoral position or fellowship, starting from January 2028. I will relocate anywhere in the country.`}
      >
        <dl className="facts" style={{ marginTop: 28, maxWidth: 760 }}>
          <dt>Employment</dt><dd>Full-time; permanent industry roles, or academic posts including fixed-term postdoctoral and fellowship positions</dd>
          <dt>Target start</dt><dd>{site.availability.start}</dd>
          <dt>Location</dt><dd>Anywhere in the United Kingdom. Relocation welcome</dd>
          <dt>Work authorisation</dt><dd>{site.availability.workAuthorisation}</dd>
        </dl>
        <div className="btn-row" style={{ marginTop: 24 }}>
          <CvButton />
          <a className="btn" href={`mailto:${site.contact.email}`}>Email me</a>
          <a className="btn" href={site.contact.linkedin} rel="noopener noreferrer">Connect on LinkedIn</a>
        </div>
      </PageHead>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Roles I am open to</h2>
              <p>These are career interests, not job titles I have held. Each family shows the work that supports it.</p>
            </div>
          </div>
          <ul className="row-list">
            {roles.map((r) => (
              <li key={r.family} className="split" style={{ padding: "22px 0", gap: 20 }}>
                <div>
                  <h3>{r.family}</h3>
                  <ul className="chips" style={{ marginTop: 10 }}>{r.titles.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
                </div>
                <div className="stack" style={{ ["--stack" as string]: "8px" }}>
                  <p>{r.evidence}</p>
                  <p>{r.links.map((l, i) => <span key={l.href}>{i > 0 && " / "}<Link className="text-link" href={l.href}>{l.label}</Link></span>)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WhyHireMe />

      <section className="section" style={{ borderBottom: 0 }}>
        <div className="wrap split">
          <div className="stack">
            <h2>Quick answers</h2>
            <p className="muted">Common questions from recruiters, hiring managers and employers, answered from this site.</p>
          </div>
          <QuickAnswers answers={getAnswers()} />
        </div>
      </section>
    </>
  );
}
