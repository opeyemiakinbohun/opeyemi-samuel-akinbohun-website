import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { getCareerEntries, getCareerEntry } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCareerEntries().map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({ params }: Props) {
  const a = getCareerEntry((await params).slug);
  if (!a) return {};
  const meta = pageMeta({ title: a.meta.title, description: a.meta.description, path: `/career/${a.meta.slug}`, type: "article" });
  return a.meta.visibility === "draft" ? { ...meta, robots: { index: false, follow: false } } : meta;
}

export default async function CareerArticlePage({ params }: Props) {
  const a = getCareerEntry((await params).slug);
  if (!a) notFound();
  return <ArticleView meta={a.meta} body={a.body} readingMinutes={a.readingMinutes} section={{ label: "Career journey", href: "/career" }} />;
}
