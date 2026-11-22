import { CvButton } from "@/components/CvButton";
import { site } from "@/config/site";
import { getCredentials, getEducation, getExperience, getPublications, getSkills } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "CV",
  description: `Curriculum vitae of ${site.name}.`,
  path: "/cv",
});

export default function CvPage() {
  const education = getEducation();
  const experience = getExperience();
  const pubs = getPublications();
  const skills = getSkills();
  const credentials = getCredentials();
  return (
    <div className="wrap cv" style={{ maxWidth: 920, paddingBlock: 48 }}>
      <div className="btn-row no-print" style={{ marginBottom: 32 }}>
        <CvButton />
      </div>

      <header style={{ borderBottom: "2px solid var(--ink)", paddingBottom: 16 }}>
        <h1 style={{ fontSize: "2.2rem" }}>{site.name}</h1>
        <p style={{ marginTop: 6, fontWeight: 550 }}>{site.role}</p>
        <p className="label" style={{ marginTop: 8, color: "var(--ink-2)" }}>
          {site.contact.email} / {site.contact.phoneDisplay} / {site.contact.linkedinLabel} / {site.location}
        </p>
        <p style={{ marginTop: 10 }}>
          {site.availability.status}. Available {site.availability.startShort.replace("From", "from")}. {site.availability.mobility}.
        </p>
      </header>

      <section className="cv-section">
        <h2>Profile</h2>
        <p>
          Cybersecurity PhD researcher focusing on optimising partial homomorphic encryption (Paillier) for privacy-preserving smart-home IoT networks.
          Builds and attacks research systems, implements cryptography in Python, analyses network evidence and reports results reproducibly. MSc
          Cybersecurity and Digital Forensics with Distinction, including a machine learning dissertation on phishing URL detection. Graduate Teaching
          Assistant and academic peer reviewer.
        </p>
      </section>

      <section className="cv-section">
        <h2>Education</h2>
        {education.map((e) => (
          <div key={e.id} className="cv-item">
            <div className="cv-row"><strong>{e.award}, {e.outcome}</strong><span className="label">{e.period}</span></div>
            <p>{e.institution}</p>
            <ul>{e.details.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h2>Research manuscripts</h2>
        <ol>
          {pubs.map((p) => (
            <li key={p.meta.slug} style={{ marginTop: 6 }}>
              {p.meta.title}. <em>{p.meta.venue}</em>. {p.meta.statusLabel}.
            </li>
          ))}
        </ol>
      </section>

      <section className="cv-section">
        <h2>Experience</h2>
        {experience.map((e) => (
          <div key={e.id} className="cv-item">
            <div className="cv-row"><strong>{e.title}, {e.organisation}</strong><span className="label">{e.period}</span></div>
            <p>{e.summary}</p>
          </div>
        ))}
        <div className="cv-item">
          <div className="cv-row"><strong>Reviewer, Scientific Reports (Springer Nature) and IET Blockchain</strong><span className="label">2026</span></div>
          <p>Academic peer review of submitted manuscripts.</p>
        </div>
      </section>

      <section className="cv-section">
        <h2>Selected projects</h2>
        <div className="cv-item"><strong>Privacy-preserving smart-home security testbed.</strong> Five virtual machines, 15 simulated sensor streams, Home Assistant, MQTT and Mosquitto, Paillier encrypted aggregation in Python, controlled replay, spoofing and flooding attacks, packet capture analysis and independent audit scripts.</div>
        <div className="cv-item"><strong>Detection of Phishing URLs Using Machine Learning (MSc).</strong> Preprocessing, feature engineering, 70/30 split, comparison of eight classifiers with confusion matrices, ROC and learning curves, and a web interface for URL classification.</div>
        <div className="cv-item"><strong>Digital forensics.</strong> MSc exercises with FTK Imager, Autopsy and EnCase; PhD network investigations with Wireshark, tcpdump, broker logs and Python correlation.</div>
        <div className="cv-item"><strong>ZeroSeal, Citizen and Omela.</strong> Independent Next.js applications deployed on Vercel: a testnet blockchain security disclosure prototype, a Web3 life-simulation game, and a repeat-prescription coordination platform built with TypeScript, Prisma, Neon and NextAuth.</div>
      </section>

      <section className="cv-section">
        <h2>Skills</h2>
        {skills.map((s) => <p key={s.area} style={{ marginTop: 4 }}><strong>{s.area}:</strong> {s.items.join(", ")}.</p>)}
      </section>

      <section className="cv-section">
        <h2>Certifications and additional information</h2>
        <ul>
          {credentials.map((c) => <li key={c.name}>{c.issuer} {c.name}: {c.statusLabel}{c.note ? `. ${c.note}` : ""}</li>)}
          <li>University of Strathclyde Cybercrime Summer School 2025, SPRITE+-supported participant</li>
          <li>UK driving licence: {site.personal.drivingLicence}</li>
        </ul>
      </section>
    </div>
  );
}
