import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { getArticle, getArticles } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) return {};
  const meta = pageMeta({ title: a.meta.title, description: a.meta.description, path: `/insights/${a.meta.slug}`, type: "article" });
  return a.meta.visibility === "draft" ? { ...meta, robots: { index: false, follow: false } } : meta;
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  return <ArticleView meta={a.meta} body={a.body} readingMinutes={a.readingMinutes} section={a.meta.brief ? { label: "Policy briefs", href: "/policy" } : { label: "Articles", href: "/insights" }} />;
}
