import Link from "next/link";
import { Capabilities } from "@/components/Capabilities";
import { CvButton } from "@/components/CvButton";
import { PageHead } from "@/components/PageHead";
import { StatusTag } from "@/components/StatusTag";
import { Logo, LogoMark } from "@/components/Logo";
import { barclaysHref } from "@/lib/content";
import { site } from "@/config/site";
import { getCredentials, getEducation, getExperience, getSkills } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description: `About ${site.name}: cybersecurity PhD researcher, Graduate Teaching Assistant, MSc Distinction and BSc First Class.`,
  path: "/about",
  type: "profile",
});

const groups = [
  { key: "teaching", label: "Teaching" },
  { key: "research", label: "University roles" },
  { key: "professional", label: "Professional experience" },
  { key: "earlier", label: "Earlier experience" },
] as const;

export default function AboutPage() {
  const education = getEducation();
  const experience = getExperience();
  const credentials = getCredentials();
  const skills = getSkills();
  return (
    <>
      <PageHead crumbs={[{ label: "About" }]} eyebrow={site.role} title={site.name}>
        <div className="split" style={{ marginTop: 24 }}>
          <div className="prose" style={{ fontSize: "1.06rem" }}>
            <p>
              I am Opeyemi Samuel Akinbohun, a cybersecurity PhD researcher at the University of Huddersfield. My research focuses on optimising
              partial homomorphic encryption for privacy-preserving smart-home IoT networks, including Paillier encryption, MQTT communications and
              controlled security experiments. The work is hands-on: I build and configure the systems, write the Python, run the experiments and
              analyse the packet captures and logs myself.
            </p>
            <p>
              Before starting my PhD, I completed an MSc in Cybersecurity and Digital Forensics with Distinction. During that degree I worked with
              FTK Imager, Autopsy and EnCase in forensic practicals. My dissertation investigated phishing URL detection using machine learning: I
              compared eight classification methods, analysed the results and built a web prototype for small and medium-sized enterprises,
              improved using feedback collected through a Google Form.
            </p>
            <p>
              My background also includes a First Class BSc in Computer Science from Joseph Ayo Babalola University, Nigeria, professional IT support experience, teaching first-year computing
              students and teaching homomorphic encryption at master&rsquo;s level. I am a reviewer for Scientific Reports (Springer Nature) and
              IET Blockchain.
            </p>
          </div>
          <div className="stack">
            <dl className="facts">
              <dt>Seeking</dt><dd>{site.availability.status}</dd>
              <dt>Start</dt><dd>{site.availability.start}</dd>
              <dt>Location</dt><dd>{site.location}. {site.availability.mobility}</dd>
            </dl>
            <div className="btn-row"><CvButton /><Link className="btn" href="/contact">Contact</Link></div>
          </div>
        </div>
      </PageHead>

      <Capabilities compact />

      <section className="section" id="education">
        <div className="wrap">
          <h2 style={{ marginBottom: 24 }}>Education</h2>
          <div className="grid grid-3">
            {education.map((e) => (
              <article key={e.id} className="card">
                <div className="card-top"><LogoMark id={e.logo} size={24} /><span className="label">{e.period}</span></div>
                <h3>{e.award}</h3>
                <p>{e.institution}</p>
                <p><strong>{e.outcome}</strong></p>
                <ul style={{ paddingLeft: "1.1em", margin: 0, color: "var(--ink-2)" }}>{e.details.map((d) => <li key={d} style={{ marginTop: 4 }}>{d}</li>)}</ul>
                {e.link && <Link className="arrow-link meta" href={e.link.href}>{e.link.label}</Link>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="teaching">
        <div className="wrap">
          <h2 style={{ marginBottom: 24 }}>Experience</h2>
          {groups.map((g) => {
            const items = experience.filter((e) => e.group === g.key);
            if (items.length === 0) return null;
            return (
              <div key={g.key} style={{ marginBottom: 36 }}>
                <p className="eyebrow" style={{ marginBottom: 14 }}>{g.label}</p>
                <ul className="row-list">
                  {items.map((e) => (
                    <li key={e.id} className="split" style={{ padding: "20px 0", gap: 20 }}>
                      <div>
                        <h3>{e.title}</h3>
                        <p className="muted">{e.organisation}{e.location ? `, ${e.location}` : ""}</p>
                        <p className="label" style={{ marginTop: 4 }}>{e.period}</p>
                      </div>
                      <div>
                        <p>{e.summary}</p>
                        {e.points.length > 0 && <ul style={{ paddingLeft: "1.1em", marginTop: 8, color: "var(--ink-2)" }}>{e.points.map((p) => <li key={p} style={{ marginTop: 4 }}>{p}</li>)}</ul>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section" id="skills">
        <div className="wrap">
          <h2 style={{ marginBottom: 24 }}>Skills</h2>
          <div className="grid grid-3">
            {skills.map((s) => (
              <article key={s.area} className="card">
                <h3>{s.area}</h3>
                <ul className="chips">{s.items.map((i) => <li key={i} className="chip">{i}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="career-journey">
        <div className="wrap grid grid-2">
          <Link href={barclaysHref()} className="card card-link">
            <div className="card-top"><span className="mark" style={{ background: "#fff" }}><Logo id="barclays" size={26} colour decorative /></span><span className="label">Final-stage candidate, 2026</span></div>
            <h3>Career Journey: what two Barclays Technology Developer final stages taught me</h3>
            <p>Applicant experience, not employment. Lessons on STAR examples, customer impact, stakeholders and independent validation.</p>
            <span className="read-more">Read more</span>
          </Link>
          <Link href="/academic-activities/peer-review" className="card card-link">
            <div className="card-top"><span style={{ display: "flex", gap: 8 }}><LogoMark id="scientificreports" size={22} /><LogoMark id="iet" size={22} /></span><span className="label">2026</span></div>
            <h3>Reviewer for Scientific Reports (Springer Nature) and IET Blockchain</h3>
            <p>Academic peer review: evaluating methods, technical claims and whether the evidence supports the conclusions.</p>
            <span className="read-more">Read more</span>
          </Link>
        </div>
      </section>

      <section className="section" id="credentials">
        <div className="wrap split">
          <div>
            <h2 style={{ marginBottom: 20 }}>Credentials</h2>
            <ul className="row-list">
              {credentials.map((c) => (
                <li key={c.name} style={{ padding: "14px 0", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ display: "flex", gap: 14, alignItems: "center" }}><LogoMark id={c.logo} size={24} /><span><strong>{c.name}</strong><span className="muted"> / {c.issuer}</span>{c.note && <span className="muted" style={{ display: "block", fontSize: "0.92rem" }}>{c.note}</span>}</span></span>
                  <StatusTag status={c.status} label={c.statusLabel} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 style={{ marginBottom: 20 }}>Additional information</h2>
            <dl className="kv">
              <dt>UK driving licence</dt><dd>{site.personal.drivingLicence}</dd>
              <dt>Microsoft AZ-104</dt><dd>{site.personal.az104}</dd>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
