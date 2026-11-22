import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { PublicationList } from "@/components/PublicationList";
import { StatusTag } from "@/components/StatusTag";
import { Testbed } from "@/components/Testbed";
import { TestbedSimulation } from "@/components/TestbedSimulation";
import { site } from "@/config/site";
import { getDatasets, getPublications } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Research",
  description: "PhD research on optimising Paillier partial homomorphic encryption for privacy-preserving smart-home IoT networks, tested under controlled attacks.",
  path: "/research",
});

const themes = [
  { t: "Encrypted processing", d: "Paillier encryption of sensor readings, additive aggregation over ciphertexts and authorised decryption of totals, with every result checked against a plaintext reference." },
  { t: "Performance", d: "The cost of encrypted processing on throughput, latency, encryption and decryption time, measured end to end inside a working system with 2048 and 3072-bit keys." },
  { t: "Attacks", d: "Replay, spoofing, flooding, malformed messages and missing sensor reports, run from an isolated attacker machine against the testbed." },
  { t: "Evidence and reproducibility", d: "Packet captures, broker and application logs, run identifiers, SHA-256 integrity checks and independent audit scripts." },
  { t: "Risk", d: "Structured threat analysis and risk assessment for MQTT smart homes, tested against experimental observations." },
  { t: "Trustworthy decisions", d: "Occupancy prediction and automation that stay interpretable and cautious when sensor messages are missing." },
];

const plain = [
  { q: "The problem", a: "Smart-home sensors reveal when people are home, asleep or away. Services still need totals and trends from that data, so the readings are usually sent in a form the service can read." },
  { q: "What I build", a: "A working virtual smart home: 15 simulated sensors, MQTT message brokers, encryption code in Python and the automation that acts on the data, all running across separate virtual machines." },
  { q: "What I test", a: "Whether a service can add up encrypted readings without seeing them, what that costs in speed with realistic 2048 and 3072-bit keys, and what happens when someone replays, fakes or floods messages." },
  { q: "What I found so far", a: "Encryption keeps readings private but does not stop fake or replayed messages on its own. In later prototypes, added checks on message age, duplicates and malformed data passed controlled tests. Several of these findings are in manuscripts now under peer review." },
];

export default function ResearchPage() {
  const pubs = getPublications().map((p) => p.meta);
  const datasets = getDatasets();
  return (
    <>
      <PageHead
        crumbs={[{ label: "Research" }]}
        eyebrow="PhD research, University of Huddersfield"
        title="Partial homomorphic encryption for smart-home IoT"
        lede={`${site.researchFocus}. I build the systems, implement the cryptography, test them under controlled attack scenarios and measure what happens.`}
      >
        <div className="btn-row" style={{ marginTop: 24 }}>
          <Link className="btn btn-primary" href="/publications">Publications</Link>
          <Link className="btn" href="/projects/smart-home-security-research">Full case study</Link>
          <Link className="btn" href="/academic-activities">Academic activities</Link>
        </div>
      </PageHead>

      <section className="section">
        <div className="wrap">
          <h2 className="r-h2">My research in plain English. <span className="r-dim">For hiring managers who are not cryptographers.</span></h2>
          <div className="plain-grid">
            {plain.map((p) => (
              <div key={p.q} className="plain-card">
                <p className="pc-label">{p.q}</p>
                <p>{p.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="stack">
            <h2>Why it matters</h2>
            <p className="muted">
              Smart-home readings reveal a household&rsquo;s routine. Paillier encryption lets a service add readings without seeing them, but it is
              expensive and it does not authenticate messages. My research asks how to make it practical and what still has to be protected
              by other controls.
            </p>
          </div>
          <Testbed />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 style={{ marginBottom: 28 }}>Research themes</h2>
          <div className="grid grid-3">
            {themes.map((t) => (
              <article key={t.t} className="card"><h3>{t.t}</h3><p>{t.d}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack">
          <div className="stack" style={{ maxWidth: "64ch" }}>
            <h2>See the idea working</h2>
            <p className="muted">An educational simulation of the encrypted pipeline. It runs when you press Run or choose a scenario. Its values are generated in your browser, not data from my experiments.</p>
          </div>
          <TestbedSimulation />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Manuscripts</h2>
            <Link className="arrow-link" href="/publications">Publications page</Link>
          </div>
          <PublicationList items={pubs.map(({ slug, title, venue, publisher, publisherLogo, type, status, statusLabel }) => ({ slug, title, venue, publisher, publisherLogo, type, status, statusLabel }))} filterable={false} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 style={{ marginBottom: 12 }}>Datasets and code</h2>
          <p className="muted measure" style={{ marginBottom: 24 }}>
            Supporting datasets and reproducibility materials are access-restricted or private while the associated manuscripts are under review.
            Public links will be added when release is authorised.
          </p>
          <div className="grid grid-2">
            {datasets.map((d) => (
              <article key={d.slug} className="card">
                <StatusTag status="planned" label={d.accessLabel} />
                <h3>{d.title}</h3>
                <p>{d.description}</p>
                <p className="muted">{d.availability}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderBottom: 0 }}>
        <div className="wrap split">
          <h2>Work in progress</h2>
          <p className="muted measure">
            Current work extends encrypted processing into privacy-aware smart-home decisions and automation, with uncertainty handling and attack
            evaluation. It has not been submitted, and unpublished methods are not described on this site.
          </p>
        </div>
      </section>
    </>
  );
}
