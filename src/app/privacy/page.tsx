import { PageHead } from "@/components/PageHead";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Privacy", description: "What this site does and does not collect.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <PageHead crumbs={[{ label: "Privacy" }]} title="Privacy" lede="Short version: this site does not track you." />
      <section className="section" style={{ borderBottom: 0 }}>
        <div className="wrap prose">
          <ul>
            <li>No analytics, advertising or tracking cookies.</li>
            <li>No contact form. If you email me, your message is handled by my university email account.</li>
            <li>Fonts are served from this site, so no requests go to third-party font services.</li>
            <li>Reading-control choices are stored in your browser&rsquo;s local storage, on your device only. Clear your browser storage to remove them.</li>
            <li>The hosting provider may keep standard server logs, such as IP addresses, for security and reliability.</li>
          </ul>
          <p>Questions: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
        </div>
      </section>
    </>
  );
}
