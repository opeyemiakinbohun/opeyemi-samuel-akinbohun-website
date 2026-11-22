import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { getAllTags } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Article tags", description: "Every topic covered in the articles, with links to each article.", path: "/insights/tags" });

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <>
      <PageHead crumbs={[{ label: "Articles", href: "/insights" }, { label: "Tags" }]} eyebrow="Articles" title="Tags" lede="Every topic the articles cover. Choose a tag to see the articles that discuss it." />
      <section className="section">
        <div className="wrap">
          {tags.length === 0 ? (
            <p className="muted">Tags appear here once articles are published.</p>
          ) : (
            <ul className="tag-cloud">
              {tags.map((t) => (
                <li key={t.slug}>
                  <Link className="tag-pill" href={`/insights/tag/${t.slug}`}>
                    {t.label}
                    <span className="tag-count">{t.count}</span>
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
