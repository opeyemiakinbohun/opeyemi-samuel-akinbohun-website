import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { PolicySeal } from "@/components/PolicySeal";
import { Stamp } from "@/components/Stamp";
import { getPolicyBriefs } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Policy briefs",
  description: "Policy briefs on cyber security, cryptography and financial regulation, read by a security researcher and turned into practical recommendations.",
  path: "/policy",
});

const method = [
  { title: "Read the primary source", text: "Each brief starts from the regulator's, government's or standards body's own publication, cited in full at the end." },
  { title: "Translate it into engineering", text: "I explain what the policy means for real systems: inventories, keys, firmware, suppliers and testing." },
  { title: "Recommend, with limits", text: "Every brief ends with numbered recommendations and a plain statement of what it does not claim." },
];

export default function PolicyPage() {
  const briefs = getPolicyBriefs();
  return (
    <>
      <PageHead
        crumbs={[{ label: "Articles", href: "/insights" }, { label: "Policy briefs" }]}
        eyebrow="Policy"
        title="Policy briefs"
        lede="Short, sourced briefs on where cyber security policy meets real systems. I focus on cryptography, financial regulation and connected devices, and I write each one for both policy readers and engineers."
      />
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="policy-hero">
            <div className="policy-method">
              {method.map((m, i) => (
                <div key={m.title} className="r-card">
                  <p className="label">Step {i + 1}</p>
                  <h3 style={{ marginTop: 8 }}>{m.title}</h3>
                  <p style={{ marginTop: 6 }}>{m.text}</p>
                </div>
              ))}
            </div>
            <div className="policy-seal-wrap">
              <PolicySeal size={150} label="Policy desk" />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Latest briefs</h2>
            <Link className="arrow-link" href="/insights/category/policy">Policy category</Link>
          </div>
          {briefs.length === 0 ? (
            <div className="notice measure">New briefs are on the way.</div>
          ) : (
            <div className="policy-list">
              {briefs.map((b) => (
                <Link key={b.meta.slug} href={`/insights/${b.meta.slug}`} className="policy-card">
                  <div>
                    <Stamp category={b.meta.category} minutes={b.readingMinutes} />
                    <h2>{b.meta.title}</h2>
                    <p className="policy-q">{b.meta.brief!.question}</p>
                    <p className="policy-meta">
                      <span>For: {b.meta.brief!.audience}</span>
                      <span>{b.meta.brief!.recommendations.length} recommendations</span>
                      {b.meta.publishedAt && <span>{b.meta.publishedAt}</span>}
                    </p>
                    <span className="read-more" style={{ marginTop: 16 }}>Read the brief</span>
                  </div>
                  <div className="policy-seal-wrap">
                    <PolicySeal number={b.meta.brief!.number} date={b.meta.publishedAt?.slice(0, 7).split("-").reverse().join(" / ")} size={136} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
