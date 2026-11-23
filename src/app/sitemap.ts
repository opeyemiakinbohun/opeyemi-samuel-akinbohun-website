import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { categories, getActivities, getArticles, getCareerEntries, getProjects } from "@/lib/content";

const STATIC = ["", "/projects", "/academic-activities", "/insights", "/policy", "/cloud-lab", "/career", "/about", "/opportunities", "/contact", "/cv", "/accessibility", "/privacy"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const published = <T extends { meta: { visibility: string } }>(xs: T[]) => xs.filter((x) => x.meta.visibility === "public");
  const urls = [
    ...STATIC,
    ...getProjects().map((p) => `/projects/${p.meta.slug}`),
    ...getActivities().map((a) => `/academic-activities/${a.meta.slug}`),
    ...published(getArticles()).map((a) => `/insights/${a.meta.slug}`),
    ...published(getCareerEntries()).map((a) => `/career/${a.meta.slug}`),
    ...categories.map((c) => `/insights/category/${c.slug}`),
  ];
  return urls.map((u) => ({ url: `${site.url}${u}`, changeFrequency: "monthly", priority: u === "" ? 1 : 0.7 }));
}
