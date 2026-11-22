import { site } from "@/config/site";
import { getArticles } from "@/lib/content";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const dynamic = "force-static";

export function GET() {
  const items = getArticles()
    .filter((a) => a.meta.visibility === "public" && a.meta.publishedAt)
    .map(
      (a) => `<item><title>${esc(a.meta.title)}</title><link>${site.url}/insights/${a.meta.slug}</link><guid>${site.url}/insights/${a.meta.slug}</guid><description>${esc(a.meta.description)}</description><pubDate>${new Date(a.meta.publishedAt as string).toUTCString()}</pubDate></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)}: Insights</title><link>${site.url}/insights</link><description>Technical writing by ${esc(site.name)}</description><language>en-gb</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
