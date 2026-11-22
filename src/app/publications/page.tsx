import { PageHead } from "@/components/PageHead";
import { PublicationList } from "@/components/PublicationList";
import { getPublications } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Publications",
  description: "Five research manuscripts on partial homomorphic encryption and MQTT smart-home security, with venues and current review status.",
  path: "/publications",
});

export default function PublicationsPage() {
  const pubs = getPublications().map((p) => p.meta);
  return (
    <>
      <PageHead
        crumbs={[{ label: "Publications" }]}
        eyebrow="Research"
        title="Research manuscripts and publications"
        lede="Five manuscripts from my doctoral research across peer-reviewed Elsevier, IEEE and ACM journals and conferences. Each entry shows its current review status."
      />
      <section className="section">
        <div className="wrap">
          <PublicationList items={pubs.map(({ slug, title, venue, publisher, publisherLogo, type, status, statusLabel }) => ({ slug, title, venue, publisher, publisherLogo, type, status, statusLabel }))} />
          <div className="grid grid-3" style={{ marginTop: 40 }}>
            <div className="card"><h3>Submitted</h3><p>Sent to the venue and awaiting a decision.</p></div>
            <div className="card"><h3>Under review</h3><p>With reviewers at the journal.</p></div>
            <div className="card"><h3>Revised, under review</h3><p>Revised in response to reviewers and back under review.</p></div>
          </div>
          <p className="muted" style={{ marginTop: 28, maxWidth: "68ch" }}>
            Author lists, DOIs and links to the papers are added only once each paper is published. Datasets and code linked to these manuscripts
            are restricted or private while review is in progress.
          </p>
        </div>
      </section>
    </>
  );
}
