import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/PageHead";
import { categories, getArticles } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMeta({ title: `${c.label} writing`, description: c.description, path: `/insights/category/${c.slug}` });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) notFound();
  const articles = getArticles().filter((a) => a.meta.category === c.slug);
  return (
    <>
      <PageHead crumbs={[{ label: "Insights", href: "/insights" }, { label: c.label }]} eyebrow="Topic" title={c.label} lede={c.description} />
      <section className="section" style={{ borderBottom: 0 }}>
        <div className="wrap">
          {articles.length === 0 ? (
            <p className="muted">No published articles in this topic yet.</p>
          ) : (
            <ul className="row-list">
              {articles.map((a) => (
                <li key={a.meta.slug}>
                  <Link className="pub-row" href={`/insights/${a.meta.slug}`} style={{ gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1.6fr)" }}>
                    <span className="pub-title">{a.meta.title}</span>
                    <span className="muted">{a.meta.description} <span className="read-more">Read more</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
