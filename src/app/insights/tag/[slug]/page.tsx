import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/PageHead";
import { Stamp } from "@/components/Stamp";
import { getAllTags, getArticles, tagLabel } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const tags = getAllTags();
  return tags.length ? tags.map((t) => ({ slug: t.slug })) : [{ slug: "cryptography" }];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return pageMeta({ title: `${tagLabel(slug)} articles`, description: `Articles tagged ${tagLabel(slug)}.`, path: `/insights/tag/${slug}` });
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const articles = getArticles().filter((a) => a.meta.tags.includes(slug));
  if (articles.length === 0 && getAllTags().length > 0) notFound();
  return (
    <>
      <PageHead crumbs={[{ label: "Articles", href: "/insights" }, { label: "Tags", href: "/insights/tags" }, { label: tagLabel(slug) }]} eyebrow="Tag" title={tagLabel(slug)} lede={`${articles.length} article${articles.length === 1 ? "" : "s"} tagged ${tagLabel(slug)}.`} />
      <section className="section">
        <div className="wrap grid grid-2">
          {articles.map((a) => (
            <Link key={a.meta.slug} href={`/insights/${a.meta.slug}`} className="card card-link">
              <Stamp category={a.meta.category} minutes={a.readingMinutes} />
              <h2 style={{ fontSize: "1.5rem" }}>{a.meta.title}</h2>
              <p>{a.meta.description}</p>
              <span className="read-more">Read more</span>
            </Link>
          ))}
          {articles.length === 0 && <p className="muted">No published articles carry this tag yet.</p>}
        </div>
        <div className="wrap" style={{ marginTop: 32 }}><Link className="arrow-link" href="/insights/tags">All tags</Link></div>
      </section>
    </>
  );
}
