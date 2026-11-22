import Link from "next/link";
import { BarclaysFeature } from "@/components/BarclaysFeature";
import { PageHead } from "@/components/PageHead";
import { Timeline } from "@/components/Timeline";
import { getCareerEntries, getTimeline } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Career Journey",
  description: "Education, work, teaching and research on one timeline, and what reaching two Barclays Technology Developer final stages taught me.",
  path: "/career",
});

export default function CareerPage() {
  const entries = getCareerEntries();
  return (
    <>
      <PageHead
        crumbs={[{ label: "Career Journey" }]}
        eyebrow="Career Journey"
        title="Career Journey"
        lede="How I got here, and what reaching two Barclays Technology Developer final stages taught me about presenting research to industry."
      />
      <section className="section" id="barclays">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">2026</p>
              <h2 style={{ marginTop: 14 }}>Barclays Technology Developer recruitment</h2>
              <p>
                I reached the final assessment stage of two Barclays Technology Developer recruitment routes in 2026: the Discovery Programme and
                the main internship process. The Discovery Programme route did not lead to selection. This was applicant experience, not employment.
              </p>
            </div>
          </div>
          <BarclaysFeature />
          {entries.length > 0 && (
            <ul className="row-list" style={{ marginTop: 40 }}>
              {entries.map((e) => (
                <li key={e.meta.slug}>
                  <Link className="pub-row pub-row-plain" href={`/career/${e.meta.slug}`}>
                    <span className="pub-title">{e.meta.title}</span>
                    <span className="muted">{e.meta.description} <span className="read-more">Read more</span></span>
                    <span className="label">{e.readingMinutes} min read</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Everything on one clock</h2>
              <p>Education, work, teaching, research and service share one timeline. Move the slider to see what was happening at any point.</p>
            </div>
          </div>
          <Timeline data={getTimeline()} />
        </div>
      </section>
    </>
  );
}
