import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Stamp } from "@/components/Stamp";
import { categories, getAllTags, getArticles, tagLabel } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Articles",
  description: "Technical writing on cryptography, cybersecurity, digital forensics, research methods, software engineering, data and cloud.",
  path: "/insights",
});

export default function InsightsPage() {
  const articles = getArticles();
  const tags = getAllTags();
  return (
    <>
      <PageHead
        crumbs={[{ label: "Articles" }]}
        eyebrow="Articles"
        title="Read my technical writing"
        lede="Explainers and policy briefs on encryption, post-quantum cryptography and cyber security policy. Each article ends with notes on scope, limitations and further reading."
      />
      <section className="section">
        <div className="wrap">
          {articles.length === 0 ? (
            <div className="notice measure">New articles are on the way.</div>
          ) : (
            <div className="grid grid-2">
              {articles.map((a, i) => (
                <Link key={a.meta.slug} href={`/insights/${a.meta.slug}`} className="card card-link">
                  <div className="card-top">
                    <Stamp category={a.meta.category} minutes={a.readingMinutes} />
                    <span className="card-num">{String(i + 1).padStart(2, "0")} / {String(articles.length).padStart(2, "0")}</span>
                  </div>
                  <h2 style={{ fontSize: "1.6rem", marginTop: 12 }}>{a.meta.title}</h2>
                  <p>{a.meta.description}</p>
                  <p>{a.meta.tags.slice(0, 4).map((t) => <span key={t} className="tag-mini">{tagLabel(t)}</span>)}</p>
                  <span className="read-more">Read more</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      {tags.length > 0 && (
        <section className="section" id="tags">
          <div className="wrap">
            <div className="section-head">
              <h2>Tags</h2>
              <Link className="arrow-link" href="/insights/tags">All tags</Link>
            </div>
            <ul className="tag-cloud">
              {tags.map((t) => (
                <li key={t.slug}><Link className="tag-pill" href={`/insights/tag/${t.slug}`}>{t.label}<span className="tag-count">{t.count}</span></Link></li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2>Categories</h2></div>
          <div className="grid grid-4">
            {categories.map((c) => (
              <Link key={c.slug} href={`/insights/category/${c.slug}`} className="card card-link">
                <h3>{c.label}</h3>
                <p>{c.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
